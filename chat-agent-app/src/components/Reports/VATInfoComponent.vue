<template>
  <div class="vat-info-container">
    <!-- 第一部分：需要注册欧洲增值税的情况 -->
    <div class="vat-section">
      <div class="vat-header">
        <div class="orange-arrow">▶</div>
        <h2 class="vat-title">需要注册欧洲增值税的情况</h2>
        <div class="amazon-logo">
        </div>
      </div>

      <div class="vat-content">
        <!-- 有库存状态 -->
        <div class="inventory-status">
          <div class="status-badge">有库存</div>
        </div>

        <!-- 核心说明 -->
        <div class="core-message">
          <div class="main-text">无论使用FBA还是海外仓</div>
          <div class="sub-text">只要在当地有库存就需要注册VAT</div>
        </div>
      </div>
    </div>

    <!-- 第二部分：了解VAT相关基础信息 -->
    <div class="vat-section">
      <div class="vat-header">
        <div class="orange-arrow">▶</div>
        <h2 class="vat-title">了解VAT相关基础信息</h2>
        <div class="amazon-logo">
        </div>
      </div>

      <div class="vat-content">
        <!-- VAT基础信息 -->
        <div class="vat-basics">
          <h3 class="info-title">1.什么是VAT (Value Added Tax) ？</h3>
          <div class="info-points">
            <div class="point-item">
              <span class="bullet">•</span>
              <span class="point-text">VAT指欧洲国家增值税。跨境电商销售在欧洲的货物，从海关进入到英国或者说是欧洲国家内，首先需要缴纳关税和货物进口增值税；当货物销售后，商家按销售额交相应的销售税(SALES VAT)，并得到进口增值税(IMPORT VAT)的退税。</span>
            </div>
            <div class="point-item">
              <span class="bullet">•</span>
              <span class="point-text">VAT number就是商家缴税时候的纳税识别号，跟中国的纳税识别号一样。卖家注册了VAT税号，才能进行缴费纳税的操作，才能得到进口增值税的退税，才可以出具VAT发票给买家。</span>
            </div>
          </div>

          <h3 class="info-title">2.什么是EORI(Economic Operators Registration & Identification)?</h3>
          <div class="info-points">
            <div class="point-item">
              <span class="bullet">•</span>
              <span class="point-text">如果卖家要在欧洲国家内开展经济活动，就必须要登记一个EORI号，尤其是做欧洲进出口的跨境电商。当你的货物进入或者离开海关，都会被要求提供EORI号，并且一个EORI号是全欧洲通用的。</span>
            </div>
          </div>

          <h3 class="info-title">3.二者得联系和区别？</h3>
          <div class="info-points">
            <div class="point-item">
              <span class="bullet">•</span>
              <span class="point-text">EORI号用于商品货物的清关</span>
            </div>
            <div class="point-item">
              <span class="bullet">•</span>
              <span class="point-text">VAT号用于缴纳关税、进口增值税，以及销售VAT的纳税申报</span>
            </div>
          </div>
                 </div>
       </div>
     </div>
     
     <!-- VAT合规组件 -->
     <VATComplianceComponent />
   </div>
 </template>
 
 <script setup>
 import VATComplianceComponent from './VATComplianceComponent.vue'
 
 // 组件名称
 defineOptions({
   name: 'VATInfoComponent'
 })
 </script>

<style scoped>
.vat-info-container {
  margin: 20px 0;
}

.vat-section {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
  margin: 20px 0;
  overflow: hidden;
}

.vat-header {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
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

.vat-title {
  color: #333;
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
}

.amazon-logo {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.amazon-text {
  color: #FF8C00;
  font-size: 14px;
  font-weight: 600;
}

.global-selling {
  color: #FF8C00;
  font-size: 12px;
  font-weight: 500;
}

.amazon-logo-text {
  color: #FF8C00;
  font-size: 16px;
  font-weight: bold;
  font-family: Arial, sans-serif;
}

.global-text {
  color: #FF8C00;
  font-size: 10px;
  font-weight: 400;
  font-style: italic;
}

.vat-content {
  padding: 30px;
}

/* 第一部分特殊样式 */
.inventory-status {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.status-badge {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #333;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(255, 165, 0, 0.3);
  border: 2px solid #FF8C00;
}

.core-message {
  text-align: center;
  margin: 40px 0;
}

.main-text {
  color: #333;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 15px;
  line-height: 1.4;
}

.sub-text {
  color: #333;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.4;
}

/* 第二部分特殊样式 */
.vat-basics {
  max-width: 100%;
}

.info-title {
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin: 25px 0 15px 0;
  line-height: 1.4;
}

.info-points {
  margin: 15px 0 25px 0;
}

.point-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 12px 0;
  line-height: 1.6;
}

.bullet {
  color: #333;
  font-weight: bold;
  font-size: 16px;
  margin-top: 2px;
  min-width: 8px;
}

.point-text {
  color: #555;
  font-size: 14px;
  line-height: 1.6;
  flex: 1;
}

/* 统一表格样式 */
.vat-table,
.info-table,
.basic-table {
  width: 100% !important;
  border-collapse: collapse !important;
  font-size: 13px !important;
  background: white !important;
  margin: 0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.vat-table th,
.info-table th,
.basic-table th {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  padding: 15px 12px !important;
  text-align: center !important;
  border: 1px solid #357abd !important;
  font-size: 13px !important;
  line-height: 1.4 !important;
}

.vat-table td,
.info-table td,
.basic-table td {
  padding: 12px !important;
  border: 1px solid #e0e0e0 !important;
  vertical-align: top !important;
  background: white !important;
  color: #333 !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
}

.vat-table tbody tr:nth-child(even),
.info-table tbody tr:nth-child(even),
.basic-table tbody tr:nth-child(even) {
  background: #f8f9fa !important;
}

.vat-table:hover tbody tr,
.info-table:hover tbody tr,
.basic-table:hover tbody tr {
  background: white !important;
}

.vat-table tbody tr:nth-child(even):hover,
.info-table tbody tr:nth-child(even):hover,
.basic-table tbody tr:nth-child(even):hover {
  background: #f8f9fa !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .vat-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .vat-title {
    margin-left: 0;
  }
  
  .main-text {
    font-size: 24px;
  }
  
  .sub-text {
    font-size: 20px;
  }
  
  .status-badge {
    font-size: 20px;
    padding: 12px 30px;
  }
  
  .vat-content {
    padding: 20px;
  }
}
</style>
