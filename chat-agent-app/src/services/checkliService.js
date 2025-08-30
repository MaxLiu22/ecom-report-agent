/**
 * 重写版：专注于提取 9 个指定指标与 4 个国家列（德国/意大利/法国/西班牙）。
 * 只输出：
 * 1) table_json: [{ 指标, 德国, 意大利, 法国, 西班牙 }, ...]
 * 2) matrix: { headers: ['指标','德国','意大利','法国','西班牙'], rows: [[指标, 德国, 意大利, 法国, 西班牙], ...] }
 *
 * 兼容保留字段：parsed_metrics / parsed_matrix (沿用之前前端引用)；如果前端已改可忽略其它字段。
 */
import * as XLSX from 'xlsx';

// 固定指标顺序（行名称保持不变）
const METRICS = [
  '账户健康情况',
  'FBA选品数量',
  'FBA潜在销售机会 (数量)*',
  'FBA BA /3P BA %',
  'FBA GMS/total GMS %',
  '持有有效增值税号国家',
  '授权仓储国家',
  '是否启用亚马逊物流欧洲整合服务(PanEU)',
  '是否使用英国和欧盟之间的远程配送服务'
];

// 国家列：允许多种别名匹配（英/缩写），输出统一中文列名
const COUNTRY_ALIASES = {
  '德国': ['德国','DE','Germany','德國'],
  '意大利': ['意大利','IT','Italy','義大利'],
  '法国': ['法国','FR','France','法國'],
  '西班牙': ['西班牙','ES','Spain','España','西班牙(Spain)']
};
const COUNTRIES = Object.keys(COUNTRY_ALIASES);

function normalizeCell(v){
  if(v==null) return '';
  return String(v).trim().replace(/\s+/g,'');
}

function matchCountryName(cell){
  const n = normalizeCell(cell).toLowerCase();
  for(const std of COUNTRIES){
    for(const alias of COUNTRY_ALIASES[std]){
      if(n === normalizeCell(alias).toLowerCase()) return std; // 精确
    }
  }
  return null;
}

async function loadWorkbook(file){
  const buf = await file.arrayBuffer();
  return XLSX.read(buf, { type:'array' });
}

// 将 sheet -> 2D 数组 (保留空值)
function sheetTo2D(sheet){
  return XLSX.utils.sheet_to_json(sheet, { header:1, raw:true, defval:null });
}

// 在 2D 表中定位包含至少 3 个国家列的表头行，并建立列索引
function locateHeader(matrix){
  for(let r=0; r<matrix.length; r++){
    const rawRow = matrix[r];
    if(!rawRow) continue;
    const countryColIndex = {};
    rawRow.forEach((cell, idx)=>{
      const mapped = matchCountryName(cell);
      if(mapped && countryColIndex[mapped] == null){
        countryColIndex[mapped] = idx;
      }
    });
    const hitCount = Object.keys(countryColIndex).length;
    if(hitCount >= 3){
      return { headerRowIndex: r, headerValues: rawRow, countryColIndex };
    }
  }
  return null;
}

function extractTableFromSheet(ws2d){
  const headerInfo = locateHeader(ws2d);
  if(!headerInfo) return null;
  const { headerRowIndex, headerValues, countryColIndex } = headerInfo;

  // 选择指标列：优先动态检测
  // 思路：向下看 1~8 行，找出包含任何 METRICS 字符串的列出现次数最多者
  const candidateCount = new Map();
  const lookahead = Math.min(ws2d.length, headerRowIndex + 12);
  for(let r=headerRowIndex+1; r<lookahead; r++){
    const row = ws2d[r]; if(!row) continue;
    row.forEach((cell, cIdx)=>{
      if(cell && METRICS.includes(String(cell).trim())){
        candidateCount.set(cIdx, (candidateCount.get(cIdx)||0)+1);
      }
    });
  }
  let metricCol;
  if(candidateCount.size){
    metricCol = [...candidateCount.entries()].sort((a,b)=> b[1]-a[1])[0][0];
  } else {
    // 回退：原逻辑
    metricCol = 0;
    const headerCell0 = headerValues[0];
    if(!headerCell0 || matchCountryName(headerCell0)){
      const alt = headerValues.findIndex(v=> v && !matchCountryName(v));
      if(alt !== -1) metricCol = alt;
    }
  }

  const encountered = new Set();
  const foundRecords = {};// metric -> record
  for(let r = headerRowIndex + 1; r < ws2d.length; r++){
    const row = ws2d[r];
    if(!row) continue;
    const metricRaw = row[metricCol];
    if(metricRaw == null || String(metricRaw).trim()==='') continue;
    const metric = String(metricRaw).trim();
    if(!METRICS.includes(metric)) continue;
    if(foundRecords[metric]) continue; // 保留首个出现
    const record = { 指标: metric };
    COUNTRIES.forEach(c=>{
      const colIdx = countryColIndex[c];
      record[c] = colIdx != null ? row[colIdx] : null;
    });
    foundRecords[metric] = record;
    if(Object.keys(foundRecords).length === METRICS.length) break;
  }
  // 允许部分指标缺失：构造顺序输出
  const table = METRICS.filter(m=> foundRecords[m]).map(m=> foundRecords[m]);
  if(!table.length) return null;
  return table;
}

function buildOutputs(table){
  const matrix = {
    headers: ['指标', ...COUNTRIES],
    rows: table.map(r=> [r.指标, ...COUNTRIES.map(c=> r[c])])
  };
  // 兼容字段: parsed_metrics (转成 {metric, values}) & parsed_matrix
  const parsed_metrics = table.map(r=> ({ metric: r.指标, values: Object.fromEntries(COUNTRIES.map(c=> [c, r[c]])) }));
  const parsed_matrix = matrix; // 同引用即可
  return { table_json: table, matrix, parsed_metrics, parsed_matrix };
}

export async function analyzeEUExpansionChecklist(files){
  if(!files || !files.length) throw new Error('未提供文件');
  const matcher = /^EU_expansion_checkli/i;
  const matches = files.filter(f=> matcher.test(f.name||''));
  if(!matches.length) throw new Error('未找到以 EU_expansion_checkli 开头的文件');
  const warnings = [];
  if(matches.length>1) warnings.push('检测到多个匹配文件, 仅解析第一个: '+matches.map(f=> f.name).join(', '));
  const target = matches[0];
  const wb = await loadWorkbook(target);

  // 兼容：输出所有 sheet 的原始 JSON（对象形式）
  const sheets = {};
  for(const name of wb.SheetNames){
    sheets[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: null });
  }

  // 遍历 sheet, 选第一个能解析出完整/部分指标的
  let table=null, usedSheet=null;
  for(const name of wb.SheetNames){
    const ws2d = sheetTo2D(wb.Sheets[name]);
    const t = extractTableFromSheet(ws2d);
    if(t){ table = t; usedSheet = name; break; }
  }
  if(!table){
    throw new Error('未能在任何 sheet 中解析到指标表 (未识别到包含国家列的表头或指标行)');
  }

  const { table_json, matrix, parsed_metrics, parsed_matrix } = buildOutputs(table);

  return {
    file_name: target.name,
    sheet_used: usedSheet,
    sheet_names: wb.SheetNames,
    sheets, // 兼容前端展开查看
    table_json, // 用户需求的表格 JSON
    matrix,     // 用户需求的矩阵结构
    // 兼容旧字段
    parsed_metrics,
    parsed_matrix,
    warnings
  };
}

export async function analyzeSingleEUChecklist(file){
  return analyzeEUExpansionChecklist([file]);
}

