<template>
  <div class="content-panel">
    <!-- 折叠合规扩展内容 -->
    <div class="accordion" style="margin-top: 32px">
      <!-- 1.1 荷兰站listing同步 -->
      <div class="acc-item" :class="{ open: openSections.nlListing }">
        <button
          class="acc-header"
          @click="toggleSection('nlListing')"
          :aria-expanded="openSections.nlListing.toString()"
          aria-controls="panel-nlListing"
        >
          <span class="acc-index">1.1</span>
          <span class="acc-title">荷兰站 Listing 同步</span>
          <span class="acc-icon" aria-hidden="true"></span>
        </button>
        <div class="acc-body" id="panel-nlListing" v-show="openSections.nlListing">
          <!-- <p class="acc-text">
            说明：用于将主要 EU5（DE/FR/IT/ES/UK）已验证的 ASIN / Listing 信息快速同步到
            NL，降低重复创建工作量并覆盖长尾流量。
          </p>
          <ul class="acc-list">
            <li>检查多国库存/ PanEU 状态，确保可配送 NL</li>
            <li>统一翻译策略：优先机器翻译 + 人工关键词微调</li>
            <li>常见阻碍：品牌限制 / 变体结构不一致 / 属性缺失</li>
            <li>建议：批量处理（模板上传）→ 监控抛错 → 增量同步</li>
          </ul> -->
          <div class="policy-update-card">
            <h2 class="main-title">政策更新</h2>

            <div class="content-area">
              <h3 class="sub-title">PanEU正式纳入荷兰站</h3>

              <div class="info-box-yellow">
                <div class="info-line">
                  <svg
                    class="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20 12v10H4V12"></path>
                    <path d="M12 2a4 4 0 0 1 4 4v6H8V6a4 4 0 0 1 4-4z"></path>
                    <path d="M2 7h20"></path>
                  </svg>
                  <span>您的荷兰同步机会</span>
                </div>
                <div class="info-line">
                  <span>需要同步到NL的ASIN数量：</span>
                  <span class="asin-badge">1.5k</span>
                </div>
                <div class="info-line">
                  <span>同步后可享受本地配送费，</span>
                  <span class="highlight-text">平均比跨境配送费低43%</span>
                </div>
              </div>

              <div class="info-box-green">
                <svg
                  class="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>基于您上传的PanEU数据分析</span>
              </div>

              <p class="description">
                从 2025 年 7 月 22 日起，亚马逊物流欧洲整合服务 (Pan-European FBA)
                将要求您在荷兰（以及法国、德国、意大利和西班牙之外）也必须为所有新的亚马逊物流欧洲整合服务
                (Pan-European FBA)
                商品设置有效的报价。这项要求将在今年晚些时候扩展到所有您现有的亚马逊物流欧洲整合服务
                (Pan-European FBA) 商品。
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 1.2 意大利合规政策 -->
      <div class="acc-item" :class="{ open: openSections.itCompliance }">
        <button
          class="acc-header"
          @click="toggleSection('itCompliance')"
          :aria-expanded="openSections.itCompliance.toString()"
          aria-controls="panel-itCompliance"
        >
          <span class="acc-index">1.2</span>
          <span class="acc-title">意大利合规政策</span>
          <span class="acc-icon" aria-hidden="true"></span>
        </button>
        <div class="acc-body" id="panel-itCompliance" v-show="openSections.itCompliance">
          <!-- 复用 Tab3 的政策更新图片板块，调整为本组件适配的样式 -->
          <div class="content-header">
            <h2>📣 政策更新</h2>
            <p class="content-description">最新的欧盟政策变化、官方来源与业务影响提示</p>
          </div>
          <div class="policy-updates" style="margin-top: 10px">
            <div class="policy-card">
              <a
                href="https://mp.weixin.qq.com/s?__biz=MzkxNzI4NjI5OQ==&mid=2247619861&idx=1&sn=817af8fb84f74681699dc32d95cd6f30&chksm=c0faaf330e446a2765b87002bde225f90919cd3ce9a9cebcc32ddbddfa2a48421e1c89592081&from=industrynews&version=4.1.7.6056&platform=win#rd"
                target="_blank"
                rel="noopener noreferrer"
                class="policy-link"
              >
                <img src="/src/assets/政策更新.png" alt="政策更新" class="policy-image" />
              </a>
              <div class="img-caption">点击图片查看原文（微信公众平台）</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 1.3 英国 FHDDS -->
      <div class="acc-item" :class="{ open: openSections.ukFHDDS }">
        <button
          class="acc-header"
          @click="toggleSection('ukFHDDS')"
          :aria-expanded="openSections.ukFHDDS.toString()"
          aria-controls="panel-ukFHDDS"
        >
          <span class="acc-index">1.3</span>
          <span class="acc-title">英国 FHDDS</span>
          <span class="acc-icon" aria-hidden="true"></span>
        </button>
        <div class="acc-body" id="panel-ukFHDDS" v-show="openSections.ukFHDDS">
          <p class="acc-text">
            FHDDS (Fulfilled by Amazon Dangerous Goods / Hazmat 相关流程 &amp; 申报体系) 关键点：
          </p>
          <ul class="acc-list">
            <li>分类：电池 / 化学品 / 喷雾气雾 / 磁性 / 易燃液体</li>
            <li>所需资料：SDS（近 36 个月内）、UN 编码、成分、闪点等</li>
            <li>常见拒绝：资料缺失、UN 代码不匹配、属性未结构化</li>
            <li>建议：集中整理危险品档案库 → 复用至 EU 其他站点</li>
          </ul>
          <p class="acc-tip">
            提示：上传 SDS 后等待系统审核，可用批量工具加速；监控“受限库存”模块警报。
          </p>
        </div>
      </div>

      <!-- 1.4 其他合规政策 -->
      <div class="acc-item" :class="{ open: openSections.otherCompliance }">
        <button
          class="acc-header"
          @click="toggleSection('otherCompliance')"
          :aria-expanded="openSections.otherCompliance.toString()"
          aria-controls="panel-otherCompliance"
        >
          <span class="acc-index">1.4</span>
          <span class="acc-title">其他合规政策</span>
          <span class="acc-icon" aria-hidden="true"></span>
        </button>
        <div class="acc-body" id="panel-otherCompliance" v-show="openSections.otherCompliance">
          <h2>📣 合规风险</h2>
          <p class="content-description">下列模块展示物流方案、PanEU政策、产品与VAT合规信息</p>
          <ProductComplianceComponent />
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import EUInternalSolutionsComponent from './EUInternalSolutionsComponent.vue'
import PanEUPolicyUpdateComponent from './PanEUPolicyUpdateComponent.vue'
import ProductComplianceComponent from './ProductComplianceComponent.vue'
import VATComplianceComponent from './VATComplianceComponent.vue'
import VATInfoComponent from './VATInfoComponent.vue'

export default {
  name: 'Tab7',
  components: {
    EUInternalSolutionsComponent,
    PanEUPolicyUpdateComponent,
    ProductComplianceComponent,
    VATComplianceComponent,
    VATInfoComponent,
  },
  data() {
    return {
      openSections: {
        nlListing: false,
        itCompliance: false,
        ukFHDDS: false,
        otherCompliance: false,
      },
    }
  },
  methods: {
    toggleSection(key) {
      if (this.openSections[key] !== undefined) {
        this.openSections[key] = !this.openSections[key]
      }
    },
  },
}
</script>

<style scoped>
.content-panel {
  background-color: #ffffff;
  margin: 0;
  padding: 24px;
  height: fit-content;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
}

.content-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-header h2 {
  margin: 0 0 8px 0;
  color: #232f3e;
  font-size: 24px;
  font-weight: 600;
}

.content-description {
  margin: 0;
  color: #666666;
  font-size: 14px;
  line-height: 1.5;
}

.second-block {
  margin-top: 48px; /* 与上方模块拉开距离 */
}

.content-body {
  color: #333333;
  height: fit-content;
}

/* 政策更新图片区域 */
.policy-card {
  text-align: center;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease;
  position: relative;
}

.policy-card:hover {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
  transform: translateY(-2px);
}

.policy-link {
  display: inline-block;
  cursor: pointer;
  width: 100%;
  max-width: 1200px;
}

.policy-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.policy-card:hover .policy-image {
  transform: scale(1.02);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.25);
}

.img-caption {
  margin-top: 12px;
  font-size: 12px;
  color: #666;
  letter-spacing: 0.5px;
}

/* 合规模块布局 */
.compliance-modules {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 8px;
}

.module-item {
  background: transparent; /* 内部组件自带卡片样式 */
}

/* Accordion 样式 */
.accordion {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.acc-item {
  border: 1px solid #e3e6ea;
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}
.acc-item.open {
  border-color: #ff9900;
  box-shadow: 0 4px 14px -4px rgba(0, 0, 0, 0.15);
}
.acc-header {
  width: 100%;
  background: linear-gradient(90deg, #232f3e, #2f3d4a);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  position: relative;
  text-align: left;
}
.acc-item.open .acc-header {
  background: linear-gradient(90deg, #ff9900, #ffad33);
  color: #232f3e;
}
.acc-index {
  background: #ff9900;
  color: #232f3e;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
}
.acc-item.open .acc-index {
  background: #232f3e;
  color: #ff9900;
}
.acc-title {
  flex: 1;
}
.acc-icon {
  position: relative;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
.acc-icon:before,
.acc-icon:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  background: currentColor;
  border-radius: 1px;
  transition: transform 0.28s ease, opacity 0.28s ease;
}
/* 水平线 */
.acc-icon:before {
  width: 100%;
  height: 2px;
  transform: translate(-50%, -50%);
}
/* 垂直线 */
.acc-icon:after {
  height: 100%;
  width: 2px;
  transform: translate(-50%, -50%);
}
/* 展开时收起竖线，形成减号 */
.acc-item.open .acc-icon:after {
  transform: translate(-50%, -50%) scaleY(0);
  opacity: 0;
}
.acc-body {
  padding: 16px 20px 20px;
  background: #fafafa;
  line-height: 1.55;
  font-size: 13px;
  color: #333;
  border-top: 1px solid #e8e8e8;
}
.acc-text {
  margin: 0 0 12px;
}
.acc-list {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.acc-list.ordered {
  list-style: decimal;
  padding-left: 22px;
}
.acc-tip {
  background: #fff8eb;
  border: 1px solid #ffe3bf;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 12px;
  color: #7a4a00;
  margin: 14px 0 0;
}

/* ===================== 政策更新卡片 (Accordion 内自定义卡片) ===================== */
.policy-update-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #e3e6ea;
  border-radius: 14px;
  padding: 26px 28px 30px;
  box-shadow:
    0 4px 14px -4px rgba(0, 0, 0, 0.12),
    0 2px 6px -2px rgba(0, 0, 0, 0.08);
  transition:
    box-shadow 0.35s ease,
    transform 0.35s ease,
    border-color 0.35s ease;
  overflow: hidden;
}
.policy-update-card:before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 85% 15%, rgba(255, 153, 0, 0.18), transparent 60%),
    linear-gradient(135deg, rgba(255, 153, 0, 0.08), rgba(35, 47, 62, 0));
  pointer-events: none;
  opacity: 0.85;
}
.policy-update-card:hover {
  border-color: #ff9900;
  box-shadow:
    0 10px 28px -6px rgba(0, 0, 0, 0.18),
    0 4px 12px -3px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}
.policy-update-card:active {
  transform: translateY(0);
}

.policy-update-card .main-title {
  margin: 0 0 18px;
  font-size: 22px;
  letter-spacing: 0.5px;
  font-weight: 600;
  color: #232f3e;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
}
.policy-update-card .main-title:after {
  content: '';
  height: 4px;
  width: 46px;
  background: linear-gradient(90deg, #ff9900, #ffb84d);
  border-radius: 4px;
  display: block;
  margin-top: 8px;
}

.policy-update-card .content-area {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.policy-update-card .sub-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #ff9900;
  letter-spacing: 0.3px;
}

/* 信息盒 - 黄色 */
.info-box-yellow {
  background: linear-gradient(135deg, #fff8eb, #fff3db 55%, #ffe8bd);
  border: 1px solid #ffdca0;
  border-radius: 12px;
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  box-shadow:
    0 2px 6px -2px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.06);
}
.info-box-yellow:before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(140deg, rgba(255, 153, 0, 0.22), rgba(255, 186, 73, 0) 55%);
  mix-blend-mode: multiply;
  opacity: 0.55;
}

/* 信息盒 - 绿色提示 */
.info-box-green {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #256c37;
  background: linear-gradient(90deg, #e8f5e9, #d8f0df);
  border: 1px solid #b2e2c1;
  padding: 8px 12px;
  border-radius: 10px;
  width: fit-content;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.info-box-green .icon {
  color: #1d5f30;
}

.info-line {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #604a20;
  letter-spacing: 0.2px;
  line-height: 1.4;
}
.info-line .icon {
  flex-shrink: 0;
  color: #cc7a00;
}

.asin-badge {
  background: #232f3e;
  color: #ffb84d;
  padding: 2px 10px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}
.highlight-text {
  color: #d9480f;
  font-weight: 600;
  background: linear-gradient(90deg, #ffe1cc, #ffd4b3);
  padding: 2px 6px;
  border-radius: 6px;
}

.policy-update-card .description {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: #333;
  letter-spacing: 0.2px;
  background: #fafafa;
  border: 1px solid #ececec;
  padding: 14px 16px;
  border-radius: 10px;
  box-shadow: inset 0 0 0 1px #f5f5f5;
}

/* 轻量缩略模式（后期可复用） */
.policy-update-card.compact {
  padding: 20px 22px 24px;
}
.policy-update-card.compact .main-title {
  font-size: 20px;
}
.policy-update-card.compact .sub-title {
  font-size: 16px;
}

@media (max-width: 992px) {
  .policy-update-card {
    padding: 22px 22px 26px;
  }
  .policy-update-card .main-title {
    font-size: 20px;
  }
  .policy-update-card .sub-title {
    font-size: 17px;
  }
}
@media (max-width: 768px) {
  .policy-update-card {
    padding: 18px 18px 22px;
  }
  .policy-update-card .main-title {
    font-size: 18px;
  }
  .policy-update-card .sub-title {
    font-size: 16px;
  }
  .info-line {
    flex-wrap: wrap;
    gap: 6px;
  }
  .policy-update-card .description {
    font-size: 12.5px;
  }
}

@media (max-width: 768px) {
  .acc-header {
    padding: 12px 14px;
    font-size: 13px;
  }
  .acc-body {
    padding: 14px 16px 18px;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-panel {
    padding: 16px;
  }

  .content-header h2 {
    font-size: 20px;
  }

  .policy-card {
    padding: 12px;
  }
  .img-caption {
    font-size: 11px;
  }

  .compliance-modules {
    gap: 24px;
  }
}
</style>
