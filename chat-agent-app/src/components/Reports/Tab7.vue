<template>
  <div class="content-panel">
    <div class="content-header">
      <h2>📣 政策更新</h2>
      <p class="content-description">最新的欧盟政策变化、官方来源与业务影响提示</p>
    </div>

    <div class="content-body">
      <!-- 复用 Tab3 的政策更新图片板块，调整为本组件适配的样式 -->
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
        <!-- <div class="policy-card" style="margin-top: 24px"></div> -->
      </div>
    </div>

    <div class="content-header second-block">
      <h2>📣 合规风险</h2>
      <p class="content-description">最新的欧盟政策变化、官方来源与业务影响提示</p>
    </div>

    <div class="content-body">
      <!-- 复用 Tab3 的政策更新图片板块，调整为本组件适配的样式 -->
      <div class="policy-updates" style="margin-top: 10px">
        <div class="policy-card" style="margin-top: 24px">
          <div class="policy-link" style="cursor: default">
            <img src="/src/assets/合规风险.jpg" alt="合规风险" class="policy-image" />
          </div>
          <div class="img-caption">合规风险参考图示</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab7',
}
</script>

<style scoped>
.content-panel {
  background-color: #ffffff;
  margin: 0;
  padding: 24px;
  min-height: 100%;
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
}
</style>
