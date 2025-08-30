<template>
  <div class="content-panel">
    <div class="content-header">
      <h2>🌍 欧洲站点拓展评估</h2>
      <p class="content-description">欧洲各站点拓展机会评估分析</p>
    </div>
    
    <div class="content-body">
      <!-- PanEU 分析部分 -->
      <div class="analysis-section">
        <div class="section-header">
          <h3>🌍 PanEU 分析结果</h3>
          <p class="section-description">欧洲泛欧计划机会分析详情</p>
        </div>
        
        <div class="section-content">
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

      <!-- DI 分析部分 -->
      <div class="analysis-section">
        <div class="section-header">
          <h3>🔄 DI 分析结果</h3>
          <p class="section-description">双边入库机会分析详情</p>
        </div>
        
        <div class="section-content">
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

      <!-- CEE 分析部分 -->
      <div class="analysis-section">
        <div class="section-header">
          <h3>💰 CEE 成本分析结果</h3>
          <p class="section-description">中欧计划成本效益分析详情</p>
        </div>
        
        <div class="section-content">
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
export default {
  name: 'Tab5',
  props: {
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
  }
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

/* 分析部分样式 */
.analysis-section {
  margin-bottom: 40px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.section-header {
  background: #f8f9fa;
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
}

.section-header h3 {
  margin: 0 0 8px 0;
  color: #232f3e;
  font-size: 20px;
  font-weight: 600;
}

.section-description {
  margin: 0;
  color: #666666;
  font-size: 14px;
  line-height: 1.5;
}

.section-content {
  padding: 24px;
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
  .content-panel {
    padding: 16px;
  }
  
  .content-header h2 {
    font-size: 20px;
  }
}
</style>
