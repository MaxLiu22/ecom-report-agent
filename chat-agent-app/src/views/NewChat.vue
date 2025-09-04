<script setup>
import { ref, nextTick, onMounted, computed } from 'vue';
import ReportTab from '@/components/Reports/ReportTab.vue';
import UniReport from '@/components/Reports/uniReport.vue';
import { analyzePanEUOpportunitiesAuto } from '@/services/panEUService.js';
import { analyzeDIOpportunitiesAuto } from '@/services/DIService.js';
import CeeService from '@/services/CeeService.js';
import DifyService from '@/services/DifyService.js';
import {analyzeSingleEUChecklist} from '@/services/checkliService.js';
import {analyzeSingleEUChecklistCSV} from '@/services/checkliServiceCsv.js';
import CheckliCeeParser from '@/services/checkliServiceCee.js';
import ActionService from '@/services/actionService.js';
import { findAndParseValidChecklist } from '@/services/fileService.js';

const message = ref('');
const messageContainer = ref(null);
const fileInputRef = ref(null);
const panEUFileInputRef = ref(null);
const diFileInputRef = ref(null);
const uploadedFiles = ref([]);
const messages = ref([]);

// 报告生成相关状态
const isGeneratingReport = ref(false);
const panEUResult = ref(null);
const diResult = ref(null);
const ceeResult = ref(null);
const EUExpansionCheckli = ref(null);
const EUExpansionCheckliCee = ref(null);
const actionResult = ref(null);
const reportGenerated = ref(false);
// 统一报告预览状态
const showUniReport = ref(false);

// 反馈表单数据
const showFeedbackForm = ref(false);
const feedbackForm = ref({
  sellerId: '',
  meetingTime: '',
  amFeedback: '',
  sellerFeedback: '',
  sellerConcerns: []
});

// 打字机效果相关
const showInitialPrompts = ref(false);

// 文件上传状态跟踪
const panEUFilesUploaded = ref(false);
const diFilesUploaded = ref(false);
const allFilesUploaded = computed(() => panEUFilesUploaded.value && diFilesUploaded.value);

// 文件验证错误状态
const panEUValidationError = ref('');
const diValidationError = ref('');

// 初始话对象
const checkliCeeParser = new CheckliCeeParser()

const props = defineProps({
  // 从父组件传递的初始文件
  initialText: {
    type: String,
    default: "请帮我生成一个 IntraEU 卖家分析报告"
  }
  })
  

// PanEU 报告文件上传提示
const panEUText = `请上传以下文件以生成 PanEU 报告：

【PanEU 报告必需文件】
1. 体检表 ✓
   路径：CN Paid Service EU Expansion Dashboard → part1.master sheet → export to CSV 

2. SKU report ✓
   路径：卖家欧洲站后台 → 菜单 → 报告 → 销售成本和费用 → SKU成本报告
   → 商城选择英德法意西五国，数据汇总级别保持MSKU，日期范围设定义（建议选择过去365天）
   → 勾选"生成报告" → 在"库存基础费用和附加费"配送基础费用和附加费" → 生成报告 → 下载

3. Pan-EU report ✓
   路径：卖家欧洲站后台 → 菜单 → 库存 → manage PanEU inventory → 报告
   → 下载欧洲整合服务ASIN清单（第一个，此报告包含符合亚马逊物流欧洲整合服务注册条件的亚马逊物流 ASIN）

4. 多国库存报告 ✓
   路径：卖家欧洲站后台 → 报告 → 配送 → 在库存列表中点击"显示更多" → 多国库存 → 生成最新报告并下载

【PanEU 报告可选文件】
5. NL ASIN list ◯
   路径：卖家欧洲站后台 → 菜单 → 库存 → manage PanEU inventory → 管理商品信息 → 上方"最近更新"下载荷兰ASIN list`;

// DI 分析文件上传提示
const diText = `请上传以下文件以生成 DI 分析报告：

【DI 分析必需文件】
1. MPG report ✓
   路径：卖家欧洲后台 → 菜单 → 增长 → 选品指南针 → 下载推荐 → 商品列表
   → 下载全部（分别下载UK→DE/FR/IT/ES, DE→UK共5份报告）

2. ASIN list ✓
   路径：CN Paid Service EU Expansion Dashboard → part2.ASIN list → export to CSV

3. SKU report ✓
   路径：卖家欧洲站后台 → 菜单 → 报告 → 销售成本和费用 → SKU成本报告
   → 商城选择英德法意西五国，数据汇总级别保持MSKU，日期范围设定义（建议选择过去365天）
   → 勾选"生成报告" → 在"库存基础费用和附加费"配送基础费用和附加费" → 生成报告 → 下载


【DI 分析可选文件】
4. GSI Credit report (福利列表) ◯
   路径：卖家欧洲后台 → 首页卡片 → 随时查看您的节省金额 → 全球拓展大礼包 → 下载福利列表
   备注：卖家若无GSI则无下载页面

5. GSI Credit report (代金券明细) ◯
   路径：卖家欧洲后台 → 首页卡片 → 随时查看您的节省金额 → 全球拓展大礼包 → 下载代金券明细
   备注：卖家若无GSI则无下载页面

6. Remote_Fulfillment_ASIN_Status_Report ◯
   路径：卖家欧洲后台 → 菜单 → 库存 → 亚马逊物流远程配送(倒数第二个) → 报告(第四页) → 下载ASIN资质报告
   备注：卖家若未开启远程配送，则无下载页面

7. Remote_Fulfillment_Order_Report ◯
   路径：卖家欧洲后台 → 菜单 → 库存 → 亚马逊物流远程配送(倒数第二个) → 报告(第四页) → 下载订单报告
   备注：卖家若未开启远程配送，则无下载页面`;

// 初始化显示
const initializeMessages = async() => {
  // 将初始文本作为用户消息添加到消息列表
  // addUserMessage('text', props.initialText);
  console.log('初始化消息列表');
  console.log(props.initialText);
  // 延迟一下再发送消息，确保UI已更新
  await nextTick();
  
  // 模拟发送消息
  if (props.initialText) {
    message.value = props.initialText;
  } else{
    message.value = "请帮我生成一个 IntraEU 卖家分析报告"
  }
  
  await sendMessage();
};

const scrollToBottom = () => {
  if (messageContainer.value) {
    nextTick(() => {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    });
  }
};

const sendMessage = async () => {
  const messageText = message.value.trim();

  message.value = '';
  // 检查是否有上传的文件且没有文本消息（纯文件发送）
  if (!messageText && uploadedFiles.value.length > 0) {
    // 添加用户文件消息
    addUserMessage('files', uploadedFiles.value);
    
    // 延迟显示agent回复
    setTimeout(() => {
      addCEEStatusMessage();
    }, 500);
    
    // 清空文件列表
    uploadedFiles.value = [];
    
  } else if (messageText) {
    // 普通文本消息
    addUserMessage('text', messageText);

    if (messageText.includes("卖家报告") || messageText.includes("分析报告")) {
      console.log("包含关键词");
      addPromptMessage()

    // 执行相关逻辑
    } else {
      try {
        // 使用流式响应模式
        const stream = await DifyService.sendChatMessage(messageText);
        
        // 创建一个临时消息ID用于更新
        const tempMessageId = Date.now();
        let fullResponse = '';
        
        // 添加一个空的Agent消息，后续会更新内容
        addAgentMessage('', tempMessageId);
        
        // 处理流式响应
        await DifyService.processStream(
          stream,
          (data) => {
            // 处理每个数据块
            if (data.answer) {
              fullResponse += data.answer;
              // 更新消息内容
              updateAgentMessage(tempMessageId, fullResponse);
              // 滚动到底部
              scrollToBottom();
            }
          },
          () => {
            // 完成时的处理
            console.log('Stream completed');
          },
          (error) => {
            // 错误处理
            console.error('Stream error:', error);
            addAgentMessage('抱歉，处理您的请求时出现了错误。');
          }
        );
      } catch (error) {
        console.error('Error sending message:', error);
        addAgentMessage('抱歉，发送消息时出现了错误。');
      }
    }
  
  }
  
  // 发送消息后滚动到底部
  scrollToBottom();
};

const addUserMessage = (type, content) => {
  messages.value.push({
    id: Date.now(),
    type: 'user',
    messageType: type,
    content: content,
    timestamp: new Date().toLocaleTimeString()
  });
  nextTick(() => scrollToBottom());
};

const addAgentMessage = (text, id = null) => {
  messages.value.push({
    id: id || Date.now(),
    type: 'agent',
    messageType: 'text',
    content: text,
    timestamp: new Date().toLocaleTimeString()
  });
  nextTick(() => scrollToBottom());
};

// 更新Agent消息内容
const updateAgentMessage = (id, newContent) => {
  const messageIndex = messages.value.findIndex(msg => msg.id === id);
  if (messageIndex !== -1) {
    messages.value[messageIndex].content = newContent;
  }
};

const addPromptMessage = () => {
  messages.value.push({
    id: Date.now(),
    type: 'agent',
    messageType: 'prompt',
    content: '',
    timestamp: new Date().toLocaleTimeString()
  });
  nextTick(() => scrollToBottom());
};


const addCEEStatusMessage = () => {
  messages.value.push({
    id: Date.now(),
    type: 'agent',
    messageType: 'cee-status',
    content: '已收到所有文件。\n请问您是否已加入 CEE？',
    timestamp: new Date().toLocaleTimeString()
  });
  nextTick(() => scrollToBottom());
};


const startReportGeneration = async () => {
  console.log('提交CEE表单');
  
  if (isGeneratingReport.value) return; // 防止重复提交
  
  isGeneratingReport.value = true;
  panEUResult.value = null;
  diResult.value = null;
  ceeResult.value = null;
  EUExpansionCheckli.value = null;
  EUExpansionCheckliCee.value = null;
  actionResult.value = null;
  reportGenerated.value = false;
  
  try {
    // 添加生成报告开始的消息
    addAgentMessage('开始生成报告，请稍候...');
    
    // 使用上传的文件进行自动分析
    // 收集所有上传的文件（包括PanEU和DI文件）
    const allFileMessages = messages.value.filter(msg => msg.messageType === 'files');
    const allFiles = [];
    allFileMessages.forEach(msg => {
      allFiles.push(...msg.content.map(f => f.file));
    });
    
    // 解析两个 eu_expansion_checkli 表（体检表）
    const checkliResutl = await findAndParseValidChecklist(allFiles, checkliCeeParser, analyzeSingleEUChecklist, analyzeSingleEUChecklistCSV)
    EUExpansionCheckli.value = checkliResutl.paneuData.table_json
    EUExpansionCheckliCee.value = checkliResutl.ceeData


    // 1. 调用 analyzePanEU
    console.log('开始 PanEU 分析...');
    addAgentMessage('正在进行 PanEU 分析...');
    const panEUFiles = allFiles; // 传递所有文件给分析函数
    panEUResult.value = await analyzePanEUOpportunitiesAuto(panEUFiles, EUExpansionCheckli.value);
   
    // 2. 调用 analyzeDI
    console.log('开始 DI 分析...');
    addAgentMessage('正在进行 DI 分析...');
    
    if (panEUFiles.length >= 1) {
      diResult.value = await analyzeDIOpportunitiesAuto(panEUFiles);
      addAgentMessage('DI 分析完成 ✓');
    } else {
      addAgentMessage('DI 分析跳过（文件不足）');
    }
    
    // 3. 调用 calculateCEECosts
    console.log('开始 CEE 成本计算...');
    const shouldJoinCEEResult = CeeService.shouldJoinCEE(EUExpansionCheckliCee.value)
    if (shouldJoinCEEResult.shouldJoinCEE) {
      addAgentMessage('已加入 CEE，无需计算CEE成本。');
    } else {
      addAgentMessage('正在计算 CEE 成本...');
      const soldCount = panEUResult.value.totalSoldDE || 10000;
      const hasPolishVAT = shouldJoinCEEResult.hasPolishVAT;
      const hasCzechVAT = shouldJoinCEEResult.hasCzechVAT;
      console.log(soldCount, hasPolishVAT, hasCzechVAT)
      ceeResult.value = CeeService.calculateCEECosts(soldCount, hasPolishVAT, hasCzechVAT);
      console.log(ceeResult.value)
      addAgentMessage('CEE 成本计算完成 ✓');
    }
    

    // 4. 生成行动总结
    const actionService = new ActionService(
        panEUResult,
        diResult,
        ceeResult,
        EUExpansionCheckli.value
      );
      
    actionResult.value = actionService.calculateAll();

    // 5. 标记报告生成完成
    reportGenerated.value = true;
    addAgentMessage('📊 报告生成完成！请查看右侧报告区域。');
    
  } catch (error) {
    console.error('报告生成失败:', error);
    addAgentMessage(`报告生成失败: ${error.message}`);
  } finally {
    isGeneratingReport.value = false;
    scrollToBottom();
  }
};


const closeUniReport = () => { showUniReport.value = false; };

const triggerPanEUFileUpload = () => {
  panEUFileInputRef.value?.click();
};

const triggerDIFileUpload = () => {
  diFileInputRef.value?.click();
};

// 文件验证函数
const validatePanEUFiles = (files) => {
  const errors = [];
  const requiredFiles = {
    masterSheet: { 
      keywords: ['EU_expansion_checkli'], 
      found: false,
      displayName: '体检表'
    },
    sku: { 
      keywords: ['sku', 'cost', '成本'], 
      found: false,
      displayName: 'SKU report'
    },
    paneu: { 
      keywords: ['pan-eu', 'paneu', '欧洲整合', 'inventory'], 
      found: false,
      displayName: 'Pan-EU report'
    },
    multicountry: { 
      keywords: ['多国库存', 'multicountry', 'inventory'], 
      found: false,
      displayName: '多国库存报告'
    }
  };
  
  // 检查文件格式
  const validExtensions = ['.csv', '.xlsx', '.xls'];
  const invalidFiles = files.filter(file => {
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    return !validExtensions.includes(extension);
  });
  
  if (invalidFiles.length > 0) {
    errors.push(`不支持的文件格式: ${invalidFiles.map(f => f.name).join(', ')}。请上传 CSV 或 Excel 文件。`);
  }
  
  // 检查必需文件类型
  files.forEach(file => {
    const fileName = file.name.toLowerCase();
    Object.keys(requiredFiles).forEach(type => {
      if (requiredFiles[type].keywords.some(keyword => fileName.includes(keyword.toLowerCase()))) {
        requiredFiles[type].found = true;
      }
    });
  });
  
  const missingTypes = Object.keys(requiredFiles)
    .filter(type => !requiredFiles[type].found)
    .map(type => requiredFiles[type].displayName);
    
  if (missingTypes.length > 0) {
    errors.push(`PanEU 缺少必要文件：${missingTypes.join('、')}`);
  }
  
  return errors;
};


const validateDIFiles = (files) => {
  const errors = [];
  const requiredFiles = {
    mpg: { 
      keywords: ['List_of_recommendations'], 
      found: false,
      displayName: 'MPG report'
    },
    asin: { 
      keywords: ['asin', 'list'], 
      found: false,
      displayName: 'ASIN list'
    },
    sku: { 
      keywords: ['sku', 'cost', '成本'], 
      found: false,
      displayName: 'SKU report'
    }
  };
  
  // 检查文件格式
  const validExtensions = ['.csv', '.xlsx', '.xls'];
  const invalidFiles = files.filter(file => {
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    return !validExtensions.includes(extension);
  });
  
  if (invalidFiles.length > 0) {
    errors.push(`不支持的文件格式: ${invalidFiles.map(f => f.name).join(', ')}。请上传 CSV 或 Excel 文件。`);
  }
  
  // 检查必需文件类型
  files.forEach(file => {
    const fileName = file.name.toLowerCase();
    Object.keys(requiredFiles).forEach(type => {
      if (requiredFiles[type].keywords.some(keyword => fileName.includes(keyword.toLowerCase()))) {
        requiredFiles[type].found = true;
      }
    });
  });
  
  const missingTypes = Object.keys(requiredFiles)
    .filter(type => !requiredFiles[type].found)
    .map(type => requiredFiles[type].displayName);
    
  if (missingTypes.length > 0) {
    errors.push(`DI 缺少必要文件：${missingTypes.join('、')}`);
  }
  
  return errors;
};


const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  if (files.length > 0) {
    // 添加文件到上传列表
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      uploadTime: new Date().toLocaleString()
    }));
    
    uploadedFiles.value.push(...newFiles);
    
    // 添加上传成功的消息到聊天
    addUploadMessage(newFiles);
    
    // 清空文件输入
    event.target.value = '';
    
    // 滚动到底部
    scrollToBottom();
  }
};

const handlePanEUFileUpload = (event) => {
  const files = Array.from(event.target.files);
  if (files.length > 0) {
    // 清空之前的错误信息
    panEUValidationError.value = '';

    // 验证文件
    const validationErrors = validatePanEUFiles(files);
    if (validationErrors.length > 0) {
      panEUValidationError.value = validationErrors.join('\n');
      // 清空文件输入
      event.target.value = '';
      return;
    }

    // 添加文件到上传列表，标记为PanEU类型
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      uploadTime: new Date().toLocaleString(),
      category: 'paneu' // 标记文件类型
    }));
    
    uploadedFiles.value.push(...newFiles);
    
    // 标记PanEU文件已上传
    panEUFilesUploaded.value = true;
    
    // 添加用户文件消息
    addUserMessage('files', newFiles);
    
    // 检查是否两种类型的文件都已上传
    checkAllFilesUploaded();
    
    // 清空文件输入
    event.target.value = '';
    
    // 滚动到底部
    scrollToBottom();
  }
};

const handleDIFileUpload = (event) => {
  const files = Array.from(event.target.files);
  if (files.length > 0) {
    // 清空之前的错误信息
    diValidationError.value = '';
    
    // 验证文件
    const validationErrors = validateDIFiles(files);
    if (validationErrors.length > 0) {
      diValidationError.value = validationErrors.join('\n');
      // 清空文件输入
      event.target.value = '';
      return;
    }
    
    // 添加文件到上传列表，标记为DI类型
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      uploadTime: new Date().toLocaleString(),
      category: 'di' // 标记文件类型
    }));
    
    uploadedFiles.value.push(...newFiles);
    
    // 标记DI文件已上传
    diFilesUploaded.value = true;
    
    // 添加用户文件消息
    addUserMessage('files', newFiles);
    
    // 检查是否两种类型的文件都已上传
    checkAllFilesUploaded();
    
    // 清空文件输入
    event.target.value = '';
    
    // 滚动到底部
    scrollToBottom();
  }
};

const addUploadMessage = (files) => {
  // 这里可以添加一个上传成功的消息到聊天界面
  console.log('上传文件:', files.map(f => f.name));
};

// 检查所有文件是否都已上传
const checkAllFilesUploaded = () => {
  if (allFilesUploaded.value) {

    // 延迟显示CEE状态询问
    setTimeout(() => {
      addAgentMessage('🎉 所有文件上传完成！现在开始生成报告流程。');
      setTimeout(async () => {
        await startReportGeneration();
      }, 1000);
    }, 500);
  }
  // 不再生成新的气泡框提示，状态已在原有气泡框中的标题旁显示
};

const removeFile = (fileId) => {
  uploadedFiles.value = uploadedFiles.value.filter(file => file.id !== fileId);
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

// 组件挂载后初始化
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

  // 延迟显示初始提示
  setTimeout(async() => {
    await initializeMessages();
  }, 200);
});
</script>

<template>
  <div class="report-container">

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 左侧面板 -->
      <div class="left-panel">
        <div class="message-container" ref="messageContainer">

          <!-- 动态消息列表 -->
          <div v-for="msg in messages" :key="msg.id" class="message-item" :class="msg.type === 'user' ? 'user-message' : 'agent-message'">
            <div class="message-content" :class="{ 
              'file-message': msg.messageType === 'files',
              'cee-form-message': msg.messageType === 'cee-form',
              'cee-status-message': msg.messageType === 'cee-status'
            }">
              <!-- 普通文本消息 - 使用pre标签保留格式 -->
              <pre v-if="msg.messageType === 'text'" class="text-message">{{ msg.content }}</pre>
              
              <!-- 初始Agent 消息 (左侧) - 文件上传提示 -->
              <div v-if="msg.messageType === 'prompt'" class="message-item agent-message">
                <div class="message-content initial-prompts-container">
                  <!-- PanEU 报告文件上传提示 -->
                  <div class="upload-prompt-section">
                    <div class="title-button-row">
                      <h3 class="prompt-title">
                        📊 PanEU 报告分析
                        <span v-if="panEUFilesUploaded" class="title-checkmark">✅</span>
                      </h3>
                      <button 
                        class="upload-prompt-btn paneu-btn" 
                        :class="{ 'uploaded': panEUFilesUploaded }"
                        @click="triggerPanEUFileUpload"
                        :disabled="panEUFilesUploaded"
                      >
                        <svg v-if="!panEUFilesUploaded" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.64 16.2a2 2 0 01-2.83-2.83l8.49-8.49" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        {{ panEUFilesUploaded ? '已上传 PanEU' : '上传 PanEU 文件' }}
                      </button>
                    </div>
                    <pre class="file-paths-text">{{ panEUText }}</pre>
                    <!-- PanEU 文件验证错误提示 -->
                    <div v-if="panEUValidationError" class="validation-error">
                      <div class="error-icon">⚠️</div>
                      <div class="error-text">{{ panEUValidationError }}</div>
                    </div>
                  </div>

                  <!-- 分隔线 -->
                  <div class="prompt-divider"></div>

                  <!-- DI 分析文件上传提示 -->
                  <div class="upload-prompt-section">
                    <div class="title-button-row">
                      <h3 class="prompt-title">
                        🔍 DI 分析报告
                        <span v-if="diFilesUploaded" class="title-checkmark">✅</span>
                      </h3>
                      <button 
                        class="upload-prompt-btn di-btn" 
                        :class="{ 'uploaded': diFilesUploaded }"
                        @click="triggerDIFileUpload"
                        :disabled="diFilesUploaded"
                      >
                        <svg v-if="!diFilesUploaded" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 715.66 5.66L9.64 16.2a2 2 0 01-2.83-2.83l8.49-8.49" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        {{ diFilesUploaded ? '已上传 DI' : '上传 DI 文件' }}
                      </button>
                    </div>
                    <pre class="file-paths-text">{{ diText }}</pre>
                    <!-- DI 文件验证错误提示 -->
                    <div v-if="diValidationError" class="validation-error">
                      <div class="error-icon">⚠️</div>
                      <div class="error-text">{{ diValidationError }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 文件消息 -->
              <div v-else-if="msg.messageType === 'files'" class="files-message">
                <div class="files-message-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.64 16.2a2 2 0 01-2.83-2.83l8.49-8.49" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>已发送 {{ msg.content.length }} 个文件</span>
                </div>
                <div class="files-preview">
                  <div v-for="file in msg.content.slice(0, 3)" :key="file.id" class="file-preview-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>{{ file.name }}</span>
                  </div>
                  <div v-if="msg.content.length > 3" class="more-files">
                    +{{ msg.content.length - 3 }} 更多文件
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        <!-- 上传文件列表 -->
        <div v-if="uploadedFiles.length > 0 && !allFilesUploaded" class="uploaded-files-area">
          <div class="files-header">
            <h4>已上传文件 ({{ uploadedFiles.length }})</h4>
            <button class="clear-all-btn" @click="uploadedFiles = []" title="清空所有文件">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="files-list">
            <div v-for="file in uploadedFiles" :key="file.id" class="file-item">
              <div class="file-info">
                <div class="file-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="file-details">
                  <div class="file-name" :title="file.name">{{ file.name }}</div>
                  <div class="file-meta">{{ formatFileSize(file.size) }} • {{ file.uploadTime }}</div>
                </div>
              </div>
              <button class="remove-file-btn" @click="removeFile(file.id)" title="删除文件">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 聊天输入区域 -->
        <div class="chat-input-area" :class="{ 'disabled': showInitialPrompts }">
          <div class="input-container">
            <input 
              type="text" 
              v-model="message" 
              class="message-input" 
              placeholder="输入您的消息..."
              @keyup.enter="sendMessage"
              :disabled="showInitialPrompts"
            />
            <div class="button-group">
              <button 
                class="send-btn" 
                @click="sendMessage"
                :disabled="showInitialPrompts || !message.trim()"
                :class="{ 'has-content': message.trim() || uploadedFiles.length > 0 }"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <!-- 隐藏的文件输入 -->
            <input 
              type="file" 
              ref="fileInputRef"
              @change="handleFileUpload"
              multiple
              accept=".csv,.xlsx,.xls,.pdf,.txt,.json"
              style="display: none;"
            />
            <!-- PanEU 文件输入 -->
            <input 
              type="file" 
              ref="panEUFileInputRef"
              @change="handlePanEUFileUpload"
              multiple
              accept=".csv,.xlsx,.xls,.pdf,.txt,.json"
              style="display: none;"
            />
            <!-- DI 文件输入 -->
            <input 
              type="file" 
              ref="diFileInputRef"
              @change="handleDIFileUpload"
              multiple
              accept=".csv,.xlsx,.xls,.pdf,.txt,.json"
              style="display: none;"
            />
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
        
        <!-- 使用 ReportTab 组件 -->
        <ReportTab
          :report-generated="reportGenerated"
          :pan-e-u-result="panEUResult"
          :di-result="diResult"
          :cee-result="ceeResult"
          :action-result="actionResult"
          :eu-expansion-checkli="EUExpansionCheckli"
          :eu-expansion-checkli-cee="EUExpansionCheckliCee"
        />
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
            <button class="feedback-btn" >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              发送邮件
            </button>
          </div>
          <div class="button-right">
            <button class="preview-btn" @click="openUniReport" :disabled="!reportGenerated" :title="reportGenerated ? '预览统一报告' : '请先生成报告'">
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
    <!-- 统一报告预览 Modal -->
    <UniReport
      v-model:visible="showUniReport"
      :panEUResult="panEUResult"
      :diResult="diResult"
      :ceeResult="ceeResult"
      :euExpansionCheckli="EUExpansionCheckli"
      :actionResult="actionResult"
      :showPitch="true"
      @close="closeUniReport"
    />
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
  width: 50%;
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
  font-size: 10px;
  line-height: 1.3;
  color: #333;
  white-space: pre-wrap;
  margin: 0;
  word-wrap: break-word;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
}

.typing-cursor {
  animation: blink 1s infinite;
  color: #333;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
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

/* CEE状态选择样式 */
.cee-status-message {
  max-width: 350px !important;
  background-color: #e8f4f0 !important;
  border: 1px solid #d1e7dd;
  padding: 20px;
}

.cee-status-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cee-status-text {
  color: #1e5233;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-line;
  text-align: center;
  font-weight: 500;
}

.cee-status-options {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.cee-status-btn {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #9dd3a8;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #f8fdf9;
  color: #1e5233;
}

.cee-status-btn:hover {
  border-color: #7cc48a;
  background-color: #e8f4f0;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(45, 90, 69, 0.2);
}

.cee-status-joined {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}

.cee-status-joined:hover {
  background-color: #1e7e34;
  border-color: #1e7e34;
}

.cee-status-not-joined {
  background-color: #6c757d;
  color: white;
  border-color: #6c757d;
}

.cee-status-not-joined:hover {
  background-color: #5a6268;
  border-color: #5a6268;
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

.text-message {
  word-wrap: break-word;
  white-space: pre-wrap;
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

/* ReportFrame 样式 */
.report-frame {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Tab 导航栏样式 */
.tab-navigation {
  background-color: #232f3e;
  border-bottom: none;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(35, 47, 62, 0.15);
}

.tab-container {
  display: flex;
  gap: 0;
  width: 100%;
  margin: 0;
}

.tab-item {
  position: relative;
  padding: 16px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
  white-space: nowrap;
}

.tab-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.tab-item.active {
  color: #ff9900;
  border-bottom-color: #ff9900;
  background-color: rgba(255, 153, 0, 0.1);
}

.tab-title {
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
}

.tab-item.active .tab-title {
  color: #ff9900;
  font-weight: 600;
}

.tab-indicator {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #ff9900;
  border-radius: 2px 2px 0 0;
}

/* 内容区域样式 */
.tab-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  background-color: #fafafa;
}

.content-panel {
  width: 100%;
  max-width: none;
  margin: 0;
  height: 80vh;
  padding: 20px;
  animation: fadeIn 0.4s ease-in;
  box-sizing: border-box;
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

.content-header {
  text-align: center;
  margin-bottom: 40px;
}

.content-header h2 {
  font-size: 32px;
  color: #232f3e;
  margin: 0 0 16px 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.content-description {
  font-size: 18px;
  color: #5a6c7d;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
}

.content-body {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e8ed;
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
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
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 20px 20px;
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
  padding: 8px 20px;
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

.send-btn.has-content {
  background-color: #e8f5e8;
  color: #2e7d32;
}

.send-btn.has-content:hover {
  background-color: #c8e6c8;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn:disabled:hover {
  background-color: transparent;
}

/* 上传文件列表样式 */
.uploaded-files-area {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.files-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dee2e6;
}

.files-header h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
}

.clear-all-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #6c757d;
  transition: all 0.2s ease;
}

.clear-all-btn:hover {
  background-color: #e9ecef;
  color: #dc3545;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 120px;
  overflow-y: auto;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #dee2e6;
  transition: all 0.2s ease;
}

.file-item:hover {
  border-color: #adb5bd;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.file-icon {
  color: #6c757d;
  flex-shrink: 0;
}

.file-details {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: 13px;
  font-weight: 500;
  color: #212529;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.file-meta {
  font-size: 11px;
  color: #6c757d;
}

.remove-file-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #6c757d;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.remove-file-btn:hover {
  background-color: #f8d7da;
  color: #dc3545;
}

/* 文件列表滚动条样式 */
.files-list::-webkit-scrollbar {
  width: 4px;
}

.files-list::-webkit-scrollbar-track {
  background: #f1f3f4;
  border-radius: 2px;
}

.files-list::-webkit-scrollbar-thumb {
  background: #dadce0;
  border-radius: 2px;
}

.files-list::-webkit-scrollbar-thumb:hover {
  background: #bdc1c6;
}

/* 文件消息样式 */
.file-message {
  background-color: #e3f2fd !important;
  border: 1px solid #bbdefb !important;
  min-width: 200px;
  max-width: 300px;
}

.files-message {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.files-message-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #1976d2;
  font-size: 13px;
}

.files-message-header svg {
  color: #1976d2;
}

.files-preview {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.file-preview-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #424242;
  padding: 2px 0;
}

.file-preview-item svg {
  color: #757575;
  flex-shrink: 0;
}

.file-preview-item span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.more-files {
  font-size: 11px;
  color: #757575;
  font-style: italic;
  padding: 2px 0;
  margin-left: 18px;
}

/* CEE表单容器样式 */
.cee-form-container {
  width: 100%;
}

/* CEE表单消息特殊样式覆盖 */
.message-content.cee-form-message {
  max-width: 400px !important;
  background-color: #e8f4f0 !important;
  border: 1px solid #d1e7dd !important;
  padding: 20px !important;
}

/* 初始上传提示容器样式 - 与普通agent消息保持一致 */
.initial-prompts-container {
  background-color: #e8f4f0 !important;
  color: #2d5a45 !important;
  border: 1px solid #d1e7dd !important;
  border-bottom-left-radius: 4px !important;
  max-width: 90% !important;
  padding: 20px !important;
}

.upload-prompt-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.upload-prompt-section:last-child {
  margin-bottom: 0;
}

.title-button-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.prompt-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #1e5233;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-checkmark {
  font-size: 16px;
  animation: checkmarkAppear 0.3s ease-in;
}

@keyframes checkmarkAppear {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.upload-prompt-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 2px solid;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
  justify-content: center;
}

.paneu-btn {
  background-color: #4285f4;
  color: white;
  border-color: #4285f4;
}

.paneu-btn:hover {
  background-color: #3367d6;
  border-color: #3367d6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
}

.di-btn {
  background-color: #34a853;
  color: white;
  border-color: #34a853;
}

.di-btn:hover {
  background-color: #2d8f47;
  border-color: #2d8f47;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 168, 83, 0.3);
}

/* 已上传状态样式 */
.upload-prompt-btn.uploaded {
  background-color: #28a745 !important;
  border-color: #28a745 !important;
  cursor: not-allowed;
  opacity: 0.8;
}

.upload-prompt-btn.uploaded:hover {
  background-color: #28a745 !important;
  border-color: #28a745 !important;
  transform: none !important;
  box-shadow: none !important;
}

.upload-prompt-btn:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}

.prompt-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #9dd3a8, transparent);
  margin: 12px 0;
}

/* 文件验证错误提示样式 */
.validation-error {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 12px;
  padding: 12px 16px;
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-left: 4px solid #e53e3e;
  border-radius: 6px;
  max-width: 400px;
}

.error-icon {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 1px;
}

.error-text {
  color: #c53030;
  font-size: 13px;
  line-height: 1.4;
  word-wrap: break-word;
  white-space: pre-line;
}

/* 禁用状态的聊天输入区域 */
.chat-input-area.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.chat-input-area.disabled .message-input {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.chat-input-area.disabled .attachment-btn,
.chat-input-area.disabled .send-btn {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .report-frame {
    font-size: 14px;
  }
  
  .tab-navigation {
    padding: 0 12px;
  }
  
  .tab-container {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .tab-item {
    padding: 12px 16px;
    font-size: 14px;
    border-radius: 6px 6px 0 0;
  }
  
  .content-panel {
    padding: 16px 12px;
  }
  
  .content-header h2 {
    font-size: 28px;
  }
  
  .content-description {
    font-size: 16px;
  }
  
  .content-body {
    padding: 16px 12px;
  }
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

/* 移动端适配 */
@media (max-width: 768px) {
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
