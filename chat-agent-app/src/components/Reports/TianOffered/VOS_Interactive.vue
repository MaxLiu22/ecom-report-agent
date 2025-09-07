<template>
  <div class="app">
    <div class="container">
      <div class="header">
        <h1>VOS 卖家反馈收集</h1>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['tab-btn', { 'active': activeTab === tab.id }]">
          {{ tab.icon }} {{ tab.name }}
        </button>
      </div>

      <!-- PanEU Section -->
      <div v-show="activeTab === 'paneu'" class="tab-content">
        <div class="sheet-container">
          <div class="sheet-header">
            <span>📋 PanEU 卖家阻碍因素评估</span>
            <button @click="exportData('paneu')" class="export-btn">📊 导出PanEU数据</button>
          </div>
          <div class="sheet-content">
            <table>
              <thead>
                <tr>
                  <th style="width: 5%">#</th>
                  <th style="width: 50%">Blockers</th>
                  <th style="width: 15%">选择</th>
                  <th style="width: 30%">卖家VOS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in paneuData" :key="index" 
                    :class="{ 'selected-row': item.selected }">
                  <td class="row-number">{{ index + 1 }}</td>
                  <td class="blocker-text">{{ item.blocker }}</td>
                  <td class="checkbox-cell">
                    <label class="checkbox-container">
                      <input type="checkbox" v-model="item.selected" @change="saveToLocalStorage">
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td class="input-cell">
                    <textarea 
                      v-model="item.vos" 
                      placeholder="请输入卖家反馈..."
                      @focus="onVosFocus(item)"
                      @input="saveToLocalStorage"
                      :readonly="!item.selected"
                      class="vos-textarea">
                    </textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- DI Section -->
      <div v-show="activeTab === 'di'" class="tab-content">
        <div class="sheet-container">
          <div class="sheet-header">
            <span>📋 DI 卖家阻碍因素评估</span>
            <button @click="exportData('di')" class="export-btn">📊 导出DI数据</button>
          </div>
          <div class="sheet-content">
            <table>
              <thead>
                <tr>
                  <th style="width: 5%">#</th>
                  <th style="width: 60%">Blockers</th>
                  <th style="width: 15%">选择</th>
                  <th style="width: 20%">卖家VOS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in diData" :key="index" 
                    :class="{ 'selected-row': item.selected }">
                  <td class="row-number">{{ index + 1 }}</td>
                  <td class="blocker-text">{{ item.blocker }}</td>
                  <td class="checkbox-cell">
                    <label class="checkbox-container">
                      <input type="checkbox" v-model="item.selected" @change="saveToLocalStorage">
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td class="input-cell">
                    <textarea 
                      v-model="item.vos" 
                      placeholder="请输入卖家反馈..."
                      @focus="onVosFocus(item)"
                      @input="saveToLocalStorage"
                      :readonly="!item.selected"
                      class="vos-textarea">
                    </textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- CEE Section -->
      <div v-show="activeTab === 'cee'" class="tab-content">
        <div class="sheet-container">
          <div class="sheet-header">
            <span>📋 CEE 卖家阻碍因素评估</span>
            <button @click="exportData('cee')" class="export-btn">📊 导出CEE数据</button>
          </div>
          <div class="sheet-content">
            <table>
              <thead>
                <tr>
                  <th style="width: 5%">#</th>
                  <th style="width: 50%">Blockers</th>
                  <th style="width: 15%">选择</th>
                  <th style="width: 30%">卖家VOS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in ceeData" :key="index" 
                    :class="{ 'selected-row': item.selected }">
                  <td class="row-number">{{ index + 1 }}</td>
                  <td class="blocker-text">{{ item.blocker }}</td>
                  <td class="checkbox-cell">
                    <label class="checkbox-container">
                      <input type="checkbox" v-model="item.selected" @change="saveToLocalStorage">
                      <span class="checkmark"></span>
                    </label>
                  </td>
                  <td class="input-cell">
                    <textarea 
                      v-model="item.vos" 
                      placeholder="请输入卖家反馈..."
                      @focus="onVosFocus(item)"
                      @input="saveToLocalStorage"
                      :readonly="!item.selected"
                      class="vos-textarea">
                    </textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VOSFeedbackCollection',
  data() {
    return {
      activeTab: 'paneu',
      tabs: [
        { id: 'paneu', name: 'PanEU VOS', icon: '🌍' },
        { id: 'di', name: 'DI VOS', icon: '📊' },
        { id: 'cee', name: 'CEE VOS', icon: '🎯' }
      ],
      paneuData: [
        { blocker: 'VAT注册太麻烦', selected: false, vos: '' },
        { blocker: 'VAT注册费和年费太贵了', selected: false, vos: '' },
        { blocker: '未完成EPR合规 或者 产品未完成合规，如包装合规，没有当地说明书等', selected: false, vos: '' },
        { blocker: '账号被停用', selected: false, vos: '' },
        { blocker: '产品是某市场特供', selected: false, vos: '' },
        { blocker: 'AMZ listing翻译的很差，所以不想同步 (BIL/LOSG)', selected: false, vos: '' },
        { blocker: '怕ASIN被恶意攻击，bad review，take down等影响', selected: false, vos: '' },
        { blocker: '这个账号各国都做，但是用MCI因为分运营分绩效考核', selected: false, vos: '' },
        { blocker: '想自己管理库存，不想泛欧调拨', selected: false, vos: '' },
        { blocker: '卖家forecast这个市场不好', selected: false, vos: '' },
        { blocker: '没有资源做泛欧 (卖家其实想做，但是由于hr/capital/energy/…等原因做不了)', selected: false, vos: '' },
        { blocker: '不信任亚马逊 - 其他program的SX不好，现在害怕了', selected: false, vos: '' },
        { blocker: '不做EU了', selected: false, vos: '' },
        { blocker: '退出Amazon', selected: false, vos: '' },
        { blocker: '其他', selected: false, vos: '' }
      ],
      diData: [
        { blocker: '利润低，MP价格竞争大', selected: false, vos: '' },
        { blocker: '对于对岸市场经营意愿低/销售预期低/卖进过销售表现不佳', selected: false, vos: '' },
        { blocker: '缺乏对岸市场选品认识，不确定选品在对岸市场销售趋势是否利好', selected: false, vos: '' },
        { blocker: '管理库存压力大，缺乏管理对岸库存资源', selected: false, vos: '' },
        { blocker: '对FBA program的SX不好/FBA物流费用高', selected: false, vos: '' },
        { blocker: 'compliance相关的费用太高', selected: false, vos: '' },
        { blocker: '1) compliance相关办理手续复杂繁琐\n2)不确定商品是否可以在对岸合规销售', selected: false, vos: '' },
        { blocker: '对于远程配送的SX不好', selected: false, vos: '' },
        { blocker: '不想做对岸市场', selected: false, vos: '' },
        { blocker: '其他', selected: false, vos: '' }
      ],
      ceeData: [
        { blocker: '波兰捷克税号注册成本高', selected: false, vos: '' },
        { blocker: 'VAT注册流程过于复杂', selected: false, vos: '' },
        { blocker: '无法对库存进行管理', selected: false, vos: '' },
        { blocker: '担心加入后会对商品上架速度，配送速度有影响', selected: false, vos: '' },
        { blocker: '放弃了德国市场', selected: false, vos: '' },
        { blocker: '不想去波兰开店', selected: false, vos: '' },
        { blocker: '波兰和捷克增值税税率高于德国', selected: false, vos: '' },
        { blocker: 'Seller Experience不好', selected: false, vos: '' }
      ]
    }
  },
  methods: {
    onVosFocus(item) {
      // 聚焦时自动选中，开放输入，并立刻保存状态
      if (!item.selected) {
        item.selected = true
        this.$nextTick(() => this.saveToLocalStorage())
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('vosData', JSON.stringify({
        paneu: this.paneuData,
        di: this.diData,
        cee: this.ceeData,
        activeTab: this.activeTab
      }))
    },
    loadFromLocalStorage() {
      const saved = localStorage.getItem('vosData')
      if (saved) {
        const data = JSON.parse(saved)
        if (data.paneu) this.paneuData = data.paneu
        if (data.di) this.diData = data.di
        if (data.cee) this.ceeData = data.cee
        if (data.activeTab) this.activeTab = data.activeTab
      }
    },
    exportData(section) {
      const sectionData = this[section + 'Data']
      // 导出条件：被勾选 或 文本有内容（去除空白）
      const selectedData = sectionData.filter(item => item.selected || (item.vos && String(item.vos).trim().length > 0))
      const sectionName = section.toUpperCase()
      
      const exportText = `${sectionName} VOS 卖家反馈\n${'='.repeat(30)}\n\n` +
        selectedData.map((item, index) => 
          `${index + 1}. ${item.blocker}\n   卖家反馈: ${item.vos || '(未填写)'}\n`
        ).join('\n')
      
      const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${sectionName}_VOS_卖家反馈_${new Date().toISOString().split('T')[0]}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      alert(`已导出 ${selectedData.length} 项 ${sectionName} 反馈数据`)
    }
  },
  mounted() {
    this.loadFromLocalStorage()
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  font-family: 'Segoe UI', 'Microsoft YaHei', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.header:hover {
  transform: translateY(-5px);
}

.header h1 {
  font-size: 2.5em;
  color: #2d3748;
  margin-bottom: 10px;
  font-weight: 300;
}

.tab-navigation {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.tab-btn {
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid transparent;
  padding: 15px 30px;
  border-radius: 15px;
  font-size: 1.1em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #4a5568;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.tab-btn.active {
  background: linear-gradient(135deg, #4a5568, #2d3748);
  color: white;
  border-color: #4a5568;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(74, 85, 104, 0.3);
}

.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.sheet-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  margin-bottom: 30px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.sheet-header {
  background: linear-gradient(135deg, #4a5568, #2d3748);
  color: white;
  padding: 20px 30px;
  font-size: 1.3em;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.export-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.export-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.sheet-content {
  padding: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

th {
  background: linear-gradient(135deg, #4a5568, #2d3748);
  color: white;
  padding: 15px 12px;
  text-align: left;
  font-weight: 600;
  font-size: 0.95em;
  letter-spacing: 0.5px;
}

td {
  padding: 15px 12px;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
  transition: all 0.3s ease;
}

tr {
  transition: all 0.3s ease;
}

tr:hover {
  background-color: #f7fafc;
}

tr.selected-row {
  background-color: #edf2f7;
  border-left: 4px solid #4a5568;
}

.row-number {
  text-align: center;
  font-weight: 600;
  color: #4a5568;
}

.blocker-text {
  font-size: 0.9em;
  line-height: 1.5;
  color: #2d3748;
  white-space: pre-line;
}

.checkbox-cell {
  text-align: center;
}

.checkbox-container {
  display: inline-block;
  position: relative;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 4px;
  transition: all 0.3s ease;
  border: 2px solid #ddd;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
  transform: scale(1.1);
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #4a5568;
  border-color: #4a5568;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.vos-textarea {
  width: 100%;
  min-height: 60px;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9em;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  background: white;
  color: #333;
}

.vos-textarea:focus {
  outline: none;
  border-color: #4a5568;
  box-shadow: 0 0 10px rgba(74, 85, 104, 0.2);
}

.vos-textarea[readonly] {
  background: #f7fafc;
  color: #a0aec0;
  cursor: not-allowed;
  border-color: #e2e8f0;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .header {
    padding: 20px;
  }
  
  .header h1 {
    font-size: 2em;
  }
  
  .tab-navigation {
    flex-direction: column;
    align-items: center;
  }
  
  .tab-btn {
    width: 100%;
    max-width: 300px;
  }
  
  .sheet-content {
    padding: 15px;
  }
  
  table {
    font-size: 0.8em;
  }
  
  th, td {
    padding: 10px 8px;
  }

  .sheet-header {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}
</style>
