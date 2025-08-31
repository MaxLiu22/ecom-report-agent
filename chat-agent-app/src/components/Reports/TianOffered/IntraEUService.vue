<template>
  <div class="container">
    <!-- Section 1: 高潜力选品 -->
    <div class="section">
      <h2 class="section-title">双边入库机会1: 高潜力选品</h2>
      <div class="section-content">
        <div class="feature-box">
          <h3>📊 选品指南针 (MPG)</h3>
          <p>通过选品指南针了解英国和欧盟之间的跨站点选品同步机会。选品指南针基于卖家来源商城销售情况，及目标商城需求，提供ASIN推荐，及销售预测，类似商品价格/评价/排名/搜索量/点击量等关键信息。</p>
          <div class="path-info">
            <strong>路径：</strong>卖家平台 → 菜单 → 增长 → 选品指南针
          </div>
        </div>
        <div class="images-container" v-if="slide13Images.length > 0">
          <div class="slide-image" v-for="(image, index) in slide13Images" :key="index">
            <img :src="image" alt="选品指南针界面" />
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2: 全球拓展大礼包 -->
    <div class="section">
      <h2 class="section-title">双边入库机会2: 全球拓展大礼包</h2>
      <div class="section-content">
        <div class="gift-package">
          <p>全球拓展大礼包为定向邀请制计划，旨在通过向卖家提供费用代金券来帮助卖家在亚马逊欧洲其他站点销售商品。</p>
          <div class="benefits">
            <div class="benefit-item">
              <span class="number">1</span>
              <p>拓展亚马逊建议的高潜ASIN</p>
            </div>
            <div class="benefit-item">
              <span class="number">2</span>
              <p>获得对应代金券金额</p>
            </div>
            <div class="benefit-item">
              <span class="number">3</span>
              <p>一次性获取代金券，用于未来一年的配送费及佣金抵扣</p>
            </div>
          </div>
          <div class="path-info">
            <strong>路径：</strong>卖家平台 → 首页卡片"随时查看您的节省金额" → 全球拓展大礼包
          </div>
        </div>
        <div class="images-container" v-if="slide14Images.length > 0">
          <div class="slide-image" v-for="(image, index) in slide14Images" :key="index">
            <img :src="image" alt="全球拓展大礼包" />
          </div>
        </div>
      </div>
    </div>

    <!-- Section 3: 远程配送介绍 -->
    <div class="section">
      <h2 class="section-title">英国和欧盟之间的远程配送介绍</h2>
      <div class="section-content">
        <div class="features-grid">
          <div class="feature-card">
            <h4>📦 存储配送</h4>
            <p>将商品存放在英国的亚马逊运营中心，配送欧盟商城的订单（或反向）</p>
          </div>
          <div class="feature-card">
            <h4>⭐ Prime 标志</h4>
            <p>通过 EURF 配送的商品将带有Prime 标志，并享受正常FBA政策</p>
          </div>
          <div class="feature-card">
            <h4>💰 无需VAT</h4>
            <p>不需要在目的地国家有 VAT 税号，进口关税由买家承担</p>
          </div>
          <div class="feature-card">
            <h4>🔄 智能切换</h4>
            <p>FBA 优先使用本地库存，本地库存缺货时，远程配送自动开启</p>
          </div>
        </div>
        <div class="note">
          <p><strong>注意：</strong>爱尔兰为特殊场景，爱尔兰本地库存缺货后，英国远程配送库存优先级高于欧盟库存(PanEU/EFN)</p>
        </div>
      </div>
    </div>

    <!-- Section 4: 如何开启 -->
    <div class="section">
      <h2 class="section-title">如何开启英国和欧盟之间的远程配送</h2>
      <div class="section-content">
        <div class="setup-steps">
          <div class="step">
            <span class="step-number">1</span>
            <p>登录卖家平台</p>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <p>菜单 → 库存</p>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <p>亚马逊物理远程配送</p>
          </div>
          <div class="step">
            <span class="step-number">4</span>
            <p>开启任意路向的远程配送</p>
          </div>
        </div>
        <div class="images-container" v-if="slide16Images.length > 0">
          <div class="slide-image" v-for="(image, index) in slide16Images" :key="index">
            <img :src="image" alt="开启远程配送" />
          </div>
        </div>
      </div>
    </div>

    <!-- Section 5: 如何管理 -->
    <div class="section">
      <h2 class="section-title">如何管理英国和欧盟之间的远程配送</h2>
      <div class="section-content">
        <div class="management-features">
          <div class="mgmt-card">
            <h4>📊 状态查看</h4>
            <p>查看选品远程配送状态，并ASIN level管理是否开启远程配送</p>
          </div>
          <div class="mgmt-card">
            <h4>🔧 问题修复</h4>
            <p>查看选品无法使用EURF的原因并参考建议措施修复问题</p>
          </div>
          <div class="mgmt-card">
            <h4>📈 订单分析</h4>
            <p>查看远程配送订单，推荐将销售良好的选品本地入库</p>
          </div>
        </div>
        <div class="path-info">
          <strong>路径：</strong>卖家平台 → 菜单 → 库存 → 亚马逊物理远程配送 → 管理商品报告
        </div>
        <div class="images-container" v-if="slide17Images.length > 0">
          <div class="slide-image" v-for="(image, index) in slide17Images" :key="index">
            <img :src="image" alt="管理远程配送" />
          </div>
        </div>
      </div>
    </div>

    <!-- Section 6: 升级为本地入库 -->
    <div class="section">
      <h2 class="section-title">双边入库机会3: 远程配送升级为本地入库</h2>
      <div class="section-content">
        <div class="upgrade-benefits">
          <div class="benefit-box">
            <h4>💡 机会识别</h4>
            <p>若卖家已开通英国和欧盟之间的远程配送，且产生一定订单，则证明商品在目标商城存在销售潜力</p>
          </div>
          <div class="benefit-box">
            <h4>💰 成本节省</h4>
            <p>通过本地入库节省配送费，优化配送时效，提升转化率</p>
          </div>
        </div>
        <div class="case-study">
          <h4>📊 卖家应用案例</h4>
          <p>卖家有4个ASIN在过去30天产生远程配送订单，若转为本地配送，预计节省$243配送费，且可利用本地配送时效提升转化率。</p>
        </div>
        <div class="images-container" v-if="slide18Images.length > 0">
          <div class="slide-image" v-for="(image, index) in slide18Images" :key="index">
            <img :src="image" alt="升级为本地入库" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntraEUService',
  data() {
    return {
      slide13Images: [],
      slide14Images: [],
      slide16Images: [],
      slide17Images: [],
      slide18Images: []
    }
  },
  mounted() {
    // 在实际使用时，这里可以从API或props获取图片数据
    // 或者直接在data中定义base64图片数据
    this.loadImages();
  },
  methods: {
    loadImages() {
      // 示例：从外部加载图片数据
      // 在实际项目中，可以通过props传入或从API获取
      console.log('Images loaded');
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 22px 16px 10px;
  font-family: 'Microsoft YaHei', 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(135deg, #fafbfc 0%, #eef1f4 100%);
  color: #2c3e50;
  line-height: 1.5;
  min-height: initial;
}

.section {
  background: #fff;
  margin-bottom: 26px;
  border-radius: 10px;
  box-shadow: 0 4px 14px -4px rgba(0,0,0,0.08);
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.section-title {
  background: linear-gradient(90deg, #4a5568, #2d3748);
  color: #fff;
  padding: 14px 18px;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: .5px;
}

.section-content {
  padding: 18px 20px 20px;
}

.feature-box {
  background: #f8f9fa;
  padding: 16px 18px;
  border-radius: 10px;
  border-left: 4px solid #4a5568;
  margin-bottom: 14px;
}

.feature-box h3 {
  color: #2d3748;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight:600;
}

.path-info {
  background: #e2e8f0;
  padding: 10px 12px;
  border-radius: 6px;
  margin: 14px 0 4px;
  border-left: 4px solid #4a5568;
  font-size:12px;
  line-height:1.45;
}

.gift-package {
  text-align: center;
  margin-bottom: 12px;
  font-size:13px;
  line-height:1.5;
}

.benefits {
  display: flex;
  justify-content: space-around;
  margin: 16px 0 10px;
  flex-wrap: wrap;
  gap: 14px 20px;
}

.benefit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 180px;
  font-size:12px;
}

.number {
  background: #4a5568;
  color: #fff;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 6px;
  font-size:13px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px 16px;
  margin-bottom: 14px;
}

.feature-card {
  background: #f8f9fa;
  padding: 14px 12px 12px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: all 0.25s ease;
}

.feature-card:hover {
  border-color: #4a5568;
  transform: translateY(-5px);
}

.feature-card h4 {
  color: #2d3748;
  margin-bottom: 6px;
  font-size:14px;
}

.note {
  background: #fef5e7;
  padding: 10px 12px;
  border-radius: 6px;
  border-left: 4px solid #f6ad55;
  margin-bottom: 10px;
  font-size:12px;
  line-height:1.45;
}

.setup-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px 16px;
  margin-bottom: 16px;
}

.step {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f9fa;
  padding: 10px 12px;
  border-radius: 8px;
  font-size:12px;
}

.step-number {
  background: #4a5568;
  color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight:600;
  flex-shrink: 0;
  font-size:13px;
}

.management-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 14px 16px;
  margin-bottom: 12px;
}

.mgmt-card {
  background: #f8f9fa;
  padding: 14px 16px;
  border-radius: 8px;
  border-left: 4px solid #4a5568;
  font-size:12px;
}

.mgmt-card h4 {
  color: #2d3748;
  margin-bottom: 6px;
  font-size:14px;
}

.upgrade-benefits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px 16px;
  margin-bottom: 12px;
}

.benefit-box {
  background: linear-gradient(135deg, #cbd5e0, #a0aec0);
  padding: 16px 18px;
  border-radius: 10px;
  color: #2d3748;
  font-size:12px;
}

.benefit-box h4 {
  margin-bottom: 8px;
  color: #2d3748;
  font-size:14px;
}

.case-study {
  background: #fef5e7;
  padding: 14px 16px;
  border-radius: 8px;
  border-left: 4px solid #f6ad55;
  margin-bottom: 14px;
  font-size:12px;
  line-height:1.5;
}

.case-study h4 {
  color: #744210;
  margin-bottom: 6px;
  font-size:14px;
}

.images-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px 16px;
  margin: 18px 0 4px;
}

.slide-image {
  text-align: center;
}

.slide-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px -2px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
}

@media (max-width: 768px) {
  .container { padding: 16px 10px 8px; }

  .section-title { padding: 12px 14px; font-size:16px; }

  .section-content { padding: 14px 14px 16px; }

  .benefits { flex-direction: column; align-items: center; }

  .setup-steps { grid-template-columns: 1fr; }

  .images-container { grid-template-columns: 1fr; }
}
</style>
