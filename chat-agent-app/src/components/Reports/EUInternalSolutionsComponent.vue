<template>
  <div class="eu-solutions-container">
    <!-- 欧盟内部方案介绍与对比 -->
    <div class="solutions-section">
      <div class="solutions-header">
        <div class="orange-arrow">▶</div>
        <h2 class="solutions-title">欧盟内部方案介绍与对比</h2>
      </div>

      <div class="solutions-content">
        <div class="solutions-table-container">
          <table class="solutions-comparison-table">
            <thead>
              <tr>
                <th rowspan="2" class="solution-type">方案类型</th>
                <th class="fba-solution">欧盟 FBA 的物流模式</th>
                <th class="efn-solution">欧盟之间的远程配送网络<br/>European Fulfillment Network (EFN)</th>
                <th class="paneu-solution">⭐亚马逊物流欧洲整合服务<br/>Pan European (PanEU)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="intro-row">
                <td class="row-label">简介</td>
                <td class="solution-desc">卖家入仓至欧盟任一国家后，即可由此国的仓库远程配送到其他欧盟国家</td>
                <td class="solution-desc">卖家入仓至欧盟任一国家后，亚马逊将货存储在卖家启用了存储服务的国家/地区的欧盟运营中心内，并自主在这些卖家地区之间分配存储，不额外收取费用</td>
                <td class="solution-desc highlight">卖家入仓至欧盟任一国家后，亚马逊将货存储在卖家启用了存储服务的国家/地区的欧盟运营中心内，并自主在这些卖家地区之间分配存储，不额外收取费用</td>
              </tr>
              <tr class="criteria-row">
                <td class="row-label" rowspan="2">加入条件</td>
                <td class="criteria-item">
                  <div class="criteria-title">ASIN 设置</div>
                  <div class="criteria-content">需使用相同 ASIN/FNSKU#</div>
                </td>
                <td class="criteria-item">
                  <div class="criteria-title">ASIN 设置</div>
                  <div class="criteria-content">需使用相同 ASIN/FNSKU#</div>
                </td>
                <td class="criteria-item">
                  <div class="criteria-title">ASIN 设置</div>
                  <div class="criteria-content highlight">德法意西需使用相同 ASIN/FNSKU#</div>
                </td>
              </tr>
              <tr class="vat-row">
                <td class="criteria-item">
                  <div class="criteria-title">仓储国要求*</div>
                  <div class="criteria-content">仅开启一国仓储<br/>(需要1个 VAT)</div>
                </td>
                <td class="criteria-item">
                  <div class="criteria-title">仓储国要求*</div>
                  <div class="criteria-content">仅开启一国仓储<br/>(需要1个 VAT)</div>
                </td>
                <td class="criteria-item">
                  <div class="criteria-title">仓储国要求*</div>
                  <div class="criteria-content highlight">需要德法意西中，至少开启2国仓储（至少2个 VAT），<br/>启用仓储的国家为PanEU，未启用国家为 EFN</div>
                </td>
              </tr>
              <tr class="logistics-row">
                <td class="row-label">头程物流<br/>(CN->EU FBA CC)</td>
                <td class="logistics-item">需发货至欧盟某1个国家，成本低</td>
                <td class="logistics-item">需发货至欧盟某1个国家，成本低</td>
                <td class="logistics-item">需发货至欧盟某1个国家，成本低</td>
              </tr>
              <tr class="delivery-row">
                <td class="row-label">尾程配送<br/>(FBA)</td>
                <td class="delivery-item">
                  <span class="delivery-type cross-border">跨境配送</span>：费用高，3-5天送达
                </td>
                <td class="delivery-item">
                  <span class="delivery-type local">本地配送</span>：费用节约高达53%，1-2天送达
                  <span class="delivery-type cross-border">跨境配送</span>+<span class="delivery-type cross-border">跨境配送</span>
                </td>
                <td class="delivery-item">
                  <span class="delivery-type local">本地配送</span>+<span class="delivery-type cross-border">跨境配送</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="note-section">
          <p class="note-text">注：开启仓储后会触发VAT义务，您需注册该国VAT（或欧盟增值税登记号和本土VAT号）。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件名称
defineOptions({
  name: 'EUInternalSolutionsComponent'
})
</script>

<style scoped>
.eu-solutions-container {
  margin: 20px 0;
}

.solutions-section {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
  margin: 20px 0;
  overflow: hidden;
}

.solutions-header {
  background: #232f3e;
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  gap: 12px;
}

.orange-arrow {
  color: #FF8C00;
  font-size: 20px;
  font-weight: bold;
}

.solutions-title {
  color: #333;
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
}

.solutions-content {
  padding: 25px;
}

/* 表格样式 - 参考Chat.vue中的样式 */
.solutions-table-container {
  overflow-x: auto;
  margin: 20px 0;
}

.solutions-comparison-table {
  width: 100% !important;
  border-collapse: collapse !important;
  font-size: 13px !important;
  background: white !important;
  margin: 0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.solutions-comparison-table th {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  padding: 15px 12px !important;
  text-align: center !important;
  border: 1px solid #357abd !important;
  font-size: 13px !important;
  line-height: 1.4 !important;
}

.solutions-comparison-table td {
  padding: 12px !important;
  border: 1px solid #e0e0e0 !important;
  vertical-align: top !important;
  background: white !important;
  color: #333 !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
}

.solutions-comparison-table tbody tr:nth-child(even) {
  background: #f8f9fa !important;
}

.solutions-comparison-table:hover tbody tr {
  background: white !important;
}

.solutions-comparison-table tbody tr:nth-child(even):hover {
  background: #f8f9fa !important;
}

/* 列样式 */
.solution-type {
  background: linear-gradient(135deg, #6c757d 0%, #495057 100%) !important;
  width: 15%;
  text-align: center;
  font-weight: 600;
}

.fba-solution {
  width: 25%;
  background: linear-gradient(135deg, #17a2b8 0%, #138496 100%) !important;
}

.efn-solution {
  width: 30%;
  background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%) !important;
}

.paneu-solution {
  width: 30%;
  background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%) !important;
  color: #333 !important;
}

/* 行标签样式 */
.row-label {
  background: #f8f9fa !important;
  font-weight: 600 !important;
  text-align: center !important;
  color: #495057 !important;
}

/* 内容样式 */
.solution-desc {
  text-align: left !important;
  line-height: 1.6 !important;
}

.solution-desc.highlight {
  background: #fff3cd !important;
  color: #856404 !important;
  font-weight: 500 !important;
}

.criteria-item {
  text-align: left !important;
}

.criteria-title {
  font-weight: 600 !important;
  color: #495057 !important;
  margin-bottom: 4px;
}

.criteria-content {
  color: #666 !important;
  line-height: 1.4 !important;
}

.criteria-content.highlight {
  background: #fff3cd !important;
  color: #856404 !important;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500 !important;
}

.logistics-item {
  text-align: left !important;
  color: #666 !important;
}

.delivery-item {
  text-align: left !important;
  line-height: 1.6 !important;
}

.delivery-type {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin: 1px;
}

.delivery-type.local {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.delivery-type.cross-border {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* 注释部分 */
.note-section {
  margin-top: 20px;
  padding: 15px;
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
  border-radius: 4px;
}

.note-text {
  color: #1565c0;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .solutions-content {
    padding: 15px;
  }
  
  .solutions-comparison-table th,
  .solutions-comparison-table td {
    padding: 8px 6px !important;
    font-size: 11px !important;
  }
  
  .solutions-title {
    font-size: 18px;
  }
  
  .delivery-type {
    font-size: 10px;
    padding: 1px 4px;
  }
}

@media (max-width: 480px) {
  .solutions-comparison-table th,
  .solutions-comparison-table td {
    padding: 6px 4px !important;
    font-size: 10px !important;
  }
}
</style>



