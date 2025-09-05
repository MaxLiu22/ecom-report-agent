<template>
  <div class="app">
    <!-- 顶部导航 -->
    <!-- <nav class="top-nav">
      <div class="nav-container">
        <div class="logo-section">
          <div class="amazon-logo">🛒</div>
          <h1 class="site-title">亚马逊卖家增值服务</h1>
        </div>
        <div class="nav-time">{{ currentTime }}</div>
      </div>
    </nav> -->

    <!-- 主容器 -->
    <div class="main-container">
      <!-- 标题区域 -->
      <header class="hero-section">
        <h1 class="hero-title">泛欧洲拓展增值服务</h1>
        <p class="hero-subtitle">全方位欧洲市场拓展解决方案</p>
      </header>

      <!-- 服务目录 -->
      <main class="services-list">
        <!-- 欧洲拓展评估 -->
        <div class="service-item">
          <div class="service-icon"></div>
          <div class="service-content">
            <h3 class="service-title">欧洲拓展评估</h3>
            <p class="service-desc">机会点全面分析，多维度评估矩阵</p>
          </div>
          <!-- <button class="service-btn">查看评估报告</button> -->
        </div>

        <!-- 欧洲定制方案 -->
        <div class="service-item">
          <div class="service-icon"></div>
          <div class="service-content">
            <h3 class="service-title">欧洲定制方案</h3>
            <p class="service-desc">欧盟内部物流（PanEU） · 英欧间物流（DI） · 中欧计划（CEE）</p>
          </div>
          <!-- <button class="service-btn">查看定制方案</button> -->
        </div>

        <!-- 合规提示与政策更新 -->
        <div class="service-item">
          <div class="service-icon"></div>
          <div class="service-content">
            <h3 class="service-title">合规提示与政策更新</h3>
            <p class="service-desc">意大利保证金政策解读，欧洲合规政策汇总</p>
          </div>
          <!-- <button class="service-btn">查看合规指导</button> -->
        </div>

        <!-- 行动计划总结 -->
        <div class="service-item">
          <div class="service-icon"></div>
          <div class="service-content">
            <h3 class="service-title">行动计划总结</h3>
            <p class="service-desc">执行路线图，时间轴规划</p>
          </div>
          <!-- <button class="service-btn">查看行动计划</button> -->
        </div>

        <!-- AM指导话术 -->
        <div class="service-item">
          <div class="service-icon"></div>
          <div class="service-content">
            <h3 class="service-title">AM指导话术</h3>
            <p class="service-desc">分类话术模板，针对blocker定制话术</p>
          </div>
          <!-- <button class="service-btn">查看话术指导</button> -->
        </div>
      </main>

      <!-- 底部信息 -->
      <footer class="footer">
        <p>🤖 由 Amazon Q AI Assistant 提供技术支持</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverviewDirectory',
  data() {
    return {
      currentTime: new Date().toLocaleString('zh-CN')
    }
  },
  mounted() {
    // 定时更新时间
    setInterval(() => {
      this.currentTime = new Date().toLocaleString('zh-CN');
    }, 1000);
  }
}
</script>

<style scoped>
/* ============ 基础 & 背景 ============ */
* { margin:0; padding:0; box-sizing:border-box; }
.app { background:#f5f6f8; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; color:#232f3e; -webkit-font-smoothing:antialiased; }

/* ============ 主容器 ============ */
.main-container { max-width:1240px; margin:0 auto; padding:34px 32px 50px; }

/* ============ 标题卡 ============ */
.hero-section { text-align:center; margin:0 0 20px; background:linear-gradient(130deg,#232f3e,#1b2732); padding:20px 36px 24px; border:1px solid #1e2a34; border-radius:20px; box-shadow:0 5px 18px -6px rgba(0,0,0,.5),0 2px 8px -4px rgba(0,0,0,.32); position:relative; overflow:hidden; }
.hero-section:before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 82% 18%,rgba(255,153,0,.38),transparent 62%), linear-gradient(140deg,rgba(255,153,0,.18),rgba(255,153,0,0)); mix-blend-mode:overlay; pointer-events:none; }
.hero-title { font-size:32px; font-weight:700; letter-spacing:.6px; margin:0 0 14px; color:#ffedcc; text-shadow:0 2px 4px rgba(0,0,0,.35); }
.hero-subtitle { font-size:14px; color:#d0d6dc; letter-spacing:.35px; margin:0; }

/* ============ 列表区域 ============ */
.services-list { display:flex; flex-direction:column; gap:12px; }

/* 统一卡片：圆角 18 + 阴影 + 渐变侧条 */
.service-item { background:#fff; border:1px solid #e3e6ea; border-radius:14px; padding:12px 16px 14px 16px; display:flex; align-items:center; gap:14px; position:relative; overflow:hidden; box-shadow:0 3px 10px -5px rgba(0,0,0,.12),0 1px 4px -2px rgba(0,0,0,.08); transition:.3s ease; }
.service-item:before { /* 去除左侧黄色强调条 */ content:''; display:none; }
.service-item:after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,153,0,.08),rgba(255,153,0,0)); opacity:0; transition:.45s; }
.service-item:hover { transform:translateY(-2px); border-color:#ffb84d; box-shadow:0 8px 18px -6px rgba(0,0,0,.16),0 3px 8px -3px rgba(0,0,0,.12); }
.service-item:hover:after { opacity:1; }

/* 图标：柔光渐变方形，与整体统一 */
.service-icon { width:48px; height:48px; border-radius:14px; background:linear-gradient(145deg,#2d3b47,#16202a); box-shadow:0 0 0 1px #31404d inset,0 3px 8px -3px rgba(0,0,0,.5); display:flex; align-items:center; justify-content:center; position:relative; flex-shrink:0; }
.service-icon:after { content:'✓'; font-size:24px; font-weight:700; color:#ffb84d; text-shadow:0 2px 6px rgba(0,0,0,.5); }

.service-content { flex:1; display:flex; flex-direction:column; gap:4px; }
.service-title { font-size:16px; font-weight:700; color:#232f3e; margin:0; letter-spacing:.45px; }
.service-desc { font-size:12px; line-height:1.5; color:#4a5568; letter-spacing:.2px; margin:0; }

/* 隐藏按钮保留结构：可以后续启用统一按钮风格 */
.service-btn { display:none; }

/* 底部 */
.footer { text-align:center; margin-top:30px; padding:20px 0 10px; color:#5f6b7a; border-top:1px solid #e2e8f0; font-size:11.5px; letter-spacing:.4px; }
.footer p { margin:0; }

/* ============ 响应式 ============ */
@media (max-width: 900px) { .hero-section { padding:22px 30px 22px; } .hero-title { font-size:28px; } }
@media (max-width: 680px) {
  .main-container { padding:30px 20px 46px; }
  .hero-section { padding:32px 26px 38px; margin-bottom:26px; }
  .hero-title { font-size:26px; }
  .service-item { padding:10px 14px 12px; gap:12px; }
  .service-icon { width:42px; height:42px; }
  .service-title { font-size:14px; }
  .service-desc { font-size:11.5px; }
}
@media (max-width: 460px) {
  .hero-title { font-size:24px; }
  .service-item { padding:9px 12px 11px; }
  .service-icon { width:40px; height:40px; }
}
</style>
