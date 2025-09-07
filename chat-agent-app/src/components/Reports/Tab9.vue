<template>
  <div class="content-panel">
    <!-- <div class="content-header">
      <h2>📝 VOS收集</h2>
      <p class="content-description">其他相关信息和补充内容</p>
    </div> -->
    <div class="content-body">
      <div class="pitching-wrapper">
        <!-- <h3 class="section-title">AM Pitching 话术库</h3>
        <p class="section-subtitle">支持搜索、折叠、行高亮的内部使用脚本</p> -->
        <div class="pitching-embed">
          <!-- <AMPitchingApp /> -->
          <VOS_Interactive />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AMPitchingApp from './AMPitchingApp.vue'
import VOS_Interactive from './TianOffered/VOS_Interactive.vue'
export default {
  name: 'Tab9',
  components: { AMPitchingApp, VOS_Interactive }
}
</script>

<style scoped>
.content-panel { background-color:#ffffff; margin:0; padding:24px; min-height:100%; }
.content-header { margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid #e0e0e0; }
.content-header h2 { margin:0 0 8px 0; color:#232f3e; font-size:24px; font-weight:600; }
.content-description { margin:0; color:#666; font-size:14px; line-height:1.5; }
.content-body { color:#333; }

/* 嵌入脚本区块样式 */
.pitching-wrapper { margin-top:8px; border:1px solid #e0e0e0; border-radius:10px; background:#fafbfc; padding:20px 20px 10px; box-shadow:0 2px 6px rgba(0,0,0,0.05); }
.section-title { margin:0 0 6px; font-size:20px; font-weight:600; color:#232f3e; }
.section-subtitle { margin:0 0 14px; font-size:13px; color:#666; }
.pitching-embed { border:1px solid #d5d9d9; border-radius:12px; overflow:hidden; background:#fff; }

/* 调整内部组件样式以融入当前面板 */
:deep(.app) { background:transparent !important; min-height:auto !important; }
:deep(.container) { max-width:100% !important; padding:0 0 10px 0 !important; }
:deep(.header) { margin-bottom:18px !important; border-radius:14px !important; padding:28px 28px 26px !important; }
:deep(.sheet-container) { margin-bottom:22px !important; }
:deep(.footer) { color:#555 !important; background:#f8f9fa !important; border-radius:10px !important; padding:16px !important; margin-top:10px !important; }
:deep(table) { font-size:13px !important; }

@media (max-width:768px) {
  .pitching-wrapper { padding:16px 14px 8px; }
  .section-title { font-size:18px; }
  :deep(.header h1) { font-size:1.6em !important; }
  .content-panel { padding:16px; }
  .content-header h2 { font-size:20px; }
}
</style>
