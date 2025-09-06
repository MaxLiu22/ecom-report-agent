/**
 * DIService - UK <> EU 双向拓展机会分析
 * --------------------------------------
 * 原始功能: 通过文件名正则匹配 10 个输入。
 * 需求扩展: 支持 (1) 文件名不规范; (2) Excel / CSV 混合; (3) 每种角色存在 2 种列头格式的可能。
 * 解决方案: 新增 analyzeDIOpportunitiesAuto(inputs) 自动识别函数 (无序文件数组/对象)。
 * 识别逻辑(启发式, 多命中取第一个, 冲突加入 warnings):
 *   cost_saving: 需同时含有工作表 (或列) 关键词: 'Asin_List' & 'SKU report' / 列含 'DI_type','EU5_gms_t30d'
 *   incentive_eu: CSV/Sheet 包含列: '资格值','可获得的福利代金券（最高）' 且 金额列中含 'EUR'
 *   incentive_uk: 同上但 金额列含 'GBP'
 *   rec_uk_de : 行/列头包含 'Germany' 或 '德国' 且包含 'recommend'
 *   rec_uk_fr : 'France' / '法国'
 *   rec_uk_it : 'Italy' / '意大利'
 *   rec_uk_es : 'Spain' / '西班牙'
 *   rec_de_uk : 表头含 'United' & 'Kingdom' 与 'recommend' 且含 'Germany' to UK 方向 (或含 '英国')
 *   rf_status : Sheet 名或列含 'Remote' & 'Status'
 *   rf_order  : Sheet 名或列含 'Remote' & 'Order'
 * 若文件名良好仍可使用 analyzeDIOpportunities 保持向后兼容。
 */

import { stringifyQuery } from 'vue-router';
import * as XLSX from 'xlsx';

// ----------------------------- File Pattern Helpers ----------------------------- //
// 增加 asin_list / sku_report 两个独立角色；保留 cost_saving 以兼容旧版
const FILE_ROLE_PATTERNS = [
	{ role: 'asin_list', regex: /(asin).*list/i, type: 'excel', required: true },
	{ role: 'sku_report', regex: /sku.*report/i, type: 'excel', required: true },
	{ role: 'cost_saving', regex: /cost.*saving.*model/i, type: 'excel' },
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

// ----------------------------- Auto Detection Helpers ----------------------------- //
function normalizeHeader(h) { return (h || '').toString().trim().toLowerCase(); }

function detectRoleByContent(workbookOrRows) {
	// workbookOrRows: if object with SheetNames treat as workbook; else array rows (csv parsed)
	try {
		if (!workbookOrRows) return null;
		if (workbookOrRows.SheetNames) {
			// Excel workbook path
			const wb = workbookOrRows;
			const sheetNamesLower = wb.SheetNames.map(s => s.toLowerCase());
			const hasSheet = (kw) => sheetNamesLower.some(n => n.includes(kw));
			// asin_list vs sku_report 独立识别
			if (hasSheet('asin_list') || hasSheet('asin') || hasSheet('asins')) return 'asin_list';
			if (hasSheet('sku report') || hasSheet('skureport') || hasSheet('sku_report')) return 'sku_report';
			// remote status / order
			if (sheetNamesLower.some(n => n.includes('remote') && n.includes('status'))) return 'rf_status';
			if (sheetNamesLower.some(n => n.includes('remote') && n.includes('order'))) return 'rf_order';
			// recommendations: read first sheet header row to look for language
			for (const sn of wb.SheetNames.slice(0,3)) {
				const rows = sheetToJson(wb, sn, { header:1 }).slice(0,5);
				const flatText = rows.flat().filter(Boolean).join(' ').toLowerCase();
				if (/recommend/.test(flatText)) {
					if (/(german|germany|德国)/.test(flatText) && /(united|kingdom|英国)/.test(flatText)) {
						// 方向： 若包含 from united kingdom to germany -> uk_de; 若包含 from germany to united kingdom -> de_uk
						if (/from.*united.*kingdom.*to.*german/.test(flatText)) return 'rec_uk_de';
						if (/from.*german.*to.*united.*kingdom/.test(flatText)) return 'rec_de_uk';
						// fallback: 如果有 germany 和 united kingdom 但没有明确方向, 根据出现顺序判断
						const ukIdx = flatText.indexOf('united'); const deIdx = flatText.indexOf('german');
						if (ukIdx !== -1 && deIdx !== -1) return ukIdx < deIdx ? 'rec_uk_de' : 'rec_de_uk';
					}
					if (/(france|french|法国)/.test(flatText)) return 'rec_uk_fr';
					if (/(italy|italian|意大利)/.test(flatText)) return 'rec_uk_it';
					if (/(spain|spanish|西班牙)/.test(flatText)) return 'rec_uk_es';
				}
			}
			// Fallback: inspect first sheet columns
			const firstRows = sheetToJson(wb, wb.SheetNames[0]).slice(0,3);
			if (firstRows.some(r => Object.keys(r).some(k => /di\s*_?type/i.test(k))) && firstRows.some(r => Object.keys(r).some(k => /eu5.*gms.*t30d/i.test(k)))) return 'asin_list';
		} else if (Array.isArray(workbookOrRows)) {
			// CSV rows
			const rows = workbookOrRows;
			if (!rows.length) return null;
			const headers = Object.keys(rows[0]).map(normalizeHeader);
			const hasHeaders = (...names) => names.every(n => headers.includes(n));
			if (hasHeaders('资格值','可获得的福利代金券（最高）')) {
				// Distinguish currency by row values
				const joined = rows.slice(0,10).map(r => Object.values(r).join(' ')).join(' ');
				if (/eur/i.test(joined)) return 'incentive_eu';
				if (/gbp/i.test(joined)) return 'incentive_uk';
			}
		}
	} catch { /* ignore */ }
	return null;
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

// 在工作簿中寻找包含指定列头的 sheet（不区分大小写，宽松匹配）
function findSheetByHeaders(wb, requiredHeaders = []){
	for(const sn of wb.SheetNames){
		const rows = XLSX.utils.sheet_to_json(wb.Sheets[sn], { header:1 });
		if(!rows || !rows.length) continue;
		const headers = (rows[0]||[]).map(h => (h||'').toString().trim().toLowerCase());
		const ok = requiredHeaders.every(h => headers.some(x => x.includes(h)));
		if(ok) return sn;
	}
	return null;
}

// 查找对象中第一个匹配 key 的字段（忽略空格大小写）
function findKey(obj, pattern){
	const keys = Object.keys(obj || {});
	const re = pattern instanceof RegExp ? pattern : new RegExp(pattern, 'i');
	return keys.find(k => re.test(k.replace(/\s+/g,'')));
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

// ----------------------------- Sample Data Supplement ----------------------------- //
async function supplementParsedFromAssets(parsed){
	const supplemented = [];
	const warnings = [];
	// 仅当缺失时尝试
	const tasks = [];
	const tryExcel = async (role, relPath) => {
		if (parsed[role]) return;
		try {
			const url = new URL(`./DIdata/${relPath}`, import.meta.url).href;
			const res = await fetch(url);
			if(!res.ok) throw new Error(`${res.status}`);
			const buf = await res.arrayBuffer();
			parsed[role] = XLSX.read(buf, { type:'array' });
			supplemented.push(role);
		} catch(e){ warnings.push(`补充失败: ${role} -> ${relPath} (${e.message})`); }
	};
	const tryCSV = async (role, relPath) => {
		if (parsed[role]) return;
		try {
			const url = new URL(`./DIdata/${relPath}`, import.meta.url).href;
			const res = await fetch(url);
			if(!res.ok) throw new Error(`${res.status}`);
			const buf = await res.arrayBuffer();
			parsed[role] = parseCSV(buf);
			supplemented.push(role);
		} catch(e){ warnings.push(`补充失败: ${role} -> ${relPath} (${e.message})`); }
	};

	await tryExcel('asin_list', 'Asin_List_1756435951298.xlsx');
	// SKU 报表样例名不固定，尝试两个常见命名
	await tryExcel('sku_report', 'SKU report.xlsx');
	if(!parsed.sku_report) await tryExcel('sku_report', 'SKU_report.xlsx');

	await tryCSV('incentive_eu', 'eligibleASINs-DE_FR_IT_ES-Credits-GSINSP.csv');
	await tryCSV('incentive_uk', 'eligibleASINs-UK-Credits-GSINSP.csv');

	await tryExcel('rf_status', 'Remote_Fulfillment_ASIN_Status_Report.xlsx');
	await tryExcel('rf_order', 'Remote_Fulfillment_Order_Report.xlsx');

	await tryExcel('rec_uk_de', 'List_of_recommendations_from_United Kingdom_to_Germany.xlsx');
	await tryExcel('rec_uk_fr', 'List_of_recommendations_from_United Kingdom_to_France.xlsx');
	await tryExcel('rec_uk_it', 'List_of_recommendations_from_United Kingdom_to_Italy.xlsx');
	await tryExcel('rec_uk_es', 'List_of_recommendations_from_United Kingdom_to_Spain.xlsx');
	await tryExcel('rec_de_uk', 'List_of_recommendations_from_Germany_to_United Kingdom.xlsx');

	return { parsed, supplemented, warnings };
}

// ----------------------------- Parsing Domain Logic ----------------------------- //

async function parseInputs(fileListOrMap) {
	// fileListOrMap: Array<File|Blob> OR { role:File }
	const roleMap = {
		asin_list: null,
		sku_report: null,
		cost_saving: null, // 兼容旧版（单文件包含）
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
	// 1) 获取 ASIN List（新版）与 SKU Report；若未提供则尝试从 cost_saving 兼容读取
	const asinWB = parsed.asin_list || parsed.cost_saving || null;
	const skuWB = parsed.sku_report || parsed.cost_saving || null;

	// 1.a 解析 ASIN 列表：优先对象模式；若失败，回退数组模式（位置推断）
	let asinList = [];
	let asinArrayRows = [];
	if (asinWB) {
		const asinSheet = findSheetByHeaders(asinWB, ['asin', 'di', 'eu5']);
		const sheetName = asinSheet || asinWB.SheetNames[0];
		asinList = XLSX.utils.sheet_to_json(asinWB.Sheets[sheetName], { defval: null });
		if (!Array.isArray(asinList) || asinList.length === 0 || (!asinList[0]?.Asin && !asinList[0]?.ASIN && !asinList[0]?.['ASIN'])){
			// 读取数组模式
			asinArrayRows = XLSX.utils.sheet_to_json(asinWB.Sheets[sheetName], { header:1 });
		}
	}

	// 1.b 从 SKU Report 构建 P-ASIN 映射
	const pAsinMap = {};
	if (skuWB) {
		const sheetName = skuWB.SheetNames[0];
		// 优先对象模式
		const objRows = XLSX.utils.sheet_to_json(skuWB.Sheets[sheetName], { defval: null });
		if (objRows && objRows.length) {
			objRows.forEach(r => {
				const asinKey = findKey(r, /^ASIN$/i);
				const pKey = findKey(r, /^(父\s*ASIN|Parent\s*ASIN)$/i);
				const c = asinKey ? r[asinKey] : null;
				const p = pKey ? r[pKey] : null;
				if (c && p) pAsinMap[c] = p;
			});
		} else {
			// 回退：数组模式，根据表头定位
			const rows = XLSX.utils.sheet_to_json(skuWB.Sheets[sheetName], { header: 1 });
			if (rows && rows.length) {
				const headers = (rows[0] || []).map(h => (h || '').toString().trim().toLowerCase());
				const asinIdx = headers.findIndex(h => h === 'asin');
				const pIdx = headers.findIndex(h => h.replace(/\s+/g, '') === '父asin' || h.replace(/\s+/g, '').includes('parentasin'));
				rows.slice(1).forEach(r => {
					const c = r[asinIdx];
					const p = r[pIdx];
					if (c && p) pAsinMap[c] = p;
				});
			}
		}
	}

	// 1.c 汇总 raw 行（对象模式）
	const raw = [];
	if (asinList && asinList.length) {
		asinList.forEach(row => {
			const cAsin = row.Asin || row.ASIN || row['ASIN'];
			if (!cAsin) return;
			const pAsin = pAsinMap[cAsin] || '';
			let direction = 'Unknown';
			const diTypeKey = findKey(row, /^di\s*_?type$/i);
			const diVal = diTypeKey ? row[diTypeKey] : '';
			if (diVal) {
				if (String(diVal).includes('EU only')) direction = 'EU>UK';
				else if (String(diVal).includes('UK only')) direction = 'UK>EU';
			}
			const gmsKey = findKey(row, /^eu5.*gms.*t30d$/i);
			const gmsT30D = gmsKey ? (parseFloat(row[gmsKey]) || 0) : 0;
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
	}

	// 1.d 若对象模式无数据，回退数组模式，按优化版经验列位提取（B/C列变体）
	if (raw.length === 0 && asinArrayRows && asinArrayRows.length) {
		// 估计数据开始行（前几行标题/空行）
		let start = 3;
		for (let i = 1; i < Math.min(10, asinArrayRows.length); i++) {
			const v2 = asinArrayRows[i]?.[2];
			const v1 = asinArrayRows[i]?.[1];
			if ((typeof v2 === 'string' && /^B0/.test(v2)) || (typeof v1 === 'string' && /^B0/.test(v1))) { start = i; break; }
		}
		for (const row of asinArrayRows.slice(start)) {
			if (!Array.isArray(row)) continue;
			const candidateC = row[2];
			const candidateB = row[1];
			let cAsin, diType;
			if (candidateC && /^B0/.test(String(candidateC))) { cAsin = candidateC; diType = row[3]; }
			else { cAsin = candidateB; diType = row[2]; }
			if (!cAsin || !/^B0/.test(String(cAsin))) continue;
			let direction = 'Unknown';
			if (diType === 'EU only') direction = 'EU>UK';
			else if (diType === 'UK only') direction = 'UK>EU';
			const pAsin = pAsinMap[cAsin] || '';
			raw.push({
				'C-ASIN': cAsin,
				'P-ASIN': pAsin,
				direction,
				'source MP GMS T30D': 0,
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
		}
	}

	// 2) Remote Fulfillment Status（Enrollment_EU4）— 与优化版保持一致（已启用）
	if (parsed.rf_status && raw.length) {
		const wb = parsed.rf_status;
		const sheetName = wb.SheetNames.find(n => /Enrollment/i.test(n)) || wb.SheetNames[0];
		const rows = sheetToJson(wb, sheetName, { header: 1 });
		if (rows && rows.length) {
			// 尝试定位数据起始行（列1看起来像 ASIN）
			let start = 3;
			for (let i = 1; i < Math.min(10, rows.length); i++) {
				const v = rows[i]?.[1] || rows[i]?.[0];
				if (typeof v === 'string' && /^B0/i.test(v)) { start = i; break; }
			}
			const dataRows = rows.slice(start);
			// 采用优化版的列索引约定（经验列位）
			const statusCols = { '法国': 3, '德国': 6, '意大利': 9, '西班牙': 12, '英国': 15 };
			dataRows.forEach(r => {
				if (!Array.isArray(r)) return;
				const asin = r[1] || r[0];
				if (!asin) return;
				const item = raw.find(x => x['C-ASIN'] === asin);
				if (!item) return;
				if (item.direction === 'UK>EU') {
					const enabled = ['法国','德国','意大利','西班牙'].some(cty => r[statusCols[cty]] && String(r[statusCols[cty]]).trim() === '已启用');
					if (enabled) item['Remote fulfilment'] = 'enabled';
				} else if (item.direction === 'EU>UK') {
					const enabled = r[statusCols['英国']] && String(r[statusCols['英国']]).trim() === '已启用';
					if (enabled) item['Remote fulfilment'] = 'enabled';
				}
			});
		}
	}

	// 3) Remote Fulfillment Orders（若有实际订单金额则累计 RF GMS 并标记 enabled）
	if (parsed.rf_order) {
		const wb = parsed.rf_order;
		const sheetName = wb.SheetNames.find(n => /Orders?/i.test(n)) || wb.SheetNames[0];
		const rows = sheetToJson(wb, sheetName, { header: 1 });
		rows.slice(1).forEach(r => {
			if (!Array.isArray(r) || r.length < 12) return;
			const asin = r[8]; // I 列
			const price = parseFloat(r[11]) || parseFloat(r[12]) || 0; // L 或 M
			if (!asin || !price) return;
			const item = raw.find(x => x['C-ASIN'] === asin);
			if (item) {
				item['Remote fulfilment'] = 'enabled';
				item['RF GMS'] += price;
				if (item['RF GMS'] > 100) item['RF high sales'] = 1;
			}
		});
	}

	// 4) 激励（eligibleASINs CSV）— 以 P-ASIN 对应金额
	if (parsed.incentive_eu) {
		parsed.incentive_eu.forEach(row => {
			const pasin = row['资格值'];
			if (!pasin) return;
			const amount = extractNumber(row['可获得的福利代金券（最高）']);
			if (!amount) return;
			raw.forEach(item => { if (item['P-ASIN'] === pasin) item['UK>EU incentive amount'] = amount; });
		});
	}
	if (parsed.incentive_uk) {
		parsed.incentive_uk.forEach(row => {
			const pasin = row['资格值'];
			if (!pasin) return;
			const amount = extractNumber(row['可获得的福利代金券（最高）']);
			if (!amount) return;
			raw.forEach(item => { if (item['P-ASIN'] === pasin) item['EU>UK incentive amount'] = amount; });
		});
	}

	// 5) 推荐（销售预测）：C 列 ASIN（索引2），G 列预测（索引6）
	const recMap = { rec_uk_de: '德国', rec_uk_fr: '法国', rec_uk_it: '意大利', rec_uk_es: '西班牙', rec_de_uk: '英国' };
	Object.entries(recMap).forEach(([role, market]) => {
		const wb = parsed[role];
		if (!wb) return;
		const sheetName = wb.SheetNames.find(n => /recommend/i.test(n)) || wb.SheetNames[0];
		let rows = sheetToJson(wb, sheetName, { header: 1 });
		if (!rows || !rows.length) return;
		// 尝试自动对齐表头（若前两行是标题则跳过）
		let startIdx = 2;
		for (let i = 0; i < Math.min(10, rows.length); i++) {
			if (rows[i] && rows[i].some(v => /ASIN/i.test(String(v || '')))) { startIdx = i + 1; break; }
		}
		rows.slice(startIdx).forEach(r => {
			if (!Array.isArray(r) || r.length < 7) return;
			const asin = r[2];
			let potentialStr = r[6];
			let forecast = 0;
			if (typeof potentialStr === 'string') {
				forecast = parseFloat(potentialStr.replace(/[€£$\s,]/g, '')) || 0;
			} else { forecast = parseFloat(potentialStr) || 0; }
			if (!asin || !forecast) return;
			const item = raw.find(x => x['C-ASIN'] === asin);
			if (item) {
				item[`${market} sales forecast`] = (item[`${market} sales forecast`] || 0) + forecast;
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
	let parsed = await parseInputs(inputFiles);

	// 若缺失必要输入，尝试用样例补全（不覆盖已有）
	const supplement = await supplementParsedFromAssets(parsed);
	parsed = supplement.parsed;
	const raw = buildRawData(parsed);
	const stats = computeStats(raw);
	const report = buildReport(raw, stats);
	report.meta = report.meta || {};
	if (supplement.supplemented?.length) {
		report.meta.supplemented = Object.assign({}, ...(supplement.supplemented.map(r => ({ [r]: true }))));
	}
	if (supplement.warnings?.length){
		report.meta.warnings = (report.meta.warnings||[]).concat(supplement.warnings);
	}
	return report;
}

// ----------------------------- Auto Detection Public API ----------------------------- //
/**
 * 自动识别版本: 接受无序文件 (Array | Object values)，对每个文件尝试
 *  1. 文件名正则 (与旧逻辑兼容)
 *  2. 内容列头 / Sheet 名启发式 detectRoleByContent
 * 若重复命中同一角色，仅保留第一个，其余加入 warnings。
 * @param {Array|Object} inputs
 */
export async function analyzeDIOpportunitiesAuto(inputs){
	const files = Array.isArray(inputs)? inputs : Object.values(inputs||{});

	if(!files.length) throw new Error('未提供任何文件');
	const roleMap = { asin_list:null, sku_report:null, cost_saving:null, incentive_eu:null,incentive_uk:null,rec_uk_de:null,rec_uk_fr:null,rec_uk_it:null,rec_uk_es:null,rec_de_uk:null,rf_status:null,rf_order:null };
	const warnings=[];

	// First pass: filename regex
	for(const f of files){
		const role = detectRole(f.name||'');
		if(role){ if(!roleMap[role]) roleMap[role]=f; else warnings.push(`重复文件角色(文件名匹配) ${role}, 已忽略 ${f.name}`);}    
	}

	// Second pass: content detection for unresolved roles
	const unresolved = files.filter(f=> !Object.values(roleMap).includes(f));
	for(const f of unresolved){
		try {
			const buf = await fetchArrayBuffer(f);
			let workbookOrRows = null;
			const name = f.name || '';
			if (/\.csv$/i.test(name)) {
				// parse quick csv to rows (reuse parseCSV)
				workbookOrRows = parseCSV(buf);
			} else {
				workbookOrRows = XLSX.read(buf, { type:'array' });
			}
			const detected = detectRoleByContent(workbookOrRows);
			if(detected){
				if(!roleMap[detected]) roleMap[detected]=f; else warnings.push(`重复文件角色(内容检测) ${detected}, 已忽略 ${name}`);
			} else {
				warnings.push(`无法识别文件角色: ${name}`);
			}
		} catch(e){
			warnings.push(`读取失败: ${(f.name||'unknown')} -> ${e.message}`);
		}
	}

	let report = await analyzeDIOpportunities(roleMap);
	report.meta = report.meta || {}; 
	report.meta.detection = Object.fromEntries(Object.entries(roleMap).map(([k,v])=>[k, !!v]));

	// report = updateDataTable(report)


	// 找出 eligibleASINs 表
	const matchingFiles = inputs.filter(file => 
		(file.name||'').toLowerCase().includes('eligibleasins')
		);
	if (matchingFiles.length > 0) {
		report.hasEligibleASINs = true;
	} else {
		report.hasEligibleASINs = false;
	}

	// 找出 Fulfillment 表
	const matchingFiles2 = inputs.filter(file => 
		(file.name||'').toLowerCase().includes('fulfillment')
		);
	if (matchingFiles2.length > 0) {
		report.hasFulfillment = true;
	} else {
		report.hasFulfillment = false;
	}

	if(warnings.length) report.meta.warnings = warnings;
	return report;
}



function updateDataTable(report) {
	const rows = report.data_table.rows;
  
	// 判断是否所有数量都为0
	const allZero = rows.every(r => r["数量"] === 0);
  
	if (!allZero) return report; // 不需要改
  
	// 工具函数：生成随机整数
	const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
	// 工具函数：生成带欧元/英镑符号的金额
	const randMoney = (min, max, symbol = "€") => {
	  return symbol + randInt(min, max).toLocaleString();
	};
  
	// 按规则更新
	rows.forEach(row => {
	  switch (row["#"]) {
		case 1:
		  row["数量"] = randInt(100, 300);
		  row["来源商城销售额(T30D)"] = randMoney(100000, 150000, "€");
		  break;
		case 2:
		  row["数量"] = randInt(30, 60);
		  row["来源商城销售额(T30D)"] = randMoney(10000, 50000, "€");
		  row["机会点及操作"] = `本地入库至欧盟,预计销售额€${randInt(200000, 250000).toLocaleString()}`;
		  break;
		case 4:
		  row["数量"] = randInt(100, 300);
		  row["来源商城销售额(T30D)"] = randMoney(100000, 150000, "€");
		  row["机会点及操作"] = "开启英国至欧盟的远程配送";
		  break;
		case 7:
		  row["数量"] = randInt(100, 300);
		  row["来源商城销售额(T30D)"] = randMoney(150000, 200000, "€");
		  break;
		case 8:
		  row["数量"] = randInt(30, 60);
		  row["来源商城销售额(T30D)"] = randMoney(10000, 50000, "€");
		  row["机会点及操作"] = `本地入库至英国,预计销售额£${randInt(30000, 60000).toLocaleString()}`;
		  break;
		case 10:
		  row["数量"] = randInt(100, 300);
		  row["来源商城销售额(T30D)"] = randMoney(150000, 200000, "€");
		  row["机会点及操作"] = "开启欧盟至英国的远程配送";
		  break;
		default:
		  // 其他保持原始
		  break;
	  }
	});
  
	return report;
  }




// 删除随机兜底逻辑（严格遵循优化版的真实数据计算）





export default { analyzeDIOpportunities, analyzeDIOpportunitiesAuto };

