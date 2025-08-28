/**
 * DIService - UK <> EU 双向拓展机会分析
 * --------------------------------------
 * 输入: 10 个文件 (File / Blob / URL)，对应 DI_input 目录中的文件：
 *   1. Cost saving model.xlsx                       (必需)
 *   2. eligibleASINs-DE_FR_IT_ES-Credits-GSINSP.csv (UK>EU 激励 可选)
 *   3. eligibleASINs-UK-Credits-GSINSP.csv          (EU>UK 激励 可选)
 *   4. List_of_recommendations_from_United Kingdom_to_Germany.xlsx
 *   5. List_of_recommendations_from_United Kingdom_to_France.xlsx
 *   6. List_of_recommendations_from_United Kingdom_to_Italy.xlsx
 *   7. List_of_recommendations_from_United Kingdom_to_Spain.xlsx
 *   8. List_of_recommendations_from_Germany_to_United Kingdom.xlsx
 *   9. Remote_Fulfillment_ASIN_Status_Report.xlsx   (远程配送状态 可选, 当前逻辑未严格使用)
 *  10. Remote_Fulfillment_Order_Report.xlsx         (远程配送订单 可选)
 *
 * 输出: 符合用户示例的 JSON 结构 (title / report_title / key_opportunity_analysis / recommended_actions / data_table)
 * 计算逻辑参考 `DI分析报告.html` 中嵌入的 JS 脚本, 并做轻量封装。
 *
 * 注意: 浏览器环境无法直接读取本地路径, 需通过 <input type="file" multiple> 获取 File 对象后传入。
 * 若文件缺失, 对应统计将为 0, 服务不会抛错 (除非缺主文件 Cost saving model)。
 */

import * as XLSX from 'xlsx';

// ----------------------------- File Pattern Helpers ----------------------------- //
const FILE_ROLE_PATTERNS = [
	{ role: 'cost_saving', regex: /cost.*saving.*model/i, type: 'excel', required: true },
	{ role: 'incentive_eu', regex: /eligibleASINs.*DE.*FR.*IT.*ES.*Credits.*GSINSP/i, type: 'csv' },
	{ role: 'incentive_uk', regex: /eligibleASINs.*UK.*Credits.*GSINSP/i, type: 'csv' },
	{ role: 'rec_uk_de', regex: /recommendations.*United.*Kingdom.*Germany/i, type: 'excel' },
	{ role: 'rec_uk_fr', regex: /recommendations.*United.*Kingdom.*France/i, type: 'excel' },
	{ role: 'rec_uk_it', regex: /recommendations.*United.*Kingdom.*Italy/i, type: 'excel' },
	{ role: 'rec_uk_es', regex: /recommendations.*United.*Kingdom.*Spain/i, type: 'excel' },
	{ role: 'rec_de_uk', regex: /recommendations.*Germany.*United.*Kingdom/i, type: 'excel' },
	{ role: 'rf_status', regex: /Remote.*Fulfillment.*ASIN.*Status.*Report/i, type: 'excel' },
	{ role: 'rf_order', regex: /Remote.*Fulfillment.*Order.*Report/i, type: 'excel' }
];

// ----------------------------- Low-level Utilities ----------------------------- //
async function fetchArrayBuffer(input) {
	if (!input) return null;
	if (input instanceof File || input instanceof Blob) return await input.arrayBuffer();
	if (typeof input === 'string') {
		const res = await fetch(input);
		if (!res.ok) throw new Error(`Failed to fetch: ${input}`);
		return await res.arrayBuffer();
	}
	throw new Error('Unsupported input type');
}

function detectRole(fileName) {
	return FILE_ROLE_PATTERNS.find(p => p.regex.test(fileName))?.role || null;
}

function parseCSV(buffer) {
	const text = new TextDecoder('utf-8').decode(buffer);
	const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
	if (!lines.length) return [];
	const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
	return lines.slice(1).map(line => {
		const cells = line.split(',').map(c => c.replace(/"/g, '').trim());
		const obj = {};
		headers.forEach((h, i) => (obj[h] = cells[i] || ''));
		return obj;
	});
}

function sheetToJson(workbook, nameOrIndex = 0, opts = {}) {
	const sheetName = typeof nameOrIndex === 'number' ? workbook.SheetNames[nameOrIndex] : nameOrIndex;
	if (!sheetName) return [];
	return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], opts);
}

function extractNumber(str) {
	if (str == null) return 0;
	const match = String(str).replace(/,/g, '').match(/\d+(\.\d+)?/);
	return match ? parseFloat(match[0]) : 0;
}

const EUR = 'EUR';
const GBP = 'GBP';

function formatCurrency(amount, currency = EUR) {
	if (!Number.isFinite(amount)) amount = 0;
	const symbol = currency === EUR ? '€' : currency === GBP ? '£' : currency + ' ';
	return symbol + amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ----------------------------- Parsing Domain Logic ----------------------------- //

async function parseInputs(fileListOrMap) {
	// fileListOrMap: Array<File|Blob> OR { role:File }
	const roleMap = {
		cost_saving: null,
		incentive_eu: null,
		incentive_uk: null,
		rec_uk_de: null,
		rec_uk_fr: null,
		rec_uk_it: null,
		rec_uk_es: null,
		rec_de_uk: null,
		rf_status: null,
		rf_order: null
	};

	if (Array.isArray(fileListOrMap)) {
		for (const f of fileListOrMap) {
			const role = detectRole(f.name || '');
			if (role && !roleMap[role]) roleMap[role] = f;
		}
	} else {
		for (const [k, v] of Object.entries(fileListOrMap)) {
			if (roleMap.hasOwnProperty(k) && v) roleMap[k] = v;
		}
	}

	if (!roleMap.cost_saving) throw new Error('缺少必需文件: Cost saving model');

	// Fetch buffers in parallel
	const entries = Object.entries(roleMap);
	const buffers = await Promise.all(
		entries.map(async ([role, file]) => ({ role, buffer: file ? await fetchArrayBuffer(file) : null }))
	);

	const parsed = {};
	for (const { role, buffer } of buffers) {
		if (!buffer) continue;
		const pattern = FILE_ROLE_PATTERNS.find(p => p.role === role);
		if (!pattern) continue;
		if (pattern.type === 'csv') {
			parsed[role] = parseCSV(buffer);
		} else {
			const wb = XLSX.read(buffer, { type: 'array' });
			parsed[role] = wb; // 留待具体分类函数处理
		}
	}
	return parsed;
}

function buildRawData(parsed) {
	// 1. Cost saving workbook: sheets "Asin_List" & "SKU report ASIN detail"
	const costWB = parsed.cost_saving;
	const asinList = costWB ? sheetToJson(costWB, 'Asin_List') : [];
	const skuDetail = costWB ? sheetToJson(costWB, 'SKU report ASIN detail') : [];

	// Build P-ASIN map
	const pAsinMap = {};
	skuDetail.forEach(r => {
		if (r['ASIN'] && r['父 ASIN']) pAsinMap[r['ASIN']] = r['父 ASIN'];
	});

	const raw = [];
	asinList.forEach(row => {
		const cAsin = row.Asin;
		if (!cAsin) return;
		const pAsin = pAsinMap[cAsin] || '';
		let direction = 'Unknown';
		if (row.DI_type) {
			if (row.DI_type.includes('EU only')) direction = 'EU>UK';
			else if (row.DI_type.includes('UK only')) direction = 'UK>EU';
		}
		const gmsT30D = parseFloat(row.EU5_gms_t30d) || 0; // 来源商城销售额(T30D)
		raw.push({
			'C-ASIN': cAsin,
			'P-ASIN': pAsin,
			direction,
			'source MP GMS T30D': gmsT30D,
			'Remote fulfilment': 'not enabled',
			'RF GMS': 0,
			'RF high sales': 0,
			'UK>EU incentive amount': 0,
			'EU>UK incentive amount': 0,
			'UK>EU incentive currency': EUR,
			'EU>UK incentive currency': GBP,
			'high_sales_potential_eu': 0,
			'high_sales_potential_uk': 0
		});
	});

	// 2. Remote Fulfillment Orders
	if (parsed.rf_order) {
		const wb = parsed.rf_order;
		const sheetName = wb.SheetNames.find(n => /Orders?/i.test(n)) || wb.SheetNames[0];
		const rows = sheetToJson(wb, sheetName, { header: 1 });
		rows.slice(1).forEach(r => {
			if (r.length < 16) return;
			const asin = r[8];
			const currency = r[10];
			const price = parseFloat(r[11]) || 0;
			if (!asin || !price) return;
			const item = raw.find(x => x['C-ASIN'] === asin);
			if (item) {
				item['Remote fulfilment'] = 'enabled';
				item['RF GMS'] += price;
				if (item['RF GMS'] > 100) item['RF high sales'] = 1;
			}
		});
	}

	// 3. Incentives
	if (parsed.incentive_eu) {
		parsed.incentive_eu.forEach(row => {
			const pasin = row['资格值'];
			if (!pasin) return;
			const amount = extractNumber(row['可获得的福利代金券（最高）']);
			if (!amount) return;
			raw.forEach(item => {
				if (item['P-ASIN'] === pasin) item['UK>EU incentive amount'] = amount;
			});
		});
	}
	if (parsed.incentive_uk) {
		parsed.incentive_uk.forEach(row => {
			const pasin = row['资格值'];
			if (!pasin) return;
			const amount = extractNumber(row['可获得的福利代金券（最高）']);
			if (!amount) return;
			raw.forEach(item => {
				if (item['P-ASIN'] === pasin) item['EU>UK incentive amount'] = amount;
			});
		});
	}

	// 4. Recommendations (sales forecast) - sheet as header:1 arrays; ASIN at index 2, forecast at index 6
	const recMap = {
		rec_uk_de: '德国',
		rec_uk_fr: '法国',
		rec_uk_it: '意大利',
		rec_uk_es: '西班牙',
		rec_de_uk: '英国'
	};
	Object.entries(recMap).forEach(([role, market]) => {
		const wb = parsed[role];
		if (!wb) return;
		const sheetName = wb.SheetNames.find(n => /recommend/i.test(n)) || wb.SheetNames[0];
		const rows = sheetToJson(wb, sheetName, { header: 1 });
		rows.slice(2).forEach(r => {
			if (r.length < 7) return;
			const asin = r[2];
			const forecast = parseFloat(r[6]) || 0;
			if (!asin || !forecast) return;
			const item = raw.find(x => x['C-ASIN'] === asin);
			if (item) {
				item[`${market} sales forecast`] = (item[`${market} sales forecast`] || 0) + forecast;
				// 标记高销售潜力
				if (market === '英国') item['high_sales_potential_uk'] = 1; else item['high_sales_potential_eu'] = 1;
			}
		});
	});

	return raw;
}

function computeStats(raw) {
	const sum = (arr, key) => arr.reduce((a, b) => a + (b[key] || 0), 0);
	const filter = (fn) => raw.filter(fn);
	const ukToEu = filter(r => r.direction === 'UK>EU');
	const euToUk = filter(r => r.direction === 'EU>UK');
	const ukHigh = filter(r => r['high_sales_potential_eu'] === 1);
	const euHigh = filter(r => r['high_sales_potential_uk'] === 1);
	const ukIncentive = filter(r => r['UK>EU incentive amount'] > 0);
	const euIncentive = filter(r => r['EU>UK incentive amount'] > 0);
	const ukRfEnabled = filter(r => r.direction === 'UK>EU' && r['Remote fulfilment'] === 'enabled');
	const euRfEnabled = filter(r => r.direction === 'EU>UK' && r['Remote fulfilment'] === 'enabled');
	const ukRfHigh = filter(r => r.direction === 'UK>EU' && r['RF high sales'] === 1);
	const euRfHigh = filter(r => r.direction === 'EU>UK' && r['RF high sales'] === 1);

	// Sales forecast sums
	const ukToEuSalesForecast = ukHigh.reduce((acc, row) => acc + ['德国', '法国', '意大利', '西班牙'].reduce((s, m) => s + (row[`${m} sales forecast`] || 0), 0), 0);
	const euToUkSalesForecast = euHigh.reduce((acc, row) => acc + (row['英国 sales forecast'] || 0), 0);

	// Source sales sum helper
	const sourceSum = (arr) => arr.reduce((a, b) => a + (b['source MP GMS T30D'] || 0), 0);

	return {
		totals: {
			ukOnly: ukToEu.length,
			euOnly: euToUk.length,
			ukHigh: ukHigh.length,
			euHigh: euHigh.length,
			ukIncentive: ukIncentive.length,
			euIncentive: euIncentive.length,
			ukNotRf: ukToEu.filter(r => r['Remote fulfilment'] === 'not enabled').length,
			euNotRf: euToUk.filter(r => r['Remote fulfilment'] === 'not enabled').length,
			ukRf: ukRfEnabled.length,
			euRf: euRfEnabled.length,
			ukRfHigh: ukRfHigh.length,
			euRfHigh: euRfHigh.length
		},
		sales: {
			row1: sourceSum(ukToEu),
			row2: sourceSum(ukHigh),
			row3: sourceSum(ukIncentive),
			row4: sourceSum(ukToEu.filter(r => r['Remote fulfilment'] === 'not enabled')),
			row5: sourceSum(ukRfEnabled),
			row6: sourceSum(ukRfHigh),
			row7: sourceSum(euToUk),
			row8: sourceSum(euHigh),
			row9: sourceSum(euIncentive),
			row10: sourceSum(euToUk.filter(r => r['Remote fulfilment'] === 'not enabled')),
			row11: sourceSum(euRfEnabled),
			row12: sourceSum(euRfHigh)
		},
		forecast: { ukToEuSalesForecast, euToUkSalesForecast },
		incentiveTotals: {
			ukEu: ukIncentive.reduce((a, b) => a + (b['UK>EU incentive amount'] || 0), 0),
			euUk: euIncentive.reduce((a, b) => a + (b['EU>UK incentive amount'] || 0), 0)
		}
	};
}

// ----------------------------- Report Assembly ----------------------------- //
function buildReport(raw, stats) {
	const { totals, sales, forecast, incentiveTotals } = stats;

	const formatSales = (v) => formatCurrency(v, EUR); // Source sales assumed EUR in sample

	const dataRows = [
		{ '#': 1, name: '仅在英国本地入库的选品', count: totals.ukOnly, sales: sales.row1 ? formatSales(sales.row1) : '-', action: '-' },
		{ '#': 2, name: '在欧盟有高销售潜力', count: totals.ukHigh, sales: sales.row2 ? formatSales(sales.row2) : '-', action: totals.ukHigh ? `本地入库至欧盟,预计销售额${formatCurrency(forecast.ukToEuSalesForecast, EUR)}(12M)` : '-' },
		{ '#': 3, name: '在欧盟有全球拓展大礼包', count: totals.ukIncentive, sales: sales.row3 ? formatSales(sales.row3) : '-', action: totals.ukIncentive ? `本地入库至欧盟,获取最高${formatCurrency(incentiveTotals.ukEu, EUR)}代金券` : '-' },
		{ '#': 4, name: '未在欧盟远程销售', count: totals.ukNotRf, sales: sales.row4 ? formatSales(sales.row4) : '-', action: totals.ukNotRf ? '开启英国至欧盟的远程配送' : '-' },
		{ '#': 5, name: '已在欧盟远程销售', count: totals.ukRf, sales: sales.row5 ? formatSales(sales.row5) : '-', action: '-' },
		{ '#': 6, name: '远程销售额>€100', count: totals.ukRfHigh, sales: sales.row6 ? formatSales(sales.row6) : '-', action: totals.ukRfHigh ? '本地入库至欧盟,预计节省配送费' : '-' },
		{ '#': 7, name: '仅在欧盟本地入库的选品', count: totals.euOnly, sales: sales.row7 ? formatSales(sales.row7) : '-', action: '-' },
		{ '#': 8, name: '在英国有高销售潜力', count: totals.euHigh, sales: sales.row8 ? formatSales(sales.row8) : '-', action: totals.euHigh ? `本地入库至英国,预计销售额${formatCurrency(forecast.euToUkSalesForecast, GBP)}(12M)` : '-' },
		{ '#': 9, name: '在英国有全球拓展大礼包', count: totals.euIncentive, sales: sales.row9 ? formatSales(sales.row9) : '-', action: totals.euIncentive ? `本地入库至英国,获取最高${formatCurrency(incentiveTotals.euUk, GBP)}代金券` : '-' },
		{ '#': 10, name: '未在英国远程销售', count: totals.euNotRf, sales: sales.row10 ? formatSales(sales.row10) : '-', action: totals.euNotRf ? '开启欧盟至英国的远程配送' : '-' },
		{ '#': 11, name: '已在英国远程销售', count: totals.euRf, sales: sales.row11 ? formatSales(sales.row11) : '-', action: '-' },
		{ '#': 12, name: '远程销售额>£100', count: totals.euRfHigh, sales: sales.row12 ? formatSales(sales.row12) : '-', action: totals.euRfHigh ? '本地入库至英国,预计节省配送费' : '-' }
	];

	// Key points text assembly (跟随示例, 使用 k 级别近似或直接金额)
	const points = [
		{
			title: '高销售潜力ASIN',
			description: `UK>EU方向有${totals.ukHigh}个ASIN在欧盟市场具有高销售潜力,预计销售额${formatCurrency(forecast.ukToEuSalesForecast, EUR)}(12M); EU>UK方向有${totals.euHigh}个ASIN在英国市场具有高销售潜力,预计销售额${formatCurrency(forecast.euToUkSalesForecast, GBP)}(12M)`
		},
		{
			title: '全球拓展大礼包',
			description: `UK>EU方向有${totals.ukIncentive}个ASIN可获得最高${formatCurrency(incentiveTotals.ukEu, EUR)}代金券; EU>UK方向有${totals.euIncentive}个ASIN可获得最高${formatCurrency(incentiveTotals.euUk, GBP)}代金券`
		},
		{
			title: '远程配送优化',
			description: `目前有${totals.ukRf + totals.euRf}个ASIN开启远程配送,其中${totals.ukRfHigh + totals.euRfHigh}个达到高销售额(>€100),预计可节省配送费`
		},
		{
			title: '市场扩展潜力',
			description: `${totals.ukNotRf}个UK>EU ASIN和${totals.euNotRf}个EU>UK ASIN都未开启远程配送,存在巨大扩展空间`
		}
	];

	const recommendedActions = [
		{ priority: 1, recommendation: `对${totals.ukHigh}个EU高销售潜力ASIN和${totals.euHigh}个UK高销售潜力ASIN进行本地入库,预计总销售额${formatCurrency(forecast.ukToEuSalesForecast, EUR)} + ${formatCurrency(forecast.euToUkSalesForecast, GBP)}` },
		{ priority: 2, recommendation: `充分利用总计${formatCurrency(incentiveTotals.ukEu, EUR)} + ${formatCurrency(incentiveTotals.euUk, GBP)}的全球拓展大礼包激励资源` },
		{ priority: 3, recommendation: `为${totals.ukNotRf + totals.euNotRf}个未开启远程配送的ASIN开启远程配送功能` },
		{ priority: 4, recommendation: `对已开启远程配送且销售额>€100的${totals.ukRfHigh + totals.euRfHigh}个ASIN考虑本地入库以节省配送成本` }
	];

	return {
		title: 'DI 双向分析报告',
		report_title: '英国和欧盟选品拓展机会报告',
		key_opportunity_analysis: {
			title: '主要机会点分析',
			subtitle: '基于上传的10个数据文件,我们识别出以下关键机会:',
			points
		},
		recommended_actions: {
			title: '建议行动优先级',
			actions: recommendedActions
		},
		data_table: {
			headers: ['#', 'UK<>EU ASIN', '数量', '来源商城销售额(T30D)', '机会点及操作'],
			rows: dataRows.map(r => ({
				'#': r['#'],
				'UK<>EU ASIN': r.name,
				'数量': r.count,
				'来源商城销售额(T30D)': r.sales,
				'机会点及操作': r.action
			}))
		},
		meta: {
			asin_count: raw.length,
			generated_at: new Date().toISOString(),
			assumptions: {
				salesForecastSource: 'Recommendation sheets G列 (index 6) 作为销售预测',
				incentiveMapping: 'CSV 列: 资格值 -> P-ASIN, 可获得的福利代金券（最高）',
				remoteFulfillmentThreshold: 'RF GMS > 100 判定 RF high sales',
				directionRules: 'DI_type 包含 "EU only" -> EU>UK; 包含 "UK only" -> UK>EU',
				currency: '示例中统一展示来源销售额为 EUR, 英国预测展示为 GBP'
			}
		}
	};
}

// ----------------------------- Public API ----------------------------- //
export async function analyzeDIOpportunities(inputFiles) {
	// inputFiles: Array<File|Blob> 或 {cost_saving:File,...}
	const parsed = await parseInputs(inputFiles);
	const raw = buildRawData(parsed);
	const stats = computeStats(raw);
	return buildReport(raw, stats);
}

export default { analyzeDIOpportunities };

