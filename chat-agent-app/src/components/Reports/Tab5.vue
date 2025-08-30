<template>
  <div class="content-panel">
    <div class="content-header">
      <h2>🌍 欧洲站点拓展评估</h2>
      <p class="content-description">欧洲各站点拓展机会评估分析</p>
    </div>
    
    <div class="content-body">
      <!-- 新增的欧洲站点评估表格 -->
      <div class="europe-expansion-table">
        <table>
          <thead>
            <tr>
              <th colspan="3"></th>
              <th colspan="1" class="region-header">
                {{ regions[0] }}
              </th>
              <th colspan="4" class="region-header_1">
                {{ regions[1] }}
              </th>
            </tr>
            <tr class="sub-header">
              <th>MCID</th>
              <th>账户名称</th>
              <th>指标名称</th>
              <th v-for="country in countries" :key="country">{{ country }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in EUExpansionCheckli" :key="item.指标">
                
              <!-- 只在第一行显示MCID和账户名称，并设置rowspan -->
              <td v-if="index === 0" :rowspan="EUExpansionCheckli.length" class="mcid-cell">
                {{ MCID }}
              </td>
              <td v-if="index === 0" :rowspan="EUExpansionCheckli.length" class="account-cell">
                {{ accountTitle }}
              </td>
              
              <!-- 指标名称 -->
              <td class="metric-name">{{ item.指标 }}</td>
              
              <!-- 国家数据 -->
              <td v-for="country in countries" :key="country" class="value-cell">
                <span v-if="item[country] === 1" class="checkmark">✓</span>
                <span v-else-if="item[country] === 0" class="cross">✗</span>
                <span v-else-if="item[country] === null" class="null-value">-</span>
                <span v-else>{{ item[country] }}</span>
              </td>
            
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 原有的 PanEU、DI、CEE 分析部分保持不变 -->
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
import { defaultEUExpansionCheckli } from '@/services/actionService';

export default {
  name: 'Tab5',
  props: {
    // defaultEUExpansionCheckli结果
    EUExpansionCheckli: {
      type: Array,
      default: () => defaultEUExpansionCheckli
    },
    region: {
      type: Array,
      default: null
    },
    MCID: {
      type: String,
      default: "157076946612"
    },
    accountTitle: {
      type: String,
      default: "Sinuolong Lighting"
    }
  },
  computed: {
    regions() {
      return this.region || ["0.英国和欧盟间物流", "1.EU5欧盟内物流"];
    },
    countries() {
      return ["英国", "德国", "意大利", "法国", "西班牙"];
    },
    hasUKData() {
      // 检查是否有英国数据
      return this.EUExpansionCheckli.some(item => 
        item.hasOwnProperty("英国") && item["英国"] !== null
      );
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

/* 欧洲站点评估表格样式 */
.europe-expansion-table {
  margin-bottom: 40px;
  overflow-x: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.europe-expansion-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  background: white;
}

.europe-expansion-table th {
  background-color: #232f3e;
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 12px 8px;
  border: 1px solid #444;
}

.region-header {
  background-color: #37475a !important;
  font-size: 16px;
  padding: 16px 8px;
}

.region-header_1 {
  background-color: #223a57 !important;
  font-size: 16px;
  padding: 16px 8px;
}

.sub-header {
  background-color: #485769 !important;
}

.europe-expansion-table td {
  padding: 12px 8px;
  border: 1px solid #e0e0e0;
  text-align: center;
}

.mcid-cell, .account-cell {
  background-color: #f3f4f6;
  font-weight: 600;
  color: #232f3e;
  text-align: center;
  vertical-align: middle;
}

.metric-name {
  text-align: left;
  font-weight: 500;
  color: #232f3e;
  background-color: #f8f9fa;
  padding-left: 16px !important;
}

.value-cell {
  font-weight: 500;
}

.checkmark {
  color: #00a650;
  font-weight: bold;
  font-size: 16px;
}

.cross {
  color: #ff4d4f;
  font-weight: bold;
  font-size: 16px;
}

.null-value {
  color: #999;
  font-style: italic;
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
  
  .europe-expansion-table {
    font-size: 12px;
  }
  
  .europe-expansion-table th,
  .europe-expansion-table td {
    padding: 8px 4px;
  }
  
  .metric-name {
    padding-left: 8px !important;
  }
}

@media (max-width: 480px) {
  .europe-expansion-table {
    display: block;
  }
  
  .europe-expansion-table thead {
    display: none;
  }
  
  .europe-expansion-table tr {
    display: block;
    margin-bottom: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 12px;
  }
  
  .europe-expansion-table td {
    display: block;
    border-bottom: none;
    padding: 8px 0;
    position: relative;
    padding-left: 120px;
    text-align: left;
  }
  
  .europe-expansion-table td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 110px;
    padding-right: 10px;
    font-weight: bold;
    color: #232f3e;
    text-align: right;
  }
  
  .mcid-cell, .account-cell {
    text-align: left;
    padding-left: 120px;
  }
}
</style>