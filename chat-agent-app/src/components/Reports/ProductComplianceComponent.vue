<template>
  <div class="product-compliance-container">
    <!-- 第一部分：产品合规简介 -->
    <div class="compliance-section">
      <div class="compliance-header">
        <div class="orange-arrow">▶</div>
        <h2 class="compliance-title">产品合规简介</h2>
      </div>

      <div class="compliance-content">
        <!-- 进度条 -->
        <div class="progress-bar">
          <div class="progress-step completed">
            <span class="step-text">欧洲站点拓展评估</span>
          </div>
          <div class="progress-arrow">→</div>
          <div class="progress-step current">
            <span class="step-text">拓展解决方案定制及解答</span>
          </div>
          <div class="progress-arrow">→</div>
          <div class="progress-step">
            <span class="step-text">政策更新与指导</span>
          </div>
          <div class="progress-arrow">→</div>
          <div class="progress-step">
            <span class="step-text">确定行动计划</span>
          </div>
        </div>

        <!-- 产品合规简介标题 -->
        <div class="intro-title">
          <h1>产品合规简介</h1>
        </div>
      </div>
    </div>

    <!-- 第二部分：需要符合产品合规的情况 -->
    <div class="compliance-section">
      <div class="compliance-header">
        <div class="orange-arrow">▶</div>
        <h2 class="compliance-title">需要符合产品合规的情况</h2>
      </div>

      <div class="compliance-content">
        <!-- 有销售状态 -->
        <div class="sales-status">
          <div class="status-badge">有销售</div>
        </div>

        <!-- 核心说明 -->
        <div class="core-message">
          <div class="main-text">无论是否储存商品（本地配送或远程配送）</div>
          <div class="sub-text">只要在当地销售就要进行产品合规</div>
        </div>
      </div>
    </div>

    <!-- 第三部分：欧洲贸易&产品合规基础信息 -->
    <div class="compliance-section">
      <div class="compliance-header">
        <div class="orange-arrow">▶</div>
        <h2 class="compliance-title">欧洲贸易&产品合规基础信息</h2>
      </div>

      <div class="compliance-content">
        <!-- 英国站信息 -->
        <div class="uk-section">
          <div class="country-header">
            <div class="uk-flag">🇬🇧</div>
            <h3 class="country-title">英国站</h3>
          </div>

          <div class="compliance-info">
            <h4 class="info-title">合规服务运营商尽职调查方案（FHDDS）</h4>
            <div class="warning-text">不满足要求将会被限制创建英国新货件！</div>
            
            <div class="fhdds-description">
              <p>FHDDS（Fulfilment House Due Diligence Scheme）要求您需要提供从 2024 年起进入英国亚马逊运营中心的商品的进口条目编号（IEN），如果您未在货物到达英国亚马逊运营中心后的 60 天内提交 IEN 或适当原因代码，则您将会被限制创建英国新货件。</p>
            </div>

            <div class="fhdds-links">
              <div class="link-item">
                <span class="checkmark">✓</span>
                  <span class="link-text">
                    了解详细 FHDDS 
                    <a
                      href="https://m.media-amazon.com/images/G/01/Central-compliance-team/FHDDSComplianceguidance.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="link"
                    >合规步骤</a>
                  </span>
              </div>
              <div class="link-item">
                <span class="checkmark">✓</span>
                <span class="link-text">FHDDS <a href="https://m.media-amazon.com/images/G/01/Central-compliance-team/FHDDS_Seller_FAQ.pdf" target="_blank" rel="noopener noreferrer" class="link">常见问题</a></span>
              </div>
              <div class="link-item">
                <span class="checkmark">✓</span>
                <span class="link-text">FHDDS <a href="https://sellercentral.amazon.de/help/hub/reference/external/G97ZA85WXA334DR2?locale=zh-CN" target="_blank" rel="noopener noreferrer" class="link">帮助页面</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第四部分：欧洲产品合规基础信息 -->
    <div class="compliance-section">
      <div class="compliance-header">
        <div class="orange-arrow">▶</div>
        <h2 class="compliance-title">欧洲产品合规基础信息</h2>
      </div>

      <div class="compliance-content">
        <!-- 欧盟国家标志 -->
        <div class="eu-countries">
          <div class="country-flags">
            <div class="flag-item">🇩🇪</div>
            <div class="flag-item">🇫🇷</div>
            <div class="flag-item">🇮🇹</div>
            <div class="flag-item">🇪🇸</div>
            <div class="flag-item">🇳🇱</div>
            <div class="flag-item">🇸🇪</div>
            <div class="flag-item">🇵🇱</div>
          </div>
          
          <div class="eu-title">
            <h3>欧盟站</h3>
            <p class="eu-subtitle">德国、法国、意大利、西班牙、荷兰、瑞典、波兰、比利时</p>
          </div>
        </div>

        <!-- GPSR通用产品安全法规 -->
        <div class="gpsr-section">
          <h4 class="regulation-title">✓ 通用产品安全法规（<a href="https://m.media-amazon.com/images/G/01/Central-compliance-team/GPSR_Guide_Book.pdf" target="_blank" rel="noopener noreferrer" class="link">GPSR</a>）</h4>
          
          <table class="compliance-table">
            <thead>
              <tr>
                <th>产品类型要求</th>
                <th>注意事项</th>
                <th>是否需要上传信息？</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1. 欧盟负责人</td>
                <td>需要合适名称、邮政地址、电子邮件地址和URL；需要用欧盟官方语言之一（英语、德语、法语等）</td>
                <td>Y</td>
              </tr>
              <tr>
                <td>2. 制造商</td>
                <td>需要合适名称、邮政地址、电子邮件地址和URL；需要用欧盟官方语言之一（英语、德语、法语等）</td>
                <td>Y</td>
              </tr>
              <tr>
                <td>3. 警告和安全信息</td>
                <td>如反需要安全警告、化学安全警告等；需要用相应语言提供述语言</td>
                <td>Y</td>
              </tr>
              <tr>
                <td>4. 至少一个商品编码</td>
                <td>需要明确标识：如FNSKU、GTIN、EAN、产品型号、批次、序列号或其他明确标识的技术编码</td>
                <td>N</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- EPR欧盟生产者责任延伸 -->
        <div class="epr-section">
          <h4 class="regulation-title">✓ 欧盟生产者责任延伸（<a href="https://sellercentral.amazon.de/help/hub/reference/external/GYDCAK9ZR6VJH2X3?locale=zh-CN&ld=ASCNAGSDirect&ldStackingCodes=ASCNAGSDirect" target="_blank" rel="noopener noreferrer" class="link">EPR</a>）</h4>
          
          <div class="epr-items">
            <div class="epr-item">
              <span class="bullet">•</span>
              <span class="epr-text">
                <strong><a href="https://sellercentral.amazon.es/help/hub/reference/external/GPVDATLHQ6PRQNSW?locale=zh-CN" target="_blank" rel="noopener noreferrer" class="link">欧盟电池法规（EU Batteries）</a></strong><br>
                自2025年8月18日起，亚马逊将停售在【德国、典典、波兰、荷兰】的不合规商品。【法国】可通过亚马逊提供的代付服务完成合规，其他欧盟国家未来可能会允许亚马逊提供代付服务（具体待定）。
              </span>
            </div>
            
            <div class="epr-item">
              <span class="bullet">•</span>
              <span class="epr-text"><strong>德国包装法（<a href="https://sellercentral.amazon.de/help/hub/reference/external/G6SQMSCSKWJQEPJQ?locale=zh-CN" target="_blank" rel="noopener noreferrer" class="link">LUCID</a>）</strong></span>
            </div>
            
            <div class="epr-item">
              <span class="bullet">•</span>
              <span class="epr-text"><strong>德国电气与电子设备废料指令（<a href="https://sellercentral.amazon.de/help/hub/reference/external/GY97WLQDLFH2SNBY?locale=zh-CN" target="_blank" rel="noopener noreferrer" class="link">WEEE</a>）</strong></span>
            </div>
            
            <div class="epr-item">
              <span class="bullet">•</span>
              <span class="epr-text"><strong>法国（<a href="https://sellercentral.amazon.de/help/hub/reference/external/GAZUTQC8RXT769H7?locale=zh-CN" target="_blank" rel="noopener noreferrer" class="link">FR EPR</a>，可代付）</strong></span>
            </div>
            
            <div class="epr-item">
              <span class="bullet">•</span>
              <span class="epr-text"><strong>西班牙（<a href="https://sellercentral.amazon.de/help/hub/reference/external/GZPPCN666MQJ9PQ8?locale=zh-CN" target="_blank" rel="noopener noreferrer" class="link">ES EPR</a>，可代付）</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第五部分：泛欧洲拓展增值服务政策更新与解答 -->
     
     <!-- PanEU政策更新组件 -->
     <PanEUPolicyUpdateComponent />
   </div>
 </template>
 
 <script setup>
 import PanEUPolicyUpdateComponent from './PanEUPolicyUpdateComponent.vue'
 
 // 组件名称
 defineOptions({
   name: 'ProductComplianceComponent'
 })
 </script>

<style scoped>
.product-compliance-container {
  margin: 20px 0;
  width: 100%;
  box-sizing: border-box;
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
  background: #232f3e;
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  gap: 12px;
}

.orange-arrow {
  color: #FFFFFF;
  font-size: 20px;
  font-weight: bold;
}

.compliance-title {
  color: #ffffff;
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
}

.compliance-content {
  padding: 30px;
}

/* 进度条样式 */
.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  flex-wrap: wrap;
  gap: 10px;
}

.progress-step {
  background: #e8e8e8;
  color: #666;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 0;
  position: relative;
  min-width: 150px;
  text-align: center;
}

.progress-step.completed {
  background: #2c5aa0;
  color: white;
}

.progress-step.current {
  background: #FF8C00;
  color: white;
}

.progress-arrow {
  color: #ccc;
  font-size: 18px;
  font-weight: bold;
}

/* 产品合规简介标题 */
.intro-title {
  text-align: center;
  margin: 50px 0;
}

.intro-title h1 {
  color: #333;
  font-size: 48px;
  font-weight: 600;
  margin: 0;
}

/* 销售状态样式 */
.sales-status {
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
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
  line-height: 1.4;
}

.sub-text {
  color: #333;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
}

/* 英国站样式 */
.uk-section {
  margin: 30px 0;
}

.country-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.uk-flag {
  font-size: 32px;
}

.country-title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.compliance-info {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border-left: 4px solid #FF8C00;
}

.info-title {
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.warning-text {
  color: #dc3545;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 15px;
}

.fhdds-description {
  margin: 15px 0 20px 0;
}

.fhdds-description p {
  color: #555;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.fhdds-links {
  margin-top: 20px;
}

.link-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 8px 0;
}

.checkmark {
  color: #00aa66;
  font-weight: bold;
  font-size: 14px;
  margin-top: 2px;
}

.link-text {
  color: #555;
  font-size: 14px;
  line-height: 1.5;
}

.link {
  color: #007bff;
  text-decoration: underline;
}

/* 欧盟国家样式 */
.eu-countries {
  margin: 30px 0;
}

.country-flags {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.flag-item {
  font-size: 32px;
  padding: 10px;
  border-radius: 50%;
  background: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.eu-title {
  text-align: center;
}

.eu-title h3 {
  color: #FF8C00;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.eu-subtitle {
  color: #555;
  font-size: 14px;
  margin: 0;
}

/* GPSR表格样式 */
.gpsr-section {
  margin: 30px 0;
}

.regulation-title {
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
}

.compliance-table {
  width: 100% !important;
  border-collapse: collapse !important;
  font-size: 13px !important;
  background: white !important;
  margin: 0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  table-layout: fixed;
  word-wrap: break-word;
}

.compliance-table th {
  background: #232f3e;
  color: white !important;
  font-weight: 600 !important;
  padding: 15px 12px !important;
  text-align: center !important;
  border: 1px solid #e0e0e0 !important;
  font-size: 13px !important;
  line-height: 1.4 !important;
}

.compliance-table td {
  padding: 12px !important;
  border: 1px solid #e0e0e0 !important;
  vertical-align: top !important;
  background: white !important;
  color: #333 !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
}

.compliance-table tbody tr:nth-child(even) {
  background: #f8f9fa !important;
}

.compliance-table:hover tbody tr {
  background: white !important;
}

.compliance-table tbody tr:nth-child(even):hover {
  background: #f8f9fa !important;
}

/* EPR样式 */
.epr-section {
  margin: 30px 0;
}

.epr-items {
  margin-top: 15px;
}

.epr-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 15px 0;
  line-height: 1.6;
}

.bullet {
  color: #333;
  font-weight: bold;
  margin-top: 3px;
  min-width: 8px;
}

.epr-text {
  color: #555;
  font-size: 14px;
  line-height: 1.6;
  flex: 1;
}

.epr-text strong {
  color: #333;
  font-weight: 600;
}

/* 政策更新标题 */
.policy-title {
  text-align: center;
  margin: 50px 0;
}

.policy-title h1 {
  color: #333;
  font-size: 36px;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .progress-bar {
    flex-direction: column;
    gap: 10px;
  }
  
  .progress-arrow {
    transform: rotate(90deg);
  }
  
  .progress-step {
    min-width: auto;
    width: 100%;
  }
  
  .country-flags {
    justify-content: center;
  }
  
  .flag-item {
    font-size: 24px;
    padding: 8px;
  }
  
  .intro-title h1 {
    font-size: 32px;
  }
  
  .policy-title h1 {
    font-size: 24px;
  }
  
  .main-text {
    font-size: 20px;
  }
  
  .sub-text {
    font-size: 18px;
  }
  
  .compliance-content {
    padding: 20px;
  }
  
  .compliance-table {
    font-size: 12px;
  }
  
  .compliance-table th,
  .compliance-table td {
    padding: 8px;
  }
}
</style>
