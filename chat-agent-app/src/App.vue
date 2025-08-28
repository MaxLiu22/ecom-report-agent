<script setup>
// 暂时不需要导入 TheWelcome
// import TheWelcome from '../components/TheWelcome.vue'
import { ref } from 'vue';
import router from './router';

const sidebarVisible = ref(false);

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};
</script>

<template>
  <div class="home">
    <div class="sidebar" :class="{ 'sidebar-visible': sidebarVisible }">
      <div class="sidebar-header">
        <button class="close-button" @click="toggleSidebar">✕ 菜单</button>
      </div>
      <nav class="sidebar-menu">
        <div class="menu-item"><span>目录</span><span class="arrow">›</span></div>
        <div class="menu-item"><span>库存</span><span class="arrow">›</span></div>
        <div class="menu-item"><span>确定价格</span><span class="arrow">›</span></div>
        <div class="menu-item"><span>订单</span><span class="arrow">›</span></div>
        <div class="menu-item"><span>广告</span><span class="arrow">›</span></div>
        <div class="menu-item"><span>增长</span><span class="arrow">›</span></div>
        <div class="menu-item"><span>报告</span><span class="arrow">›</span></div>
        <div class="menu-item"><span>付款</span><span class="arrow">›</span></div>
        <div class="menu-item"><span>绩效</span><span class="arrow">›</span></div>
        <div class="menu-item"><span>应用程序和服务</span><span class="arrow">›</span></div>
        <div class="menu-item"><span>B2B</span><span class="arrow">›</span></div>
        <div class="menu-item"><span>品牌</span><span class="arrow">›</span></div>
        <div class="menu-item"><span>学习</span><span class="arrow">›</span></div>
        <div class="ai-button" @click="() => { router.push('/agent'); sidebarVisible = false; }">
          <img src="@/assets/eu_logo.svg" class="ai-icon" alt="EU Logo"/> IntraEU.AI
        </div>
      </nav>
    </div>
    <header class="seller-header">
      <div class="menu">
        <button class="menu-button" @click="toggleSidebar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M3 12H21" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M3 18H21" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="logo-container">
        <span class="logo">amazon</span>
        <span class="seller-text">seller central</span>
      </div>
      <div class="search-container">
        <input type="text" placeholder="搜索" class="search-input" />
        <button class="search-button">
          <span class="search-icon">🔍</span>
        </button>
      </div>
      <div class="user-container">
        <span class="username">ZHUHAIZHENGYNG</span>
        <span class="language">ZH ▼</span>
      </div>
    </header>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.seller-header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #232f3e;
  color: white;
  padding: 0.5rem 1rem;
  width: 100%;
  height: 50px;
  z-index: 100;
}

.content {
  margin-top: 60px;
  width: 100vw;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
}

.logo-container {
  display: flex;
  align-items: baseline;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: #fff;
}

.seller-text {
  font-size: 1rem;
  margin-left: 5px;
  color: #ccc;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  width: 40%;
}

.search-input {
  border: none;
  padding: 0.5rem;
  width: 100%;
  outline: none;
}

.search-button {
  background-color: #febd69;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.user-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
}

.username {
  font-size: 0.9rem;
}

.language {
  font-size: 0.9rem;
}

.menu {
  display: flex;
  align-items: center;
}

.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100vh;
  background-color: white;
  z-index: 200;
  transition: left 0.3s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar-visible {
  left: 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.close-button {
  background: none;
  border: none;
  font-size: 16px;
  color: #004b5f;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  color: #004b5f;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.arrow {
  font-size: 20px;
  font-weight: 300;
  color: #004b5f;
}

.ai-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  padding: 10px;
  background: linear-gradient(to right, #002F36, #01616F);
  color: white;
  border-radius: 30px;
  font-size: 22px;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
}

.ai-icon {
  margin-right: 13px;
  vertical-align: middle;
  width: 22px;
  height: 28px;
}
</style>
