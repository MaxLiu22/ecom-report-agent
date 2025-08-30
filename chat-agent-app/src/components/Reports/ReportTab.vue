<template>
  <div class="report-frame">
    <!-- Tab 导航栏 -->
    <div class="tab-navigation">
      <div class="tab-container">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-item"
          :class="{ 'active': activeTab === tab.id }"
          @click="switchTab(tab.id)"
        >
          <span class="tab-title">{{ tab.title }}</span>
          <div class="tab-indicator" v-if="activeTab === tab.id"></div>
        </div>
      </div>
    </div>

    <!-- Tab 内容区域 -->
    <div class="tab-content">
      
      <!-- Tab 1: 概览 -->
      <div v-if="activeTab === 0" class="content-panel">
        <div class="content-header">
          <h2 v-if="!reportGenerated">📋 物流分析报告</h2>
          <h2 v-else>📊 IntraEU.AI</h2>
          <p v-if="reportGenerated" class="content-description">基于您的数据生成的详细分析结果概览</p>
        </div>
        
        <div class="content-body">
          <!-- 未生成报告时显示使用步骤 -->
          <div v-if="!reportGenerated">
            <div style="margin-top: 30px;">
              <h3 style="color: #333; font-size: 20px; margin-bottom: 20px; border-bottom: 2px solid #FF8C00; padding-bottom: 10px;">📋 使用步骤</h3>
              <div style="background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <span style="background: #FF8C00; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px;">1</span>
                  <span style="color: #333; font-size: 14px;">上传分析所需的数据文件</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <span style="background: #FF8C00; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px;">2</span>
                  <span style="color: #333; font-size: 14px;">填写 CEE 中欧计划分析参数</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="background: #FF8C00; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px;">3</span>
                  <span style="color: #333; font-size: 14px;">点击生成报告并查看结果</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 报告生成后显示概览信息 -->
          <div v-else>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
              <!-- PanEU 概览卡片 -->
              <div v-if="panEUResult" class="overview-card" @click="switchTab(1)">
                <div class="card-header">
                  <h4>🌍 PanEU 分析</h4>
                  <span class="card-badge">已完成</span>
                </div>
                <div class="card-content">
                  <p>{{ panEUResult.report_title }}</p>
                  <div class="card-stats">
                    <span v-if="panEUResult.excel_data">{{ panEUResult.excel_data.rows.length }} 项指标</span>
                  </div>
                </div>
              </div>
              
              <!-- DI 概览卡片 -->
              <div v-if="diResult" class="overview-card" @click="switchTab(2)">
                <div class="card-header">
                  <h4>🔄 DI 分析</h4>
                  <span class="card-badge">已完成</span>
                </div>
                <div class="card-content">
                  <p>{{ diResult.report_title }}</p>
                  <div class="card-stats">
                    <span v-if="diResult.data_table">{{ diResult.data_table.rows.length }} 个ASIN</span>
                  </div>
                </div>
              </div>
              
              <!-- CEE 概览卡片 -->
              <div v-if="ceeResult" class="overview-card" @click="switchTab(3)">
                <div class="card-header">
                  <h4>💰 CEE 成本分析</h4>
                  <span class="card-badge">已完成</span>
                </div>
                <div class="card-content">
                  <p>成本效益分析结果</p>
                  <div class="card-stats">
                    <span>详细数据</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tab 2: PanEU 分析 -->
      <div v-if="activeTab === 1" class="content-panel">
        <div class="content-header">
          <h2>🌍 PanEU 分析结果</h2>
          <p class="content-description">欧洲泛欧计划机会分析详情</p>
        </div>
        
        <div class="content-body">
          <div v-if="panEUResult">
            <h4 style="color: #333; font-size: 16px; margin: 10px 0;">{{ panEUResult.report_title }}</h4>
            <p style="color: #666; font-size: 14px; margin: 10px 0;">{{ panEUResult.report_subtitle }}</p>
            
            <!-- PanEU 表格 -->
            <div v-if="panEUResult.excel_data" style="margin: 20px 0;">
              <h5 style="color: #333; font-size: 14px; margin-bottom: 15px;">PanEU ASIN 机会概览</h5>
              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px; background: #ffffff; border: 1px solid #ddd; border-radius: 4px;">
                  <thead>
                    <tr>
                      <th v-for="header in panEUResult.excel_data.headers" :key="header" style="background: #333; color: white; padding: 12px 8px; text-align: center; border-right: 1px solid #555;">{{ header }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in panEUResult.excel_data.rows" :key="row.metric">
                      <td style="padding: 10px 8px; border: 1px solid #ddd;">{{ row.metric }}</td>
                      <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center; font-weight: bold; color: #FF6B35;">{{ row.count }}</td>
                      <td style="padding: 10px 8px; border: 1px solid #ddd;">{{ row.description }}</td>
                      <td style="padding: 10px 8px; border: 1px solid #ddd;">{{ row.formula }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-else class="no-data">
            <p>暂无 PanEU 分析数据</p>
          </div>
        </div>
      </div>
      
      <!-- Tab 3: DI 分析 -->
      <div v-if="activeTab === 2" class="content-panel">
        <div class="content-header">
          <h2>🔄 DI 分析结果</h2>
          <p class="content-description">双边入库机会分析详情</p>
        </div>
        
        <div class="content-body">
          <div v-if="diResult">
            <h4 style="color: #333; font-size: 16px; margin: 10px 0;">{{ diResult.report_title }}</h4>
            
            <!-- 关键机会分析 -->
            <div v-if="diResult.key_opportunity_analysis" style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #FF8C00;">
              <h5 style="color: #333; font-size: 14px; margin: 0 0 10px 0;">{{ diResult.key_opportunity_analysis.title }}</h5>
              <p style="color: #666; font-size: 13px; margin: 0 0 10px 0;">{{ diResult.key_opportunity_analysis.subtitle }}</p>
              <ul style="margin: 0; padding-left: 20px;">
                <li v-for="point in diResult.key_opportunity_analysis.points" :key="point.title" style="color: #555; font-size: 13px; margin: 5px 0;">
                  <strong>{{ point.title }}:</strong> {{ point.description }}
                </li>
              </ul>
            </div>
            
            <!-- 推荐行动 -->
            <div v-if="diResult.recommended_actions" style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #FF8C00;">
              <h5 style="color: #333; font-size: 14px; margin: 0 0 10px 0;">{{ diResult.recommended_actions.title }}</h5>
              <ol style="margin: 0; padding-left: 20px;">
                <li v-for="action in diResult.recommended_actions.actions" :key="action.priority" style="color: #555; font-size: 13px; margin: 8px 0;">
                  <span style="background: #FF6B35; color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: bold; margin-right: 8px;">P{{ action.priority }}</span>
                  {{ action.recommendation }}
                </li>
              </ol>
            </div>
            
            <!-- 数据表 -->
            <div v-if="diResult.data_table" style="margin: 20px 0;">
              <h5 style="color: #333; font-size: 14px; margin-bottom: 15px;">数据表</h5>
              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px; background: #ffffff; border: 1px solid #ddd; border-radius: 4px;">
                  <thead>
                    <tr>
                      <th v-for="header in diResult.data_table.headers" :key="header" style="background: #333; color: white; padding: 12px 8px; text-align: center; border-right: 1px solid #555;">{{ header }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in diResult.data_table.rows" :key="row['#']">
                      <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center;">{{ row['#'] }}</td>
                      <td style="padding: 10px 8px; border: 1px solid #ddd;">{{ row['UK<>EU ASIN'] }}</td>
                      <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center; font-weight: bold; color: #FF6B35;">{{ row['数量'] }}</td>
                      <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center;">{{ row['来源商城销售额(T30D)'] }}</td>
                      <td style="padding: 10px 8px; border: 1px solid #ddd;">{{ row['机会点及操作'] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-else class="no-data">
            <p>暂无 DI 分析数据</p>
          </div>
        </div>
      </div>
      
      <!-- Tab 4: CEE 分析 -->
      <div v-if="activeTab === 3" class="content-panel">
        <div class="content-header">
          <h2>💰 CEE 成本分析结果</h2>
          <p class="content-description">中欧计划成本效益分析详情</p>
        </div>
        
        <div class="content-body">
          <div v-if="ceeResult">
            <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0;">
              <pre style="font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 11px; line-height: 1.4; color: #333; white-space: pre-wrap; word-wrap: break-word; margin: 0;">{{ JSON.stringify(ceeResult, null, 2) }}</pre>
            </div>
          </div>
          <div v-else class="no-data">
            <p>暂无 CEE 成本分析数据</p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ReportTab',
  props: {
    // 是否已生成报告
    reportGenerated: {
      type: Boolean,
      default: false
    },
    // PanEU 分析结果
    panEUResult: {
      type: Object,
      default: null
    },
    // DI 分析结果
    diResult: {
      type: Object,
      default: null
    },
    // CEE 成本分析结果
    ceeResult: {
      type: Object,
      default: null
    }
  },
  setup() {
    // 当前活跃的标签页
    const activeTab = ref(0)
    
    // 标签页配置
    const tabs = [
      { id: 0, title: '概览', key: 'overview' },
      { id: 1, title: 'PanEU分析', key: 'paneu' },
      { id: 2, title: 'DI分析', key: 'di' },
      { id: 3, title: 'CEE分析', key: 'cee' }
    ]
    
    // 切换标签页
    const switchTab = (tabId) => {
      activeTab.value = tabId
    }
    
    return {
      activeTab,
      tabs,
      switchTab
    }
  }
}
</script>

<style scoped>
/* ReportFrame 样式 */
.report-frame {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Tab 导航栏样式 - AWS 风格 */
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
  color: #ffffff;
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
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #ff9900;
  border-radius: 2px 2px 0 0;
}

/* Tab 内容区域 */
.tab-content {
  flex: 1;
  background-color: #f5f5f5;
  overflow-y: auto;
}

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

.content-body {
  color: #333333;
}

/* 概览卡片样式 */
.overview-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.overview-card:hover {
  border-color: #ff9900;
  box-shadow: 0 4px 12px rgba(255, 153, 0, 0.15);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-header h4 {
  margin: 0;
  color: #232f3e;
  font-size: 16px;
  font-weight: 600;
}

.card-badge {
  background-color: #28a745;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-content {
  color: #666666;
  font-size: 14px;
  line-height: 1.5;
}

.card-content p {
  margin: 0 0 8px 0;
}

.card-stats {
  color: #ff9900;
  font-size: 12px;
  font-weight: 500;
  margin-top: 8px;
}

/* 无数据状态 */
.no-data {
  text-align: center;
  padding: 40px;
  color: #999999;
  font-size: 14px;
}

.no-data p {
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tab-navigation {
    padding: 0 10px;
  }
  
  .tab-item {
    padding: 12px 16px;
    font-size: 12px;
  }
  
  .content-panel {
    padding: 16px;
  }
  
  .content-header h2 {
    font-size: 20px;
  }
  
  .overview-card {
    padding: 16px;
  }
}
</style>
