<template>
  <div class="app">
    <div class="container">
      <div class="header">
        <h1>AM Pitching话术 - PanEU & DI & CEE</h1>
        <div class="search-box">
          <input v-model="searchTerm" placeholder="🔍 搜索话术内容..." @input="filterContent">
        </div>
      </div>

      <!-- PanEU Section -->
      <div class="section-divider">
        <h2>🌍 第一部分：PanEU</h2>
      </div>

      <div v-for="(sheet, index) in filteredPanEUSheets" :key="'paneu-' + index" class="sheet-container">
        <div class="sheet-header" @click="toggleSheet('paneu', index)">
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
                  @click="highlightRow('paneu', index, rowIndex)"
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

      <!-- DI Section -->
      <div class="section-divider">
        <h2>📊 第二部分：DI</h2>
      </div>

      <div v-for="(sheet, index) in filteredDISheets" :key="'di-' + index" class="sheet-container">
        <div class="sheet-header" @click="toggleSheet('di', index)">
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
                  @click="highlightRow('di', index, rowIndex)"
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

      <!-- CEE Section -->
      <div class="section-divider">
        <h2>🎯 第三部分：CEE</h2>
      </div>

      <div class="sheet-container">
        <div class="sheet-header" @click="toggleSheet('cee', 0)">
          <span>{{ ceeSheet.expanded ? '📖' : '📋' }} CEE Program FAQ</span>
          <span class="toggle-icon">{{ ceeSheet.expanded ? '▼' : '▶' }}</span>
        </div>
        <div class="sheet-content" :class="{ 'collapsed': !ceeSheet.expanded }">
          <div class="cee-content">
            <div v-for="(faq, index) in ceeData" :key="index" class="faq-item"
                 @click="highlightFAQ(index)"
                 :class="{ 'highlighted': ceeSheet.highlightedFAQ === index }">
              <div class="faq-question">{{ faq.question }}</div>
              <div class="faq-answer">{{ faq.answer }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AMPitchingApp',
  data() {
    return {
      searchTerm: '',
      paneuSheets: [
        {
          name: 'Reason Code',
          expanded: true,
          highlightedRow: null,
          columns: ['问题说明', '解决方案和建议'],
          data: [
            ['VAT注册太麻烦', 'Educate VAT registeration process. Support seller to plan registeration SLA'],
            ['VAT注册费和年费太贵了', 'Educate VAT Fees. Support seller caulate ROI'],
            ['未完成EPR合规 或者 产品未完成合规，如包装合规，没有当地说明书等', 'Educate compliance policy and pitch seller to register'],
            ['账号被停用', 'Deep dive account block reason reason and support seller fix'],
            ['产品是某市场特供', ''],
            ['AMZ listing翻译的很差，所以不想同步 (BIL/LOSG)', 'Recommand GSO, and other 3P translation AI tool (Chatgpt, DeepL, Google translate)'],
            ['怕ASIN被恶意攻击，bad review，take down等影响', ''],
            ['这个账号各国都做，但是用MCI因为分运营分绩效考核', ''],
            ['想自己管理库存，不想泛欧调拨', ''],
            ['卖家forecast这个市场不好', 'Lever MPG to recommand ASIN'],
            ['没有资源做泛欧 (卖家其实想做，但是由于hr/capitcal/energy/…等原因做不了)', 'Please deep dive the actural reason, record ancedotes.'],
            ['不信任亚马逊 - 其他program的SX不好，现在害怕了', ''],
            ['不做EU了', ''],
            ['退出Amazon', ''],
            ['其他', 'Please record the details']
          ]
        }
      ],
      diSheets: [
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
            ['No VAT', '经营意愿低，对于对岸市场销售预期低/卖进过销售表现不佳', 'Incentive:\n您可以用这笔现金覆盖合规或广告成本，对冲单一市场波动风险。此次活动截止日期是2025年12月，为商家邀请制，为避免政策变化，建议您尽快参与\n\nOthers:\n1）潜力大：亚马逊英国站体量接近德国站，语言友好，有13%的电商年复合增长率，有极高的销售和利润增长空间\n2）双边入库优势：一旦找到热销品，可以双边入库享受本地配送费和Prime资格，提高商品转化率和搜索排名\n3）利用远程配送低成本测试：可以先通过远程配送将欧盟商品销售到英国，无需额外库存。2024年2月起，亚马逊下调了欧盟到英国的远程配送费26-59%，成本更低']
          ]
        }
      ],
      ceeSheet: {
        expanded: true,
        highlightedFAQ: null
      },
      ceeData: [
        {
          question: '1：在波兰和捷克储存仓储需要注册增值税吗?',
          answer: '是的，波兰和捷克都需要注册VAT。'
        },
        {
          question: '2：什么时候开启中欧计划比较合理？',
          answer: '从您节省的钱超过您为税务登记和增值税申报支付的那一刻起。即使只销售了 5,000 件，这会帮助您每年节省 1,300欧元，并且通常涵盖所有相关成本。'
        },
        {
          question: '3：波兰 (23%) 和捷克共和国 (21%) 的增值税税率高于德国 (19%)，这样还有节省吗？',
          answer: '是的，您仍然会有节省。由于来自德国的亚马逊物流商品仅存储在波兰或捷克，并且仅在 Amazon.de 上销售，因此仅适用德国增值税税率 (19%)。'
        },
        {
          question: '4: 谁支付运营中心之间调拨运费？',
          answer: '亚马逊物流网络内的运输是免费的，并将由亚马逊负责。'
        },
        {
          question: '5: 参加该计划是否有任何其他费用？',
          answer: '不，亚马逊不对参与"中欧计划"收取任何额外费用。'
        },
        {
          question: '6: 我什么时候可以收到节省的费用？',
          answer: '在 FBA 设置中激活存储后，您将立即收到节省的费用。节省 0.26 欧元，适用于通过亚马逊物流发货的所有商品。'
        },
        {
          question: '7: 我可以只在波兰存储（不包括捷克共和国）吗？',
          answer: '不，这两个国家（波兰和捷克共和国）都需要存储。'
        },
        {
          question: '8: 我不在波兰市场上销售，我是否必须在 波兰市场上销售才能参与该计划',
          answer: '不，中欧计划仅涉及波兰、捷克共和国和德国的存储。您不必在 波兰市场上销售。'
        },
        {
          question: '9: 入仓会有什么变化？我是否继续将我的库存发送到德国？',
          answer: '是的，您将继续将库存发送至德国运营中心。如果您在波兰市场上销售，也可以将您的库存直接运送到波兰。'
        }
      ]
    }
  },
  computed: {
    filteredPanEUSheets() {
      if (!this.searchTerm) return this.paneuSheets;
      
      return this.paneuSheets.map(sheet => ({
        ...sheet,
        data: sheet.data.filter(row => 
          row.some(cell => 
            cell && cell.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        )
      }));
    },
    filteredDISheets() {
      if (!this.searchTerm) return this.diSheets;
      
      return this.diSheets.map(sheet => ({
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
    toggleSheet(section, index) {
      if (section === 'paneu') {
        this.paneuSheets[index].expanded = !this.paneuSheets[index].expanded;
      } else if (section === 'di') {
        this.diSheets[index].expanded = !this.diSheets[index].expanded;
      } else if (section === 'cee') {
        this.ceeSheet.expanded = !this.ceeSheet.expanded;
      }
    },
    highlightRow(section, sheetIndex, rowIndex) {
      if (section === 'paneu') {
        this.paneuSheets.forEach(sheet => sheet.highlightedRow = null);
        this.paneuSheets[sheetIndex].highlightedRow = rowIndex;
        
        setTimeout(() => {
          this.paneuSheets[sheetIndex].highlightedRow = null;
        }, 3000);
      } else if (section === 'di') {
        this.diSheets.forEach(sheet => sheet.highlightedRow = null);
        this.diSheets[sheetIndex].highlightedRow = rowIndex;
        
        setTimeout(() => {
          this.diSheets[sheetIndex].highlightedRow = null;
        }, 3000);
      }
    },
    highlightFAQ(index) {
      this.ceeSheet.highlightedFAQ = index;
      
      setTimeout(() => {
        this.ceeSheet.highlightedFAQ = null;
      }, 3000);
    },
    filterContent() {
      if (this.searchTerm) {
        this.paneuSheets.forEach(sheet => sheet.expanded = true);
        this.diSheets.forEach(sheet => sheet.expanded = true);
        this.ceeSheet.expanded = true;
      }
    }
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

.search-box {
  margin-top: 20px;
}

.search-box input {
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.search-box input:focus {
  border-color: #4a5568;
  box-shadow: 0 0 20px rgba(74, 85, 104, 0.3);
  transform: scale(1.02);
}

.section-divider {
  background: linear-gradient(135deg, #4a5568, #2d3748);
  color: white;
  padding: 20px 30px;
  border-radius: 15px;
  margin: 30px 0 20px 0;
  text-align: center;
  box-shadow: 0 10px 25px rgba(74, 85, 104, 0.3);
}

.section-divider h2 {
  font-size: 1.8em;
  font-weight: 500;
  margin: 0;
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
  background: linear-gradient(135deg, #4a5568, #2d3748);
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
  background: linear-gradient(135deg, #2d3748, #1a202c);
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
  font-size: 0.9em;
}

th {
  background: linear-gradient(135deg, #4a5568, #2d3748);
  color: white;
  padding: 12px 8px;
  text-align: left;
  font-weight: 600;
  font-size: 0.9em;
  letter-spacing: 0.5px;
}

td {
  padding: 12px 8px;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
  white-space: pre-line;
  font-size: 0.85em;
  line-height: 1.5;
  transition: all 0.3s ease;
}

tr {
  cursor: pointer;
  transition: all 0.3s ease;
}

tr:hover {
  background-color: #f7fafc;
}

tr.highlighted {
  background-color: #edf2f7 !important;
  border-left: 4px solid #4a5568;
  animation: pulse 2s infinite;
}

.cee-content {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.faq-item {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq-item:hover {
  background-color: #f7fafc;
  transform: translateX(5px);
}

.faq-item.highlighted {
  background-color: #edf2f7 !important;
  border-left: 4px solid #4a5568;
  animation: pulse 2s infinite;
}

.faq-question {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.faq-answer {
  color: #4a5568;
  line-height: 1.7;
  padding-left: 20px;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(74, 85, 104, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(74, 85, 104, 0); }
  100% { box-shadow: 0 0 0 0 rgba(74, 85, 104, 0); }
}

.empty-cell {
  color: #a0aec0;
  font-style: italic;
}

.empty-sheet {
  background: white;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  color: #4a5568;
  font-style: italic;
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
    font-size: 0.8em;
  }
  
  th, td {
    padding: 8px 4px;
  }

  .section-divider h2 {
    font-size: 1.4em;
  }
}
</style>
