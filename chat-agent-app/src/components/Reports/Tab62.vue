<template>
  <div class="sub-tab-panel">
    <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #232f3e">
      2.2 英国和欧盟间物流方案
    </h2>
    <div class="solution-details">
      <div
        style="
          margin-top: 30px;
          padding: 20px;
          background: #ffffff;
          border: 1px solid #ddd;
          border-radius: 6px;
        "
      >
        <!-- <h4 style="color: #333; font-size: 18px; font-weight: 600; margin: 0 0 8px 0">
          英国和欧盟物流方案
        </h4>
        <h5 style="color: #666; font-size: 16px; font-weight: 500; margin: 0 0 4px 0">
          英国和欧盟物流方案的对比和建议
        </h5> -->
        <div
          style="
            display: flex;
            align-items: center;
            margin: 20px 0 15px 0;
            gap: 8px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 4px;
            border-left: 4px solid #333;
          "
        >
          <span style="color: #333; font-size: 16px; font-weight: bold">▶</span>
          <h4 style="color: #333; font-size: 16px; font-weight: 600; margin: 0; line-height: 1.4">
            英国和欧盟间物流方案的对比和建议
          </h4>
        </div>
        <div
          style="
            background: #232f3e;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-align: center;
            margin: 15px auto 20px auto;
            width: fit-content;
            box-shadow: 0 2px 4px rgba(51, 51, 51, 0.3);
          "
        >
          英国欧盟双边入库 vs. 英国和欧盟之间的远程配送
        </div>
        <table class="logi-compare-table">
          <thead>
            <tr>
              <th class="col-name">UK<->EU FBA 物流模式</th>
              <th class="col-di">英国欧盟双边入库<br />Dual Inbound (DI)</th>
              <th class="col-eurf">
                英国与欧盟之间的远程配送<br />Remote Fulfilment between the UK and EU (EURF)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="logi-row light">
              <td class="logi-cell-label">介绍</td>
              <td class="logi-cell-text light-bg">卖家将货物分别入库至英国和欧盟国家</td>
              <td class="logi-cell-text light-bg">
                卖家入仓到英国或欧盟任一国家后<br />即可由此国的仓库远程配送到对侧其他国家
              </td>
            </tr>
            <tr class="logi-row alt">
              <td class="logi-cell-label">头程物流 (CN->EU FBA FCs)</td>
              <td class="logi-cell-text">需发货至英国和欧盟双边国家，成本相对较高</td>
              <td class="logi-cell-text">需发货至英国或欧盟某个国家，成本相对较低</td>
            </tr>
            <tr class="logi-row">
              <td class="logi-cell-label">尾程配送 (FBA)</td>
              <td class="logi-cell-text">英国及欧盟均为本地配送费用节约高至53%，1-2天送达</td>
              <td class="logi-cell-text">跨境配送：费用高，5-7天送达</td>
            </tr>
            <tr class="logi-row alt">
              <td class="logi-cell-label">ASIN 设置</td>
              <td class="logi-cell-text">
                无强制要求建议使用相同ASIN, 以享受评论和销售数据同步, 且缺货时可开启远程配送补充销售
              </td>
              <td class="logi-cell-text">
                在英国和欧盟需使用相同 ASIN/FNSKU#需要满足英国和欧盟的进出口限定，部分 ASIN
                无法通过远程配送销售
              </td>
            </tr>
            <tr class="logi-row">
              <td class="logi-cell-label">VAT 要求</td>
              <td class="logi-cell-text">需要至少2个 VAT<br />英国和欧盟都需要注册 VAT</td>
              <td class="logi-cell-text">仅需要1个VAT<br />远程销售国无需 VAT</td>
            </tr>

            <tr class="logi-row">
              <td class="logi-cell-label">优势</td>
              <td class="logi-cell-text">低配送费，高配送时效，高转化率</td>
              <td class="logi-cell-text">门槛低，库存压力小</td>
            </tr>
            <tr class="logi-row">
              <td class="logi-cell-label">建议使用场景</td>
              <td class="logi-cell-text">
                头部及腰部选品高潜力选品<br />
                (MPG / GSI recommended)
              </td>
              <td class="logi-cell-text">长尾选品, 新品测试销售, 单边缺货时补充销售</td>
            </tr>
          </tbody>
        </table>

        <!-- 插入双边入库图片 -->
        <!-- <div class="logistics-image-container">
          <img
            src="@/assets/双边入库.jpg"
            alt="英国和欧盟间双边入库物流方案示意图"
            class="logistics-diagram"
          />
        </div> -->
      </div>
    </div>

    <!-- IntraEU 服务与机会指引（新增） -->
    <div class="intraeu-wrapper">
      <IntraEUService />
    </div>

    <!-- DI 分析结果区块（追加） -->
    <div class="analysis-section">
      <div class="section-header">
        <h3>🔄 DI 分析结果</h3>
        <p class="section-description">双边入库机会分析详情</p>
      </div>
      <div class="section-content">
        <div v-if="diResult">
          <!-- 新结构：opportunitySummaryHtml + 两张表 -->
          <template v-if="diResult.opportunitySummaryHtml || (diResult.ukToEuTable && diResult.euToUkTable)">
            <div class="di-summary-head">
              <h4>DI 英国 ⇄ 欧盟 机会报告</h4>
              <!-- <div class="meta-tags">
                <span class="tag">自动识别</span>
                <span class="tag alt">结构化输出</span>
              </div> -->
            </div>
            <div class="di-summary-card">
              <div class="summary-content" v-html="diResult.opportunitySummaryHtml"></div>
            </div>

            <!-- UK → EU 表格 -->
            <div style="margin: 20px 0">
              <h5 style="color:#333; font-size:14px; margin:0 0 10px;">UK → EU 机会表</h5>
              <div style="overflow-x:auto">
                <table style="width:100%; border-collapse:collapse; font-size:12px; background:#fff; border:1px solid #ddd; border-radius:4px;">
                  <thead>
                    <tr>
                      <th v-for="h in diResult.ukToEuTable.headers" :key="'uk-eu-h-'+h" style="background:#333; color:#fff; padding:12px 8px; text-align:center; border-right:1px solid #555;">{{ h }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, idx) in diResult.ukToEuTable.rows" :key="'uk-eu-r-'+idx">
                      <td style="padding:10px 8px; border:1px solid #ddd">{{ row.metric }}</td>
                      <td style="padding:10px 8px; border:1px solid #ddd; text-align:center; font-weight:bold; color:#333;">{{ row.count }}</td>
                      <td style="padding:10px 8px; border:1px solid #ddd; text-align:center">{{ row.revenue }}</td>
                      <td style="padding:10px 8px; border:1px solid #ddd">{{ row.action }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- EU → UK 表格 -->
            <div style="margin: 20px 0">
              <h5 style="color:#333; font-size:14px; margin:0 0 10px;">EU → UK 机会表</h5>
              <div style="overflow-x:auto">
                <table style="width:100%; border-collapse:collapse; font-size:12px; background:#fff; border:1px solid #ddd; border-radius:4px;">
                  <thead>
                    <tr>
                      <th v-for="h in diResult.euToUkTable.headers" :key="'eu-uk-h-'+h" style="background:#333; color:#fff; padding:12px 8px; text-align:center; border-right:1px solid #555;">{{ h }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, idx) in diResult.euToUkTable.rows" :key="'eu-uk-r-'+idx">
                      <td style="padding:10px 8px; border:1px solid #ddd">{{ row.metric }}</td>
                      <td style="padding:10px 8px; border:1px solid #ddd; text-align:center; font-weight:bold; color:#333;">{{ row.count }}</td>
                      <td style="padding:10px 8px; border:1px solid #ddd; text-align:center">{{ row.revenue }}</td>
                      <td style="padding:10px 8px; border:1px solid #ddd">{{ row.action }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>

          <!-- 旧结构回退：key_opportunity_analysis / data_table -->
          <template v-else>
            <h4 style="color: #333; font-size: 16px; margin: 10px 0">{{ diResult.report_title }}</h4>
            <div
              v-if="diResult.key_opportunity_analysis"
              style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #333;"
            >
              <h5 style="color: #333; font-size: 14px; margin: 0 0 10px 0">
                {{ diResult.key_opportunity_analysis.title }}
              </h5>
              <p style="color: #666; font-size: 13px; margin: 0 0 10px 0">
                {{ diResult.key_opportunity_analysis.subtitle }}
              </p>
              <ul style="margin: 0; padding-left: 20px">
                <li v-for="point in diResult.key_opportunity_analysis.points" :key="point.title" style="color: #555; font-size: 13px; margin: 5px 0">
                  <strong>{{ point.title }}:</strong> {{ point.description }}
                </li>
              </ul>
            </div>
            <div
              v-if="diResult.recommended_actions"
              style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #333;"
            >
              <h5 style="color: #333; font-size: 14px; margin: 0 0 10px 0">
                {{ diResult.recommended_actions.title }}
              </h5>
              <ol style="margin: 0; padding-left: 20px">
                <li v-for="action in diResult.recommended_actions.actions" :key="action.priority" style="color: #555; font-size: 13px; margin: 8px 0">
                  <span style="background: #333; color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: bold; margin-right: 8px;">P{{ action.priority }}</span>
                  {{ action.recommendation }}
                </li>
              </ol>
            </div>
            <div v-if="diResult.data_table" style="margin: 20px 0">
              <h5 style="color: #333; font-size: 14px; margin-bottom: 15px">数据表</h5>
              <div style="overflow-x: auto">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px; background: #ffffff; border: 1px solid #ddd; border-radius: 4px;">
                  <thead>
                    <tr>
                      <th v-for="header in diResult.data_table.headers" :key="header" style="background: #333; color: white; padding: 12px 8px; text-align: center; border-right: 1px solid #555;">
                        {{ header }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in diResult.data_table.rows" :key="row['#']">
                      <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center">{{ row['#'] }}</td>
                      <td style="padding: 10px 8px; border: 1px solid #ddd">{{ row['UK<>EU ASIN'] }}</td>
                      <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center; font-weight: bold; color: #333;">{{ row['数量'] }}</td>
                      <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center">{{ row['来源商城销售额(T30D)'] }}</td>
                      <td style="padding: 10px 8px; border: 1px solid #ddd">{{ row['机会点及操作'] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </div>
        <div v-else class="no-data">
          <p>暂无 DI 分析数据</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IntraEUService from './TianOffered/IntraEUService.vue'
export default {
  name: 'Tab62',
  props: {
    // di 分析结果
    diResult: {
      type: Object,
      default: null,
    },
  },
  components: { IntraEUService },
}
</script>
<style scoped>
.sub-tab-panel {
  background: #fff;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}
.intraeu-wrapper {
  margin: 30px 0 10px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
}
.intraeu-wrapper :deep(.container) {
  background: #fff;
  padding: 24px 24px 10px;
  max-width: 100%;
}
.intraeu-wrapper :deep(.section) {
  box-shadow: none;
  border: 1px solid #f1f3f5;
  border-radius: 8px;
  margin-bottom: 24px;
}
.intraeu-wrapper :deep(.section-title) {
  background: linear-gradient(90deg, #2d3748, #4a5568);
  padding: 14px 18px;
  font-size: 16px;
}
.intraeu-wrapper :deep(.section-content) {
  padding: 18px 20px 22px;
}
.intraeu-wrapper :deep(.feature-box),
.intraeu-wrapper :deep(.gift-package),
.intraeu-wrapper :deep(.case-study) {
  background: #f8f9fa;
}
.intraeu-wrapper :deep(.container) {
  min-height: initial;
}
.sub-tab-panel h2 {
  margin: 0 0 12px;
  font-size: 22px;
  color: #232f3e;
}
.sub-tab-panel p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #444;
}
/* 追加 DI 分析区块样式 */
.analysis-section {
  margin-top: 40px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}
.section-header {
  background: #f8f9fa;
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
}
.section-header h3 {
  margin: 0 0 8px 0;
  color: #232f3e;
  font-size: 20px;
  font-weight: 600;
}
.section-description {
  margin: 0;
  color: #666666;
  font-size: 14px;
  line-height: 1.5;
}
.section-content {
  padding: 24px;
}
.di-summary-head { display:flex; align-items:center; gap:10px; justify-content:space-between; margin: 4px 0 10px; }
.di-summary-head h4 { margin:0; color:#232f3e; font-size:16px; font-weight:700; letter-spacing:.2px; }
.meta-tags { display:flex; gap:6px; }
.meta-tags .tag { background:#232f3e; color:#fff; border-radius:999px; padding:4px 10px; font-size:11px; font-weight:600; letter-spacing:.3px; box-shadow:0 1px 2px rgba(0,0,0,.08); }
.meta-tags .tag.alt { background:#ff9900; color:#232f3e; }
.di-summary-card { margin:10px 0 18px; padding:14px 16px; background:linear-gradient(135deg,#f8f9fa,#f1f5f9); border-radius:10px; border:1px solid #e5e7eb; box-shadow:inset 0 0 0 1px rgba(255,255,255,.65); }
/* 美化 v-html 注入内容 */
.di-summary-card :deep(.summary-content) { color:#1f2937; font-size:13px; line-height:1.7; }
.di-summary-card :deep(.summary-content h4) { margin:.2rem 0 .4rem; font-size:14px; color:#0f172a; }
.di-summary-card :deep(.summary-content p) { margin:.35rem 0; }
.di-summary-card :deep(.summary-content strong) { color:#0b5cab; }
.di-summary-card :deep(.summary-content ul) { margin:.35rem 0 .5rem; padding-left:1.1rem; }
.di-summary-card :deep(.summary-content li) { margin:.2rem 0; }
.no-data {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 14px;
}
.no-data p {
  margin: 0;
}
/* 图片容器样式 */
.logistics-image-container {
  margin: 30px 0;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
}

.logistics-image-container:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* 图片样式 */
.logistics-diagram {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  border: 2px solid #ffffff;
}

.logistics-diagram:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* 图片说明文字样式 */
.image-caption {
  margin: 16px 0 0 0;
  font-size: 14px;
  color: #495057;
  font-weight: 500;
  line-height: 1.5;
  background: rgba(255, 255, 255, 0.8);
  padding: 8px 16px;
  border-radius: 20px;
  display: inline-block;
  backdrop-filter: blur(5px);
}

/* ====== 抽离的物流方案对比表格样式 ====== */
.logi-row.light {
  background: #f8f9fa;
}
.logi-row.alt {
  background: #fafafa;
}
.logi-cell-label {
  background: #f2f3f5;
  color: #1f2225;
  font-weight: 600;
  text-align: center;
  padding: 12px 10px;
  font-size: 12px;
  line-height: 1.5;
  border: 1px solid #1d1f22;
}
.logi-cell-text {
  color: #1f2225;
  text-align: center;
  padding: 12px 14px;
  font-size: 12px;
  line-height: 1.55;
  background: #fff;
  border: 1px solid #1d1f22;
}
.logi-cell-text.light-bg {
  background: #f8f9fa;
}
.logi-section-head {
  background: #e9ecef;
  color: #495057;
  font-weight: 600;
  text-align: center;
  padding: 8px;
  font-size: 12px;
  border: 1px solid #ddd;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .logi-cell-label,
  .logi-cell-text {
    font-size: 11px;
    padding: 10px 10px;
  }
}

/* 新增表格头与整体样式 */
.logi-compare-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 12px;
  background: #ffffff;
  border: 2px solid #1d1f22;
  border-radius: 6px;
  margin-top: 15px;
  overflow: hidden;
}
.logi-compare-table thead th {
  background: #232f3e;
  color: #fff;
  font-weight: 600;
  padding: 14px 12px;
  text-align: center;
  font-size: 12px;
  line-height: 1.35;
  border-right: 1px solid #1d1f22;
  border-bottom: 2px solid #1d1f22;
}
.logi-compare-table thead th.col-name { background:#333; width:25%; }
.logi-compare-table thead th.col-di { width:37.5%; }
.logi-compare-table thead th.col-eurf { width:37.5%; border-right:none; }

@media (max-width: 768px) {
  .logi-compare-table {
    font-size: 11px;
  }
  .logi-compare-table thead th {
    font-size: 11px;
    padding: 10px 8px;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .logistics-image-container {
    margin: 20px 0;
    padding: 15px;
  }

  .logistics-diagram {
    border-radius: 6px;
  }

  .image-caption {
    font-size: 12px;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .logistics-image-container {
    margin: 15px 0;
    padding: 12px;
  }

  .image-caption {
    font-size: 11px;
    padding: 5px 10px;
  }
}
</style>
