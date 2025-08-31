<script setup>
import { ref } from 'vue';
import Yesterday from '@/views/Yesterday.vue';
import NewChat from '@/views/NewChat.vue';

const message = ref('');
const sidebarExpanded = ref(true);
const showDefaultContent = ref(true);
const showReportContent = ref(false);
const showNewChat = ref(false);

const sendMessage = () => {
  console.log('sendMessage 被调用了');
  console.log('当前消息内容:', message.value);
  console.log('消息是否为空:', !message.value.trim());
  
  if (message.value.trim()) {
    console.log('发送消息:', message.value);
    message.value = '';
    // 发送消息后隐藏默认内容，显示报告内容
    showDefaultContent.value = false;
    showReportContent.value = false;
    showNewChat.value = false;
    console.log('showReportContent 设置为:', showReportContent.value);
  } else {
    console.log('消息为空，不发送');
    showNewChat.value = true;
    showDefaultContent.value = false;
    showReportContent.value = false;
  }
};

const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value;
};

const showReport = () => {
  showReportContent.value = true;
  showDefaultContent.value = false;
  showNewChat.value = false;
};

const startNewChat = () => {
  showDefaultContent.value = true;
  showNewChat.value = false;
  showReportContent.value = false;
};

const startChat = () => {
  showNewChat.value = true;
  showDefaultContent.value = false;
  showReportContent.value = false;
};
</script>

<template>
  <div class="about">
    <!-- 左侧侧边栏 -->
    <div class="sidebar" :class="{ 'sidebar-expanded': sidebarExpanded }">
      <!-- 收起状态的图标 -->
      <div class="sidebar-collapsed" v-if="!sidebarExpanded">
        <div class="sidebar-icons">
          <!-- 展开图标 -->
          <div class="sidebar-icon" @click="toggleSidebar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4L16 12L8 20" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <!-- 聊天图标 -->
          <div class="sidebar-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 9H16M8 13H12" stroke="#666" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        
        <!-- 底部圆形图标 -->
        <div class="sidebar-bottom">
          <div class="bottom-icon">
            <img src="@/assets/eu_logo.svg" class="bottom-logo" alt="EU Logo"/>
          </div>
        </div>
      </div>

      <!-- 展开状态的内容 -->
      <div class="sidebar-expanded-content" v-if="sidebarExpanded">
        <!-- 顶部区域 -->
        <div class="sidebar-header">
          <div class="sidebar-title-row">
            <h2 class="sidebar-title">IntraEU.AI</h2>
            <div class="sidebar-icon" @click="toggleSidebar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4L8 12L16 20" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          
          <button class="new-chat-btn" @click="startNewChat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#4285f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            New chat
          </button>
        </div>

        <!-- 聊天历史区域 -->
        <div class="chat-history">
          <div class="time-group">
            <h3 class="time-label">30 Days</h3>
            <div class="chat-item" @click="showReport">
              <span class="chat-title">Report 1</span>
              <div class="chat-menu">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="1" fill="#666"/>
                  <circle cx="12" cy="5" r="1" fill="#666"/>
                  <circle cx="12" cy="19" r="1" fill="#666"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部用户区域 -->
        <div class="user-profile">
          <div class="profile-icon">
            <img src="@/assets/eu_logo.svg" class="profile-logo" alt="Profile"/>
          </div>
          <span class="profile-text">My Profile</span>
        </div>
      </div>
    </div>
    
    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 默认内容 -->
      <div v-if="showDefaultContent" class="default-content">
        <!-- Logo 和标题 -->
        <div class="header-section">
          <div class="logo-container">
            <img src="@/assets/eu_logo.svg" class="eu-logo" alt="EU Logo"/>
            <h1 class="title">IntraEU.AI</h1>
          </div>
        </div>
        
        <!-- 输入框区域 -->
        <div class="input-section">
          <div class="input-container">
            <input 
              type="text" 
              v-model="message" 
              class="message-input" 
              placeholder="请帮我生成一个 IntraEU 卖家分析报告"
              @keyup.enter="sendMessage"
            />
            <div class="button-group">
              <button class="attachment-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.64 16.2a2 2 0 01-2.83-2.83l8.49-8.49" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="send-btn" @click="startChat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 报告内容 -->
      <div v-if="showReportContent" class="report-content-wrapper">
        <Yesterday />
      </div>

      <div v-if="showNewChat" class="new-chat-content-wrapper">
        <NewChat 
        :initialText="message"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  height: calc(100vh - 50px);
  position: relative;
  background-color: #f0f0f0;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 50px;
  width: 65px;
  height: calc(100vh - 50px);
  background-color: white;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 5px;
  transition: width 0.3s ease;
  z-index: 10;
}

.sidebar-expanded {
  width: 200px;
}

.sidebar-collapsed {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.sidebar-expanded-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px;
}

.sidebar-header {
  margin-bottom: 20px;
}

.sidebar-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  color: #004b5f;
  margin: 0;
}

.new-chat-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #e8f0fe;
  color: #4285f4;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  justify-content: flex-start;
}

.new-chat-btn:hover {
  background-color: #d2e3fc;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
}

.time-group {
  margin-bottom: 15px;
}

.time-label {
  font-size: 12px;
  color: #666;
  margin: 0 0 8px 0;
  font-weight: 500;
}

.chat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #f5f5f5;
  cursor: pointer;
}

.chat-item:hover {
  background-color: #e5e5e5;
}

.chat-title {
  font-size: 14px;
  color: #333;
}

.chat-menu {
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.chat-menu:hover {
  background-color: #ddd;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 0;
  border-top: 1px solid #e0e0e0;
  margin-top: 15px;
}

.profile-icon {
  width: 40px;
  height: 40px;
  background-color: #004b5f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-logo {
  width: 20px;
  height: 25px;
  filter: brightness(0) invert(1);
}

.profile-text {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.sidebar-icons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.sidebar-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.sidebar-icon:hover {
  background-color: #f5f5f5;
}

.sidebar-bottom {
  display: flex;
  justify-content: center;
}

.bottom-icon {
  width: 45px;
  height: 45px;
  background-color: #004b5f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.bottom-logo {
  width: 20px;
  height: 25px;
  filter: brightness(0) invert(1);
}

.main-content {
  width: 100%;
  padding-left: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.header-section {
  margin-top: 180px;
  margin-bottom: 30px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.eu-logo {
  width: 40px;
  height: 50px;
  margin-right: 15px;
  filter: brightness(0) saturate(100%) invert(15%) sepia(71%) saturate(1392%) hue-rotate(167deg) brightness(96%) contrast(101%);
}

.title {
  font-size: 48px;
  color: #004b5f;
  margin: 0;
  font-weight: 400;
}

.input-section {
  width: 100%;
  max-width: 600px;
  height: 100px;
}

.input-container {
  position: relative;
  background-color: white;
  height: 180px;
  border-radius: 25px;
  padding: 18px 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.message-input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 16px;
  outline: none;
  color: #333;
  resize: none;
  padding-bottom: 120px;
  padding-right: 80px;
}

.message-input::placeholder {
  color: #999;
}

.button-group {
  position: absolute;
  bottom: 18px;
  right: 18px;
  display: flex;
  gap: 4px;
  z-index: 10;
}

.attachment-btn, .send-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 36px;
  height: 36px;
}

.attachment-btn:hover, .send-btn:hover {
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .title {
    font-size: 36px;
  }
  
  .input-section {
    max-width: 90%;
  }
  
  .header-section {
    margin-bottom: 40px;
  }
}

.default-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.report-content-wrapper {
  width: 100%;
  height: calc(100vh - 50px);
  background-color: #f0f0f0;
  padding: 0;
  margin: 0;
}
</style>