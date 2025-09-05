<template>
  <div class="pitching-root">
    <div class="pitching-container">
      <div class="pitch-header">
        <h1 class="title">AM Pitching 话术库</h1>
        <p class="subtitle">PanEU · DI · CEE 常见阻碍与话术要点汇总（支持关键词快速过滤）</p>
        <div class="search-box">
          <input v-model="searchTerm" placeholder="🔍 输入关键词过滤..." @input="filterContent" />
        </div>
      </div>

      <!-- PanEU Section -->
      <div class="section-block">
        <div class="section-header">
          <span class="section-index">1</span>
          <h2 class="section-title">PanEU 话术</h2>
        </div>
        <div v-for="(sheet, index) in filteredPanEUSheets" :key="'paneu-' + index" class="sheet-card" :class="{open: sheet.expanded}">
          <button type="button" class="sheet-head" @click="toggleSheet('paneu', index)">
            <span class="head-icon" aria-hidden="true">{{ sheet.expanded ? '📖' : '📋' }}</span>
            <span class="head-title">{{ sheet.name }}</span>
            <span class="head-toggle" aria-hidden="true">{{ sheet.expanded ? '−' : '+' }}</span>
          </button>
          <div class="sheet-body" :class="{collapsed: !sheet.expanded}" :aria-hidden="(!sheet.expanded).toString()">
            <table v-if="sheet.data.length > 0">
              <thead>
                <tr>
                  <th v-for="col in sheet.columns" :key="col">{{ col }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) in sheet.data" :key="rowIndex" @click="highlightRow('paneu', index, rowIndex)" :class="{ highlighted: sheet.highlightedRow === rowIndex }">
                  <td v-for="(cell, colIndex) in row" :key="colIndex" :class="{ 'empty-cell': !cell || cell === '-' }">{{ cell || '-' }}</td>
                </tr>
              </tbody>
            </table>
            <div v-else class="empty-sheet">此工作表暂无数据</div>
          </div>
        </div>
      </div>

      <!-- DI Section -->
      <div class="section-block">
        <div class="section-header">
          <span class="section-index">2</span>
          <h2 class="section-title">DI 话术</h2>
        </div>
        <div v-for="(sheet, index) in filteredDISheets" :key="'di-' + index" class="sheet-card" :class="{open: sheet.expanded}">
          <button type="button" class="sheet-head" @click="toggleSheet('di', index)">
            <span class="head-icon" aria-hidden="true">{{ sheet.expanded ? '📖' : '📋' }}</span>
            <span class="head-title">{{ sheet.name }}</span>
            <span class="head-toggle" aria-hidden="true">{{ sheet.expanded ? '−' : '+' }}</span>
          </button>
          <div class="sheet-body" :class="{collapsed: !sheet.expanded}" :aria-hidden="(!sheet.expanded).toString()">
            <table v-if="sheet.data.length > 0">
              <thead>
                <tr>
                  <th v-for="col in sheet.columns" :key="col">{{ col }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) in sheet.data" :key="rowIndex" @click="highlightRow('di', index, rowIndex)" :class="{ highlighted: sheet.highlightedRow === rowIndex }">
                  <td v-for="(cell, colIndex) in row" :key="colIndex" :class="{ 'empty-cell': !cell || cell === '-' }">{{ cell || '-' }}</td>
                </tr>
              </tbody>
            </table>
            <div v-else class="empty-sheet">此工作表暂无数据</div>
          </div>
        </div>
      </div>

      <!-- CEE Section -->
      <div class="section-block">
        <div class="section-header">
          <span class="section-index">3</span>
          <h2 class="section-title">CEE Program FAQ</h2>
        </div>
        <div class="sheet-card" :class="{open: ceeSheet.expanded}">
          <button type="button" class="sheet-head" @click="toggleSheet('cee', 0)">
            <span class="head-icon" aria-hidden="true">{{ ceeSheet.expanded ? '📖' : '📋' }}</span>
            <span class="head-title">CEE Program FAQ</span>
            <span class="head-toggle" aria-hidden="true">{{ ceeSheet.expanded ? '−' : '+' }}</span>
          </button>
          <div class="sheet-body" :class="{collapsed: !ceeSheet.expanded}" :aria-hidden="(!ceeSheet.expanded).toString()">
            <div class="faq-list">
              <div v-for="(faq, index) in ceeData" :key="index" class="faq-item" :class="{ highlighted: ceeSheet.highlightedFAQ === index }" @click="highlightFAQ(index)">
                <div class="faq-q">{{ faq.question }}</div>
                <div class="faq-a">{{ faq.answer }}</div>
              </div>
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
/* ===== 核心布局 ===== */
.pitching-root { background:#f5f6f8; padding:0 0 60px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; color:#232f3e; }
.pitching-container { max-width:1400px; margin:0 auto; padding:32px 32px 40px; }

/* ===== 标题区 ===== */
.pitch-header { background:#fff; border:1px solid #e3e6ea; border-radius:18px; padding:30px 34px 34px; box-shadow:0 4px 16px -6px rgba(0,0,0,.12), 0 2px 6px -2px rgba(0,0,0,.08); position:relative; overflow:hidden; }
.pitch-header:before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 90% 18%,rgba(255,153,0,.20),transparent 60%), linear-gradient(135deg,rgba(255,153,0,.06),rgba(35,47,62,0)); pointer-events:none; }
.pitch-header .title { margin:0 0 10px; font-size:28px; font-weight:600; letter-spacing:.5px; }
.pitch-header .subtitle { margin:0 0 18px; font-size:13px; color:#555; letter-spacing:.3px; }
.search-box { display:flex; }
.search-box input { flex:1; max-width:420px; background:#fff; border:1px solid #d5d9de; border-radius:10px; padding:10px 14px; font-size:13px; letter-spacing:.3px; transition:.25s; }
.search-box input:focus { outline:none; border-color:#ff9900; box-shadow:0 0 0 3px rgba(255,153,0,.25); }

/* ===== 分节头 ===== */
.section-block { margin-top:40px; display:flex; flex-direction:column; gap:16px; }
.section-header { display:flex; align-items:center; gap:12px; position:relative; }
.section-index { background:#232f3e; color:#ffb84d; font-size:12px; font-weight:600; padding:4px 10px; border-radius:14px; letter-spacing:.5px; box-shadow:0 2px 4px rgba(0,0,0,.15); }
.section-title { margin:0; font-size:20px; font-weight:600; letter-spacing:.5px; color:#232f3e; position:relative; }
.section-title:after { content:''; display:block; width:54px; height:4px; background:linear-gradient(90deg,#ff9900,#ffb84d); border-radius:4px; margin-top:8px; }

/* ===== 表 / 卡片折叠 ===== */
.sheet-card { background:#fff; border:1px solid #e3e6ea; border-radius:14px; overflow:hidden; box-shadow:0 4px 14px -6px rgba(0,0,0,.12),0 2px 6px -2px rgba(0,0,0,.08); transition:.35s ease; position:relative; }
.sheet-card.open { border-color:#ff9900; }
.sheet-card:not(.open):hover { border-color:#d5d9de; box-shadow:0 6px 18px -6px rgba(0,0,0,.16),0 3px 8px -3px rgba(0,0,0,.10); }
.sheet-head { width:100%; background:linear-gradient(90deg,#232f3e,#2f3d4a); color:#fff; border:none; padding:16px 22px; text-align:left; display:flex; align-items:center; gap:12px; cursor:pointer; font-size:14px; font-weight:600; letter-spacing:.3px; position:relative; transition:.3s; }
.sheet-card.open .sheet-head { background:linear-gradient(90deg,#ff9900,#ffb84d); color:#232f3e; }
.sheet-head:hover { filter:brightness(1.03); }
.head-icon { font-size:16px; }
.head-title { flex:1; }
.head-toggle { font-size:20px; line-height:1; font-weight:500; }
.sheet-body { padding:20px 24px 26px; max-height:1600px; transition:max-height .45s cubic-bezier(.25,.9,.3,1), padding .35s ease; background:#fafafa; border-top:1px solid #e8eaec; }
.sheet-body.collapsed { max-height:0; padding:0 24px; overflow:hidden; border-top-color:transparent; }

/* ===== 表格 ===== */
.table-wrap { overflow:auto; }
 table { width:100%; border-collapse:collapse; font-size:12.5px; background:#fff; border:1px solid #e5e7eb; }
 thead th { background:linear-gradient(90deg,#232f3e,#2f3d4a); color:#fff; text-align:left; padding:10px 10px; font-weight:600; letter-spacing:.3px; font-size:12px; position:sticky; top:0; z-index:2; }
 tbody td { padding:9px 10px; border-top:1px solid #eef0f2; vertical-align:top; line-height:1.5; background:#fff; }
 tbody tr:nth-child(even) td { background:#fafbfc; }
 tbody tr:hover td { background:#fff8eb; }
 tbody tr.highlighted td { background:#ffe9e7 !important; border-left:4px solid #b42318; }
.empty-cell { color:#999; font-style:italic; }
.empty-sheet { padding:30px 10px; text-align:center; font-size:13px; color:#666; }

/* ===== FAQ ===== */
.faq-list { display:flex; flex-direction:column; background:#fff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden; }
.faq-item { padding:16px 20px 18px; border-bottom:1px solid #eef0f2; cursor:pointer; background:#fff; position:relative; transition:.28s ease; }
.faq-item:last-child { border-bottom:none; }
.faq-item:hover { background:#fff8eb; }
.faq-item.highlighted { background:#ffe9e7 !important; border-left:4px solid #b42318; }
.faq-q { font-weight:600; font-size:13.5px; margin:0 0 6px; color:#232f3e; }
.faq-a { font-size:12.5px; color:#444; line-height:1.6; white-space:pre-line; }

/* ===== 动画/辅助 ===== */
@media (prefers-reduced-motion: reduce) { .sheet-body { transition:none; } .sheet-card { transition:none; } }

@media (max-width: 860px) {
  .pitching-container { padding:24px 18px 40px; }
  .pitch-header { padding:24px 24px 30px; }
  .pitch-header .title { font-size:24px; }
  .section-title { font-size:18px; }
  .sheet-head { padding:14px 18px; font-size:13px; }
  .sheet-body { padding:16px 18px 20px; }
  table { font-size:12px; }
  thead th { font-size:11.5px; }
  tbody td { font-size:11.5px; }
}
</style>
