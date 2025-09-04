<script setup>
import { ref, nextTick, onMounted } from 'vue';
import ReportTab from '@/components/Reports/ReportTab.vue';

const message = ref('');
const messageContainer = ref(null);
// 控制 ReportTab 显示全部标签页
const reportGenerated = ref(false);

// 反馈表单数据
const showFeedbackForm = ref(false);
const feedbackForm = ref({
  sellerId: '',
  meetingTime: '',
  amFeedback: '',
  sellerFeedback: '',
  sellerConcerns: []
});

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

// 反馈表单相关方法
const toggleFeedbackForm = () => {
  showFeedbackForm.value = !showFeedbackForm.value;
};

const submitFeedbackForm = () => {
  console.log('提交反馈表单:', feedbackForm.value);
  // 这里可以添加表单验证和提交逻辑
  alert('反馈已提交！');
  showFeedbackForm.value = false;
  // 重置表单
  feedbackForm.value = {
    sellerId: '',
    meetingTime: '',
    amFeedback: '',
    sellerFeedback: '',
    sellerConcerns: []
  };
};

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom();
  // 挂载后立即展示全部标签页（模拟报告已生成）
  reportGenerated.value = true;
  
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
        

           <!-- 文件上传记录 -->
           <div class="message-item user-message">
             <div class="message-content upload-batch-message">
               <div class="upload-header">
                 <p><strong>📁 已上传文件 (11个)</strong></p>
                 <span class="batch-status">✅ 全部完成</span>
               </div>
               <div class="upload-list">
                 <div class="upload-file">📄 体检表.csv</div>
                 <div class="upload-file">📄 ASIN_list.csv</div>
                 <div class="upload-file">📊 SKU_report.xlsx</div>
                 <div class="upload-file">📄 Pan_EU_report.csv</div>
                 <div class="upload-file">📊 多国库存报告.xlsx</div>
                 <div class="upload-file">📊 MPG_reports.zip</div>
                 <div class="upload-file">📊 GSI_Credit_福利列表.xlsx</div>
                 <div class="upload-file">📊 GSI_Credit_代金券明细.xlsx</div>
                 <div class="upload-file">📄 Remote_Fulfillment_ASIN_Status.csv</div>
                 <div class="upload-file">📄 Remote_Fulfillment_Order.csv</div>
                 <div class="upload-file">📄 NL_ASIN_list.csv</div>
               </div>
             </div>
           </div>

           <!-- Agent 回复消息 -->
           <div class="message-item agent-message">
             <div class="message-content">
               <p>✅ 已收到所有11个文件</p>
               <p>接下来请输入 CEE 参数：</p>
             </div>
           </div>

                       <!-- Agent 回复消息 -->
            <div class="message-item agent-message">
              <div class="message-content cee-form-message">
                <div class="cee-header">
                  <h4>📊 CEE 中欧计划分析</h4>
                </div>
                
                <div class="form-section">
                  <label class="form-label">德国商城过去12个月已售商品数量</label>
                  <input type="number" class="form-input" placeholder="10000" value="10000">
                </div>

                <div class="form-section">
                  <label class="form-label">税号状态</label>
                  <div class="checkbox-group">
                    <div class="checkbox-item">
                      <input type="checkbox" id="poland-tax" class="form-checkbox">
                      <label for="poland-tax">波兰税号 ✓</label>
                    </div>
                    <div class="checkbox-item">
                      <input type="checkbox" id="czech-tax" class="form-checkbox" checked>
                      <label for="czech-tax">捷克税号 ✓</label>
                    </div>
                  </div>
                  <p class="form-note">* 备案信息：来源信息→卖家信息上传到各国税务局→业务规模→建议至少12个月的销售周期→已计入商品数量</p>
                </div>

                <button class="cee-submit-btn" @click="submitCEEForm">开始生成报告</button>
              </div>
            </div>

            <!-- Agent 回复消息 -->
           <div class="message-item agent-message">
             <div class="message-content">
               <p>报告生成完毕，请在右侧窗口查看。</p>
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
        <!-- 反馈表单遮罩层 -->
        <div class="feedback-overlay" v-if="showFeedbackForm" @click="toggleFeedbackForm"></div>
        
        <!-- 反馈表单区域 -->
        <div class="feedback-form-container" v-if="showFeedbackForm" @click.stop>
          <div class="feedback-form-header">
            <h3>📋 客户反馈收集表</h3>
            <button class="close-btn" @click="toggleFeedbackForm">×</button>
          </div>
          <div class="feedback-form-content">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">卖家CID：</label>
                <input type="text" v-model="feedbackForm.sellerId" class="form-input" placeholder="请填写卖家CID" />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">会议时间：</label>
                <input type="text" v-model="feedbackForm.meetingTime" class="form-input" placeholder="请填写会议时间" />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group full-width">
                <label class="form-label">AM反馈：</label>
                <textarea v-model="feedbackForm.amFeedback" class="form-textarea" placeholder="请填写AM反馈内容" rows="3"></textarea>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group full-width">
                <label class="form-label">卖家反馈：</label>
                <textarea v-model="feedbackForm.sellerFeedback" class="form-textarea" placeholder="请填写卖家反馈内容" rows="3"></textarea>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group full-width">
                <label class="form-label">卖家最关心的问题：</label>
                <div class="concern-options">
                  <label class="checkbox-label">
                    <input type="checkbox" value="新政策指导" v-model="feedbackForm.sellerConcerns" />
                    新政策指导（ New policy guidence ）
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" value="成本节约" v-model="feedbackForm.sellerConcerns" />
                    成本节约 （ cost saving ）
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" value="EUX扩展" v-model="feedbackForm.sellerConcerns" />
                    EUX扩展 （ EUX expansion）
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" value="故障排除" v-model="feedbackForm.sellerConcerns" />
                    故障排除 （ trouble shooting ）
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" value="选品预测" v-model="feedbackForm.sellerConcerns" />
                    选品预测 （ selection forcast ）
                  </label>
                </div>
              </div>
            </div>
            
            <div class="form-actions">
              <button class="submit-btn" @click="submitFeedbackForm">提交反馈</button>
              <button class="cancel-btn" @click="toggleFeedbackForm">取消</button>
            </div>
          </div>
        </div>
        
        <div class="report-area">
          <ReportTab :reportGenerated="reportGenerated" :disablePreview="false" />
        </div>
        <!-- 按键区域 -->
        <div class="button-area">
          <div class="button-left">
            <button class="feedback-btn" @click="toggleFeedbackForm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              反馈收集
            </button>
            <!--
            <button class="feedback-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              发送邮件
            </button>
          </div>
          <div class="button-right">
            <button class="preview-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Preview
            </button>
            -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-container {
  height: calc(100vh - 50px);
  width: 90%;
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
  min-height: 0; /* 允许子元素使用 flex 内部滚动 */
}

.left-panel {
  flex: 1;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden; /* 防止内部撑高父级 */
  min-height: 0;
}

.message-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0px 5px;
  /* 移除固定 max-height，改由父级 flex 约束 */
  min-height: 0;
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
  flex: 1;
  background-color: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border: 2px solid #2d5a45;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
}

.report-area {
  /* 固定区域：填满除按钮区外的空间，内部再滚动 */
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 0;
  overflow: hidden; /* 自身不滚动，交由内部 tab-content 滚动 */
}

/* 仅嵌入态（非浮层预览）下让内部充满并由 tab-content 滚动 */
.report-area :deep(.report-frame:not(.floating-mode)) {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.report-area :deep(.report-frame:not(.floating-mode) .tab-content) {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
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

.preview-btn, .feedback-btn {
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

.preview-btn:hover, .feedback-btn:hover {
  background-color: #1e3d30;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(45, 90, 69, 0.3);
}

.preview-btn:active, .feedback-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(45, 90, 69, 0.2);
}

.preview-btn svg, .feedback-btn svg {
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

/* 反馈表单遮罩层 */
.feedback-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  cursor: pointer;
}

/* 反馈表单样式 */
.feedback-form-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 2px solid #2d5a45;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  animation: fadeInScale 0.3s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.feedback-form-header {
  background-color: #2d5a45;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feedback-form-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.feedback-form-content {
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  flex: 1 1 100%;
}

.form-label {
  font-size: 13px;
  font-weight: 500;
  color: #2d5a45;
  margin-bottom: 5px;
}

.form-input, .form-textarea {
  padding: 8px 12px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 13px;
  background-color: #f6f8fa;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #2d5a45;
  box-shadow: 0 0 0 2px rgba(45, 90, 69, 0.1);
  background-color: white;
}

.form-textarea {
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
}

.concern-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #2d5a45;
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.checkbox-label:hover {
  background-color: #f6f8fa;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 6px;
  transform: scale(0.9);
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
}

.submit-btn, .cancel-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn {
  background-color: #2d5a45;
  color: white;
}

.submit-btn:hover {
  background-color: #1e3d30;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(45, 90, 69, 0.3);
}

.cancel-btn {
  background-color: #f6f8fa;
  color: #656d76;
  border: 1px solid #d0d7de;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

/* 滚动条样式 */
.feedback-form-content::-webkit-scrollbar {
  width: 6px;
}

.feedback-form-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.feedback-form-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.feedback-form-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
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
  
  .form-row {
    flex-direction: column;
    gap: 10px;
  }
  
  .concern-options {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .feedback-form-container {
    width: 95%;
    max-width: 500px;
    max-height: 90vh;
  }
  
  .feedback-form-content {
    max-height: 60vh;
  }
}
</style>
