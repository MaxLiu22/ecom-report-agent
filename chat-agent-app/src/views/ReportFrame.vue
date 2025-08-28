<script setup>
import { ref } from 'vue';

const activeTab = ref(0);

const tabs = [
  { id: 0, title: '欧洲站点拓展评估', key: 'evaluation' },
  { id: 1, title: '欧洲站拓展解决方案定制', key: 'solutions' },
  { id: 2, title: '政策更新', key: 'policy' },
  { id: 3, title: '行动计划', key: 'action' }
];

const switchTab = (tabId) => {
  activeTab.value = tabId;
};
</script>

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
      <!-- Tab 1: 欧洲站点拓展评估 -->
      <div v-if="activeTab === 0" class="content-panel">
        <div class="content-header">
          <h2>🌍 欧洲站点拓展评估</h2>
          <p class="content-description">全面评估您的欧洲市场拓展机会与挑战</p>
        </div>
        <div class="content-body">
          <div class="evaluation-cards">
            <div class="eval-card">
              <div class="card-icon">📊</div>
              <h3>市场分析</h3>
              <p>深入分析目标欧洲市场的潜力、竞争态势和消费者行为</p>
            </div>
            <div class="eval-card">
              <div class="card-icon">💰</div>
              <h3>成本评估</h3>
              <p>全面评估进入欧洲市场所需的各项成本投入</p>
            </div>
            <div class="eval-card">
              <div class="card-icon">⚖️</div>
              <h3>合规检查</h3>
              <p>确保您的业务符合欧盟各国的法律法规要求</p>
            </div>
            <div class="eval-card">
              <div class="card-icon">🎯</div>
              <h3>风险评估</h3>
              <p>识别并评估潜在的业务风险和挑战</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: 欧洲站拓展解决方案定制 -->
      <div v-if="activeTab === 1" class="content-panel">
        <div class="content-header">
          <h2>🛠️ 欧洲站拓展解决方案定制</h2>
          <p class="content-description">为您量身定制的欧洲市场拓展解决方案</p>
        </div>
        <div class="content-body">
          <div class="solution-sections">
            <div class="solution-section">
              <h3>2.1 欧盟内部物流方案</h3>
              <div class="solution-details">
                <div class="detail-item">
                  <span class="detail-icon">🚚</span>
                  <span>优化的配送网络布局</span>
                </div>
                <div class="detail-item">
                  <span class="detail-icon">📦</span>
                  <span>多国仓储解决方案</span>
                </div>
                <div class="detail-item">
                  <span class="detail-icon">⚡</span>
                  <span>快速履约服务</span>
                </div>
              </div>
            </div>
            
            <div class="solution-section">
              <h3>2.2 英国和欧盟间物流方案</h3>
              <div class="solution-details">
                <div class="detail-item">
                  <span class="detail-icon">🌉</span>
                  <span>跨境物流优化</span>
                </div>
                <div class="detail-item">
                  <span class="detail-icon">📋</span>
                  <span>海关清关服务</span>
                </div>
                <div class="detail-item">
                  <span class="detail-icon">💼</span>
                  <span>脱欧后合规方案</span>
                </div>
              </div>
            </div>

            <div class="solution-section">
              <h3>2.3 更多成本节约</h3>
              <div class="solution-details">
                <div class="detail-item">
                  <span class="detail-icon">💡</span>
                  <span>智能成本优化</span>
                </div>
                <div class="detail-item">
                  <span class="detail-icon">📈</span>
                  <span>规模经济效益</span>
                </div>
                <div class="detail-item">
                  <span class="detail-icon">🔄</span>
                  <span>流程自动化</span>
                </div>
              </div>
            </div>

            <div class="solution-section">
              <h3>2.4 合规风险</h3>
              <div class="solution-details">
                <div class="detail-item">
                  <span class="detail-icon">🛡️</span>
                  <span>合规风险管理</span>
                </div>
                <div class="detail-item">
                  <span class="detail-icon">📜</span>
                  <span>法规更新跟踪</span>
                </div>
                <div class="detail-item">
                  <span class="detail-icon">✅</span>
                  <span>合规性审核</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 3: 政策更新 -->
      <div v-if="activeTab === 2" class="content-panel">
        <div class="content-header">
          <h2>📢 政策更新</h2>
          <p class="content-description">最新的欧盟政策变化和影响分析</p>
        </div>
        <div class="content-body">
          <div class="policy-updates">
            <div class="update-item">
              <div class="update-date">2024年1月</div>
              <div class="update-content">
                <h4>数字服务法案 (DSA) 全面实施</h4>
                <p>欧盟数字服务法案对在线平台的内容审核和透明度要求进一步加强</p>
                <span class="impact-tag high">高影响</span>
              </div>
            </div>
            <div class="update-item">
              <div class="update-date">2024年2月</div>
              <div class="update-content">
                <h4>碳边境调节机制 (CBAM) 扩展</h4>
                <p>更多产品类别纳入碳边境税范围，影响进口商品成本结构</p>
                <span class="impact-tag medium">中等影响</span>
              </div>
            </div>
            <div class="update-item">
              <div class="update-date">2024年3月</div>
              <div class="update-content">
                <h4>消费者权益保护法更新</h4>
                <p>在线销售的退货政策和消费者保护措施进一步完善</p>
                <span class="impact-tag low">低影响</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 4: 行动计划 -->
      <div v-if="activeTab === 3" class="content-panel">
        <div class="content-header">
          <h2>🎯 行动计划</h2>
          <p class="content-description">基于分析结果的具体实施路线图</p>
        </div>
        <div class="content-body">
          <div class="action-timeline">
            <div class="timeline-item">
              <div class="timeline-marker phase1">1</div>
              <div class="timeline-content">
                <h3>第一阶段：准备期 (1-2个月)</h3>
                <ul class="action-list">
                  <li>完成市场调研和竞争分析</li>
                  <li>建立欧洲团队和合作伙伴关系</li>
                  <li>完善产品本地化策略</li>
                  <li>建立合规框架</li>
                </ul>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker phase2">2</div>
              <div class="timeline-content">
                <h3>第二阶段：试点期 (2-4个月)</h3>
                <ul class="action-list">
                  <li>在重点市场启动试点销售</li>
                  <li>建立物流和配送网络</li>
                  <li>实施客户服务体系</li>
                  <li>收集市场反馈并优化</li>
                </ul>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker phase3">3</div>
              <div class="timeline-content">
                <h3>第三阶段：扩展期 (4-8个月)</h3>
                <ul class="action-list">
                  <li>扩大销售规模和市场覆盖</li>
                  <li>优化供应链和库存管理</li>
                  <li>加强品牌营销和推广</li>
                  <li>建立长期合作关系</li>
                </ul>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker phase4">4</div>
              <div class="timeline-content">
                <h3>第四阶段：优化期 (持续进行)</h3>
                <ul class="action-list">
                  <li>持续优化运营效率</li>
                  <li>拓展新的产品线和市场</li>
                  <li>建立可持续发展策略</li>
                  <li>定期评估和调整战略</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

/* 评估卡片样式 */
.evaluation-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.eval-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  border: 1px solid #e1e8ed;
}

.eval-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(35, 47, 62, 0.15);
  border-color: #ff9900;
}

.card-icon {
  font-size: 32px;
  margin-bottom: 16px;
}

.eval-card h3 {
  font-size: 20px;
  color: #232f3e;
  margin: 0 0 12px 0;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.eval-card p {
  font-size: 15px;
  color: #5a6c7d;
  margin: 0;
  line-height: 1.6;
  font-weight: 400;
}

/* 解决方案样式 */
.solution-sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.solution-section {
  border-left: 4px solid #ff9900;
  padding-left: 24px;
  background-color: #ffffff;
  padding: 24px;
  border-radius: 0 8px 8px 0;
  border: 1px solid #e1e8ed;
  border-left: 4px solid #ff9900;
}

.solution-section h3 {
  font-size: 22px;
  color: #232f3e;
  margin: 0 0 16px 0;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.solution-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: #fafafa;
  border-radius: 6px;
  border: 1px solid #e1e8ed;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.detail-item:hover {
  background-color: #fff3e6;
  border-color: #ff9900;
}

.detail-icon {
  font-size: 18px;
  width: 24px;
  text-align: center;
  color: #ff9900;
}

/* 政策更新样式 */
.policy-updates {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.update-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  border-left: 4px solid #ff9900;
  border: 1px solid #e1e8ed;
  border-left: 4px solid #ff9900;
}

.update-date {
  font-size: 14px;
  font-weight: 600;
  color: #ff9900;
  white-space: nowrap;
  min-width: 80px;
}

.update-content {
  flex: 1;
}

.update-content h4 {
  font-size: 20px;
  color: #232f3e;
  margin: 0 0 8px 0;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.update-content p {
  font-size: 15px;
  color: #5a6c7d;
  margin: 0 0 12px 0;
  line-height: 1.6;
}

.impact-tag {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.impact-tag.high {
  background-color: #d73027;
  color: white;
}

.impact-tag.medium {
  background-color: #ff9900;
  color: white;
}

.impact-tag.low {
  background-color: #146eb4;
  color: white;
}

/* 行动计划样式 */
.action-timeline {
  position: relative;
  padding-left: 40px;
}

.action-timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #232f3e, #ff9900);
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;
  padding-left: 40px;
}

.timeline-marker {
  position: absolute;
  left: -28px;
  top: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: white;
  z-index: 1;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.timeline-marker.phase1 {
  background-color: #232f3e;
}

.timeline-marker.phase2 {
  background-color: #146eb4;
}

.timeline-marker.phase3 {
  background-color: #ff9900;
}

.timeline-marker.phase4 {
  background-color: #d73027;
}

.timeline-content {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e1e8ed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.timeline-content h3 {
  font-size: 22px;
  color: #232f3e;
  margin: 0 0 16px 0;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.action-list {
  margin: 0;
  padding-left: 20px;
}

.action-list li {
  font-size: 15px;
  color: #5a6c7d;
  margin-bottom: 10px;
  line-height: 1.6;
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
  
  .evaluation-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .eval-card {
    padding: 20px;
  }
  
  .solution-section {
    padding: 20px;
  }
  
  .solution-details {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .update-item {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }
  
  .action-timeline {
    padding-left: 24px;
  }
  
  .timeline-item {
    padding-left: 24px;
  }
  
  .timeline-marker {
    left: -20px;
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  .timeline-content {
    padding: 20px;
  }
}
</style>
