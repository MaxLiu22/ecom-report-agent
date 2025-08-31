<template>
  <div class="app">
    <!-- 顶部导航 -->
    <nav class="top-nav">
      <div class="nav-container">
        <div class="logo-section">
          <div class="amazon-logo">🛒</div>
          <h1 class="site-title">亚马逊卖家增值服务</h1>
        </div>
        <div class="nav-time">{{ currentTime }}</div>
      </div>
    </nav>

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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app { font-family:'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background:linear-gradient(135deg,#f7fafc 0%,#edf2f7 100%); color:#333; }

/* 顶部导航 */
.top-nav {
  background: #4a5568;
  border-bottom: 3px solid #ed8936;
  padding: 0 2rem;
}

.nav-container { max-width:1200px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; height:54px; }

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.amazon-logo {
  font-size: 2rem;
}

.site-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
}

.nav-time {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

/* 主容器 */
.main-container { max-width:1200px; margin:0 auto; padding:1.6rem 1.25rem 2.2rem; }

/* 标题区域 */
.hero-section { text-align:center; margin-bottom:1.6rem; }

.hero-title { font-size:1.9rem; font-weight:600; color:#2d3748; margin-bottom:.35rem; letter-spacing:.5px; }

.hero-subtitle { font-size:.95rem; color:#718096; }

/* 服务列表 */
.services-list { display:flex; flex-direction:column; gap:.6rem; }

.service-item { background:#fff; border-radius:8px; padding:.75rem .85rem .8rem; display:flex; align-items:center; gap:.75rem; box-shadow:0 1px 5px rgba(0,0,0,.06); transition:.18s ease; border-left:4px solid #ed8936; position:relative; }

.service-item:hover { transform:translateY(-2px); box-shadow:0 4px 14px -4px rgba(0,0,0,.15),0 2px 5px rgba(0,0,0,.08); }

.service-icon { width:34px; height:34px; background:#0891b2; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; position:relative; box-shadow:0 0 0 2px rgba(8,145,178,.15); }

.service-icon::after { content:'✓'; color:#fff; font-size:19px; font-weight:600; }

.service-content { flex:1; display:flex; flex-direction:column; gap:.25rem; }

.service-title { font-size:1rem; font-weight:600; color:#2d3748; margin:0; line-height:1.2; }

.service-desc { color:#5f6b7a; font-size:.72rem; line-height:1.25; letter-spacing:.2px; }

.service-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #4a5568;
  color: white;
  flex-shrink: 0;
}

.service-btn:hover {
  background: #2d3748;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(74, 85, 104, 0.3);
}

/* 底部 */
.footer { text-align:center; margin-top:.9rem; padding:.55rem 0 .4rem; color:#6b7280; border-top:1px solid #e2e8f0; font-size:.7rem; }

/* 响应式设计 */
@media (max-width: 768px) {
  .main-container { padding:1.25rem .9rem 1.6rem; }
  .hero-title { font-size:1.55rem; }
  .services-list { gap:.55rem; }
  .service-item { padding:.65rem .7rem .7rem; gap:.6rem; }
  .service-title { font-size:.95rem; }
  .service-desc { font-size:.68rem; }
  .service-icon { width:30px; height:30px; }
}
</style>
