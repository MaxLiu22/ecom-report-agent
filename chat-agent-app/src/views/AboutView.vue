<script setup>
import { ref } from 'vue';

const message = ref('');
const sendMessage = () => {
  if (message.value.trim()) {
    console.log('发送消息:', message.value);
    message.value = '';
  }
};
</script>

<template>
  <div class="about">
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
          <button class="send-btn" @click="sendMessage">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f0f0f0;
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
</style>