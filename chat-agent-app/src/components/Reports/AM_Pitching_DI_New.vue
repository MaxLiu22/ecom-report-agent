<template>
  <div class="app">
    <div class="container">
      <div class="header">
        <h1>AM Pitching话术</h1>
        <div class="subtitle">Digital Intelligence · {{ currentTime }}</div>
        <div class="search-box">
          <input v-model="searchTerm" placeholder="🔍 搜索话术内容..." @input="filterContent">
        </div>
      </div>

      <div v-for="(sheet, index) in filteredSheets" :key="index" class="sheet-container">
        <div class="sheet-header" @click="toggleSheet(index)">
          <span>{{ sheet.expanded ? '📖' : '📋' }} {{ sheet.name }}</span>
          <span class="toggle-icon">{{ sheet.expanded ? '▼' : '▶' }}</span>
        </div>
        <div class="sheet-content" :class="{ 'collapsed': !sheet.expanded }">
          <table v-if="sheet.data.length > 0">
            <thead>
              <tr>
                <th v-for="col in sheet.columns" :key="col">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in sheet.data" :key="rowIndex" 
                  @click="highlightRow(index, rowIndex)"
                  :class="{ 'highlighted': sheet.highlightedRow === rowIndex }">
                <td v-for="(cell, colIndex) in row" :key="colIndex" 
                    :class="{ 'empty-cell': !cell || cell === '-' }">
                  {{ cell || '-' }}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-sheet">此工作表为空</div>
        </div>
      </div>

      <div class="footer">
        <p>📊 数据来源: AM Pitching话术-DI.xlsx</p>
        <p>🤖 由 Amazon Q AI Assistant 自动生成</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AMPitchingDI',
  data() {
    return {
      currentTime: new Date().toLocaleString('zh-CN'),
      searchTerm: '',
      sheets: [
        {
          name: 'AM pitching 话术',
          expanded: true,
          highlightedRow: null,
          columns: ['卖家群体', '阻碍说明', '话术要点'],
          data: [
            ['Inbound', '', ''],
            ['Not Listing Parity', 'Asin Parity：卖同一品但Asin编号不一致', '1）了解卖家为什么用不同ASIN，为了规避合规/差评同步风险？\n2）介绍使用相同ASIN的benefit：\n   a) 后台同步销售数据和评价，提高综合排名、流量，且有助于第二市场的冷启动\n   b) 降低生产/备货成本，加强库存弹性\n   c) 相同ASIN可以享受亚马逊FBA相关物流福利，比如泛欧，英国和欧盟之间的远程配送\n3）如果卖家感兴趣，牵引卖家ASIN merge或未来备货时使用相同SKU'],
            ['', 'Listing&Asin Parity：卖不同产品', '如果您认为直接发货到欧盟风险比较大的变化，可以先行使用英国与欧盟之间的跨境配送进行试水，如果卖的比较好或者曝光量比较高的话，可以再直接发货过去'],
            ['', '同步但不可售', '1）库存问题（ex：缺货）：您需要尽快补货，长期缺货会影响您的账户健康度评分'],
            ['有Incentive（band D/E卖家）', '', '此次活动截止日期是2025年12月，为商家邀请制，您可以用这笔现金作为对岸的启动资金，对冲单一市场波动风险'],
            ['Not inbound', '', ''],
            ['EU>UK', '', ''],
            ['No VAT', '经营意愿低，对于对岸市场销售预期低/卖进过销售表现不佳', 'Incentive:\n您可以用这笔现金覆盖合规或广告成本，对冲单一市场波动风险。此次活动截止日期是2025年12月，为商家邀请制，为避免政策变化，建议您尽快参与\n\nOthers:\n1）潜力大：亚马逊英国站体量接近德国站，语言友好，有13%的电商年复合增长率，有极高的销售和利润增长空间\n2）双边入库优势：一旦找到热销品，可以双边入库享受本地配送费和Prime资格，提高商品转化率和搜索排名\n3）利用远程配送低成本测试：可以先通过远程配送将欧盟商品销售到英国，无需额外库存。2024年2月起，亚马逊下调了欧盟到英国的远程配送费26-59%，成本更低'],
            ['', '缺乏运营人员/资金等资源开启对岸市场', 'Incentive:\n您可以用这笔现金作为对岸的启动资金，对冲单一市场波动风险\n\nOthers:\n1）可以先通过远程配送将欧盟商品销售到英国，无需额外库存和运营人员\n2）亚马逊有丰富的培训资源和客户经理支持，帮助您快速上手英国市场运营']
          ]
        },
        {
          name: 'Pitch flow (Blurb)',
          expanded: true,
          highlightedRow: null,
          columns: ['步骤', '内容'],
          data: [
            ['开场', '您好，我是亚马逊的客户经理，今天联系您是想了解一下您在跨境业务方面的情况'],
            ['了解现状', '请问您目前主要在哪些站点销售？对于拓展其他市场有什么想法吗？'],
            ['识别机会', '根据您的情况，我发现您有一些很好的扩展机会...'],
            ['提供方案', '针对您的情况，我们有以下建议和支持...'],
            ['跟进行动', '如果您感兴趣，我们可以安排具体的实施方案讨论']
          ]
        }
      ]
    }
  },
  computed: {
    filteredSheets() {
      if (!this.searchTerm) return this.sheets;
      
      return this.sheets.map(sheet => ({
        ...sheet,
        data: sheet.data.filter(row => 
          row.some(cell => 
            cell && cell.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        )
      }));
    }
  },
  methods: {
    toggleSheet(index) {
      this.sheets[index].expanded = !this.sheets[index].expanded;
    },
    highlightRow(sheetIndex, rowIndex) {
      // 清除其他高亮
      this.sheets.forEach(sheet => sheet.highlightedRow = null);
      // 设置当前高亮
      this.sheets[sheetIndex].highlightedRow = rowIndex;
      
      // 3秒后自动取消高亮
      setTimeout(() => {
        this.sheets[sheetIndex].highlightedRow = null;
      }, 3000);
    },
    filterContent() {
      // 搜索时自动展开所有表格
      if (this.searchTerm) {
        this.sheets.forEach(sheet => sheet.expanded = true);
      }
    }
  },
  mounted() {
    // 定时更新时间
    setInterval(() => {
      this.currentTime = new Date().toLocaleString('zh-CN');
    }, 1000);
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
  line-height: 1.8;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 300;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1em;
  margin-bottom: 20px;
}

.search-box {
  margin-top: 20px;
}

.search-box input {
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.search-box input:focus {
  border-color: #3498db;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
  transform: scale(1.02);
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

.sheet-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
}

.sheet-header {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 20px 30px;
  font-size: 1.3em;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.sheet-header:hover {
  background: linear-gradient(135deg, #2980b9, #1f5f8b);
}

.toggle-icon {
  font-size: 1.2em;
  transition: transform 0.3s ease;
}

.sheet-content {
  padding: 30px;
  max-height: 2000px;
  overflow: hidden;
  transition: all 0.5s ease;
}

.sheet-content.collapsed {
  max-height: 0;
  padding: 0 30px;
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
  background: linear-gradient(135deg, #34495e, #2c3e50);
  color: white;
  padding: 18px 15px;
  text-align: left;
  font-weight: 600;
  font-size: 1em;
  letter-spacing: 0.5px;
}

td {
  padding: 18px 15px;
  border-bottom: 1px solid #ecf0f1;
  vertical-align: top;
  white-space: pre-line;
  font-size: 0.95em;
  line-height: 1.7;
  transition: all 0.3s ease;
}

td:first-child {
  font-weight: 500;
  background-color: #f8f9fa;
  width: 180px;
}

td:nth-child(2) {
  width: 300px;
}

td:last-child {
  min-width: 400px;
}

tr {
  cursor: pointer;
  transition: all 0.3s ease;
}

tr:hover {
  background-color: #e3f2fd;
  transform: scale(1.01);
}

tr:hover td:first-child {
  background-color: #bbdefb;
}

tr.highlighted {
  background-color: #fff3e0 !important;
  border-left: 4px solid #ff9800;
  animation: pulse 2s infinite;
}

tr.highlighted td:first-child {
  background-color: #ffe0b2 !important;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(255, 152, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 152, 0, 0); }
}

.empty-cell {
  color: #bdc3c7;
  font-style: italic;
}

.empty-sheet {
  background: white;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
}

.footer {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 40px;
  padding: 20px;
  animation: fadeIn 2s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
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
  
  .sheet-content {
    padding: 15px;
  }
  
  table {
    font-size: 0.85em;
  }
  
  th, td {
    padding: 12px 8px;
  }

  td:first-child {
    width: auto;
  }

  td:nth-child(2) {
    width: auto;
  }

  td:last-child {
    min-width: auto;
  }
}
</style>
