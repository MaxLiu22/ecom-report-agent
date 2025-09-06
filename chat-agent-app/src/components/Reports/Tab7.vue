<template>
  <div class="tab7-root">
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

          <div class="policy-update-card">
            <h2 class="main-title">政策更新</h2>

            <div class="content-area">
              <h3 class="sub-title">PanEU正式纳入荷兰站</h3>
              <template v-if="nlPolicyCount > 0">
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
                    <button class="asin-badge btn-link" @click="openNlPolicyModal" :disabled="nlPolicyCount===0" :title="nlPolicyCount===0 ? '暂无可展示数据' : '点击查看具体列表'">
                      {{ nlPolicyCount }}
                    </button>
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
                  (Pan-European FBA) 商品设置有效的报价。这项要求将在今年晚些时候扩展到所有您现有的亚马逊物流欧洲整合服务
                  (Pan-European FBA) 商品。
                </p>
              </template>
              <template v-else>
                <figure class="nl-fallback" aria-label="荷兰站同步空状态">
                  <div class="fallback-head">
                    <svg class="fallback-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    <p class="fallback-text">
                      目前 <strong>没有待同步到荷兰站的 ASIN</strong>。请在未来新品上架后，及时补充荷兰站 Listing 以确保享受 <span class="text-accent">本地配送费优势</span>。
                    </p>
                  </div>
                  <figcaption class="fallback-tip">点击下图查看详情：</figcaption>
                  <a
                    href="https://mp.weixin.qq.com/s/DOASmjqT5fUNUYRGqCoNYA?mpshare=1&scene=1&srcid=0901K15TWEe3mI9dVGCaa6BR&sharer_shareinfo=82c8ad2cbde9eb57efb6cb657e01a67b&sharer_shareinfo_first=82c8ad2cbde9eb57efb6cb657e01a67b&from=industrynews&color_scheme=light#rd"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="fallback-img-link"
                    aria-label="打开微信文章了解荷兰站纳入 PanEU 政策详情"
                  >
                    <div class="fallback-img-wrapper">
                      <img src="/src/assets/荷兰站.png" alt="荷兰站同步说明图片" class="fallback-image" loading="lazy" decoding="async" />
                      <span class="img-overlay-hint">在新窗口查看原文 ↗</span>
                    </div>
                  </a>
                </figure>
              </template>
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
              <!-- ========= 动态展示 policyResult (意大利合规政策专用) ========= -->
              <div class="it-policy-wrapper" v-if="policyResult">
                <!-- it_logic1_result 逻辑提示 -->
                <div v-if="itLogic1Option !== null" class="it-logic1-banner" :class="itLogic1Option === 1 ? 'logic-safe' : 'logic-risk'">
                  <svg v-if="itLogic1Option === 1" class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <svg v-else class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <circle cx="12" cy="16" r="1" />
                  </svg>
                  <div class="text" v-if="itLogic1Option === 1">
                    意大利税号失效并不会影响您的 Pan-EU 资格，您仍然可以在其他有税号的国家通过 Pan-EU 本地配送；无税号国家默认通过远程配送。意大利后续可采用欧洲配送网络 (EFN) 远程配送。
                  </div>
                  <div class="text" v-else>
                    意大利税号失效将会影响您的 Pan-EU 资格。建议在意大利税号失效前申请其他欧盟国家的税号并启用库存配置（例如选择德国、法国进行 VAT 税号注册），以确保继续 Pan-EU 资格。
                  </div>
                </div>
                <!-- it_logic2_result 逻辑提示 -->
                <div v-if="itLogic2Option !== null" class="it-logic2-banner" :class="itLogic2Option === 1 ? 'logic-attention' : 'logic-neutral'">
                  <svg v-if="itLogic2Option === 1" class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2L2 22h20L12 2z"/>
                    <line x1="12" y1="9" x2="12" y2="14" />
                    <circle cx="12" cy="17" r="1" />
                  </svg>
                  <svg v-else class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4" />
                    <circle cx="12" cy="16" r="1" />
                  </svg>
                  <div class="text" v-if="itLogic2Option === 1">
                    请注意：您需要密切和您的税代保持沟通，以确保意大利税局是否通知您进行保证金政策相关的缴纳。意大利保证金政策有 60 天的宽限期，该宽限期将从意大利税务机构通过您的财务代理与您联系之日起开始计算。在宽限期期限之前，您的意大利本地库存仍可正常销售。也就是说，在税务机构联系您之前，不会发生任何变化。一旦您收到税局通知，且不打算缴纳保证金，建议您积极处理意大利库存，您若未能在意大利税局的 60 天的宽限期内提供担保，导致您的意大利增值税登记号将被分类为无效增值税登记，亚马逊有可能限制您在意大利运营中心的仓储和入库货件权限。
                  </div>
                  <div class="text" v-else>
                    您目前没有持有意大利增值税号，不会受到意大利保证金政策。提醒您如果后续准备申请意大利税号，则需要了解相关政策。详情可查看微信推文（链接：
                    <a href="https://mp.weixin.qq.com/s/G6g4FE_BUe3wcunTmON5Wg?mpshare=1&scene=1&srcid=0826fyKxDvZ7fJq1jyLmsQME&sharer_shareinfo=c788c32556aa847bad44b59ecf612baa&sharer_shareinfo_first=c788c32556aa847bad44b59ecf612baa&from=industrynews&color_scheme=light#rd" target="_blank" rel="noopener noreferrer" class="ext-link">点击查看</a>）。
                  </div>
                </div>
                <!-- 直接字符串化展示 policyResult / policyResult.value -->
                <!-- <pre class="policy-raw-json" aria-label="policyResult 原始JSON">{{ safePolicyString }}</pre> -->
              </div>
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
          <div class="uk-fhdds-wrapper">
            <h2 class="uk-section-title">📦 英国 FHDDS 风险监测</h2>
            <p class="uk-section-desc">基于您上传的数据自动识别英国 IEN/FHDDS 合规状态与潜在限制</p>

            <!-- 根据 cidNoticeType 展示不同提示 -->
            <!-- 英国 FHDDS：允许 CID1 与 CID2 同时提示 -->
            <div v-if="cidShowCritical || cidShowUpcoming" class="uk-cid-block-group" :class="{ 'dual': cidShowCritical && cidShowUpcoming }">
              <div v-if="cidShowCritical" class="uk-cid-banner notice-critical" aria-live="polite">
                <div class="cid-ribbon cid1">CID1</div>
                <svg class="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2L2 22h20L12 2z" />
                  <line x1="12" y1="9" x2="12" y2="14" />
                  <circle cx="12" cy="18" r="1" />
                </svg>
                <div class="text">
                  <span class="uk-badge">重要通知</span>如果您的公司注册地不在英国，则必须为所有进口到英国的货件提供进口条目编号 (IEN)。对于从 <strong>2025年8月1日</strong> 起英国 FC 收到的所有货件，您需要追溯提供 IEN。<br>
                  如果您未提供所需的进口详情，您将<strong>无法创建新的发往英国的货件</strong>（以下两种情形除外：1）您的商品为英国本地采购且直接发货；2）VAT 注册期间获临时豁免）。<br>
                  您必须提供 IEN 信息，不可以选择 “我的商品已进口，但我的报关行或物流提供商未按要求提供 IEN” 的原因代码。<br>
                  若货件属于 <strong>从英国海外仓到亚马逊 FBA 仓库</strong>，您需要提供发货 CN 发往 UK 的 IEN 信息；若属于 <strong>英国本地采购</strong>，您必须保留有效的采购发票以备查验。<br>
                  <div class="uk-guide-link">合规信息提交步骤，请参考指导手册：<a href="https://m.media-amazon.com/images/G/01/CN_Compliance_Team/FHDDS_Guidebook.pdf" target="_blank" rel="noopener" class="ext-link">FHDDS Guidebook (PDF)</a></div>
                </div>
              </div>

              <div v-if="cidShowUpcoming" class="uk-cid-banner notice-upcoming" aria-live="polite">
                <div class="cid-ribbon cid2">CID2</div>
                <svg class="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <div class="text">
                  <span class="uk-badge upcoming-badge">提前关注</span>
                  <p class="uk-intro">如果您的公司注册地不在英国，则必须为所有进口到英国的货件提供进口条目编号 (IEN)。</p>
                  <p><strong>从 <span class="uk-date">{{ formattedRestrictionDateCN }}</span> 起</strong>，对于从 <strong>2025年8月1日</strong> 起英国 FC 收到的所有货件，您需要 <strong>追溯补充 IEN</strong>。</p>
                  <ul class="uk-bullet-points">
                    <li>未按要求提供进口详情，将 <strong>无法创建新的发往英国的货件</strong>；</li>
                    <li>例外：① 英国本地采购并直接发货；② VAT 注册期间获临时豁免；</li>
                    <li>不得选择 “我的商品已进口，但我的报关行或物流提供商未按要求提供 IEN” 作为原因；</li>
                    <li>海外仓→亚马逊 FBA：需提供 <strong>CN → UK</strong> 进口 IEN；英国本地采购：务必留存有效采购发票；</li>
                  </ul>
                  <p class="uk-action-tip">建议：现在就与您的物流/报关服务商确认 IEN 获取链路，避免节点生效前出现补录挤压。</p>
                </div>
              </div>
            </div>

            <div v-if="!cidShowCritical && !cidShowUpcoming" class="uk-cid-banner notice-neutral" aria-live="polite">
              <svg class="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <circle cx="12" cy="16" r="1" />
              </svg>
              <div class="text">
                目前您不涉及此政策，如需了解详情，请点击链接查看：
                <a href="https://mp.weixin.qq.com/s?__biz=Mzg5ODA4MDgzNQ==&mid=2247829169&idx=1&sn=fe1dcf6ce77a8e4f6b56c3f46f790491&chksm=c16c2ba9c35e4399ca37bcbf3bbed979886cd4c87771013da69bb08a4e4a1a869a3e56d4e6b3&mpshare=1&srcid=0815o15ewqzGy9DZhEZHsCuD&sharer_shareinfo=072d0f3598e205dc540443ec51b66321&sharer_shareinfo_first=072d0f3598e205dc540443ec51b66321&from=timeline&scene=2&subscene=2&sessionid=1755239663&clicktime=1755240989&enterid=1755240989&ascene=45&fasttmpl_type=0&fasttmpl_fullversion=7864048-zh_CN-zip&fasttmpl_flag=0&realreporttime=1755240989383&devicetype=android-31&version=28003e39&nettype=WIFI&lang=zh_CN&countrycode=CN&exportkey=n_ChQIAhIQRztrz2AkYCcDBJ%2B2qXQVihLsAQIE97dBBAEAAAAAABd2I14dkRgAAAAOpnltbLcz9gKNyK89dVj0sqziSodWuGApTTmKG%2FHMaJroTPc2Em94hzNV5Ls9Q9lrGvnwN6uYVQnYaHHs99mapU%2FpKpAXqWGc4ZXq78sr4dHxsbMNVn6Hi6z2QomC49Fmy6iXrwcSASHi46OOlIaJbbcbOxCh9nWs2gMbS%2BOTTEsTRXEWX5kzCXUsLZeBIivcW38KZ3%2BwZZsNZ7MWCegawm7ulTVFl8LhBep%2BVJHY7aEuPSqtR6Rh4KjZz4QsusLl%2BxlU348Ej8xrkmL2%2B4nF7dFfi%2Bp%2F&pass_ticket=mrn7w2SSYv7D4dYCUH5c2uwxq0UzZ4TrocrC8B4vruz%2BrZ5DocpEJ5mpeJ2Gtfjn&wx_header=3" target="_blank" rel="noopener" class="ext-link">《8/18起执行！亚马逊英国站发货未提交IEN将限制发货》</a>
              </div>
            </div>

            <!-- 可选：调试查看 cid_result 原始数据 -->
            <!-- <details class="cid-raw" v-if="cidResult">
              <summary>cid_result 原始数据 (调试)</summary>
              <pre>{{ cidResult }}</pre>
            </details> -->
          </div>
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
    </div> <!-- end .accordion -->
  </div> <!-- end .content-panel -->
  <!-- 弹窗 Teleport 到 body，避免被父容器 overflow 影响 -->
    <Teleport to="body" v-if="showNlPolicyModal">
      <div class="nl-policy-overlay" @click.self="closeNlPolicyModal">
        <div class="nl-policy-modal" role="dialog" aria-modal="true" aria-label="NL 同步 ASIN 列表">
          <div class="nl-policy-header">
            <h3>NL 同步 ASIN 列表 <span style="font-size:12px;color:#666;font-weight:500;">共 {{ nlPolicyCount }} 条</span></h3>
            <button class="nl-policy-close" @click="closeNlPolicyModal" aria-label="关闭">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="nl-policy-body">
            <template v-if="nlPolicyCount">
              <div class="nl-table-wrapper">
                <table class="nl-table" cellspacing="0">
                  <thead>
                    <tr>
                      <th class="col-idx">#</th>
                      <th v-for="col in nlPolicyColumns" :key="col">{{ col }}</th>
                      <th class="col-ops">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, rIndex) in nlPolicyList" :key="rIndex">
                      <td class="idx">{{ rIndex + 1 }}</td>
                      <td v-for="col in nlPolicyColumns" :key="col" :class="['cell', 'cell-' + (col.replace(/\s+/g,'-').toLowerCase())]">
                        <template v-if="statusPillClass(row[col], col)">
                          <span class="status-pill" :class="statusPillClass(row[col], col)" :title="formatNlPolicyValue(row[col], col)">{{ formatNlPolicyValue(row[col], col) }}</span>
                        </template>
                        <template v-else>
                          <span class="cell-text" :title="formatNlPolicyValue(row[col], col)">{{ formatNlPolicyValue(row[col], col) }}</span>
                        </template>
                      </td>
                      <td class="ops">
                        <button class="op-btn" @click="copyToClipboard(row.ASIN || row['ASIN'] || '')" :disabled="!row.ASIN && !row['ASIN']" title="复制 ASIN">复制</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
            <div v-else class="nl-empty">暂无数据</div>
            <transition name="fade"><div v-if="copyToast" class="copy-toast">{{ copyToast }}</div></transition>
          </div>
        </div>
      </div>
    </Teleport>
  </div><!-- end .tab7-root -->
</template>
<script>
import EUInternalSolutionsComponent from './EUInternalSolutionsComponent.vue'
import PanEUPolicyUpdateComponent from './PanEUPolicyUpdateComponent.vue'
import ProductComplianceComponent from './ProductComplianceComponent.vue'
import VATComplianceComponent from './VATComplianceComponent.vue'
import VATInfoComponent from './VATInfoComponent.vue'

export default {
  name: 'Tab7',
  props: {
    // PanEU 分析结果
    panEUResult: {type: Object, default: null},
    policyResult: {type: Object,default: null}
  },
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
      showNlPolicyModal: false,
      // 复制提示内容（原方法里有引用，之前未在 data 定义）
      copyToast: '',
    }
  },
  computed: {
    nlPolicyList() {
      const list = this.panEUResult && Array.isArray(this.panEUResult.nlPolicy)
        ? this.panEUResult.nlPolicy
        : []
      return list
    },
    nlPolicyCount() {
      return this.nlPolicyList.length
      // return 0
    },
    nlPolicyColumns() {
      if (!this.nlPolicyCount) return []
      // 预设优先顺序
      const preferred = [
        'ASIN', 'MerchantSKU', 'Enrol', 'FNSKU', 'Pan-EU status', 'Enrollment Date', 'Title',
        'UK offer status', 'DE Offer Status', 'FR Offer Status', 'IE Offer Status', 'ES offer status', 'NL offer status'
      ]
      const first = this.nlPolicyList[0]
      const keys = new Set()
      // 收集所有对象键（避免有些列后面才出现）
      this.nlPolicyList.forEach(it => {
        if (it && typeof it === 'object') Object.keys(it).forEach(k => keys.add(k))
      })
      // 按 preferred 排序，追加其它未包含键
      const ordered = preferred.filter(k => keys.has(k))
      keys.forEach(k => { if (!ordered.includes(k)) ordered.push(k) })
      return ordered
    },
    // 解析意大利逻辑字段 it_logic1_result.option (返回 0 / 1 或 null)
    itLogic1Option() {
      const pr = this.policyResult
      if (!pr) return null
      const block = pr.it_logic1_result || pr.itLogic1Result || pr.it_logic_1_result
      if (!block || typeof block !== 'object') return null
      const raw = block.option ?? block.Option ?? block.OPTION
      if (raw === undefined || raw === null || raw === '') return null
      const num = Number(raw)
      if (Number.isNaN(num)) return null
      if (num === 0 || num === 1) return num
      return num ? 1 : 0
    },
    // 解析意大利保证金逻辑 it_logic2_result.option
    itLogic2Option() {
      const pr = this.policyResult
      if (!pr) return null
      const block = pr.it_logic2_result || pr.itLogic2Result || pr.it_logic_2_result
      if (!block || typeof block !== 'object') return null
      const raw = block.option ?? block.Option ?? block.OPTION
      if (raw === undefined || raw === null || raw === '') return null
      const num = Number(raw)
      if (Number.isNaN(num)) return null
      if (num === 0 || num === 1) return num
      return num ? 1 : 0
    },
    // ===== 英国 FHDDS cid_result 相关解析 =====
    cidResult() {
      const pr = this.policyResult
      if (!pr || typeof pr !== 'object') return null
      return pr.cid_result || pr.cidResult || pr.CIDResult || pr.CID_RESULT || null
    },
    cidIsInCid1() {
      const c = this.cidResult
      if (!c || typeof c !== 'object') return false
      return c.is_in_cid1 === true || c.isInCid1 === true || c.IS_IN_CID1 === true
    },
    cidIsInCid2() {
      const c = this.cidResult
      if (!c || typeof c !== 'object') return false
      return c.is_in_cid2 === true || c.isInCid2 === true || c.IS_IN_CID2 === true
    },
    cidExpectedRestrictionRaw() {
      const c = this.cidResult
      if (!c || typeof c !== 'object') return null
      return c.expected_restriction_date || c.expectedRestrictionDate || c.EXPECTED_RESTRICTION_DATE || null
    },
    formattedRestrictionDate() {
      const raw = this.cidExpectedRestrictionRaw
      if (!raw) return '（日期待定）'
      // 允许传入日期字符串 / 时间戳
      let d
      if (typeof raw === 'number') {
        d = new Date(raw)
      } else if (typeof raw === 'string') {
        // 尝试直接解析；若为 YYYYMMDD 则手动格式化
        if (/^\d{8}$/.test(raw)) {
          const y = raw.slice(0,4), m = raw.slice(4,6), dd = raw.slice(6,8)
          return `${y}-${m}-${dd}`
        }
        d = new Date(raw)
      } else if (raw instanceof Date) {
        d = raw
      }
      if (!d || isNaN(d.getTime())) return '（日期格式不合法）'
      return d.toISOString().slice(0,10)
    },
    formattedRestrictionDateCN() {
      const raw = this.cidExpectedRestrictionRaw
      if (!raw) return '日期待定'
      let d
      if (typeof raw === 'number') {
        d = new Date(raw)
      } else if (typeof raw === 'string') {
        if (/^\d{8}$/.test(raw)) { // YYYYMMDD
          const y = raw.slice(0,4); const m = raw.slice(4,6); const dd = raw.slice(6,8)
          return `${y}年${Number(m)}月${Number(dd)}日`
        }
        d = new Date(raw)
      } else if (raw instanceof Date) {
        d = raw
      }
      if (!d || isNaN(d.getTime())) return '日期格式不合法'
      return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`
    },
    // 决定展示哪种提示：critical(已在CID1)，upcoming(在CID2)，neutral(都不在)
    cidNoticeType() {
      if (this.cidIsInCid1) return 'critical'
      if (!this.cidIsInCid1 && this.cidIsInCid2) return 'upcoming'
      return 'neutral'
    },
    cidShowCritical() { return this.cidIsInCid1 === true },
    cidShowUpcoming() { return this.cidIsInCid2 === true },
    safePolicyString() {
      try {
        const base = this.policyResult && this.policyResult.value !== undefined
          ? this.policyResult.value
          : this.policyResult
        if (!base) return '（policyResult 为空）'
        return JSON.stringify(base, null, 2)
      } catch (e) {
        return '（无法序列化 policyResult）'
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKeydown)
    // ==== Debug: 按用户要求在（原文件第 ~139 行位置）打印 policyResult 内容 ====
    // 说明：由于文件多次修改，原先的 139 行可能偏移，这里集中放在 mounted 中确保初始化时输出。
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
      console.group('[Tab7] policyResult 初始化调试')
      console.log('类型:', Object.prototype.toString.call(this.policyResult))
      console.log('原始对象:', this.policyResult)
      try {
        const json = JSON.stringify(this.policyResult, null, 2)
        console.log('JSON 序列化 (截断前 5000 字符):')
        console.log(json.length > 5000 ? json.slice(0, 5000) + ' ...(截断)' : json)
      } catch (e) {
        console.warn('JSON 序列化失败:', e)
      }
      if (!this.policyResult) {
        console.warn('⚠️ policyResult 为空 (null / undefined)，请确认父组件是否传入 :policy-result="policyResult"')
      } else if (Array.isArray(this.policyResult)) {
        console.log('policyResult 为数组，长度:', this.policyResult.length)
      }
      console.groupEnd()
    } else {
      // 生产环境保留一个轻量日志（可按需移除）
      if (this.policyResult && Array.isArray(this.policyResult)) {
        console.log('[Tab7] policyResult 数组长度:', this.policyResult.length)
      }
    }
  },
  watch: {
    // 监听后续异步赋值场景
    policyResult(newVal, oldVal) {
      if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
        console.group('[Tab7] policyResult 发生变化')
        console.log('旧值:', oldVal)
        console.log('新值:', newVal)
        try {
          console.log('新值简要 JSON:', JSON.stringify(newVal)?.slice(0, 800))
        } catch (e) {
          // ignore
        }
        console.groupEnd()
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown)
  },
  methods: {
    toggleSection(key) {
      if (this.openSections[key] !== undefined) {
        this.openSections[key] = !this.openSections[key]
      }
    },
    openNlPolicyModal() {
      if (this.nlPolicyCount === 0) return
      this.showNlPolicyModal = true
      document.body.style.overflow = 'hidden'
    },
    closeNlPolicyModal() {
      this.showNlPolicyModal = false
      document.body.style.overflow = ''
    },
    onKeydown(e) {
      if (e.key === 'Escape' && this.showNlPolicyModal) {
        this.closeNlPolicyModal()
      }
    },
    getNlPolicyItemLabel(item, index) {
      if (item == null) return `记录 ${index + 1}`
      if (typeof item === 'string') return item || `记录 ${index + 1}`
      if (typeof item === 'object') {
        const preferredKeys = ['asin', 'ASIN', 'title', 'name', 'sku', 'SKU', 'id']
        for (const k of preferredKeys) {
          if (item[k]) return item[k]
        }
        // fallback: stringify limited
        try {
          const json = JSON.stringify(item)
          return json.length > 80 ? json.slice(0, 77) + '…' : json
        } catch (e) {
          return `记录 ${index + 1}`
        }
      }
      return `记录 ${index + 1}`
    },
    formatNlPolicyValue(val, key) {
      if (val === undefined || val === null || val === '') return '—'
      if (key === 'Enrollment Date') {
        const d = new Date(val)
        if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10)
      }
      if (typeof val === 'number') return val.toString()
      return String(val)
    },
    statusPillClass(val, key) {
      if (!val || typeof val !== 'string') return ''
      const v = val.toLowerCase()
      if (key === 'Pan-EU status') {
        if (v.includes('enrolled')) return 'pill-success'
        if (v.includes('pending')) return 'pill-warning'
        if (v.includes('suspend') || v.includes('stop')) return 'pill-danger'
      }
      if (key.toLowerCase().includes('offer status')) {
        if (v.includes('no listing')) return 'pill-danger'
        if (v.includes('no offer required')) return 'pill-neutral'
        if (v.includes('active') || v.includes('ok')) return 'pill-success'
      }
      return ''
    },
    copyToClipboard(text, toast = '已复制') {
      if (!text) return
      navigator.clipboard && navigator.clipboard.writeText(text).then(() => {
        this.showCopyToast(toast)
      }).catch(() => {
        // fallback
        const ta = document.createElement('textarea')
        ta.value = text
        document.body.appendChild(ta)
        ta.select(); document.execCommand('copy'); document.body.removeChild(ta)
        this.showCopyToast(toast)
      })
    },
    showCopyToast(msg) {
      this.copyToast = msg
      clearTimeout(this._copyTimer)
      this._copyTimer = setTimeout(() => { this.copyToast = '' }, 1800)
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
  background: linear-gradient(140deg, rgba(255,153,0,0.22), rgba(255,186,73,0) 55%);
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

/* ===================== 荷兰站空状态 (nl-fallback) ===================== */
.nl-fallback {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: linear-gradient(135deg, #f8fafc 0%, #fdf8f2 60%, #fff4e3 100%);
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 20px 22px 22px;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 2px 6px -2px rgba(0,0,0,0.08),
    0 4px 14px -4px rgba(0,0,0,0.10);
  animation: fallbackPop .55s cubic-bezier(.16,.8,.3,1);
}
@keyframes fallbackPop { 0% { opacity:0; transform:translateY(8px) scale(.98);} 60% { opacity:1; transform:translateY(0) scale(1);} 100% { opacity:1; transform:translateY(0) scale(1);} }
.nl-fallback:before, .nl-fallback:after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
  opacity: 0.45;
  pointer-events: none;
  mix-blend-mode: multiply;
}
.nl-fallback:before { width: 220px; height: 220px; top: -90px; right: -70px; background: radial-gradient(circle at 30% 30%, rgba(255,170,64,.55), rgba(255,153,0,0)); }
.nl-fallback:after { width: 240px; height: 240px; bottom: -120px; left: -80px; background: radial-gradient(circle at 70% 70%, rgba(255,200,120,.45), rgba(255,153,0,0)); }
.fallback-head { display:flex; align-items:flex-start; gap:14px; position:relative; z-index:1; }
.fallback-icon { flex-shrink:0; color:#ff9900; filter: drop-shadow(0 4px 6px rgba(0,0,0,.12)); }
.fallback-text { margin:0; font-size:13.5px; line-height:1.6; color:#333; letter-spacing:.3px; }
.fallback-text strong { color:#232f3e; font-weight:600; }
.fallback-text .text-accent { color:#d9480f; font-weight:600; background:linear-gradient(90deg,#ffe1cc,#ffd4b3); padding:2px 6px; border-radius:6px; }
.fallback-tip { font-size:12px; font-weight:600; color:#555; letter-spacing:.5px; padding-left:2px; position:relative; z-index:1; }
.fallback-img-link { position:relative; display:block; border-radius:12px; overflow:hidden; outline:none; box-shadow:0 2px 8px -2px rgba(0,0,0,.18), 0 4px 18px -6px rgba(0,0,0,.18); transition:.4s ease; }
.fallback-img-link:focus-visible { box-shadow:0 0 0 3px #232f3e, 0 0 0 6px #ffb84d; }
.fallback-img-wrapper { position:relative; display:block; }
.fallback-image { width:100%; display:block; object-fit:cover; transform:scale(1.02); transition: transform .65s cubic-bezier(.16,.8,.3,1), filter .45s ease; }
.fallback-img-link:hover .fallback-image { transform:scale(1.06); filter:brightness(1.02) contrast(1.05); }
.img-overlay-hint { position:absolute; right:10px; bottom:10px; background:rgba(35,47,62,.78); color:#ffb84d; font-size:11px; padding:6px 10px 6px; border-radius:20px; letter-spacing:.5px; font-weight:600; opacity:0; transform:translateY(6px); transition:.4s ease; backdrop-filter:blur(4px); box-shadow:0 4px 12px -4px rgba(0,0,0,.35); }
.fallback-img-link:hover .img-overlay-hint { opacity:1; transform:translateY(0); }

@media (max-width: 768px) {
  .nl-fallback { padding:16px 16px 18px; }
  .fallback-text { font-size:13px; }
  .fallback-icon { width:24px; height:24px; }
  .img-overlay-hint { font-size:10px; padding:5px 8px; }
}

@media (prefers-reduced-motion: reduce) {
  .nl-fallback, .fallback-image { animation:none; transition:none; }
  .fallback-img-link:hover .fallback-image { transform:none; }
  .fallback-img-link:hover .img-overlay-hint { transform:none; }
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
/* root wrapper 仅用于包裹 content 与 Teleport 占位，不增加视觉影响 */
.tab7-root { position: relative; }
.policy-raw-json { text-align:left; background:#1e1e1e; color:#d1e7dd; padding:16px 18px; border-radius:10px; font-size:12px; line-height:1.45; overflow:auto; max-height:420px; box-shadow: inset 0 0 0 1px #333; }
.policy-raw-json::-webkit-scrollbar { height:10px; width:10px; }
.policy-raw-json::-webkit-scrollbar-track { background:#2a2a2a; }
.policy-raw-json::-webkit-scrollbar-thumb { background:#555; border-radius:6px; }
.policy-raw-json::-webkit-scrollbar-thumb:hover { background:#666; }
.it-logic1-banner { display:flex; align-items:flex-start; gap:10px; padding:14px 16px; border-radius:10px; font-size:13px; line-height:1.5; text-align:left; margin:8px 0 14px; position:relative; }
.it-logic1-banner .icon { flex-shrink:0; }
.it-logic1-banner.logic-safe { background:linear-gradient(90deg,#e8f5e9,#dbf3e0); border:1px solid #b2e2c1; color:#1d5f30; box-shadow:0 2px 4px rgba(0,0,0,.08); }
.it-logic1-banner.logic-safe .icon { color:#1d5f30; }
.it-logic1-banner.logic-risk { background:linear-gradient(90deg,#fff4db,#ffe8c2); border:1px solid #ffdca0; color:#7a4a00; box-shadow:0 2px 4px rgba(0,0,0,.08); }
.it-logic1-banner.logic-risk .icon { color:#cc7a00; }
.it-logic1-banner:before { content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none; background:radial-gradient(circle at 92% 18%,rgba(255,153,0,0.15),transparent 60%); mix-blend-mode:multiply; }
.it-logic2-banner { display:flex; align-items:flex-start; gap:10px; padding:14px 16px; border-radius:10px; font-size:13px; line-height:1.5; text-align:left; margin:4px 0 14px; position:relative; }
.it-logic2-banner .icon { flex-shrink:0; }
.it-logic2-banner.logic-attention { background:linear-gradient(90deg,#fff2e6,#ffe6cc); border:1px solid #ffc999; color:#7a3e00; box-shadow:0 2px 4px rgba(0,0,0,.08); }
.it-logic2-banner.logic-attention .icon { color:#cc6d00; }
.it-logic2-banner.logic-neutral { background:linear-gradient(90deg,#eef2f5,#e4e9ed); border:1px solid #d3d9df; color:#2f3d4a; box-shadow:0 2px 4px rgba(0,0,0,.06); }
.it-logic2-banner.logic-neutral .icon { color:#4a5a66; }
.it-logic2-banner .ext-link { color:#d9480f; font-weight:600; text-decoration:underline; }
.it-logic2-banner .ext-link:hover { text-decoration:none; }
/* ===== UK FHDDS cid 通知样式 ===== */
.uk-fhdds-wrapper { display:flex; flex-direction:column; gap:14px; }
.uk-section-title { margin:0; font-size:20px; font-weight:600; color:#232f3e; letter-spacing:.5px; }
.uk-section-desc { margin:0 0 4px; font-size:13px; color:#555; }
.uk-cid-banner { display:flex; align-items:flex-start; gap:12px; padding:14px 16px 16px; border-radius:12px; font-size:13px; line-height:1.55; position:relative; text-align:left; box-shadow:0 2px 4px rgba(0,0,0,.08); }
.uk-cid-banner .icon { flex-shrink:0; }
.uk-cid-banner.notice-critical { background:linear-gradient(100deg,#ffe9e7,#ffd2ce); border:1px solid #ffb4ab; color:#842029; }
.uk-cid-banner.notice-critical .icon { color:#b42318; }
.uk-cid-banner.notice-upcoming { background:linear-gradient(100deg,#fff7e6,#ffedcc); border:1px solid #ffdca0; color:#7a4a00; }
.uk-cid-banner.notice-upcoming .icon { color:#cc7a00; }
.uk-cid-banner.notice-neutral { background:linear-gradient(100deg,#eef2f5,#e4e9ed); border:1px solid #d3d9df; color:#2f3d4a; }
.uk-cid-banner.notice-neutral .icon { color:#4a5a66; }
.uk-cid-banner .ext-link { color:#d9480f; font-weight:600; text-decoration:underline; }
.uk-cid-banner .ext-link:hover { text-decoration:none; }
.uk-cid-banner .uk-badge { display:inline-block; background:#b42318; color:#fff; font-size:11px; font-weight:600; letter-spacing:.5px; padding:2px 8px 3px; border-radius:14px; margin-right:8px; box-shadow:0 2px 4px rgba(0,0,0,.15); }
.uk-cid-banner.notice-critical .uk-badge { background:#b42318; }
.uk-guide-link { margin-top:8px; font-size:12px; color:#552; }
.uk-guide-link .ext-link { margin-left:4px; }
.cid-raw { font-size:12px; }
.cid-raw summary { cursor:pointer; font-weight:600; margin-bottom:4px; }
.cid-raw pre { margin:6px 0 0; background:#1e1e1e; color:#d1e7dd; padding:10px 12px; border-radius:8px; font-size:11px; max-height:200px; overflow:auto; }
.uk-cid-banner .uk-date { font-weight:600; color:#b42318; background:linear-gradient(90deg,#ffe7e5,#ffd2ce); padding:0 6px; border-radius:6px; }
.uk-cid-block-group { display:flex; flex-direction:column; gap:16px; }
.uk-cid-block-group.dual { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media (max-width: 880px) { .uk-cid-block-group.dual { grid-template-columns:1fr; } }
.cid-ribbon { position:absolute; top:0; left:0; padding:4px 10px 6px; font-size:11px; font-weight:700; letter-spacing:.5px; color:#fff; border-bottom-right-radius:10px; box-shadow:0 2px 6px rgba(0,0,0,.18); background:linear-gradient(135deg,#555,#333); }
.cid-ribbon.cid1 { background:linear-gradient(135deg,#b42318,#7d1810); }
.cid-ribbon.cid2 { background:linear-gradient(135deg,#cc7a00,#8a4f00); }
.uk-cid-banner { position:relative; overflow:hidden; }
.uk-cid-banner:after { content:''; position:absolute; inset:0; pointer-events:none; background:radial-gradient(circle at 92% 18%,rgba(255,255,255,.18),transparent 60%); mix-blend-mode:overlay; }
/* ...existing code... */
</style>
<style scoped>
/* ========= NL Policy 列表弹窗 ========= */
.nl-policy-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4000;
  padding: 40px 32px;
  backdrop-filter: blur(2px);
}
.nl-policy-modal {
  background: #ffffff;
  width: min(880px, 100%);
  /* 限制高度为视口 2/3（原来接近全高） */
  max-height: 66vh;
  border-radius: 16px;
  border: 1px solid #e3e6ea;
  box-shadow: 0 10px 32px -8px rgba(0,0,0,0.25), 0 4px 12px -4px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  animation: modalFade 0.35s ease;
}
/* 小屏仍保留较高占比，避免内容可视区域过小 */
@media (max-width: 640px) {
  .nl-policy-modal { max-height: 88vh; }
}
@keyframes modalFade { from { opacity: 0; transform: translateY(12px);} to { opacity:1; transform:translateY(0);} }
.nl-policy-header { padding: 20px 24px 16px; border-bottom: 1px solid #eef0f2; display:flex; align-items:center; gap:14px;}
.nl-policy-header h3 { margin:0; font-size:18px; font-weight:600; color:#232f3e; letter-spacing:0.3px; display:flex; align-items:center; gap:8px; }
.nl-policy-close { margin-left:auto; background:transparent; border:none; cursor:pointer; width:34px; height:34px; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#555; transition:.25s; }
.nl-policy-close:hover { background:#f3f4f6; color:#000; }
.nl-policy-body { padding: 18px 24px 26px; overflow-y:auto; display:flex; flex-direction:column; gap:18px; }
.nl-table-wrapper { width:100%; overflow:auto; border:1px solid #e3e6ea; border-radius:12px; background:#fff; box-shadow:0 2px 6px -2px rgba(0,0,0,.08); }
.nl-table { width:100%; border-collapse:separate; border-spacing:0; font-size:12.5px; }
.nl-table thead th { background:linear-gradient(90deg,#232f3e,#2f3d4a); color:#fff; text-align:left; padding:10px 12px; font-weight:600; position:sticky; top:0; z-index:2; letter-spacing:.3px; }
.nl-table thead th.col-idx { width:42px; }
.nl-table thead th.col-ops { width:60px; }
.nl-table tbody td { padding:8px 12px; border-top:1px solid #eef0f2; vertical-align:middle; color:#333; line-height:1.4; }
.nl-table tbody tr:nth-child(even) { background:#fafbfc; }
.nl-table tbody tr:hover { background:#fff8eb; }
.nl-table tbody td.idx { font-weight:600; font-size:11px; color:#232f3e; }
.cell-text { display:inline-block; max-width:220px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; vertical-align:middle; }
.status-pill { display:inline-block; padding:2px 8px; font-size:11px; font-weight:600; border-radius:12px; letter-spacing:.5px; line-height:1.2; }
.pill-success { background:#e6f6ec; color:#256c37; border:1px solid #b2e2c1; }
.pill-warning { background:#fff4db; color:#9c6500; border:1px solid #ffe3a3; }
.pill-danger { background:#ffe7e5; color:#b42318; border:1px solid #ffb4ab; }
.pill-neutral { background:#eceff3; color:#555; border:1px solid #d5d9de; }
.ops { text-align:center; }
.op-btn { background:#232f3e; color:#ffb84d; border:none; padding:4px 10px; border-radius:8px; font-size:11px; cursor:pointer; font-weight:600; letter-spacing:.5px; transition:.25s; }
.op-btn:disabled { opacity:.45; cursor:not-allowed; }
.op-btn:not(:disabled):hover { background:#1b2733; }
.op-btn:not(:disabled):active { background:#0f151b; }
.copy-toast { position:fixed; bottom:32px; left:50%; transform:translateX(-50%); background:#232f3e; color:#ffb84d; padding:10px 18px; border-radius:30px; font-size:12px; font-weight:600; letter-spacing:.5px; box-shadow:0 4px 16px -4px rgba(0,0,0,.35); }
.fade-enter-active, .fade-leave-active { transition: opacity .35s ease, transform .35s ease; }
.fade-enter-from, .fade-leave-to { opacity:0; transform:translateY(6px); }
.nl-table::-webkit-scrollbar { height:10px; }
.nl-table-wrapper::-webkit-scrollbar { height:10px; }
.nl-table-wrapper::-webkit-scrollbar-track { background:#f2f4f6; border-radius:6px; }
.nl-table-wrapper::-webkit-scrollbar-thumb { background:#c2c9d1; border-radius:6px; }
.nl-table-wrapper::-webkit-scrollbar-thumb:hover { background:#a8b0b8; }
.it-logic1-banner { display:flex; align-items:flex-start; gap:10px; padding:14px 16px; border-radius:10px; font-size:13px; line-height:1.5; text-align:left; margin:8px 0 14px; position:relative; }
.it-logic1-banner .icon { flex-shrink:0; }
.it-logic1-banner.logic-safe { background:linear-gradient(90deg,#e8f5e9,#dbf3e0); border:1px solid #b2e2c1; color:#1d5f30; box-shadow:0 2px 4px rgba(0,0,0,.08); }
.it-logic1-banner.logic-safe .icon { color:#1d5f30; }
.it-logic1-banner.logic-risk { background:linear-gradient(90deg,#fff4db,#ffe8c2); border:1px solid #ffdca0; color:#7a4a00; box-shadow:0 2px 4px rgba(0,0,0,.08); }
.it-logic1-banner.logic-risk .icon { color:#cc7a00; }
.it-logic1-banner:before { content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none; background:radial-gradient(circle at 92% 18%,rgba(255,153,0,0.15),transparent 60%); mix-blend-mode:multiply; }
.it-logic2-banner { display:flex; align-items:flex-start; gap:10px; padding:14px 16px; border-radius:10px; font-size:13px; line-height:1.5; text-align:left; margin:4px 0 14px; position:relative; }
.it-logic2-banner .icon { flex-shrink:0; }
.it-logic2-banner.logic-attention { background:linear-gradient(90deg,#fff2e6,#ffe6cc); border:1px solid #ffc999; color:#7a3e00; box-shadow:0 2px 4px rgba(0,0,0,.08); }
.it-logic2-banner.logic-attention .icon { color:#cc6d00; }
.it-logic2-banner.logic-neutral { background:linear-gradient(90deg,#eef2f5,#e4e9ed); border:1px solid #d3d9df; color:#2f3d4a; box-shadow:0 2px 4px rgba(0,0,0,.06); }
.it-logic2-banner.logic-neutral .icon { color:#4a5a66; }
.it-logic2-banner .ext-link { color:#d9480f; font-weight:600; text-decoration:underline; }
.it-logic2-banner .ext-link:hover { text-decoration:none; }
/* ===== UK FHDDS cid 通知样式 ===== */
.uk-fhdds-wrapper { display:flex; flex-direction:column; gap:14px; }
.uk-section-title { margin:0; font-size:20px; font-weight:600; color:#232f3e; letter-spacing:.5px; }
.uk-section-desc { margin:0 0 4px; font-size:13px; color:#555; }
.uk-cid-banner { display:flex; align-items:flex-start; gap:12px; padding:14px 16px 16px; border-radius:12px; font-size:13px; line-height:1.55; position:relative; text-align:left; box-shadow:0 2px 4px rgba(0,0,0,.08); }
.uk-cid-banner .icon { flex-shrink:0; }
.uk-cid-banner.notice-critical { background:linear-gradient(100deg,#ffe9e7,#ffd2ce); border:1px solid #ffb4ab; color:#842029; }
.uk-cid-banner.notice-critical .icon { color:#b42318; }
.uk-cid-banner.notice-upcoming { background:linear-gradient(100deg,#fff7e6,#ffedcc); border:1px solid #ffdca0; color:#7a4a00; }
.uk-cid-banner.notice-upcoming .icon { color:#cc7a00; }
.uk-cid-banner.notice-neutral { background:linear-gradient(100deg,#eef2f5,#e4e9ed); border:1px solid #d3d9df; color:#2f3d4a; }
.uk-cid-banner.notice-neutral .icon { color:#4a5a66; }
.uk-cid-banner .ext-link { color:#d9480f; font-weight:600; text-decoration:underline; }
.uk-cid-banner .ext-link:hover { text-decoration:none; }
.uk-cid-banner .uk-badge { display:inline-block; background:#b42318; color:#fff; font-size:11px; font-weight:600; letter-spacing:.5px; padding:2px 8px 3px; border-radius:14px; margin-right:8px; box-shadow:0 2px 4px rgba(0,0,0,.15); }
.uk-cid-banner.notice-critical .uk-badge { background:#b42318; }
.uk-guide-link { margin-top:8px; font-size:12px; color:#552; }
.uk-guide-link .ext-link { margin-left:4px; }
.cid-raw { font-size:12px; }
.cid-raw summary { cursor:pointer; font-weight:600; margin-bottom:4px; }
.cid-raw pre { margin:6px 0 0; background:#1e1e1e; color:#d1e7dd; padding:10px 12px; border-radius:8px; font-size:11px; max-height:200px; overflow:auto; }
.uk-cid-banner .uk-date { font-weight:600; color:#b42318; background:linear-gradient(90deg,#ffe7e5,#ffd2ce); padding:0 6px; border-radius:6px; }
.uk-cid-block-group { display:flex; flex-direction:column; gap:16px; }
.uk-cid-block-group.dual { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media (max-width: 880px) { .uk-cid-block-group.dual { grid-template-columns:1fr; } }
.cid-ribbon { position:absolute; top:0; left:0; padding:4px 10px 6px; font-size:11px; font-weight:700; letter-spacing:.5px; color:#fff; border-bottom-right-radius:10px; box-shadow:0 2px 6px rgba(0,0,0,.18); background:linear-gradient(135deg,#555,#333); }
.cid-ribbon.cid1 { background:linear-gradient(135deg,#b42318,#7d1810); }
.cid-ribbon.cid2 { background:linear-gradient(135deg,#cc7a00,#8a4f00); }
.uk-cid-banner { position:relative; overflow:hidden; }
.uk-cid-banner:after { content:''; position:absolute; inset:0; pointer-events:none; background:radial-gradient(circle at 92% 18%,rgba(255,255,255,.18),transparent 60%); mix-blend-mode:overlay; }
</style>

