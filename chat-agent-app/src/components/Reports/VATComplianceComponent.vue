<template>
  <div class="vat-compliance-container">
    <!-- 第一部分：如何才能保证自己增值税合规 -->
    <div class="compliance-section">
      <div class="compliance-header">
        <div class="orange-arrow">▶</div>
        <h2 class="compliance-title">如何才能保证自己增值税合规？</h2>
      </div>

      <div class="compliance-content">
        <!-- 四个步骤流程 -->
        <div class="process-steps">
          <!-- 步骤01：注册 -->
          <div class="step-card">
            <div class="step-number orange">01</div>
            <div class="step-content">
              <h3 class="step-title">注册</h3>
              <h4 class="step-subtitle">增值税税号</h4>
            </div>
          </div>

          <!-- 步骤02：进口 -->
          <div class="step-card">
            <div class="step-number teal">02</div>
            <div class="step-content">
              <h3 class="step-title">进口</h3>
              <div class="step-details">
                <div class="detail-item">
                  <span class="bullet">•</span>
                  <span class="detail-text">向欧洲海关/进口国海关提交增值税税号用于清关</span>
                </div>
                <div class="detail-item">
                  <span class="bullet">•</span>
                  <span class="detail-text">支付关税(不可抵扣)和/或进口增值税(进口增值税额=进口成本 x 增值税税率)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 步骤03：销售 -->
          <div class="step-card">
            <div class="step-number pink">03</div>
            <div class="step-content">
              <h3 class="step-title">销售</h3>
              <div class="step-details">
                <div class="detail-item">
                  <span class="bullet">•</span>
                  <span class="detail-text">向消费者收取销售增值税并开具发票</span>
                </div>
                <div class="detail-item">
                  <span class="bullet">•</span>
                  <span class="detail-text">销售增值税额=不含税售价 x 增值税税率</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 步骤04：申报 -->
          <div class="step-card">
            <div class="step-number blue">04</div>
            <div class="step-content">
              <h3 class="step-title">申报</h3>
              <div class="step-details">
                <div class="detail-item">
                  <span class="bullet">•</span>
                  <span class="detail-text">申报缴纳销售增值税</span>
                </div>
                <div class="detail-item">
                  <span class="bullet">•</span>
                  <span class="detail-text">一般情况下，应缴增值税=销售增值税-进口增值税</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第二部分：提交增值税登记信息时需要注意 -->
    <div class="compliance-section">
      <div class="compliance-header">
        <div class="orange-arrow">▶</div>
        <h2 class="compliance-title">提交增值税（VAT）登记信息时需要注意</h2>
      </div>

      <div class="compliance-content">
        <!-- 注意事项说明 -->
        <div class="notice-content">
          <p class="notice-text">
            亚马逊将验证您提供的增值税登记信息（法定名称、地址）是否与相关税务机构数据库中存储的信息一致。请注意：卖家平台中与您的增值税登记号有关的地址必须与以下地址之一保持一致：
          </p>
          
          <div class="address-options">
            <div class="option-item">
              <span class="option-label">法定地址：</span>
              <span class="option-text">税务和税务机构认可的默认法定地址。对于公司而言，该地址可能是您的公司注册地址。对于个人而言，该地址可能是您的住址。（上传增值税登记信息时系统会默认抓取您注册卖家平台中的地址以蓝标示意，如果该地址与您储存在该国税务机构数据库中的一致，您在地址栏直接勾选即可）</span>
            </div>
          </div>

          <!-- 示例截图区域 -->
          <div class="example-section">
            <div class="example-label">信息登记/商品和服务客户号码在线提交</div>
            <div class="example-box">
              <div class="china-address">
                <span class="address-icon">🌐</span>
                <span class="address-text">中国大陆 -</span>
                <div class="verify-button">注册地址确认</div>
              </div>
            </div>
          </div>

          <!-- 地址选项说明 -->
          <div class="address-explanations">
            <div class="explanation-item">
              <span class="explanation-label">增值税集团代表：</span>
              <span class="explanation-text">如果您的增值税登记号登记的是增值税集团的地址，与您的法定地址不同，请使用此地址。</span>
            </div>
            
            <div class="explanation-item">
              <span class="explanation-label">财税代表：</span>
              <span class="explanation-text">您委任作为当地税务机构联系人的财税代表的地址。</span>
            </div>
            
            <div class="explanation-item">
              <span class="explanation-label">税务机构：</span>
              <span class="explanation-text">增值税登记号所在国家/地区的税务机构办公室的官方地址。</span>
            </div>
            
            <div class="explanation-item">
              <span class="explanation-label">服务提供商：</span>
              <span class="explanation-text">负责管理您的税务申报的服务提供商的地址。</span>
            </div>
            
            <div class="explanation-item">
              <span class="explanation-label">其他：</span>
              <span class="explanation-text">如果与您的增值税登记号关联的地址不属于上述任何选项，请使用此选项。</span>
            </div>
          </div>
        </div>
             </div>
     </div>
     
     <!-- 产品合规组件 -->
     <ProductComplianceComponent />
   </div>
 </template>
 
 <script setup>
 import ProductComplianceComponent from './ProductComplianceComponent.vue'
 
 // 组件名称
 defineOptions({
   name: 'VATComplianceComponent'
 })
 </script>

<style scoped>
.vat-compliance-container {
  margin: 20px 0;
}

.compliance-section {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
  margin: 20px 0;
  overflow: hidden;
}

.compliance-header {
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

.compliance-title {
  color: #333;
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
}

.compliance-content {
  padding: 30px;
}

/* 第一部分：四步骤流程样式 */
.process-steps {
  display: flex;
  gap: 15px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.step-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px 20px;
  flex: 1;
  min-width: 200px;
  max-width: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.step-number {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin: 0 auto 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.step-number.orange {
  background: linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%);
}

.step-number.teal {
  background: linear-gradient(135deg, #20B2AA 0%, #008B8B 100%);
}

.step-number.pink {
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
}

.step-number.blue {
  background: linear-gradient(135deg, #1E90FF 0%, #0066CC 100%);
}

.step-content {
  text-align: center;
}

.step-title {
  color: #333;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.step-subtitle {
  color: #FF8C00;
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 15px 0;
}

.step-details {
  text-align: left;
  margin-top: 15px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 8px 0;
}

.bullet {
  color: #333;
  font-weight: bold;
  margin-top: 2px;
  min-width: 6px;
}

.detail-text {
  color: #555;
  font-size: 13px;
  line-height: 1.4;
  flex: 1;
}

/* 第二部分：注意事项样式 */
.notice-content {
  max-width: 100%;
}

.notice-text {
  color: #333;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.address-options {
  margin: 20px 0;
}

.option-item {
  display: flex;
  gap: 8px;
  margin: 15px 0;
  line-height: 1.6;
}

.option-label {
  color: #333;
  font-weight: 600;
  font-size: 14px;
  min-width: 80px;
}

.option-text {
  color: #555;
  font-size: 14px;
  line-height: 1.6;
  flex: 1;
}

/* 示例截图区域 */
.example-section {
  margin: 25px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.example-label {
  color: #666;
  font-size: 12px;
  margin-bottom: 15px;
}

.example-box {
  background: white;
  border: 2px solid #ff4444;
  border-radius: 6px;
  padding: 15px;
}

.china-address {
  display: flex;
  align-items: center;
  gap: 10px;
}

.address-icon {
  font-size: 16px;
}

.address-text {
  color: #333;
  font-size: 14px;
  flex: 1;
}

.verify-button {
  background: #007bff;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

/* 地址说明选项 */
.address-explanations {
  margin: 25px 0;
}

.explanation-item {
  display: flex;
  gap: 8px;
  margin: 15px 0;
  line-height: 1.6;
}

.explanation-label {
  color: #333;
  font-weight: 600;
  font-size: 14px;
  min-width: 100px;
}

.explanation-text {
  color: #555;
  font-size: 14px;
  line-height: 1.6;
  flex: 1;
}

/* 统一表格样式 */
.compliance-table,
.process-table,
.notice-table {
  width: 100% !important;
  border-collapse: collapse !important;
  font-size: 13px !important;
  background: white !important;
  margin: 0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.compliance-table th,
.process-table th,
.notice-table th {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  padding: 15px 12px !important;
  text-align: center !important;
  border: 1px solid #357abd !important;
  font-size: 13px !important;
  line-height: 1.4 !important;
}

.compliance-table td,
.process-table td,
.notice-table td {
  padding: 12px !important;
  border: 1px solid #e0e0e0 !important;
  vertical-align: top !important;
  background: white !important;
  color: #333 !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
}

.compliance-table tbody tr:nth-child(even),
.process-table tbody tr:nth-child(even),
.notice-table tbody tr:nth-child(even) {
  background: #f8f9fa !important;
}

.compliance-table:hover tbody tr,
.process-table:hover tbody tr,
.notice-table:hover tbody tr {
  background: white !important;
}

.compliance-table tbody tr:nth-child(even):hover,
.process-table tbody tr:nth-child(even):hover,
.notice-table tbody tr:nth-child(even):hover {
  background: #f8f9fa !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .process-steps {
    flex-direction: column;
    gap: 20px;
  }
  
  .step-card {
    max-width: 100%;
  }
  
  .compliance-content {
    padding: 20px;
  }
  
  .option-item,
  .explanation-item {
    flex-direction: column;
    gap: 5px;
  }
  
  .option-label,
  .explanation-label {
    min-width: auto;
  }
  
  .china-address {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
