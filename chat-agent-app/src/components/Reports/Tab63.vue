
<template>
  <div class="sub-tab-panel">
    <h2 style="margin:0 0 16px; font-size:24px; font-weight:600; color:#232f3e;">2.3 更多成本节约</h2>
    <!-- 成本节约折叠卡片 -->
    <div :class="['card-wrapper']" id="cost-savings">
      <div class="card-header" @click="toggleMain()">
        <div style="font-size:24px; margin-right:10px;">📋</div>
        <h3 style="margin:0; color:#007bff; font-size:18px; font-weight:600;">更多成本节约</h3>
        <div :style="arrowStyle" class="arrow">▶</div>
      </div>
      <transition name="fade-slide">
        <div v-show="open" id="cost-savings-content" style="display:flex; flex-direction:column; gap:12px;">
          <div class="section-head" @mouseenter="hoverHead=true" @mouseleave="hoverHead=false" :style="headStyle">
            <div style="color:#007bff; font-size:20px; margin-right:15px; transition:transform .3s ease;">▼</div>
            <span style="color:#333; font-weight:600; font-size:14px;">借助中欧计划节约FBA费用</span>
          </div>
          <!-- 可折叠的内容区域（此处始终展示，内部再做二级折叠可扩展） -->
          <div style="display:block; margin-top:10px; padding:15px; background:#f8f9fa; border-radius:8px; border-left:3px solid #007bff;">
            <div style="margin-bottom:15px;">
              <p style="margin:0 0 8px 0; font-size:12px; color:#333; font-weight:600;">什么是"中欧计划"？</p>
              <p style="margin:0 0 12px 0; font-size:11px; color:#666; line-height:1.4;">加入"中欧计划"后，亚马逊会把实际的库存不仅存储在德国的亚马逊物流中心，还将存储在波兰和捷克的物流中心。一旦中欧计划被激活，卖家的每件商品通过德国站点（Amazon.de）的产品都能享受每件0.26欧元减免，后台具体操作详见这里。</p>
            </div>
            <div style="background:linear-gradient(135deg,#e9f7ef 0%, #f5fcf8 100%); padding:16px 18px; border-radius:10px; margin-bottom:14px; border:1px solid #c9eedd; position:relative; overflow:hidden;">
              <div style="position:absolute; inset:0; background:repeating-linear-gradient(45deg, rgba(40,167,69,0.06) 0 8px, rgba(255,255,255,0) 8px 16px);"></div>
              <div style="position:relative; display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                <span style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; background:#28a745; color:#fff; border-radius:8px; font-size:16px; box-shadow:0 2px 4px rgba(0,0,0,0.12);">✓</span>
                <p style="margin:0; font-size:14px; color:#155724; font-weight:700; letter-spacing:.5px;">中欧计划的优势</p>
              </div>
              <ul style="position:relative; list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; font-size:12px; color:#155724;">
                <li style="display:flex; gap:6px;">
                  <span style="color:#28a745; font-weight:600;">■</span>
                  <span>节省 FBA 费用（每件 €0.26 减免），适用于通过德国站点发出的订单（含跨境 EFN 配送）</span>
                </li>
                <li style="display:flex; gap:6px;">
                  <span style="color:#28a745; font-weight:600;">■</span>
                  <span>提升对德国南部及东欧消费者的配送时效（1–2 天可达）</span>
                </li>
                <li style="display:flex; gap:6px;">
                  <span style="color:#28a745; font-weight:600;">■</span>
                  <span>所有符合条件订单享受 Prime 购物体验，提高转化</span>
                </li>
              </ul>
            </div>
            <div style="background:#d1ecf1; border:1px solid #bee5eb; border-radius:6px; padding:12px; margin-bottom:15px;">
              <div style="display:flex; align-items:flex-start;">
                <div style="font-size:16px; margin-right:8px; margin-top:2px;">📋</div>
                <div>
                  <p style="margin:0; font-size:12px; color:#0c5460; font-weight:600;">重要提示：如果要在波兰和捷克和其他国家储存，您必须在每个国家注册增值税。因此，建议实际在激活CEE之前先注册波兰及捷克的VAT税号。</p>
                </div>
              </div>
            </div>
            <!-- <div style="background:#f8f9fa; border:2px dashed #ffc107; border-radius:8px; padding:20px; text-align:center; margin:15px 0; min-height:200px;">
              <img :src="imageSrc" alt="成本节约示意" style="max-width:100%; height:auto; border-radius:6px;" v-if="imageLoaded" @error="imageLoaded=false" />
              <div v-else style="font-size:12px; color:#999;">图片加载占位区域（图片11）</div>
            </div> -->
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab63',
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
        color: '#007bff',
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
        background: this.hoverHead ? '#cce6ff' : '#f0f8ff',
        borderRadius: '8px',
        cursor: 'default',
        transition: 'all 0.3s ease'
      }
    }
  },
  methods: {
    toggleMain() {
      this.open = !this.open
    }
  }
}
</script>

<style scoped>
.sub-tab-panel { background:#fff; padding:24px; border:1px solid #e5e7eb; border-radius:10px; }
.card-wrapper { background:white; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,0.1); padding:20px; margin-bottom:20px; border-left:4px solid #007bff; }
.card-header { display:flex; align-items:center; margin-bottom:15px; cursor:pointer; transition:0.3s; padding:8px; border-radius:6px; background:transparent; transform:translateX(0); }
.card-header:hover { background:#f0f8ff; transform:translateX(3px); }
.fade-slide-enter-active,.fade-slide-leave-active { transition: all .35s cubic-bezier(.4,0,.2,1); }
.fade-slide-enter-from,.fade-slide-leave-to { opacity:0; transform:translateY(-6px); }
</style>
