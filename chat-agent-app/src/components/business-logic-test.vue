<template>
  <div class="bl-test">
    <header class="top-header">
      <h1 class="page-title">跨境拓展智能分析</h1>
      <p class="subline">PanEU 选品覆盖 & DI 英国⇄欧盟 双向拓展 · 多文件自动识别 · 一键洞察</p>
    </header>

    <div class="panel-grid">
    <!-- EU Expansion Checklist Panel -->
    <section class="panel">
      <header class="panel__header">
        <h2>EU Expansion Checklist</h2>
        <small>上传文件名以 EU_expansion_checkli 开头的 Excel / CSV 文件</small>
      </header>
      <div class="panel__body">
        <div class="uploader">
          <input type="file" accept=".xlsx,.xls,.csv" @change="onChecklistChange" />
          <div class="selected-summary" v-if="checklistFile">
            已选文件: {{ checklistFile.name }}
          </div>
          <div class="actions-row">
            <button class="btn" :disabled="checklistLoading || !checklistFile" @click="analyzeChecklist">{{ checklistLoading? '解析中...' : '解析 Checklist' }}</button>
            <button class="btn btn-secondary" :disabled="checklistLoading || !checklistFile" @click="resetChecklist">重置</button>
          </div>
          <div class="error" v-if="checklistError">{{ checklistError }}</div>
        </div>

        <div v-if="checklistResult" class="result-block">
          <h3>解析结果: {{ checklistResult.file_name }}</h3>
          <p class="sub">包含 {{ checklistResult.sheet_names.length }} 个 sheet</p>
          <!-- Matrix 显示（优先使用新版 matrix 字段，回退 parsed_matrix） -->
          <div v-if="checklistMatrix" class="sub-block table-wrapper" style="margin-top:.4rem;">
            <h4>指标矩阵 (matrix)</h4>
            <table class="table compact">
              <thead>
                <tr>
                  <th v-for="h in checklistMatrix.headers" :key="h">{{ h }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in checklistMatrix.rows" :key="row[0]">
                  <td v-for="(cell,i) in row" :key="i">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- table_json 行对象数组展示 -->
          <div v-if="checklistTableJson && checklistTableJson.length" class="sub-block table-wrapper" style="margin-top:.6rem;">
            <h4>表格 JSON (table_json)</h4>
            <table class="table compact">
              <thead>
                <tr>
                  <th style="min-width:140px;">指标</th>
                  <th v-for="c in checklistDynamicCountries" :key="c">{{ c }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in checklistTableJson" :key="r.指标">
                  <td style="font-weight:600; white-space:nowrap;">{{ r.指标 }}</td>
                  <td v-for="c in checklistDynamicCountries" :key="c">{{ r[c] ?? '' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 保留旧结构化指标（parsed_metrics）作为兼容 -->
          <div v-if="checklistResult.parsed_metrics && checklistResult.parsed_metrics.length" class="sub-block table-wrapper" style="margin-top:.6rem;">
            <h4>结构化指标 (兼容 parsed_metrics)</h4>
            <table class="table compact">
              <thead>
                <tr>
                  <th style="min-width:140px;">指标</th>
                  <th v-for="c in checklistDynamicCountries" :key="c">{{ c }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="m in checklistResult.parsed_metrics" :key="m.metric">
                  <td style="font-weight:600; white-space:nowrap;">{{ m.metric }}</td>
                  <td v-for="c in checklistDynamicCountries" :key="c">{{ m.values[c] ?? '' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="sub-block collapse">
            <div class="collapse__header" @click="toggleChecklistSection('__sheet_list__')">
              <span class="arrow" :class="{open: isChecklistOpen('__sheet_list__')}"></span>
              <strong>Sheet 列表</strong>
            </div>
            <div class="collapse__body" v-show="isChecklistOpen('__sheet_list__')">
              <div class="chip-wrap" style="margin-top:.5rem;">
                <span class="chip" v-for="s in checklistResult.sheet_names" :key="s">{{ s }}</span>
              </div>
            </div>
          </div>

          <div class="sub-block collapse">
            <div class="collapse__header" @click="toggleChecklistSection('__all_json__')">
              <span class="arrow" :class="{open: isChecklistOpen('__all_json__')}"></span>
              <strong>table_json JSON 预览</strong>
              <span class="json-actions" v-if="isChecklistOpen('__all_json__')" @click.stop>
                          <button class="mini-btn" @click="copyChecklistJSON">复制</button>
                          <button class="mini-btn" @click="selectAllJSON('overview')">全选</button>
                          <button class="mini-btn" @click="downloadChecklistJSON">下载</button>
                          <button class="mini-btn" @click="openChecklistFull">全屏</button>
              </span>
            </div>
            <div class="collapse__body" v-show="isChecklistOpen('__all_json__')">
              <pre ref="jsonOverviewEl" class="json-pre selectable" @click="selectAllJSON('overview')">{{ formattedChecklistJSON }}</pre>
                        <p class="hint-line">点击或使用“全选”按钮后 Ctrl/⌘+C，或直接点“复制”。{{ copyStatus }}</p>
            </div>
          </div>

          <!-- 全屏 JSON Modal (已迁移为 Teleport 到 body，避免被父级 overflow/pointer 影响) -->

          <div class="sub-block collapse" v-for="s in checklistResult.sheet_names" :key="s">
            <div class="collapse__header" @click="toggleChecklistSection(s)">
              <span class="arrow" :class="{open: isChecklistOpen(s)}"></span>
              <strong>{{ s }}</strong>
              <span style="margin-left:auto; font-size:.55rem; color:#475569;">{{ checklistResult.sheets[s].length }} 行</span>
            </div>
            <div class="collapse__body" v-show="isChecklistOpen(s)">
              <pre style="max-height:260px; overflow:auto; font-size:.55rem; background:#0f172a; color:#f8fafc; padding:.6rem .7rem; border-radius:10px;">{{ formatJSON(checklistResult.sheets[s]) }}</pre>
            </div>
          </div>
          <div v-if="checklistResult.warnings.length" class="warnings">
            <p>警告:</p>
            <ul>
              <li v-for="(w,i) in checklistResult.warnings" :key="i">{{ w }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="panel">
      <header class="panel__header">
  <h2>PanEU 分析</h2>
  <small>自动识别 (Excel / CSV 任意顺序) · 列头语义解析</small>
      </header>
      <div class="panel__body">
        <div class="uploader">
          <label class="mode-toggle"><input type="checkbox" v-model="panEUAutoMode" /> 自动识别模式（推荐）</label>
          <input type="file" multiple accept=".xlsx,.xls,.csv" @change="onPanEUMultiChange" />
          <div class="tips" v-if="panEUAutoMode">
            <p>自动模式：直接把 2~6 个相关文件全部选中上传即可，系统基于列头判断：</p>
            <ul>
              <li>包含多个 * offer status 列 → PanEU Report</li>
              <li>含 亚马逊商城 + 物流配送费用 列 → SKU Report</li>
              <li>含 quantity-for-local-fulfillment → Inventory Report (可选)</li>
              <li>仅有 ASIN 简单列 → ASIN List (可选)</li>
            </ul>
          </div>
          <div class="tips" v-else>
            <p>手动模式：仍按文件名关键字归类（paneu / sku / inv / asin）。</p>
          </div>
          <div class="selected-summary" v-if="panEURawFiles.length">
            <strong>已选择 {{ panEURawFiles.length }} 个文件:</strong>
            <ul>
              <li v-for="f in panEURawFiles" :key="f.name">{{ f.name }}</li>
            </ul>
          </div>
          <button class="btn" :disabled="panEULoading || !panEUAnalyzeEnabled" @click="analyzePanEU">{{ panEULoading? '分析中...' : '分析 PanEU' }}</button>
          <button class="btn btn-secondary" :disabled="panEULoading || !panEURawFiles.length" @click="resetPanEU">重置</button>
          <div class="error" v-if="panEUError">{{ panEUError }}</div>
        </div>

        <div v-if="panEUReport" class="result-block">
          <h3>{{ panEUReport.report_title }}</h3>
          <p class="sub">{{ panEUReport.report_subtitle }}</p>
          <section class="sub-block table-wrapper">
            <h4>PanEU ASIN 机会概览</h4>
            <table class="table compact">
              <thead>
                <tr>
                  <th v-for="h in panEUReport.excel_data.headers" :key="h">{{ h }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in panEUReport.excel_data.rows" :key="row.metric">
                  <td>{{ row.metric }}</td>
                  <td><strong class="highlight-count">{{ row.count }}</strong></td>
                  <td class="pre">{{ row.description }}</td>
                  <td class="savings-cell">{{ row.formula }}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <details class="meta">
            <summary>Excel 公式映射</summary>
            <div class="formula-grid">
              <div v-for="(formula, key) in panEUReport.meta.excel_formulas" :key="key" class="formula-item">
                <strong>{{ key }}:</strong> <code>{{ formula }}</code>
              </div>
            </div>
            <p class="meta-line">计算结果: H2={{ panEUReport.meta.excel_pivot_metrics.H2 }}, H3={{ panEUReport.meta.excel_pivot_metrics.H3 }}, H4={{ panEUReport.meta.excel_pivot_metrics.H4 }}, H5={{ panEUReport.meta.excel_pivot_metrics.H5 }}, H6={{ panEUReport.meta.excel_pivot_metrics.H6 }}</p>
            <div v-if="panEUReport.meta?.detection" class="detect-grid">
              <span v-for="(v,k) in panEUReport.meta.detection" :key="k">{{ k }}: <strong :class="{ok:v, miss:!v}">{{ v? '✔' : '✘' }}</strong></span>
            </div>
            <div v-if="panEUReport.meta?.warnings?.length" class="warnings">
              <p>警告:</p>
              <ul>
                <li v-for="(w,i) in panEUReport.meta.warnings" :key="i">{{ w }}</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section class="panel">
      <header class="panel__header">
  <h2>DI 英国 ⇄ 欧盟 分析</h2>
  <small>10 角色文件智能识别 · 仅需提供 Cost Saving Model 即可开始</small>
      </header>
      <div class="panel__body">
        <div class="uploader">
          <label class="mode-toggle"><input type="checkbox" v-model="diAutoMode" /> 自动识别模式（推荐）</label>
          <input type="file" multiple accept=".xlsx,.xls,.csv" @change="onDIMultiChange" />
          <div class="tips" v-if="diAutoMode">
            <p>自动模式：直接选择 2~10 个相关文件，系统读取列头 / sheet 名识别 10 类角色。</p>
            <div class="chip-wrap">
              <span class="chip" v-for="r in diRoles" :key="r">{{ r }}</span>
            </div>
          </div>
          <div class="tips" v-else>
            <p>手动模式：依赖文件名关键字 (cost_saving / incentive / recommendations / remote fulfillment)。</p>
          </div>
          <div class="selected-summary" v-if="diRawFiles.length">
            <strong>已选择 {{ diRawFiles.length }} 个文件:</strong>
            <ul>
              <li v-for="f in diRawFiles" :key="f.name">{{ f.name }}</li>
            </ul>
          </div>
          <div class="actions-row">
            <button class="btn" :disabled="diLoading || !diAnalyzeEnabled" @click="analyzeDI">{{ diLoading? '分析中...' : '分析 DI' }}</button>
            <button class="btn btn-secondary" :disabled="diLoading || !diRawFiles.length" @click="resetDI">重置</button>
          </div>
          <div class="error" v-if="diError">{{ diError }}</div>
        </div>

        <div v-if="diReport" class="result-block">
          <h3>{{ diReport.report_title }}</h3>
          <div class="summary-chips">
            <span class="chip info" v-for="p in diReport.key_opportunity_analysis.points" :key="p.title">{{ p.title }}</span>
          </div>
          <section class="sub-block">
            <h4>{{ diReport.key_opportunity_analysis.title }}</h4>
            <p class="sub">{{ diReport.key_opportunity_analysis.subtitle }}</p>
            <ul class="points">
              <li v-for="p in diReport.key_opportunity_analysis.points" :key="p.title"><strong>{{ p.title }}:</strong> {{ p.description }}</li>
            </ul>
          </section>
          <section class="sub-block">
            <h4>{{ diReport.recommended_actions.title }}</h4>
            <ol class="recs">
              <li v-for="a in diReport.recommended_actions.actions" :key="a.priority"><span class="prio">P{{ a.priority }}</span> {{ a.recommendation }}</li>
            </ol>
          </section>
          <section class="sub-block table-wrapper">
            <h4>数据表</h4>
            <table class="table compact">
              <thead>
                <tr>
                  <th v-for="h in diReport.data_table.headers" :key="h">{{ h }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in diReport.data_table.rows" :key="r['#']">
                  <td>{{ r['#'] }}</td>
                  <td>{{ r['UK<>EU ASIN'] }}</td>
                  <td>{{ r['数量'] }}</td>
                  <td>{{ r['来源商城销售额(T30D)'] }}</td>
                  <td class="pre">{{ r['机会点及操作'] }}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <details class="meta">
            <summary>DI 假设 & 检测信息</summary>
            <pre>{{ diReport.meta.assumptions }}</pre>
            <p class="meta-line">ASIN 基数: {{ diReport.meta.asin_count }} | 生成: {{ new Date(diReport.meta.generated_at).toLocaleString() }}</p>
            <div v-if="diReport.meta?.detection" class="detect-grid">
              <span v-for="(v,k) in diReport.meta.detection" :key="k">{{ k }}: <strong :class="{ok:v, miss:!v}">{{ v? '✔':'✘' }}</strong></span>
            </div>
            <div v-if="diReport.meta?.warnings?.length" class="warnings">
              <p>警告:</p>
              <ul>
                <li v-for="(w,i) in diReport.meta.warnings" :key="i">{{ w }}</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </section>
    </div>
  </div>
  <!-- Teleport: 放到 body 保证最高层级可点击 -->
  <teleport to="body">
    <div v-if="showChecklistJSONFull" class="json-fullscreen" @click.self="closeFullJSON" aria-modal="true" role="dialog">
      <div class="json-fullscreen__toolbar">
        <span>Checklist table_json JSON</span>
        <div class="fill"></div>
        <button class="mini-btn" @click.stop="copyChecklistJSON">复制</button>
        <button class="mini-btn" @click.stop="selectAllJSON('full')">全选</button>
        <button class="mini-btn" @click.stop="downloadChecklistJSON">下载</button>
        <button class="mini-btn danger" @click.stop="closeFullJSON">关闭 (Esc)</button>
      </div>
      <div class="json-fullscreen__content" @click.stop>
        <pre ref="jsonFullscreenEl" class="json-pre fullscreen" tabindex="0" @click="selectAllJSON('full')">{{ formattedChecklistJSON }}</pre>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { analyzePanEUOpportunities, analyzePanEUOpportunitiesAuto } from '@/services/panEUService.js';
import { analyzeDIOpportunities, analyzeDIOpportunitiesAuto } from '@/services/DIService.js';
import { analyzeEUExpansionChecklist } from '@/services/checkliService.js';
import {analyzeSingleEUChecklist} from '@/services/checkliService.js';
import {analyzeSingleEUChecklistCSV} from '@/services/checkliServiceCsv.js';

// PanEU state (新版自动识别示例)
const panEURawFiles = ref([]);            // 用户原始选择的文件
const panEUAutoMode = ref(true);          // 是否使用自动识别
const panEULoading = ref(false);
const panEUError = ref('');
const panEUReport = ref(null);

// 兼容旧模式：基于文件名简单归类
function classifyManual(files){
  const map = { panEuReport:null, skuReport:null, inventoryReport:null, asinList:null };
  files.forEach(f=>{
    const n=f.name.toLowerCase();
    if(/paneu/.test(n) && !map.panEuReport) map.panEuReport=f;
    else if(/sku/.test(n) && !map.skuReport) map.skuReport=f;
    else if(/(inv|库存)/.test(n) && !map.inventoryReport) map.inventoryReport=f;
    else if(/(asin|list)/.test(n) && !map.asinList) map.asinList=f;
  });
  return map;
}

function onPanEUMultiChange(e){
  panEUError.value='';
  panEUReport.value=null;
  panEURawFiles.value = Array.from(e.target.files||[]);
}

const panEUAnalyzeEnabled = computed(()=> panEUAutoMode.value ? panEURawFiles.value.length >= 2 : (()=>{ const m=classifyManual(panEURawFiles.value); return !!(m.panEuReport && m.skuReport && m.inventoryReport && m.asinList); })());

function resetPanEU(){
  panEURawFiles.value=[]; panEUError.value=''; panEUReport.value=null;
}

async function analyzePanEU(){
  panEUError.value='';
  panEUReport.value=null;
  if(!panEUAnalyzeEnabled.value){ panEUError.value='文件不足或分类不完整'; return; }
  panEULoading.value=true;
  try {
    if(panEUAutoMode.value){

    const matchingFiles = panEURawFiles.value.filter(file => 
      file.name.toLowerCase().includes('eu_expansion_checkli'.toLowerCase())
    );
    const EUExpansionCheckliFile = matchingFiles[0]
    // 根据扩展名决定用哪个解析函数
    let analyzeResult;
    if (EUExpansionCheckliFile.name.toLowerCase().endsWith('.csv')) {
      analyzeResult = await analyzeSingleEUChecklistCSV(EUExpansionCheckliFile);
    } else {
      analyzeResult = await analyzeSingleEUChecklist(EUExpansionCheckliFile);
    }
    const EUExpansionCheckli = analyzeResult.table_json


      panEUReport.value = await analyzePanEUOpportunitiesAuto(panEURawFiles.value, EUExpansionCheckli);
    } else {
      const manual = classifyManual(panEURawFiles.value);
      panEUReport.value = await analyzePanEUOpportunities(manual);
    }
  } catch(err){
    console.error(err);
    panEUError.value = 'PanEU 分析失败: ' + (err.message||String(err));
  } finally { panEULoading.value=false; }
}

// DI state (auto detection similar to PanEU)
const diRawFiles = ref([]);
const diAutoMode = ref(true);
const diLoading = ref(false);
const diError = ref('');
const diReport = ref(null);
const diRoles = ['cost_saving','incentive_eu','incentive_uk','rec_uk_de','rec_uk_fr','rec_uk_it','rec_uk_es','rec_de_uk','rf_status','rf_order'];

// Manual classification via filename (fallback)
function classifyDIManual(files){
  const map = { cost_saving:null,incentive_eu:null,incentive_uk:null,rec_uk_de:null,rec_uk_fr:null,rec_uk_it:null,rec_uk_es:null,rec_de_uk:null,rf_status:null,rf_order:null };
  files.forEach(f=>{
    const n=f.name.toLowerCase();
    if(/cost.*saving.*model/.test(n) && !map.cost_saving) map.cost_saving=f;
    else if(/eligibleasins.*de.*fr.*it.*es.*credits.*gsinsp/.test(n) && !map.incentive_eu) map.incentive_eu=f;
    else if(/eligibleasins.*uk.*credits.*gsinsp/.test(n) && !map.incentive_uk) map.incentive_uk=f;
    else if(/recommendations.*united.*kingdom.*germany/.test(n) && !map.rec_uk_de) map.rec_uk_de=f;
    else if(/recommendations.*united.*kingdom.*france/.test(n) && !map.rec_uk_fr) map.rec_uk_fr=f;
    else if(/recommendations.*united.*kingdom.*italy/.test(n) && !map.rec_uk_it) map.rec_uk_it=f;
    else if(/recommendations.*united.*kingdom.*spain/.test(n) && !map.rec_uk_es) map.rec_uk_es=f;
    else if(/recommendations.*germany.*united.*kingdom/.test(n) && !map.rec_de_uk) map.rec_de_uk=f;
    else if(/remote.*fulfillment.*asin.*status.*report/.test(n) && !map.rf_status) map.rf_status=f;
    else if(/remote.*fulfillment.*order.*report/.test(n) && !map.rf_order) map.rf_order=f;
  });
  return map;
}

function onDIMultiChange(e){
  diError.value=''; diReport.value=null; diRawFiles.value = Array.from(e.target.files||[]);
}

const diAnalyzeEnabled = computed(()=> diAutoMode.value ? diRawFiles.value.length >= 1 : (()=>{ const m=classifyDIManual(diRawFiles.value); return !!m.cost_saving; })());

function resetDI(){ diRawFiles.value=[]; diError.value=''; diReport.value=null; }

async function analyzeDI(){
  diError.value=''; diReport.value=null;
  if(!diAnalyzeEnabled.value){ diError.value='缺少 cost saving model 或文件不足'; return; }
  diLoading.value=true;
  try {
    if(diAutoMode.value){
      diReport.value = await analyzeDIOpportunitiesAuto(diRawFiles.value);
    } else {
      const manual = classifyDIManual(diRawFiles.value);
      if(!manual.cost_saving){ throw new Error('缺少 cost saving model'); }
      diReport.value = await analyzeDIOpportunities(manual);
    }
  } catch(err){
    console.error(err);
    diError.value = 'DI 分析失败: ' + (err.message||String(err));
  } finally { diLoading.value=false; }
}

// Checklist state
const checklistFile = ref(null);
const checklistLoading = ref(false);
const checklistError = ref('');
const checklistResult = ref(null);
const checklistOpen = ref({});

// 新增：对新版字段做兼容聚合
const checklistMatrix = computed(()=> checklistResult.value?.matrix || checklistResult.value?.parsed_matrix || null);
const checklistTableJson = computed(()=> checklistResult.value?.table_json || []);
// 动态国家列（排除 '指标'）
const checklistDynamicCountries = computed(()=> {
  if(checklistMatrix.value?.headers){
    return checklistMatrix.value.headers.filter(h=> h !== '指标');
  }
    // 回退通过第一行对象 keys 推断
  if(checklistTableJson.value.length){
    return Object.keys(checklistTableJson.value[0]).filter(k=> k !== '指标');
  }
  return ['德国','意大利','法国','西班牙'];
});
// 仅展示 table_json 内容（用户需求）
const formattedChecklistJSON = computed(()=> checklistResult.value?.table_json ? formatJSON(checklistResult.value.table_json) : '');

// JSON 交互增强
const showChecklistJSONFull = ref(false);
const jsonOverviewEl = ref(null);
const jsonFullscreenEl = ref(null);
const copyStatus = ref('');

function updateCopyStatus(msg, ok=true){
  copyStatus.value = msg;
  setTimeout(()=>{ if(copyStatus.value===msg) copyStatus.value=''; }, 3000);
}

function copyChecklistJSON(){
  if(!formattedChecklistJSON.value) return;
  const text = formattedChecklistJSON.value;
  // 首选异步剪贴板
  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(text).then(()=>{
      updateCopyStatus('已复制');
    }).catch(()=> fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}
function fallbackCopy(text){
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position='fixed'; ta.style.opacity='0'; ta.style.top='-1000px';
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    updateCopyStatus(ok? '已复制(兼容模式)' : '复制失败', ok);
  } catch(e){
    console.warn('复制失败', e); updateCopyStatus('复制失败', false);
  }
}
function downloadChecklistJSON(){
  const blob = new Blob([formattedChecklistJSON.value], { type:'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = (checklistResult.value?.file_name || 'checklist') + '.json';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}
function openChecklistFull(){ showChecklistJSONFull.value = true; setTimeout(()=> selectAllJSON('full'), 50); }
function selectAllJSON(mode){
  const el = mode==='full' ? jsonFullscreenEl.value : jsonOverviewEl.value;
  if(!el) return; const range = document.createRange(); range.selectNodeContents(el); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range); }

function closeFullJSON(){
  showChecklistJSONFull.value = false;
}

// 打开时锁定 body 滚动，关闭时恢复
watch(showChecklistJSONFull, (val)=>{
  const body = document.body;
  if(val){
    body.dataset._scroll_lock_original_overflow = body.style.overflow;
    body.style.overflow = 'hidden';
    nextTick(()=> selectAllJSON('full'));
  } else {
    if(body.dataset._scroll_lock_original_overflow !== undefined){
      body.style.overflow = body.dataset._scroll_lock_original_overflow;
      delete body.dataset._scroll_lock_original_overflow;
    }
  }
});

// 监听 Esc 关闭全屏 modal
function handleKey(e){
  if(e.key === 'Escape' && showChecklistJSONFull.value){
    showChecklistJSONFull.value = false;
  }
  // Ctrl/Cmd + A 在全屏时自动全选 JSON
  if(showChecklistJSONFull.value && ( (e.metaKey || e.ctrlKey) && e.key.toLowerCase()==='a')){
    e.preventDefault(); selectAllJSON('full');
  }
}
onMounted(()=>{ window.addEventListener('keydown', handleKey); });
onBeforeUnmount(()=>{ window.removeEventListener('keydown', handleKey); });

// 调试：在解析出 table_json 后打印到控制台，并挂到 window 方便从开发者工具获取
watch(() => checklistResult.value?.table_json, (val) => {
  if(val && Array.isArray(val)) {
    console.log('%c[Checklist table_json] 当前解析结果 (数组长度: ' + val.length + ')', 'background:#1e293b;color:#fff;padding:2px 6px;border-radius:4px;');
    // 分开两次，避免控制台折叠大型对象时不清晰
    console.log(val);
    // 暴露到全局（只读引用）
    window.__CHECKLIST_TABLE_JSON__ = val;
    console.log('%c已挂载到 window.__CHECKLIST_TABLE_JSON__ 方便复制。', 'color:#059669;font-weight:600;');
  }
});

function onChecklistChange(e){
  checklistError.value=''; checklistResult.value=null; checklistFile.value = e.target.files?.[0] || null;
}

function resetChecklist(){
  checklistFile.value=null; checklistError.value=''; checklistResult.value=null;
}

async function analyzeChecklist(){
  if(!checklistFile.value){ checklistError.value='请先选择文件'; return; }
  checklistError.value=''; checklistResult.value=null; checklistLoading.value=true;
  try {
    checklistResult.value = await analyzeEUExpansionChecklist([checklistFile.value]);
    // 默认展开 sheet 列表
    checklistOpen.value['__sheet_list__']=true;
  } catch(err){
    console.error(err); checklistError.value='解析失败: '+(err.message||String(err));
  } finally { checklistLoading.value=false; }
}

function formatJSON(obj){
  try { return JSON.stringify(obj, null, 2); } catch { return String(obj); }
}

function toggleChecklistSection(key){
  checklistOpen.value[key] = !checklistOpen.value[key];
}
function isChecklistOpen(key){
  return !!checklistOpen.value[key];
}
</script>

<style scoped>
/* ---------- Layout & Surface ---------- */
:root { --bg-gradient: radial-gradient(circle at 25% 20%, #f0f4ff 0%, #e8eef7 35%, #dde5ef 70%, #d5dde8 100%); }
.bl-test { max-width:1600px; margin:1.8rem auto 3rem; font-family: system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto; line-height:1.5; padding:0 1.2rem 2rem; color:#0f172a; }
.top-header { text-align:center; margin:0 0 2rem; }
.page-title { margin:0 0 .6rem; font-size:1.9rem; letter-spacing:.5px; background:linear-gradient(90deg,#0f172a,#1e293b); -webkit-background-clip:text; background-clip:text; color:transparent; }
.subline { margin:0; font-size:.85rem; color:#334155; letter-spacing:.4px; }
.panel-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(480px,1fr)); gap:2rem; align-items:start; }

/* ---------- Glass Panel ---------- */
.panel { position:relative; border-radius:22px; padding:1px; background:linear-gradient(135deg,rgba(255,255,255,.6),rgba(255,255,255,.15)); backdrop-filter:blur(18px) saturate(1.3); -webkit-backdrop-filter:blur(18px) saturate(1.3); box-shadow:0 8px 28px -6px rgba(15,23,42,.15), 0 2px 6px -2px rgba(15,23,42,.1); overflow:hidden; }
.panel:before { content:""; position:absolute; inset:0; border-radius:inherit; padding:1px; background:linear-gradient(160deg,rgba(59,130,246,.4),rgba(99,102,241,.35),rgba(14,165,233,.35)); -webkit-mask:linear-gradient(#000,#000) content-box, linear-gradient(#000,#000); mask:linear-gradient(#000,#000) content-box, linear-gradient(#000,#000); -webkit-mask-composite:xor; mask-composite:exclude; }
.panel__header { padding:1.1rem 1.4rem .9rem; }
.panel__header h2 { margin:0 0 .35rem; font-size:1.15rem; font-weight:650; color:#0f172a; letter-spacing:.3px; }
.panel__header small { font-size:.65rem; color:#334155; font-weight:500; }
.panel__body { padding:.2rem 1.35rem 1.45rem 1.35rem; }

/* ---------- Uploader & Controls ---------- */
.uploader { border:1px dashed rgba(71,85,105,.6); padding:1rem 1.05rem 1.1rem; border-radius:14px; background:linear-gradient(135deg,rgba(241,245,249,.65),rgba(226,232,240,.4)); position:relative; transition:border-color .25s, background .35s; }
.uploader:hover { border-color:#334155; background:linear-gradient(135deg,rgba(241,245,249,.8),rgba(226,232,240,.55)); }
input[type=file] { margin:.55rem 0 .65rem; font-size:.7rem; color:#0f172a; }
.mode-toggle { display:inline-flex; align-items:center; gap:.45rem; font-size:.7rem; margin-bottom:.2rem; user-select:none; font-weight:500; color:#0f172a; }
.tips { font-size:.64rem; color:#334155; line-height:1.5; letter-spacing:.2px; }
.tips p { margin:.2rem 0 .3rem; font-weight:600; color:#1e293b; }
.tips ul { margin:.35rem 0 .4rem; padding-left:1.05rem; }
.selected-summary { font-size:.63rem; margin:.5rem 0 .55rem; color:#334155; }
.selected-summary strong { color:#0f172a; }
.selected-summary ul { list-style:none; margin:.3rem 0 0; padding:0; max-height:132px; overflow:auto; display:grid; gap:.25rem; }

/* ---------- Buttons ---------- */
.actions-row { display:flex; gap:.6rem; flex-wrap:wrap; margin-top:.55rem; }
.btn { --btn-bg:#2563eb; --btn-bg-hover:#1d4ed8; background:linear-gradient(135deg,var(--btn-bg),#1d4ed8); color:#fff; border:none; padding:.6rem 1.05rem .62rem; border-radius:10px; cursor:pointer; font-size:.72rem; letter-spacing:.3px; font-weight:600; display:inline-flex; align-items:center; gap:.4rem; box-shadow:0 2px 4px rgba(0,0,0,.08); transition:.25s background, .25s transform, .25s box-shadow; }
.btn:hover:not(:disabled){ background:linear-gradient(135deg,var(--btn-bg-hover),#1e40af); box-shadow:0 4px 14px -4px rgba(37,99,235,.55); transform:translateY(-2px); }
.btn:active:not(:disabled){ transform:translateY(0); box-shadow:0 2px 6px -2px rgba(37,99,235,.4); }
.btn-secondary { --btn-bg:#64748b; --btn-bg-hover:#475569; }
.btn:disabled { background:#94a3b8; cursor:not-allowed; opacity:.55; box-shadow:none; }
.btn + .btn { margin-left:.4rem; }

/* ---------- Chips & Badges ---------- */
.chip-wrap { margin:.55rem 0 .2rem; display:flex; flex-wrap:wrap; gap:.45rem; }
.chip { background:linear-gradient(135deg,#e2e8f0,#cbd5e1); color:#1e293b; padding:.34rem .7rem .36rem; border-radius:999px; font-size:.58rem; line-height:1; font-weight:600; letter-spacing:.4px; box-shadow:0 1px 2px rgba(0,0,0,.08); }
.chip.info { background:linear-gradient(135deg,#dbeafe,#bfdbfe); color:#1e3a8a; }
.summary-chips { display:flex; flex-wrap:wrap; gap:.55rem; margin:.65rem 0 .4rem; }
.prio { display:inline-block; background:linear-gradient(135deg,#1d4ed8,#1e40af); color:#fff; font-size:.58rem; padding:.18rem .45rem .2rem; border-radius:5px; margin-right:.4rem; font-weight:700; letter-spacing:.5px; }

/* ---------- Tables ---------- */
.table-wrapper { overflow:auto; max-height:420px; border:1px solid rgba(148,163,184,.35); border-radius:14px; background:linear-gradient(140deg,rgba(255,255,255,.75),rgba(255,255,255,.45)); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); box-shadow:inset 0 0 0 1px rgba(255,255,255,.4); }
.table { width:100%; border-collapse:separate; border-spacing:0; font-size:.66rem; color:#0f172a; }
.table th,.table td { padding:.45rem .55rem; vertical-align:top; }
.table thead th { position:sticky; top:0; background:linear-gradient(135deg,#f1f5f9,#e2e8f0); font-weight:650; border-bottom:1px solid #cbd5e1; backdrop-filter:blur(6px); }
.table tbody tr:nth-child(odd){ background:rgba(255,255,255,.55); }
.table tbody tr:nth-child(even){ background:rgba(255,255,255,.35); }
.table tbody tr:hover { background:rgba(148,163,184,.25); }
.table.compact th,.table.compact td { padding:.38rem .5rem; }
.pre { white-space:pre-wrap; }

/* ---------- Text Blocks ---------- */
.result-block h3 { margin:0 0 .6rem; font-size:1rem; font-weight:650; letter-spacing:.2px; color:#0f172a; }
.note { color:#1e40af; font-size:.64rem; margin:.35rem 0 .6rem; font-weight:500; }
.points { list-style:disc; padding-left:1.15rem; }
.points li { margin:.32rem 0; font-size:.62rem; line-height:1.45; color:#1e293b; }
.sub-block { margin-top:1.2rem; }
.sub-block h4 { margin:.2rem 0 .45rem; font-size:.8rem; letter-spacing:.3px; color:#0f172a; }
.sub { font-size:.6rem; color:#475569; margin:.25rem 0 .55rem; }

/* ---------- Detection / Meta ---------- */
.detect-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(118px,1fr)); gap:.45rem; margin-top:.65rem; font-size:.54rem; }
.detect-grid span { background:linear-gradient(135deg,#f1f5f9,#e2e8f0); border:1px solid #cbd5e1; padding:.32rem .5rem .34rem; border-radius:8px; display:flex; justify-content:space-between; align-items:center; font-weight:600; color:#1e293b; }
.detect-grid strong.ok { color:#057a55; }
.detect-grid strong.miss { color:#b91c1c; }
.warnings { margin-top:.65rem; }
.warnings p { margin:0 0 .25rem; font-size:.58rem; font-weight:600; letter-spacing:.5px; color:#b91c1c; }
.warnings ul { margin:.2rem 0 0; padding-left:1.1rem; font-size:.55rem; color:#b91c1c; }
.meta { margin-top:.75rem; }
.meta pre { font-size:.55rem; background:rgba(15,23,42,.9); color:#f1f5f9; padding:.6rem .7rem; border-radius:10px; overflow:auto; line-height:1.45; box-shadow:0 2px 6px -2px rgba(0,0,0,.4); }
.meta-line { font-size:.56rem; color:#334155; margin-top:.55rem; font-weight:500; }

/* ---------- Enhanced Table Styles ---------- */
.highlight-count { color:#1e40af; font-size:.75rem; font-weight:700; background:rgba(30,64,175,.1); padding:.2rem .4rem; border-radius:4px; }
.savings-cell { color:#059669; font-weight:650; }

/* ---------- Formula Display ---------- */
.formula-grid { display:grid; gap:.6rem; margin:.8rem 0; font-size:.58rem; }
.formula-item { background:rgba(15,23,42,.05); border:1px solid rgba(148,163,184,.2); padding:.5rem .7rem; border-radius:8px; }
.formula-item strong { color:#1e293b; margin-right:.4rem; }
.formula-item code { background:rgba(15,23,42,.9); color:#f1f5f9; padding:.15rem .3rem; border-radius:4px; font-family:monospace; font-size:.55rem; }

/* ---------- State & Feedback ---------- */
.error { margin-top:.55rem; color:#b91c1c; font-size:.62rem; font-weight:600; letter-spacing:.3px; }
.result-block { margin-top:1.35rem; }

/* ---------- Collapse (Checklist) ---------- */
.collapse { border:1px solid rgba(148,163,184,.35); border-radius:10px; background:linear-gradient(135deg,rgba(255,255,255,.7),rgba(255,255,255,.4)); margin-top:.7rem; box-shadow:inset 0 0 0 1px rgba(255,255,255,.35); }
.collapse__header { cursor:pointer; display:flex; align-items:center; gap:.55rem; padding:.55rem .75rem; font-size:.63rem; user-select:none; font-weight:600; color:#0f172a; }
.collapse__header:hover { background:rgba(148,163,184,.18); }
.collapse__body { padding:.25rem .75rem .7rem; animation:fadeIn .25s ease; }
.arrow { width:10px; height:10px; border-right:2px solid #334155; border-bottom:2px solid #334155; transform:rotate(-45deg); transition:.25s transform; margin-right:.1rem; }
.arrow.open { transform:rotate(45deg); }

/* ---------- JSON Overview Enhancements ---------- */
.json-actions { display:flex; gap:.4rem; margin-left:auto; }
.mini-btn { background:#1e293b; color:#f1f5f9; border:none; padding:.25rem .55rem .3rem; font-size:.55rem; border-radius:6px; cursor:pointer; font-weight:600; letter-spacing:.3px; box-shadow:0 1px 2px rgba(0,0,0,.35); transition:.2s background, .2s transform; }
.mini-btn:hover { background:#334155; }
.mini-btn:active { transform:translateY(1px); }
.mini-btn.danger { background:#b91c1c; }
.mini-btn.danger:hover { background:#991b1b; }
.json-pre { max-height:480px; overflow:auto; font-size:.55rem; background:#0f172a; color:#f8fafc; padding:.65rem .75rem; border-radius:12px; line-height:1.5; box-shadow:inset 0 0 0 1px rgba(255,255,255,.06); }
.json-pre.fullscreen { max-height:none; height:calc(100vh - 72px); }
.json-pre.selectable { user-select:text; }
.hint-line { margin:.4rem 0 0; font-size:.5rem; color:#64748b; }
.copy-toast { position:fixed; bottom:14px; right:16px; background:#0f172a; color:#f1f5f9; padding:.5rem .8rem; font-size:.55rem; border-radius:8px; box-shadow:0 4px 14px -4px rgba(0,0,0,.5); font-weight:600; letter-spacing:.4px; animation:fadeIn .25s ease; }
.json-fullscreen { position:fixed; inset:0; background:rgba(15,23,42,.92); z-index:9999; display:flex; flex-direction:column; padding:0; overflow:hidden; pointer-events:auto; }
.json-fullscreen__toolbar { position:sticky; top:0; display:flex; align-items:center; gap:.6rem; padding:.55rem .85rem; background:linear-gradient(135deg,#1e293b,#0f172a); color:#f1f5f9; font-size:.6rem; font-weight:600; box-shadow:0 4px 18px -4px rgba(0,0,0,.6); z-index:1; }
.json-fullscreen__content { flex:1; overflow:auto; padding:.6rem .8rem 1.2rem; }
.json-fullscreen__toolbar .fill { flex:1; }

/* ---------- Responsive ---------- */
@media (max-width:1080px){ .panel-grid { gap:1.4rem; } }
@media (max-width:820px){ .panel-grid { grid-template-columns:1fr; } .page-title { font-size:1.55rem; } }
@media (max-width:560px){ .btn { font-size:.64rem; padding:.52rem .85rem; } .chip { font-size:.54rem; } .table { font-size:.6rem; } }
</style>
