<script setup>
import { ref, nextTick, onMounted } from 'vue';
import ReportFrame from './ReportFrame.vue';

const message = ref('');
const messageContainer = ref(null);

const scrollToBottom = () => {
  if (messageContainer.value) {
    nextTick(() => {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    });
  }
};

const sendMessage = () => {
  if (message.value.trim()) {
    console.log('发送消息:', message.value);
    message.value = '';
    // 发送消息后滚动到底部
    scrollToBottom();
  }
};

const submitCEEForm = () => {
  console.log('提交CEE表单');
  // 模拟提交后的滚动
  scrollToBottom();
};

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom();
  
  // 监听DOM变化，自动滚动到底部
  if (messageContainer.value) {
    const observer = new MutationObserver(() => {
      scrollToBottom();
    });
    
    observer.observe(messageContainer.value, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }
});
</script>

<template>
  <div class="report-container">

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 左侧面板 -->
      <div class="left-panel">
        <div class="message-container" ref="messageContainer">
          <!-- 用户消息 (右侧) -->
          <div class="message-item user-message">
            <div class="message-content">
              <p>请帮我生成一个 IntraEU 卖家分析报告</p>
            </div>
          </div>
          
          <!-- Agent 消息 (左侧) -->
          <div class="message-item agent-message">
            <div class="message-content">
              <pre class="file-paths-text">这是你需要上传的文件路径：

【必须下载文件】
1. 体检表 ✓
   路径：CN Paid Service EU Expansion Dashboard → part1.master sheet → export to CSV

2. ASIN list ✓
   路径：CN Paid Service EU Expansion Dashboard → part2.ASIN list → export to CSV

3. SKU report ✓
   路径：卖家欧洲站后台 → 菜单 → 报告 → 销售成本和费用 → SKU成本报告
   → 商城选择英德法意西五国，数据汇总级别保持MSKU，日期范围设定义（建议选择过去365天）
   → 勾选"生成报告" → 在"库存基础费用和附加费"配送基础费用和附加费" → 生成报告 → 下载

4. Pan-EU report ✓
   路径：卖家欧洲站后台 → 菜单 → 库存 → manage PanEU inventory → 报告
   → 下载欧洲整合服务ASIN清单（第一个，此报告包含符合亚马逊物流欧洲整合服务注册条件的亚马逊物流 ASIN）

5. 多国库存报告 ✓
   路径：卖家欧洲站后台 → 报告 → 配送 → 在库存列表中点击"显示更多" → 多国库存 → 生成最新报告并下载

6. MPG report ✓
   路径：卖家欧洲后台 → 菜单 → 增长 → 选品指南针 → 下载推荐 → 商品列表
   → 下载全部（分别下载UK→DE/FR/IT/ES, DE→UK共5份报告）

【可选下载文件】
7. GSI Credit report (福利列表) ◯
   路径：卖家欧洲后台 → 首页卡片 → 随时查看您的节省金额 → 全球拓展大礼包 → 下载福利列表
   备注：卖家若无GSI则无下载页面

8. GSI Credit report (代金券明细) ◯
   路径：卖家欧洲后台 → 首页卡片 → 随时查看您的节省金额 → 全球拓展大礼包 → 下载代金券明细
   备注：卖家若无GSI则无下载页面

9. Remote_Fulfillment_ASIN_Status_Report ◯
   路径：卖家欧洲后台 → 菜单 → 库存 → 亚马逊物流远程配送(倒数第二个) → 报告(第四页) → 下载ASIN资质报告
   备注：卖家若未开启远程配送，则无下载页面

10. Remote_Fulfillment_Order_Report ◯
    路径：卖家欧洲后台 → 菜单 → 库存 → 亚马逊物流远程配送(倒数第二个) → 报告(第四页) → 下载订单报告
    备注：卖家若未开启远程配送，则无下载页面

11. NL ASIN list ◯
    路径：卖家欧洲站后台 → 菜单 → 库存 → manage PanEU inventory → 管理商品信息 → 上方"最近更新"下载荷兰ASIN list</pre>
            </div>
          </div>
        

           

          </div>
        
        <!-- 聊天输入区域 -->
        <div class="chat-input-area">
          <div class="input-container">
            <input 
              type="text" 
              v-model="message" 
              class="message-input" 
              placeholder="输入您的消息..."
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

      <!-- 右侧面板 -->
      <div class="right-panel">
        <div class="report-area">
          请根据左边的指示上传文件后，生成报告。
        </div>
        <!-- 按键区域 -->
        <div class="button-area">
          <div class="button-left">
            <!-- 左侧可以放置其他按钮 -->
          </div>
          <div class="button-right">
            <button class="preview-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-container {
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-left: auto;
  margin-right: 0;
  padding-bottom: 30px;
  z-index: 1000;
}

.header-title {
  text-align: center;
  margin-bottom: 10px;
}

.header-title h1 {
  font-size: 24px;
  color: #333;
  font-weight: 500;
  margin: 0;
}

.main-content {
  flex: 1;
  display: flex;
  gap: 20px;
  left: 60px;
  width: calc(100vw - 300px);
  max-width: none;
  z-index: 1001;
  position: relative;
  overflow-x: auto;
}

.left-panel {
  flex: 1.5;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.message-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0px 5px;
  max-height: calc(100vh - 250px);
  scroll-behavior: smooth;
}

/* 自定义滚动条样式 */
.message-container::-webkit-scrollbar {
  width: 6px;
}

.message-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.message-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.message-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.message-item {
  display: flex;
  margin-bottom: 15px;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-content {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-content p {
  margin: 0;
}

/* Agent 消息样式 (左侧) */
.agent-message {
  justify-content: flex-start;
}

.agent-message .message-content {
  background-color: #e8f4f0;
  color: #2d5a45;
  border-bottom-left-radius: 4px;
  max-width: 90%;
  border: 1px solid #d1e7dd;
}

.file-paths-text {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
}

/* 批量上传消息样式 */
.upload-batch-message {
  background-color: #d4f1e4 !important;
  border: 1px solid #b8e6c8;
  min-width: 280px;
  max-width: 350px;
}

.upload-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #a8dab8;
}

.upload-header p {
  margin: 0;
  color: #1e5233;
  font-size: 14px;
}

.batch-status {
  font-size: 11px;
  background-color: #28a745;
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.upload-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  max-height: 200px;
  overflow-y: auto;
}

.upload-file {
  font-size: 12px;
  color: #1e5233;
  padding: 4px 6px;
  background-color: rgba(232, 244, 240, 0.8);
  border-radius: 6px;
  border: 1px solid #c8e6d0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 上传列表滚动条样式 */
.upload-list::-webkit-scrollbar {
  width: 4px;
}

.upload-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.upload-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

/* CEE表单样式 */
.cee-form-message {
  max-width: 400px !important;
  background-color: #e8f4f0 !important;
  border: 1px solid #d1e7dd;
  padding: 20px;
}

.cee-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #b8e6c8;
}

.cee-header h4 {
  margin: 0;
  color: #1e5233;
  font-size: 16px;
  font-weight: 600;
}

.form-section {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #1e5233;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #9dd3a8;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #f8fdf9;
  color: #1e5233;
}

.form-input:focus {
  outline: none;
  border-color: #7cc48a;
  box-shadow: 0 0 0 2px rgba(157, 211, 168, 0.3);
}

.form-input::placeholder {
  color: #6b9c78;
}

.checkbox-group {
  margin-bottom: 10px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.form-checkbox {
  margin-right: 8px;
  transform: scale(1.2);
}

.checkbox-item label {
  font-size: 13px;
  color: #1e5233;
  cursor: pointer;
}

.form-note {
  font-size: 11px;
  color: #4a7c5a;
  line-height: 1.4;
  margin: 0;
  padding: 8px;
  background-color: #f0f8f2;
  border-left: 3px solid #7cc48a;
  border-radius: 4px;
}

.cee-submit-btn {
  width: 100%;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cee-submit-btn:hover {
  background-color: #1e7e34;
}

/* 用户消息样式 (右侧) */
.user-message {
  justify-content: flex-end;
}

.user-message .message-content {
  background-color: #d4f1e4;
  color: #1e5233;
  border-bottom-right-radius: 4px;
  border: 1px solid #b8e6c8;
}

.right-panel {
  flex: 1.5;
  background-color: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border: 2px solid #2d5a45;
  overflow: hidden;
  min-width: 0;
}

.report-area {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  min-height: 0;
  width: 100%;
}

/* 报告区域滚动条样式 */
.report-area::-webkit-scrollbar {
  width: 6px;
}

.report-area::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.report-area::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.report-area::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.report-area h2 {
  font-size: 18px;
  color: #666;
  font-weight: 400;
  margin: 0;
  text-align: center;
}

/* 按键区域样式 */
.button-area {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
}

.preview-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #2d5a45;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(45, 90, 69, 0.2);
}

.preview-btn:hover {
  background-color: #1e3d30;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(45, 90, 69, 0.3);
}

.preview-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(45, 90, 69, 0.2);
}

.preview-btn svg {
  flex-shrink: 0;
}

.button-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.button-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-input-area {
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.message-input {
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  padding: 12px 50px 12px 16px;
  font-size: 14px;
  outline: none;
  background-color: #f8f8f8;
}

.message-input:focus {
  border-color: #4285f4;
  background-color: white;
}

.message-input::placeholder {
  color: #999;
}

.button-group {
  display: flex;
  gap: 8px;
}

.attachment-btn, .send-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  transition: background-color 0.2s;
}

.attachment-btn:hover, .send-btn:hover {
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .header-title h1 {
    font-size: 20px;
  }
  
  .report-container {
    padding: 15px;
  }
}
</style>
