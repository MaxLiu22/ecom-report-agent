<template>
  <div class="content-panel">
    <div class="content-header">
      <h2>📅 行动计划</h2>
      <p class="content-description">基于分析结果的具体实施路线图</p>
    </div>
    
    <div class="content-body">
      <div class="action-plan-table">
        <table>
          <thead>
            <tr>
              <th class="ranking-col">优先级</th>
              <th class="action-col">行动</th>
              <th class="timeline-col">时间</th>
              <th class="logic-col">读取判断逻辑</th>
            </tr>
          </thead>
          <tbody>
            <!-- 第一行: 合规 - new policy -->
            <tr v-if="computedActionResult.newPolicy">
              <td class="ranking">1</td>
              <td class="action">合规 - new policy (NL/IT)</td>
              <td class="timeline">1个月</td>
              <td class="logic">{{ computedActionResult.newPolicy }}</td>
            </tr>
            
            <!-- 第二行: 合规 - 开了仓储没开税号 -->
            <tr v-if="computedActionResult.warehouseVATCompliance && computedActionResult.warehouseVATCompliance.length">
              <td class="ranking">2</td>
              <td class="action">合规 - 开了仓储没开税号</td>
              <td class="timeline">3个月</td>
              <td class="logic">
                <ul>
                  <li v-for="(item, index) in computedActionResult.warehouseVATCompliance" :key="index">{{ item }}</li>
                </ul>
              </td>
            </tr>
            
            <!-- 第三行: cost saving - pan-EU placement -->
            <tr v-if="computedActionResult.panEUCostSaving && computedActionResult.panEUCostSaving.length">
              <td class="ranking">3</td>
              <td class="action">cost saving - pan-EU placement</td>
              <td class="timeline">3个月</td>
              <td class="logic">
                <ul>
                  <li v-for="(item, index) in computedActionResult.panEUCostSaving" :key="index">{{ item }}</li>
                </ul>
              </td>
            </tr>
            
            <!-- 第四行: cost saving - pan-EU ASIN parity -->
            <tr v-if="computedActionResult.panEUASINParity">
              <td class="ranking">4</td>
              <td class="action">cost saving - pan-EU ASIN parity</td>
              <td class="timeline">1个月</td>
              <td class="logic">{{ computedActionResult.panEUASINParity }}</td>
            </tr>
            
            <!-- 第五行: cost saving - CEE -->
            <tr v-if="computedActionResult.ceeCostSaving">
              <td class="ranking">5</td>
              <td class="action">cost saving - CEE</td>
              <td class="timeline">3个月</td>
              <td class="logic">{{ computedActionResult.ceeCostSaving }}</td>
            </tr>
            
            <!-- DI相关行 - 共享逻辑单元格 -->
            <template v-if="computedActionResult.diIncentive && computedActionResult.diIncentive.length">
              <!-- 第六行: incentive - DI (GSI) -->
              <tr>
                <td class="ranking">6</td>
                <td class="action">cost saving - DI</td>
                <td class="timeline">1个月</td>
                <td class="logic" rowspan="2">
                  <div v-for="(item, index) in computedActionResult.diIncentive" :key="index" class="growth-item">
                    <strong>{{ item.title }}:</strong> {{ item.description }}
                  </div>
                </td>
              </tr>
              
              <!-- 第七行: sales uplift - DI (MPG) -->
              <!-- <tr>
                <td class="ranking">7</td>
                <td class="action">sales uplift - DI (MPG)</td>
                <td class="timeline">3个月</td>
              </tr> -->
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ActionService, { 
  defaultPanEUResult, 
  defaultDiResult, 
  defaultCeeResult, 
  defaultEUExpansionCheckli 
} from '@/services/actionService';

export default {
  name: 'Tab8',
  props: {
    // action 分析结果
    actionResult: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      localActionResult: null
    };
  },
  created() {
    // 如果props中没有传入actionResult，则使用默认参数计算
    if (!this.actionResult) {
      this.calculateWithDefaults();
      console.log('使用默认参数计算');
    } else {
      this.localActionResult = this.actionResult;
    }
  },
  methods: {
    calculateWithDefaults() {
      const actionService = new ActionService(
        defaultPanEUResult,
        defaultDiResult,
        defaultCeeResult,
        defaultEUExpansionCheckli
      );
      console.log('使用传入参数计算1111');
      
      this.localActionResult = actionService.calculateAll();
      console.log('计算结果:', this.localActionResult);
    }
  },
  computed: {
    // 使用本地计算结果或props传入的结果
    computedActionResult() {
      return this.localActionResult || this.actionResult;
    }
  }
};
</script>

<style scoped>
.content-panel {
  background-color: #ffffff;
  margin: 0;
  padding: 24px;
  min-height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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

.action-plan-table {
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.action-plan-table table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.action-plan-table th {
  background-color: #232f3e;
  color: white;
  font-weight: 600;
  text-align: left;
  padding: 16px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.action-plan-table td {
  padding: 16px;
  border-bottom: 1px solid #eaeaea;
  vertical-align: top;
}

.action-plan-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.action-plan-table tr:hover {
  background-color: #f1f7ff;
}

.ranking-col {
  width: 80px;
}

.action-col {
  width: 200px;
}

.timeline-col {
  width: 100px;
}

.logic-col {
  /* 剩余空间 */
}

.ranking {
  font-weight: bold;
  color: #ff9900;
  text-align: center;
  font-size: 16px;
}

.action {
  font-weight: 600;
  color: #232f3e;
}

.timeline {
  color: #666;
  font-style: italic;
}

.logic ul {
  margin: 0;
  padding-left: 20px;
}

.logic li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.growth-item {
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #e0e0e0;
}

.growth-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.growth-item strong {
  color: #232f3e;
  display: block;
  margin-bottom: 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-panel {
    padding: 16px;
  }
  
  .content-header h2 {
    font-size: 20px;
  }
  
  .action-plan-table {
    font-size: 14px;
  }
  
  .action-plan-table th,
  .action-plan-table td {
    padding: 12px 8px;
  }
  
  .ranking-col {
    width: 60px;
  }
  
  .action-col {
    width: 150px;
  }
  
  .timeline-col {
    width: 80px;
  }
}

@media (max-width: 480px) {
  .action-plan-table {
    display: block;
  }
  
  .action-plan-table thead {
    display: none;
  }
  
  .action-plan-table tr {
    display: block;
    margin-bottom: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 12px;
  }
  
  .action-plan-table td {
    display: block;
    border-bottom: none;
    padding: 8px 0;
    position: relative;
    padding-left: 120px;
  }
  
  .action-plan-table td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 110px;
    padding-right: 10px;
    font-weight: bold;
    color: #232f3e;
    text-align: right;
  }
  
  .ranking {
    text-align: left;
  }
  
  /* 为移动视图添加数据标签 */
  .action-plan-table td.ranking:before { content: "优先级: "; }
  .action-plan-table td.action:before { content: "行动: "; }
  .action-plan-table td.timeline:before { content: "时间: "; }
  .action-plan-table td.logic:before { 
    content: "逻辑: "; 
    position: static;
    display: block;
    margin-bottom: 8px;
    text-align: left;
    width: auto;
    padding-right: 0;
  }
  
  .action-plan-table td.logic {
    padding-left: 0;
  }
}
</style>