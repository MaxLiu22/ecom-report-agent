<template>
  <div class="bl-test">
    <h1 class="page-title">业务分析逻辑测试中心 (PanEU & DI)</h1>
    <p class="intro">在此页面同时测试 PanEU 选品拓展 与 DI 英国⇄欧盟 双向拓展分析。上传相应文件后分别点击分析按钮。</p>

    <section class="panel">
      <header class="panel__header">
        <h2>PanEU 分析</h2>
        <small>需要 4 个文件：paneu / sku / inv / asin 关键字自动识别</small>
      </header>
      <div class="panel__body">
        <div class="uploader">
          <input type="file" multiple accept=".xlsx,.xls" @change="onPanEUMultiChange" />
          <div class="tips">
            <ul>
              <li><strong>paneu</strong> → PanEU Report</li>
              <li><strong>sku</strong> → SKU Report</li>
              <li><strong>inv</strong> 或 <strong>库存</strong> → 库存 Report</li>
              <li><strong>asin</strong> 或 <strong>list</strong> → ASIN List</li>
            </ul>
          </div>
          <div class="selected-summary" v-if="panEUSelected.length">
            <ul>
              <li v-for="f in panEUSelected" :key="f.role">{{ f.role }}: {{ f.file.name }}</li>
            </ul>
          </div>
          <button class="btn" :disabled="panEULoading || !panEUAllSelected" @click="analyzePanEU">{{ panEULoading? '分析中...' : '分析 PanEU' }}</button>
          <div class="error" v-if="panEUError">{{ panEUError }}</div>
        </div>

        <div v-if="panEUReport" class="result-block">
          <h3>{{ panEUReport.report_title }}</h3>
          <p>{{ panEUReport.report_subtitle }}</p>
          <p class="note">{{ panEUReport.note }}</p>
          <table class="table">
            <thead>
              <tr>
                <th v-for="h in panEUReport.opportunity_data.headers" :key="h">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in panEUReport.opportunity_data.rows" :key="row.opportunityType">
                <td>{{ row.opportunityType }}</td>
                <td>{{ row.count }}</td>
                <td class="pre">{{ row.detail }}</td>
                <td class="pre">{{ row.recommendation }}</td>
                <td>{{ row.estimatedAnnualSavingsEUR }}</td>
              </tr>
            </tbody>
          </table>
          <details class="meta">
            <summary>PanEU 假设</summary>
            <pre>{{ panEUReport.meta.assumptions }}</pre>
          </details>
        </div>
      </div>
    </section>

    <section class="panel">
      <header class="panel__header">
        <h2>DI 英国 ⇄ 欧盟 分析</h2>
        <small>可上传最多 10 个文件，至少包含 cost saving model</small>
      </header>
      <div class="panel__body">
        <div class="uploader">
          <input type="file" multiple accept=".xlsx,.xls,.csv" @change="onDIMultiChange" />
          <div class="tips">
            <ul>
              <li><code>cost.*saving.*model</code> → cost_saving (必需)</li>
              <li>eligibleASINs.*DE.*FR.*IT.*ES → incentive_eu</li>
              <li>eligibleASINs.*UK → incentive_uk</li>
              <li>recommendations United Kingdom → rec_uk_xx (DE/FR/IT/ES)</li>
              <li>recommendations Germany United Kingdom → rec_de_uk</li>
              <li>Remote Fulfillment ASIN Status Report → rf_status</li>
              <li>Remote Fulfillment Order Report → rf_order</li>
            </ul>
          </div>
          <div class="selected-summary" v-if="diSelected.length">
            <ul>
              <li v-for="f in diSelected" :key="f.role">{{ f.role }}: {{ f.file.name }}</li>
            </ul>
          </div>
          <button class="btn" :disabled="diLoading || !diFiles.cost_saving" @click="analyzeDI">{{ diLoading? '分析中...' : '分析 DI' }}</button>
          <div class="error" v-if="diError">{{ diError }}</div>
        </div>

        <div v-if="diReport" class="result-block">
          <h3>{{ diReport.report_title }}</h3>
          <section class="sub-block">
            <h4>{{ diReport.key_opportunity_analysis.title }}</h4>
            <p class="sub">{{ diReport.key_opportunity_analysis.subtitle }}</p>
            <ul class="points">
              <li v-for="p in diReport.key_opportunity_analysis.points" :key="p.title"><strong>{{ p.title }}:</strong> {{ p.description }}</li>
            </ul>
          </section>
          <section class="sub-block">
            <h4>{{ diReport.recommended_actions.title }}</h4>
            <ol>
              <li v-for="a in diReport.recommended_actions.actions" :key="a.priority"><strong>P{{ a.priority }}</strong> - {{ a.recommendation }}</li>
            </ol>
          </section>
          <section class="sub-block">
            <h4>数据表</h4>
            <table class="table">
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
            <summary>DI 假设</summary>
            <pre>{{ diReport.meta.assumptions }}</pre>
            <p>ASIN 基数: {{ diReport.meta.asin_count }} | 生成: {{ new Date(diReport.meta.generated_at).toLocaleString() }}</p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { analyzePanEUOpportunities } from '@/services/panEUService.js';
import { analyzeDIOpportunities } from '@/services/DIService.js';

// PanEU state
const panEUFiles = ref({ panEuReport:null, skuReport:null, inventoryReport:null, asinList:null });
const panEUSelected = ref([]);
const panEULoading = ref(false); const panEUError = ref(''); const panEUReport = ref(null);
const panEUAllSelected = computed(()=> !!panEUFiles.value.panEuReport && !!panEUFiles.value.skuReport && !!panEUFiles.value.inventoryReport && !!panEUFiles.value.asinList);

function onPanEUMultiChange(e){
  panEUFiles.value = { panEuReport:null, skuReport:null, inventoryReport:null, asinList:null };
  panEUSelected.value = [];
  const assign=(role,file)=>{ if(!panEUFiles.value[role]){ panEUFiles.value[role]=file; panEUSelected.value.push({role,file}); }};
  Array.from(e.target.files||[]).forEach(file=>{
    const n=file.name.toLowerCase();
    if(/paneu/.test(n)) assign('panEuReport', file);
    else if(/sku/.test(n)) assign('skuReport', file);
    else if(/(inv|库存)/.test(n)) assign('inventoryReport', file);
    else if(/(asin|list)/.test(n)) assign('asinList', file);
  });
}

async function analyzePanEU(){
  panEUError.value=''; panEUReport.value=null;
  if(!panEUAllSelected.value){ panEUError.value='缺少 4 个必要文件'; return; }
  panEULoading.value=true;
  try { panEUReport.value = await analyzePanEUOpportunities(panEUFiles.value); }
  catch(err){ console.error(err); panEUError.value='PanEU 分析失败: '+(err.message||String(err)); }
  finally { panEULoading.value=false; }
}

// DI state
const diFiles = ref({ cost_saving:null,incentive_eu:null,incentive_uk:null,rec_uk_de:null,rec_uk_fr:null,rec_uk_it:null,rec_uk_es:null,rec_de_uk:null,rf_status:null,rf_order:null });
const diSelected = ref([]);
const diLoading = ref(false); const diError = ref(''); const diReport = ref(null);

function onDIMultiChange(e){
  for(const k in diFiles.value) diFiles.value[k]=null; diSelected.value=[];
  const assign=(role,file)=>{ if(!diFiles.value[role]){ diFiles.value[role]=file; diSelected.value.push({role,file}); }};
  Array.from(e.target.files||[]).forEach(f=>{
    const n=f.name.toLowerCase();
    if(/cost.*saving.*model/.test(n)) assign('cost_saving', f);
    else if(/eligibleasins.*de.*fr.*it.*es.*credits.*gsinsp/.test(n)) assign('incentive_eu', f);
    else if(/eligibleasins.*uk.*credits.*gsinsp/.test(n)) assign('incentive_uk', f);
    else if(/recommendations.*united.*kingdom.*germany/.test(n)) assign('rec_uk_de', f);
    else if(/recommendations.*united.*kingdom.*france/.test(n)) assign('rec_uk_fr', f);
    else if(/recommendations.*united.*kingdom.*italy/.test(n)) assign('rec_uk_it', f);
    else if(/recommendations.*united.*kingdom.*spain/.test(n)) assign('rec_uk_es', f);
    else if(/recommendations.*germany.*united.*kingdom/.test(n)) assign('rec_de_uk', f);
    else if(/remote.*fulfillment.*asin.*status.*report/.test(n)) assign('rf_status', f);
    else if(/remote.*fulfillment.*order.*report/.test(n)) assign('rf_order', f);
  });
}

async function analyzeDI(){
  diError.value=''; diReport.value=null;
  if(!diFiles.value.cost_saving){ diError.value='缺少 cost saving model 文件'; return; }
  diLoading.value=true;
  try { diReport.value = await analyzeDIOpportunities(diFiles.value); }
  catch(err){ console.error(err); diError.value='DI 分析失败: '+(err.message||String(err)); }
  finally { diLoading.value=false; }
}
</script>

<style scoped>
.bl-test { max-width:1300px; margin:2rem auto; font-family: system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto; line-height:1.45; }
.page-title { margin:0 0 1rem; }
.intro { margin:0 0 2rem; color:#555; }
.panel { border:1px solid #e2e8f0; border-radius:8px; margin-bottom:2rem; background:#fff; box-shadow:0 1px 2px rgba(0,0,0,.05); }
.panel__header { padding:.9rem 1.2rem; border-bottom:1px solid #e2e8f0; background:#f8fafc; }
.panel__body { padding:1rem 1.2rem 1.4rem; }
.uploader { border:1px dashed #94a3b8; padding:.9rem 1rem; border-radius:6px; background:#f1f5f9; }
input[type=file] { margin-bottom:.6rem; }
.tips { font-size:.75rem; color:#444; }
.tips ul { margin:.3rem 0 .4rem; padding-left:1.1rem; }
.selected-summary { font-size:.8rem; margin:.4rem 0 .6rem; }
.selected-summary ul { list-style:none; margin:0; padding:0; columns:2; }
.btn { background:#2563eb; color:#fff; border:none; padding:.55rem 1.1rem; border-radius:4px; cursor:pointer; font-size:.85rem; }
.btn:disabled { background:#94a3b8; cursor:not-allowed; }
.error { margin-top:.5rem; color:#b91c1c; font-size:.8rem; }
.result-block { margin-top:1.2rem; }
.table { width:100%; border-collapse:collapse; font-size:.8rem; }
.table th,.table td { border:1px solid #e2e8f0; padding:.4rem .5rem; vertical-align:top; }
.table th { background:#f1f5f9; text-align:left; }
.note { color:#0d47a1; font-size:.75rem; }
.pre { white-space:pre-wrap; }
.meta { margin-top:.6rem; }
.meta pre { font-size:.65rem; background:#0f172a; color:#f1f5f9; padding:.6rem .7rem; border-radius:4px; overflow:auto; }
.points { list-style:disc; padding-left:1.1rem; }
.sub-block { margin-top:1.1rem; }
.sub { font-size:.7rem; color:#555; margin:.25rem 0 .5rem; }
</style>
