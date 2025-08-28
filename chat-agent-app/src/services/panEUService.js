/**
 * PanEU Opportunity Analysis Service
 * ----------------------------------
 * This service ingests four Excel files (provided as URLs or File/Blob objects),
 * analyzes PanEU listing synchronization status across DE/FR/IT/ES, and produces
 * a summarized opportunity report similar to the user provided JSON example.
 *
 * NOTE: The original Python scripts included in the repository (PanEU_Placement_Calculator_final.py / .txt)
 * focus on placement optimization & VAT cost saving per country (authorization perspective).
 * The desired output example from the user is a categorization of ASIN level listing coverage.
 * Therefore this implementation adapts the spirit of the logic and constructs reasonable
 * assumptions about column names and calculation methodology. These assumptions are marked with TODO.
 *
 * Inputs (expected 4 Excel files) – assumed mapping (adjust as needed):
 *   1. panEuReport:      Contains ASIN, offer status per country (DE/FR/IT/ES) and maybe historical PanEU flag
 *   2. skuReport:        Contains ASIN + annual fulfillment cost (column example: "亚马逊物流配送费用（总计）") per country code (DE/FR/IT/ES)
 *   3. inventoryReport:  (Optional for current classification) Could include FNSKU / inventory presence; used to filter active ASINs
 *   4. asinList:         A master list of ASINs to constrain scope (optional)
 *
 * Core Country Set: ['DE','FR','IT','ES']  (UK/NL excluded per user's table categories)
 * Classification Categories (heuristic – align with provided Chinese labels):
 *   - total: "总计" union of unique ASINs across all categories needing action (excluding those already fully synchronized)
 *   - can_join (可以加入PanEU的Asin): ASINs missing ALL Four? or not yet PanEU but have sales in >=1? (Assumption: missing >=2 countries & not previously flagged PanEU)
 *   - missing_1_2 (缺少1-2个国家的选品同步): Active in 2-3 countries (i.e., missing 1 or 2)
 *   - missing_3 (缺少3个国家的选品同步 (仅在德国销售)): Only 1 active country AND that country is DE
 *   - benefit_lost (PanEU福利失效的Asin): Previously had all 4 but now missing at least 1 (Assumption: has historicalPanEUFlag===true & current activeCountries <4 & >=1)
 *
 * Savings Estimation:
 *   We don't have the exact per-ASIN delta; approximate using skuReport costs:
 *     - Aggregate annual fulfillment cost for each ASIN across its listed countries.
 *     - Potential savings if fully synchronized assumed: cost * 0.5 * (missingCountries / 4)
 *     - Category savings = sum of potential savings for ASINs in category.
 *   This is a placeholder heuristic; replace with real logistics differential when available.
 *
 * Result Object Shape:
 * {
 *   report_title: 'PanEU选品拓展机会分析报告',
 *   report_subtitle: `基于您的PanEU Report自动生成 | 共分析 ${asinCount} 个ASIN`,
 *   note: '点击蓝色数字可查看对应的ASIN详情',
 *   opportunity_data: {
 *     headers: ['opportunityType','count','detail','recommendation','estimatedAnnualSavingsEUR'],
 *     rows: [ { ...categoryRow } ]
 *   },
 *   asin_details: { categoryKey: [ASIN,...] } // optional for drill-down
 * }
 *
 * External Dependency: 'xlsx' library (added in package.json)
 */

import * as XLSX from 'xlsx';

// -------------------- Configuration & Assumptions -------------------- //
const CORE_COUNTRIES = ['DE', 'FR', 'IT', 'ES'];

// Column name assumptions (update to match real Excel headers)
const COL_ASIN = 'ASIN';
const COL_COUNTRY = '亚马逊商城'; // in sku report (country code like DE/FR/...)
const COL_COST = '亚马逊物流配送费用（总计）'; // numeric

// Offer status columns in panEuReport; values containing '€' or non-empty means active.
// Adjust to match real headers.
const OFFER_COLS = {
	DE: 'DE offer status',
	FR: 'FR offer status',
	IT: 'IT offer status',
	ES: 'ES offer status'
};

// Historical PanEU flag (if exists). If not found we will infer from having all 4 active historically – omitted in this version
const HISTORICAL_PAN_EU_FLAG = 'Historical PanEU'; // TODO adjust or remove if absent

// -------------------- Utility Functions -------------------- //

function readWorkbook(data) {
	// data can be ArrayBuffer/Uint8Array
	return XLSX.read(data, { type: 'array' });
}

function sheetToJson(workbook, sheetIndex = 0) {
	const sheetName = workbook.SheetNames[sheetIndex];
	if (!sheetName) return [];
	return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null });
}

async function fetchArrayBuffer(urlOrFile) {
	if (urlOrFile instanceof File || urlOrFile instanceof Blob) {
		return await urlOrFile.arrayBuffer();
	}
	const res = await fetch(urlOrFile);
	if (!res.ok) throw new Error(`Failed to fetch file: ${urlOrFile}`);
	return await res.arrayBuffer();
}

function normalizeCost(value) {
	if (value == null || value === '') return 0;
	if (typeof value === 'number') return value;
	const cleaned = String(value).replace(/[^0-9.,-]/g, '').replace(/,/g, '');
	const num = parseFloat(cleaned);
	return Number.isFinite(num) ? num : 0;
}

function formatCurrencyEUR(value) {
	return `€${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Determine active offer status (heuristic: contains '€' or numeric content)
function isActiveOffer(cell) {
	if (cell == null) return false;
	const s = String(cell).trim();
	if (!s || /No listing/i.test(s)) return false;
	// If contains € or looks like a price number
	if (s.includes('€')) return true;
	return /[0-9]/.test(s); // fallback
}

// -------------------- Core Analysis Logic -------------------- //

function extractAsinOfferMatrix(panEuRows) {
	const map = new Map(); // ASIN -> { ASIN, activeCountries:Set, rawRow }
	for (const row of panEuRows) {
		const asin = row[COL_ASIN];
		if (!asin) continue;
		const entry = map.get(asin) || { ASIN: asin, activeCountries: new Set(), row };
		for (const cc of CORE_COUNTRIES) {
			const col = OFFER_COLS[cc];
			if (col in row && isActiveOffer(row[col])) {
				entry.activeCountries.add(cc);
			}
		}
		map.set(asin, entry);
	}
	return map; // Map of ASIN -> entry
}

function buildCostIndex(skuRows) {
	// returns Map(ASIN -> { totalCostEUR, perCountry: { DE: cost,... } })
	const index = new Map();
	for (const row of skuRows) {
		const asin = row[COL_ASIN];
		if (!asin) continue;
		const country = row[COL_COUNTRY];
		if (!CORE_COUNTRIES.includes(country)) continue;
		const cost = normalizeCost(row[COL_COST]);
		const entry = index.get(asin) || { totalCostEUR: 0, perCountry: {} };
		entry.totalCostEUR += cost;
		entry.perCountry[country] = (entry.perCountry[country] || 0) + cost;
		index.set(asin, entry);
	}
	return index;
}

function classifyAsins(offerMatrix, costIndex) {
	const categories = {
		can_join: new Set(),
		missing_1_2: new Set(),
		missing_3: new Set(),
		benefit_lost: new Set()
	};
	const asinMeta = new Map();

	for (const [asin, info] of offerMatrix.entries()) {
		const activeCount = info.activeCountries.size;
		const missingCount = CORE_COUNTRIES.length - activeCount;
		// Heuristic historical flag: if activeCount === 4 treat as historically PanEU
		const historicallyPanEU = info.row[HISTORICAL_PAN_EU_FLAG] === true || info.row[HISTORICAL_PAN_EU_FLAG] === 'Y' || activeCount === 4;
		let assigned = false;

		if (activeCount === 0) {
			// Not considered for opportunities (no presence), skip
			asinMeta.set(asin, { activeCount, missingCount, historicallyPanEU, category: null });
			continue;
		}

		if (activeCount === 1 && info.activeCountries.has('DE')) {
			categories.missing_3.add(asin);
			asinMeta.set(asin, { activeCount, missingCount, historicallyPanEU, category: 'missing_3' });
			assigned = true;
		}

		if (!assigned && (activeCount === 2 || activeCount === 3)) {
			categories.missing_1_2.add(asin);
			asinMeta.set(asin, { activeCount, missingCount, historicallyPanEU, category: 'missing_1_2' });
			assigned = true;
		}

		if (!assigned && activeCount < 4 && !historicallyPanEU) {
			categories.can_join.add(asin);
			asinMeta.set(asin, { activeCount, missingCount, historicallyPanEU, category: 'can_join' });
			assigned = true;
		}

		if (!assigned && historicallyPanEU && activeCount < 4 && activeCount >= 1) {
			categories.benefit_lost.add(asin);
			asinMeta.set(asin, { activeCount, missingCount, historicallyPanEU, category: 'benefit_lost' });
			assigned = true;
		}

		if (!assigned) {
			asinMeta.set(asin, { activeCount, missingCount, historicallyPanEU, category: null });
		}
	}

	return { categories, asinMeta };
}

function computeSavings(categories, asinMeta, costIndex) {
	const savingsPerCategory = {
		can_join: 0,
		missing_1_2: 0,
		missing_3: 0,
		benefit_lost: 0
	};

	for (const [asin, meta] of asinMeta.entries()) {
		if (!meta.category) continue;
		const costInfo = costIndex.get(asin);
		const baseCost = costInfo ? costInfo.totalCostEUR : 0;
		// Heuristic savings: baseCost * 0.5 * (missingCount / 4)
		const potential = baseCost * 0.5 * (meta.missingCount / CORE_COUNTRIES.length);
		savingsPerCategory[meta.category] += potential;
	}
	return savingsPerCategory;
}

function buildRows(categories, savings, asinMeta) {
	function row(opportunityType, set, detail, recommendation, savingsValue) {
		return {
			opportunityType,
			count: set.size,
			detail,
			recommendation,
			estimatedAnnualSavingsEUR: formatCurrencyEUR(savingsValue || 0)
		};
	}

	const rows = [];
	// Total row will be appended after categories
	rows.push(
		row(
			'Can Join PanEU',
			categories.can_join,
			categories.can_join.size ? `${categories.can_join.size} ASIN(s) not synchronized in 4 countries.` : null,
			'Sync listings to DE/FR/IT/ES to unlock PanEU benefits (local fulfillment fee).',
			savings.can_join
		)
	);
	rows.push(
		row(
			'Missing 1-2 Countries',
			categories.missing_1_2,
			null,
			'Add the missing 1-2 country listings.',
			savings.missing_1_2
		)
	);
	rows.push(
		row(
			'Missing 3 Countries (DE only)',
			categories.missing_3,
			null,
			'Add listings for the 3 missing countries.',
			savings.missing_3
		)
	);
	rows.push(
		row(
			'PanEU Benefit At Risk',
			categories.benefit_lost,
			categories.benefit_lost.size ? `${categories.benefit_lost.size} ASIN(s) previously PanEU now missing countries.` : null,
			'Restore missing DE/FR/IT/ES offers quickly (use internal sync tools).',
			savings.benefit_lost
		)
	);

	// Total row (union of category sets)
	const totalSet = new Set([
		...categories.can_join,
		...categories.missing_1_2,
		...categories.missing_3,
		...categories.benefit_lost
	]);
	const totalSavings = Object.values(savings).reduce((a, b) => a + b, 0);
	rows.unshift(
		row(
			'Total',
			totalSet,
			'ASINs missing offers in one or more target countries.',
			'Prioritize restoring / adding offers to secure PanEU benefits.',
			totalSavings
		)
	);

	return { rows, asinDetails: { total: [...totalSet] } };
}

// -------------------- Public API -------------------- //

/**
 * Analyze PanEU opportunities from four Excel sources.
 * @param {Object} sources - object with four keys referencing URLs or File/Blob
 * @param {string|File|Blob} sources.panEuReport
 * @param {string|File|Blob} sources.skuReport
 * @param {string|File|Blob} sources.inventoryReport
 * @param {string|File|Blob} sources.asinList
 * @returns {Promise<Object>} structured report object
 */
export async function analyzePanEUOpportunities(sources) {
	const { panEuReport, skuReport, inventoryReport, asinList } = sources;
	// Fetch and parse workbooks in parallel
	const buffers = await Promise.all([
		fetchArrayBuffer(panEuReport),
		fetchArrayBuffer(skuReport),
		fetchArrayBuffer(inventoryReport),
		fetchArrayBuffer(asinList)
	]);

	const [wbPanEu, wbSku, wbInv, wbAsin] = buffers.map(readWorkbook);
	const panEuRows = sheetToJson(wbPanEu);
	const skuRows = sheetToJson(wbSku);
	// inventory & asin list currently optional usage
	const asinListRows = sheetToJson(wbAsin);

	const offerMatrix = extractAsinOfferMatrix(panEuRows);
	const costIndex = buildCostIndex(skuRows);

	// Optionally intersect with asin list if it contains ASIN column
	if (asinListRows.length && asinListRows[0][COL_ASIN]) {
		const validSet = new Set(asinListRows.map(r => r[COL_ASIN]).filter(Boolean));
		for (const asin of [...offerMatrix.keys()]) {
			if (!validSet.has(asin)) offerMatrix.delete(asin);
		}
	}

	const { categories, asinMeta } = classifyAsins(offerMatrix, costIndex);
	const savings = computeSavings(categories, asinMeta, costIndex);
	const { rows, asinDetails } = buildRows(categories, savings, asinMeta);

	const analyzedAsinCount = offerMatrix.size;

	const report = {
		report_title: 'PanEU选品拓展机会分析报告',
		report_subtitle: `基于您的PanEU Report自动生成 | 共分析 ${analyzedAsinCount} 个ASIN`,
		note: '点击蓝色数字可查看对应的ASIN详情',
		opportunity_data: {
			headers: ['opportunityType', 'count', 'detail', 'recommendation', 'estimatedAnnualSavingsEUR'],
			rows
		},
		asin_details: asinDetails,
		meta: {
			assumptions: {
				classification: 'Heuristic based on active offer count across DE/FR/IT/ES',
				savingsFormula: 'sum(baseCostEUR * 0.5 * missingCount/4)',
				baseCostSource: COL_COST,
				offerActiveRule: "cell includes '€' or numeric and not 'No listing'"
			},
			countries: CORE_COUNTRIES,
			timestamp: new Date().toISOString()
		}
	};

	return report;
}

export default {
	analyzePanEUOpportunities
};

