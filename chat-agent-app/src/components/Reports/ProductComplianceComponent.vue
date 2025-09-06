<template>
  <div class="product-compliance-container">
    <!-- 第一部分：产品合规简介 -->
    <!-- <div class="compliance-section" :class="{ open: openSections.intro }">
      <div
        class="compliance-header"
        role="button"
        tabindex="0"
        :aria-expanded="openSections.intro.toString()"
        aria-controls="section-intro"
        @click="toggle('intro')"
        @keydown.enter.prevent="toggle('intro')"
        @keydown.space.prevent="toggle('intro')"
      >
        <div class="arrow" :class="{ open: openSections.intro }" aria-hidden="true"></div>
        <h2 class="compliance-title">产品合规简介</h2>
      </div>

      <transition name="collapse">
      <div class="compliance-content" id="section-intro" v-show="openSections.intro">
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

        <div class="intro-title">
          <h1>产品合规简介</h1>
        </div>
      </div>
      </transition>
    </div> -->

    <!-- 第二部分：需要符合产品合规的情况 -->
    <div class="compliance-section" :class="{ open: openSections.scenarios }">
      <div
        class="compliance-header"
        role="button"
        tabindex="0"
        :aria-expanded="openSections.scenarios.toString()"
        aria-controls="section-scenarios"
        @click="toggle('scenarios')"
        @keydown.enter.prevent="toggle('scenarios')"
        @keydown.space.prevent="toggle('scenarios')"
      >
        <div class="arrow" :class="{ open: openSections.scenarios }" aria-hidden="true"></div>
        <h2 class="compliance-title">需要符合产品合规的情况</h2>
      </div>

      <transition name="collapse">
      <div class="compliance-content" id="section-scenarios" v-show="openSections.scenarios">
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
      </transition>
    </div>

    <!-- 第三部分：欧洲贸易&产品合规基础信息 -->
    <div class="compliance-section" :class="{ open: openSections.tradeBasics }">
      <div
        class="compliance-header"
        role="button"
        tabindex="0"
        :aria-expanded="openSections.tradeBasics.toString()"
        aria-controls="section-tradeBasics"
        @click="toggle('tradeBasics')"
        @keydown.enter.prevent="toggle('tradeBasics')"
        @keydown.space.prevent="toggle('tradeBasics')"
      >
        <div class="arrow" :class="{ open: openSections.tradeBasics }" aria-hidden="true"></div>
        <h2 class="compliance-title">欧洲贸易&产品合规基础信息</h2>
      </div>

      <transition name="collapse">
      <div class="compliance-content" id="section-tradeBasics" v-show="openSections.tradeBasics">
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
      </transition>
    </div>

    <!-- 第四部分：欧洲产品合规基础信息 -->
    <div class="compliance-section" :class="{ open: openSections.euBasics }">
      <div
        class="compliance-header"
        role="button"
        tabindex="0"
        :aria-expanded="openSections.euBasics.toString()"
        aria-controls="section-euBasics"
        @click="toggle('euBasics')"
        @keydown.enter.prevent="toggle('euBasics')"
        @keydown.space.prevent="toggle('euBasics')"
      >
        <div class="arrow" :class="{ open: openSections.euBasics }" aria-hidden="true"></div>
        <h2 class="compliance-title">欧洲产品合规基础信息</h2>
      </div>

      <transition name="collapse">
      <div class="compliance-content" id="section-euBasics" v-show="openSections.euBasics">
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
                <strong>欧盟电池法规（<a href="https://sellercentral.amazon.es/help/hub/reference/external/GPVDATLHQ6PRQNSW?locale=zh-CN" target="_blank" rel="noopener noreferrer" class="link">EU Batteries</a>）</strong><br>
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
      </transition>
    </div>

    <!-- 第五部分：泛欧洲拓展增值服务政策更新与解答 -->
     
     <!-- PanEU政策更新组件 -->
     <PanEUPolicyUpdateComponent />
   </div>
 </template>
 
 <script setup>
 import PanEUPolicyUpdateComponent from './PanEUPolicyUpdateComponent.vue'
 import { reactive } from 'vue'
 
 // 组件名称
 defineOptions({
   name: 'ProductComplianceComponent'
 })

  // 折叠状态管理
  const openSections = reactive({
    intro: true,
    scenarios: true,
    tradeBasics: true,
    euBasics: true,
  })

  function toggle(key) {
    if (Object.prototype.hasOwnProperty.call(openSections, key)) {
      openSections[key] = !openSections[key]
    }
  }
 </script>

<style scoped>
/* =============== THEME TOKENS =============== */
.product-compliance-container { --pc-primary:#232f3e; --pc-primary-end:#2f3d4a; --pc-accent:#ff9900; --pc-accent-alt:#ffb84d; --pc-surface:#ffffff; --pc-border:#e3e6ea; --pc-soft:#f5f7fa; --pc-radius-sm:6px; --pc-radius-md:10px; --pc-radius-lg:16px; --pc-shadow-sm:0 2px 6px -2px rgba(0,0,0,.08),0 1px 3px rgba(0,0,0,.06); --pc-shadow-md:0 4px 14px -4px rgba(0,0,0,.12),0 2px 6px -2px rgba(0,0,0,.08); --pc-shadow-hover:0 10px 28px -6px rgba(0,0,0,.18),0 4px 12px -3px rgba(0,0,0,.12);} 
.product-compliance-container { margin:20px 0 40px; width:100%; box-sizing:border-box; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#333; }

/* =============== SECTION WRAPPER =============== */
.compliance-section { background:var(--pc-surface); border:1px solid var(--pc-border); border-radius:var(--pc-radius-lg); margin:24px 0; box-shadow:var(--pc-shadow-md); overflow:hidden; position:relative; transition:.45s; }
.compliance-section.open { border-color:var(--pc-accent); box-shadow:var(--pc-shadow-hover); }
.compliance-section:before { content:''; position:absolute; inset:0; pointer-events:none; background:radial-gradient(circle at 95% 12%,rgba(255,153,0,.18),transparent 60%); opacity:.9; }

/* =============== HEADER (CLICKABLE) =============== */
.compliance-header { background:linear-gradient(90deg,var(--pc-primary),var(--pc-primary-end)); padding:18px 22px 18px 24px; display:flex; align-items:center; gap:14px; cursor:pointer; position:relative; user-select:none; outline:none; transition:.4s; }
.compliance-section.open > .compliance-header { background:linear-gradient(90deg,var(--pc-accent),var(--pc-accent-alt)); color:#232f3e; }
.compliance-header:focus-visible { box-shadow:0 0 0 3px #232f3e,0 0 0 6px var(--pc-accent); }

.arrow { width:0; height:0; border-left:10px solid #fff; border-top:7px solid transparent; border-bottom:7px solid transparent; transition:.4s; filter:drop-shadow(0 2px 4px rgba(0,0,0,.3)); }
.compliance-section.open .arrow { transform:rotate(90deg); }
.compliance-section.open .arrow { border-left-color:#232f3e; }

.compliance-title { margin:0; font-size:18px; font-weight:600; letter-spacing:.5px; color:#fff; }
.compliance-section.open .compliance-title { color:#232f3e; }

/* =============== COLLAPSE TRANSITION =============== */
.collapse-enter-active, .collapse-leave-active { transition: height .45s cubic-bezier(.16,.8,.3,1), opacity .4s ease; overflow:hidden; }
.collapse-enter-from, .collapse-leave-to { height:0!important; opacity:0; }

/* =============== CONTENT AREA =============== */
.compliance-content { padding:30px 36px 38px; position:relative; z-index:1; line-height:1.6; }
@media (max-width: 860px){ .compliance-content { padding:24px 24px 30px; } }
@media (max-width: 600px){ .compliance-content { padding:20px 18px 26px; } }

/* =============== PROGRESS BAR =============== */
.progress-bar { display:flex; flex-wrap:wrap; gap:10px; align-items:center; justify-content:center; margin:10px 0 40px; }
.progress-step { background:#eceff3; color:#555; padding:10px 18px; font-size:12px; font-weight:600; letter-spacing:.4px; border-radius:30px; position:relative; display:flex; align-items:center; justify-content:center; min-width:160px; box-shadow:inset 0 0 0 1px #d5d9de; }
.progress-step.completed { background:linear-gradient(90deg,#256c37,#3b8d50); color:#fff; box-shadow:0 2px 6px -2px rgba(0,0,0,.3); }
.progress-step.current { background:linear-gradient(90deg,var(--pc-accent),var(--pc-accent-alt)); color:#232f3e; box-shadow:0 2px 6px -2px rgba(0,0,0,.35); }
.progress-arrow { color:#999; font-size:18px; font-weight:600; }
.step-text { white-space:nowrap; }

/* =============== INTRO TITLE =============== */
.intro-title { text-align:center; margin:46px 0 10px; }
.intro-title h1 { margin:0; font-size:42px; font-weight:600; letter-spacing:.6px; background:linear-gradient(90deg,var(--pc-primary),var(--pc-primary-end)); -webkit-background-clip:text; background-clip:text; color:transparent; }
@media (max-width: 780px){ .intro-title h1 { font-size:34px; } }
@media (max-width: 520px){ .intro-title h1 { font-size:28px; } }

/* =============== SALES STATUS BADGE =============== */
.sales-status { display:flex; justify-content:center; margin:30px 0 24px; }
.status-badge { background:linear-gradient(135deg,#ffe3b3,#ffbf66); color:#5c3b00; padding:14px 36px; border-radius:40px; font-size:22px; font-weight:700; letter-spacing:.8px; position:relative; box-shadow:var(--pc-shadow-sm),0 4px 14px -4px rgba(0,0,0,.25); }

/* =============== CORE MESSAGE =============== */
.core-message { text-align:center; margin:44px 0 10px; display:flex; flex-direction:column; gap:14px; }
.main-text { font-size:22px; font-weight:600; color:#232f3e; letter-spacing:.4px; }
.sub-text { font-size:18px; font-weight:500; color:#444; letter-spacing:.3px; }
@media (max-width: 640px){ .main-text { font-size:19px; } .sub-text { font-size:16px; } }

/* =============== UK SECTION =============== */
.uk-section { margin:40px 0 20px; background:linear-gradient(110deg,#f8f9fa,#f1f4f7); border:1px solid #e0e4e8; border-radius:16px; padding:26px 26px 30px; position:relative; overflow:hidden; box-shadow:var(--pc-shadow-sm); }
.uk-section:before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 90% 15%,rgba(255,153,0,.18),transparent 60%); pointer-events:none; }
.country-header { display:flex; align-items:center; gap:16px; margin:0 0 20px; }
.uk-flag { font-size:40px; filter:drop-shadow(0 2px 4px rgba(0,0,0,.15)); }
.country-title { margin:0; font-size:24px; font-weight:600; letter-spacing:.5px; background:linear-gradient(90deg,var(--pc-accent),var(--pc-accent-alt)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.compliance-info { background:#fff; padding:24px 26px 26px; border-radius:14px; border:1px solid #e3e6ea; box-shadow:inset 0 0 0 1px #f2f4f6, var(--pc-shadow-sm); position:relative; }
.info-title { margin:0 0 10px; font-size:17px; font-weight:600; color:#232f3e; letter-spacing:.4px; }
.warning-text { color:#b42318; font-weight:700; font-size:13px; background:#ffe7e5; padding:6px 10px; display:inline-block; border-radius:8px; letter-spacing:.4px; }
.fhdds-description { margin:18px 0 20px; font-size:13px; color:#444; line-height:1.55; }
.fhdds-description p { margin:0; }
.fhdds-links { margin-top:12px; display:flex; flex-direction:column; gap:8px; }
.link-item { display:flex; gap:8px; font-size:13px; align-items:flex-start; }
.checkmark { color:#256c37; font-weight:700; font-size:14px; margin-top:2px; }
.link-text { color:#444; line-height:1.5; }
.link { color:var(--pc-accent); text-decoration:none; position:relative; font-weight:600; }
.link:after { content:''; position:absolute; left:0; bottom:-2px; width:100%; height:2px; background:linear-gradient(90deg,var(--pc-accent),var(--pc-accent-alt)); transform:scaleX(0); transform-origin:left; transition:.4s; }
.link:hover:after { transform:scaleX(1); }

/* =============== EU COUNTRIES =============== */
.eu-countries { margin:40px 0 30px; display:flex; flex-direction:column; align-items:center; gap:18px; }
.country-flags { display:flex; gap:14px; flex-wrap:wrap; justify-content:center; }
.flag-item { font-size:30px; padding:10px; border-radius:14px; background:#fff; box-shadow:var(--pc-shadow-sm); border:1px solid #e3e6ea; }
.eu-title { text-align:center; }
.eu-title h3 { margin:0 0 6px; font-size:24px; font-weight:600; background:linear-gradient(90deg,var(--pc-accent),var(--pc-accent-alt)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.eu-subtitle { margin:0; font-size:12.5px; color:#555; letter-spacing:.5px; }

/* =============== GPSR TABLE =============== */
.gpsr-section { margin:34px 0 26px; }
.regulation-title { margin:0 0 18px; font-size:17px; font-weight:600; color:#232f3e; letter-spacing:.4px; }
.compliance-table { width:100%; border-collapse:separate; border-spacing:0; font-size:12.5px; border:1px solid #e3e6ea; background:#fff; border-radius:14px; overflow:hidden; box-shadow:var(--pc-shadow-sm); }
.compliance-table th { background:linear-gradient(90deg,var(--pc-primary),var(--pc-primary-end)); color:#fff; padding:12px 10px; font-weight:600; letter-spacing:.4px; font-size:12px; text-align:center; }
.compliance-table td { padding:10px 10px; border-top:1px solid #eef0f2; font-size:12px; line-height:1.45; color:#333; vertical-align:top; }
.compliance-table tbody tr:nth-child(even) td { background:#fafbfc; }

/* =============== EPR SECTION =============== */
.epr-section { margin:32px 0 10px; }
.epr-items { margin-top:14px; display:flex; flex-direction:column; gap:10px; }
.epr-item { display:flex; gap:10px; font-size:13px; line-height:1.55; position:relative; }
.bullet { font-weight:700; color:#232f3e; margin-top:2px; }
.epr-text { flex:1; color:#444; }
.epr-text strong { color:#232f3e; font-weight:600; }

/* =============== RESPONSIVE =============== */
@media (max-width: 880px){ .progress-step { min-width:140px; } }
@media (max-width: 760px){ .progress-bar { flex-direction:column; } .progress-arrow { transform:rotate(90deg); } .uk-section { padding:22px 20px 26px; } .intro-title { margin:40px 0 6px; } }
@media (max-width: 560px){ .status-badge { font-size:18px; padding:12px 26px; } .main-text { font-size:18px; } .sub-text { font-size:15px; } .country-title { font-size:20px; } .compliance-table th, .compliance-table td { padding:8px 8px; } }

@media (prefers-reduced-motion: reduce){ .compliance-section, .arrow, .link:after { transition:none!important; } }
</style>
