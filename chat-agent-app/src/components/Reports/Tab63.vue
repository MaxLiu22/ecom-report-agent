
<template>
  <div class="sub-tab-panel">
    <h2 style="margin:0 0 16px; font-size:24px; font-weight:600; color:#232f3e;">2.3 更多成本节约</h2>
    <!-- 成本节约折叠卡片 -->
    <div :class="['card-wrapper']" id="cost-savings">
      <!-- <div class="card-header" @click="toggleMain()">
        <div style="font-size:24px; margin-right:10px;">📋</div>
        <h3 style="margin:0; color:#333; font-size:18px; font-weight:600;">更多成本节约</h3>
        <div :style="arrowStyle" class="arrow">▶</div>
      </div> -->
      <transition name="fade-slide">
        <div v-show="open" id="cost-savings-content" style="display:flex; flex-direction:column; gap:12px;">
          <div class="section-head" @mouseenter="hoverHead=true" @mouseleave="hoverHead=false" :style="headStyle">
            <div style="color:#333; font-size:20px; margin-right:15px; transition:transform .3s ease;">▼</div>
            <span style="color:#333; font-weight:600; font-size:14px;">借助中欧计划节约FBA费用</span>
          </div>
          <!-- 可折叠的内容区域（此处始终展示，内部再做二级折叠可扩展） -->
          <div style="display:block; margin-top:10px; padding:15px; background:#f8f9fa; border-radius:8px; border-left:3px solid #333;">
            <div style="margin-bottom:15px;">
              <p style="margin:0 0 8px 0; font-size:12px; color:#333; font-weight:600;">什么是"中欧计划"？</p>
              <p style="margin:0 0 12px 0; font-size:11px; color:#666; line-height:1.4;">加入"中欧计划"后，亚马逊会把实际的库存不仅存储在德国的亚马逊物流中心，还将存储在波兰和捷克的物流中心。一旦中欧计划被激活，卖家的每件商品通过德国站点（Amazon.de）的产品都能享受每件0.26欧元减免，后台具体操作详见这里。</p>
            </div>
            <div style="background:linear-gradient(135deg,#f8f9fa 0%, #f8f9fa 100%); padding:16px 18px; border-radius:10px; margin-bottom:14px; border:1px solid #ddd; position:relative; overflow:hidden;">
              <div style="position:absolute; inset:0; background:repeating-linear-gradient(45deg, rgba(51,51,51,0.06) 0 8px, rgba(255,255,255,0) 8px 16px);"></div>
              <div style="position:relative; display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                <span style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; background:#333; color:#fff; border-radius:8px; font-size:16px; box-shadow:0 2px 4px rgba(0,0,0,0.12);">✓</span>
                <p style="margin:0; font-size:14px; color:#333; font-weight:700; letter-spacing:.5px;">中欧计划的优势</p>
              </div>
              <ul style="position:relative; list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; font-size:12px; color:#333;">
                <li style="display:flex; gap:6px;">
                  <span style="color:#333; font-weight:600;">■</span>
                  <span>节省 FBA 费用（每件 €0.26 减免），适用于通过德国站点发出的订单（含跨境 EFN 配送）</span>
                </li>
                <li style="display:flex; gap:6px;">
                  <span style="color:#333; font-weight:600;">■</span>
                  <span>提升对德国南部及东欧消费者的配送时效（1–2 天可达）</span>
                </li>
                <li style="display:flex; gap:6px;">
                  <span style="color:#333; font-weight:600;">■</span>
                  <span>所有符合条件订单享受 Prime 购物体验，提高转化</span>
                </li>
              </ul>
            </div>
            <div style="background:#f8f9fa; border:1px solid #ddd; border-radius:6px; padding:12px; margin-bottom:15px;">
              <div style="display:flex; align-items:flex-start;">
                <div style="font-size:16px; margin-right:8px; margin-top:2px;">📋</div>
                <div>
                  <p style="margin:0; font-size:12px; color:#333; font-weight:600;">重要提示：如果要在波兰和捷克和其他国家储存，您必须在每个国家注册增值税。因此，建议实际在激活CEE之前先注册波兰及捷克的VAT税号。</p>
                </div>
              </div>
            </div>
            <!-- <div style="background:#f8f9fa; border:2px dashed #ddd; border-radius:8px; padding:20px; text-align:center; margin:15px 0; min-height:200px;">
              <img :src="imageSrc" alt="成本节约示意" style="max-width:100%; height:auto; border-radius:6px;" v-if="imageLoaded" @error="imageLoaded=false" />
              <div v-else style="font-size:12px; color:#999;">图片加载占位区域（图片11）</div>
            </div> -->
          </div>
        </div>
      </transition>
        <!-- CEE 成本分析结果区块 -->
        <div class="analysis-section">
          <div class="section-header">
            <h3>💰 CEE 成本分析结果</h3>
            <p class="section-description">中欧计划成本效益分析详情</p>
          </div>
          <div class="section-content">
            <div v-if="ceeResult">
              <div class="cee-table-wrapper">
                <table class="cee-table">
                  <thead>
                    <tr>
                      <th style="width:38%;">指标</th>
                      <th style="width:22%;">数值</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>德国商城过去12个月已售商品数量</td>
                      <td>{{ formatNumber(ceeResult.soldCount) }}</td>
                      <td>历史销量 (件)</td>
                    </tr>
                    <tr>
                      <td>中欧计划预计节约费用€</td>
                      <td>{{ formatCurrency(ceeResult.estimatedSaving) }}</td>
                      <td>按每件 €0.26 估算</td>
                    </tr>
                    <tr>
                      <td>VAT注册成本€</td>
                      <td>{{ formatCurrency(ceeResult.vatRegistrationCost) }}</td>
                      <td>波兰 + 捷克 预估一次性</td>
                    </tr>
                    <tr>
                      <td>VAT注册所需时间：4～6周</td>
                      <td colspan="2" style="text-align:left;">请预留时间提前启动，避免影响计划生效</td>
                    </tr>
                    <tr class="final-row">
                      <td>最终节约的费用€</td>
                      <td>{{ formatCurrency(ceeResult.finalSaving) }}</td>
                      <td>预计节约 - VAT 成本</td>
                    </tr>
                  </tbody>
                </table>
                <div class="cee-summary-tip">说明：若销量增长或参与更多跨境订单，节约金额会进一步提升。</div>
              </div>
            </div>
            <div v-else class="no-data">
              <p>暂无 CEE 成本分析数据</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab63',
  props: {
    // cee 分析结果
    ceeResult: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      open: true,
      hoverHead: false,
      imageSrc: '/src/assets/合规风险.jpg', // 若有专门图片11可替换路径
      imageLoaded: true
    }
  },
  computed: {
    arrowStyle() {
      return {
        color: '#333',
        fontSize: '16px',
        marginLeft: '10px',
        transition: 'transform 0.3s ease',
        transform: this.open ? 'rotate(90deg)' : 'rotate(0deg)'
      }
    },
    headStyle() {
      return {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        background: this.hoverHead ? '#e5e5e5' : '#f8f9fa',
        borderRadius: '8px',
        cursor: 'default',
        transition: 'all 0.3s ease'
      }
    }
  },
  methods: {
    toggleMain() {
      this.open = !this.open
    },
    formatNumber(v) {
      if (v === null || v === undefined || isNaN(v)) return '-'
      return Number(v).toLocaleString('en-US')
    },
    formatCurrency(v) {
      if (v === null || v === undefined || isNaN(v)) return '-'
      return Number(v).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }
  }
}
</script>

<style scoped>
.sub-tab-panel { background:#fff; padding:24px; border:1px solid #e5e7eb; border-radius:10px; }
.card-wrapper { background:white; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,0.1); padding:20px; margin-bottom:20px; border-left:4px solid #333; }
.card-header { display:flex; align-items:center; margin-bottom:15px; cursor:pointer; transition:0.3s; padding:8px; border-radius:6px; background:transparent; transform:translateX(0); }
.card-header:hover { background:#f8f9fa; transform:translateX(3px); }
.fade-slide-enter-active,.fade-slide-leave-active { transition: all .35s cubic-bezier(.4,0,.2,1); }
.fade-slide-enter-from,.fade-slide-leave-to { opacity:0; transform:translateY(-6px); }
/* CEE 分析区块复用 Tab5 样式 */
.analysis-section { margin-top:20px; background:#ffffff; border:1px solid #e0e0e0; border-radius:8px; overflow:hidden; }
.section-header { background:#f8f9fa; padding:20px 24px; border-bottom:1px solid #e0e0e0; }
.section-header h3 { margin:0 0 8px 0; color:#232f3e; font-size:20px; font-weight:600; }
.section-description { margin:0; color:#666; font-size:14px; line-height:1.5; }
.section-content { padding:24px; }
.no-data { text-align:center; padding:40px; color:#999; font-size:14px; }
.no-data p { margin:0; }
/* CEE 指标表格样式 */
.cee-table-wrapper { background:#fff; border:1px solid #e0e0e0; border-radius:8px; padding:16px 18px 20px; }
.cee-table { width:100%; border-collapse:collapse; font-size:12px; }
.cee-table thead th { background:#232f3e; color:#fff; padding:10px 8px; font-weight:600; text-align:center; }
.cee-table tbody td { border:1px solid #e0e0e0; padding:10px 8px; text-align:center; background:#fafafa; }
.cee-table tbody tr:nth-child(even) td { background:#f5f7fa; }
.cee-table tbody td:first-child { font-weight:600; color:#232f3e; text-align:left; }
.cee-table .final-row td { background:#f8f9fa; font-weight:700; color:#333; }
.cee-summary-tip { margin-top:10px; font-size:11px; color:#666; text-align:right; }
</style>

<!-- 追加 CEE 成本分析结果区块结束 -->
