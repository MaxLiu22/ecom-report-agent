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

// 国家列：加入英国（动态可选），允许多种别名匹配（英/缩写）
const COUNTRY_ALIASES = {
  '德国': ['德国','DE','Germany','德國'],
  '意大利': ['意大利','IT','Italy','義大利'],
  '法国': ['法国','FR','France','法國'],
  '西班牙': ['西班牙','ES','Spain','España','西班牙(Spain)'],
  '英国': ['英国','UK','UnitedKingdom','United Kingdom','GB','GreatBritain','Great Britain','UK(英国)']
};
const BASE_COUNTRIES = Object.keys(COUNTRY_ALIASES); // ['德国','意大利','法国','西班牙','英国']

function normalizeCell(v){
  if(v==null) return '';
  return String(v).trim().replace(/\s+/g,'');
}
function matchCountryName(cell){
  const n = normalizeCell(cell).toLowerCase();
  for(const std of BASE_COUNTRIES){
    for(const alias of COUNTRY_ALIASES[std]){
      if(n === normalizeCell(alias).toLowerCase()) return std; // 精确
    }
  }
  return null;
}

// -------- CSV 读取：自动识别分隔符（, 或 \t）--------
async function loadCSVto2D(file){
  const buf = await file.arrayBuffer();
  const text = new TextDecoder('utf-8').decode(buf);
  // 统计分隔符
  const firstLine = text.split(/\r?\n/)[0] || '';
  const commaCnt = (firstLine.match(/,/g) || []).length;
  const tabCnt   = (firstLine.match(/\t/g) || []).length;
  const FS = tabCnt > commaCnt ? '\t' : ','; // 你的样例会选 '\t'

  const wb = XLSX.read(text, { type:'string', FS });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const ws2d = XLSX.utils.sheet_to_json(ws, { header:1, raw:true, defval:null });
  return { ws2d, sheetName, wb, ws };
}

// ------------ 横表（表头含国家列）识别 ------------
function locateHeaderWide(matrix){
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

// ------------ 纵表（有一列是“国家”）识别 ------------
function locateHeaderLong(matrix){
  const maxScan = Math.min(matrix.length, 25);
  let best = null;

  for(let r=0; r<maxScan; r++){
    const row = matrix[r];
    if(!row) continue;

    // 收集指标列
    const metricColIndex = {};
    let metricHitCount = 0;
    for(const m of METRICS){
      const idx = row.findIndex(c => c != null && String(c).trim() === m);
      if(idx !== -1){
        metricColIndex[m] = idx;
        metricHitCount++;
      }
    }

    // 评估每一列作为“国家列”的可能性：看下面若干行中命中国家别名的数量/去重数
    let bestCountry = null;
    for(let c=0; c<row.length; c++){
      let hits = 0;
      const uniq = new Set();
      for(let rr=r+1; rr<Math.min(r+1+40, matrix.length); rr++){
        const v = matrix[rr] ? matrix[rr][c] : null;
        const mapped = matchCountryName(v);
        if(mapped){
          hits++;
          uniq.add(mapped);
        }
      }
      const score = { col:c, hits, uniqCount: uniq.size, uniqSet: uniq };
      if(!bestCountry || score.uniqCount > bestCountry.uniqCount || 
         (score.uniqCount === bestCountry.uniqCount && score.hits > bestCountry.hits)){
        bestCountry = score;
      }
    }

    // 纵表判定：至少命中 3 个指标列 + 国家列能识别出 >=3 个不同国家
    if(metricHitCount >= 3 && bestCountry && bestCountry.uniqCount >= 3){
      best = {
        headerRowIndex: r,
        headerValues: row,
        metricColIndex,
        countryColIndex: bestCountry.col,
      };
      break;
    }
  }

  return best;
}

// ------------ 从横表提取 ------------
function extractFromWide(ws2d){
  const headerInfo = locateHeaderWide(ws2d);
  if(!headerInfo) return null;
  const { headerRowIndex, headerValues, countryColIndex } = headerInfo;

  // 找指标列：向下扫描，统计哪个列出现最多的指标名
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
    // 回退：第一列若是国家名，则找一个不是国家名的列作为指标列
    metricCol = 0;
    const headerCell0 = headerValues[0];
    if(!headerCell0 || matchCountryName(headerCell0)){
      const alt = headerValues.findIndex(v=> v && !matchCountryName(v));
      if(alt !== -1) metricCol = alt;
    }
  }

  const foundRecords = {};
  for(let r = headerRowIndex + 1; r < ws2d.length; r++){
    const row = ws2d[r];
    if(!row) continue;
    const metricRaw = row[metricCol];
    if(metricRaw == null || String(metricRaw).trim()==='') continue;
    const metric = String(metricRaw).trim();
    if(!METRICS.includes(metric)) continue;
    if(foundRecords[metric]) continue; // 保留首个出现
    const record = { 指标: metric };
    BASE_COUNTRIES.forEach(c=>{
      const colIdx = countryColIndex[c];
      record[c] = colIdx != null ? row[colIdx] : null;
    });
    foundRecords[metric] = record;
    if(Object.keys(foundRecords).length === METRICS.length) break;
  }
  const table = METRICS.filter(m=> foundRecords[m]).map(m=> foundRecords[m]);
  if(!table.length) return null;

  const dynamicCountries = Object.keys(headerInfo.countryColIndex).filter(c=> BASE_COUNTRIES.includes(c));
  return { table, countries: dynamicCountries, mode: 'wide' };
}

// ------------ 从纵表提取（国家在一列，如 marketplace_name2） ------------
function extractFromLong(ws2d){
  const headerInfo = locateHeaderLong(ws2d);
  if(!headerInfo) return null;
  const { headerRowIndex, metricColIndex, countryColIndex } = headerInfo;

  // 实际出现的国家（按 base 顺序过滤）
  const presentSet = new Set();
  for(let r=headerRowIndex+1; r<ws2d.length; r++){
    const row = ws2d[r];
    if(!row) continue;
    const ctry = matchCountryName(row[countryColIndex]);
    if(ctry) presentSet.add(ctry);
  }
  const countries = BASE_COUNTRIES.filter(c => presentSet.has(c));
  if(countries.length < 3) return null; // 至少要有 3 个国家

  // 构造记录：每个指标作为一行，列为各国家
  const foundRecords = {};
  for(const m of METRICS){
    if(metricColIndex[m] != null){
      foundRecords[m] = { 指标: m };
    }
  }

  for(let r=headerRowIndex+1; r<ws2d.length; r++){
    const row = ws2d[r];
    if(!row) continue;
    const ctry = matchCountryName(row[countryColIndex]);
    if(!ctry || !presentSet.has(ctry)) continue;

    for(const m of METRICS){
      const cIdx = metricColIndex[m];
      if(cIdx == null) continue;
      if(!foundRecords[m]) foundRecords[m] = { 指标: m };
      foundRecords[m][ctry] = row[cIdx];
    }
  }

  const table = METRICS
    .filter(m => foundRecords[m] && countries.some(c => foundRecords[m][c] != null))
    .map(m => foundRecords[m]);

  if(!table.length) return null;
  return { table, countries, mode: 'long' };
}

// ------------ 统一提取入口：先横表，失败再纵表 ------------
function extractTableFromCSV(ws2d){
  const wide = extractFromWide(ws2d);
  if(wide) return wide;
  const long = extractFromLong(ws2d);
  if(long) return long;
  return null;
}

// ------------ 输出构建（保持与 XLSX 版一致） ------------
function buildOutputs(table, countries){
  const matrix = {
    headers: ['指标', ...countries],
    rows: table.map(r=> [r.指标, ...countries.map(c=> r[c])])
  };
  const parsed_metrics = table.map(r=> ({ metric: r.指标, values: Object.fromEntries(countries.map(c=> [c, r[c]])) }));
  const parsed_matrix = matrix;
  const trimmedTable = table.map(r=> {
    const o = { 指标: r.指标 };
    countries.forEach(c=> o[c] = r[c]);
    return o;
  });
  return { table_json: trimmedTable, matrix, parsed_metrics, parsed_matrix, countries };
}

// ------------ 主函数（CSV） ------------
export async function analyzeEUExpansionChecklistCSV(files){
  if(!files || !files.length) throw new Error('未提供文件');
  const matcher = /^EU_expansion_checkli/i;
  const matches = files.filter(f=> matcher.test((f.name||'')));
  if(!matches.length) throw new Error('未找到以 EU_expansion_checkli 开头的 CSV 文件');
  const warnings = [];
  if(matches.length>1) warnings.push('检测到多个匹配文件, 仅解析第一个: '+matches.map(f=> f.name).join(', '));
  const target = matches[0];

  const { ws2d, sheetName, wb, ws } = await loadCSVto2D(target);
  const extracted = extractTableFromCSV(ws2d);
  if(!extracted){
    throw new Error('未能在 CSV 中解析到指标表（未识别到包含国家列或指标列；或国家仅出现少于 3 个）');
  }

  const { table: tableRaw, countries } = extracted;
  const { table_json, matrix, parsed_metrics, parsed_matrix } = buildOutputs(tableRaw, countries);

  return {
    file_name: target.name,
    sheet_used: sheetName || 'CSV',
    sheet_names: [sheetName || 'CSV'],
    sheets: { [sheetName || 'CSV']: XLSX.utils.sheet_to_json(ws, { defval:null }) }, // 兼容前端展开查看
    table_json, // 用户需求的表格 JSON
    matrix,     // 用户需求的矩阵结构
    countries_used: countries,
    // 兼容旧字段
    parsed_metrics,
    parsed_matrix,
    warnings
  };
}

export async function analyzeSingleEUChecklistCSV(file){
  return analyzeEUExpansionChecklistCSV([file]);
}
