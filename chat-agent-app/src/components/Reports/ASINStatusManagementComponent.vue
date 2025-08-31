<template>
  <div class="asin-status-wrapper">
    <div class="asin-status-header">
      <div class="orange-arrow">▶</div>
      <h2 class="asin-status-title">ASIN 状态管理（占位组件）</h2>
    </div>
    <div class="asin-status-body">
      <p class="placeholder-text">该组件用于展示需要同步/修复的 ASIN 列表及其状态。当前为临时占位，后续可接入真实数据。</p>
      <ul class="status-list">
        <li v-for="n in 3" :key="n" class="status-item">示例 ASIN {{ n }} - 状态: 正常</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'ASINStatusManagementComponent' })
</script>

<style scoped>
.asin-status-wrapper {
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin: 20px 0;
  overflow: hidden;
}
.asin-status-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  background: #232f3e;
  border-bottom: 1px solid #e8e8e8;
}
.orange-arrow { color: #FF8C00; font-size: 18px; font-weight: bold; }
.asin-status-title { margin: 0; font-size: 18px; font-weight: 600; color: #333; }
.asin-status-body { padding: 20px; }
.placeholder-text { margin: 0 0 12px 0; font-size: 14px; color: #555; line-height: 1.5; }
.status-list { list-style: none; margin: 0; padding: 0; }
.status-item { padding: 8px 10px; background: #f8f9fa; border: 1px solid #eee; border-radius: 4px; margin: 6px 0; font-size: 13px; }
.status-item:hover { background: #fff; }
@media (max-width: 768px) {
  .asin-status-body { padding: 16px; }
  .asin-status-title { font-size: 16px; }
}
</style>
