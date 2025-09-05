<template>
  <div class="report-frame" :class="{ 'floating-mode': showUniReport && !disablePreview, 'fullscreen': showUniReport && previewFullScreen && !disablePreview }">
    <!-- Tab 导航栏 -->
    <div class="tab-navigation">
      <div class="tab-container">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-item"
          :data-tab="tab.id"
          :class="{ active: activeTab === tab.id }"
          @click="onMainTabClick(tab)"
        >
          <span class="tab-title">{{ tab.title }}</span>
          <div class="tab-indicator" v-if="activeTab === tab.id"></div>
        </div>
      </div>
      <!-- 预览统一报告按钮 -->
  <div class="nav-actions" v-if="reportGenerated && !disablePreview">
        <button
          class="preview-btn"
          :class="{ active: showUniReport }"
          @click="togglePreview"
  >{{ showUniReport ? 'x' : 'Preview' }}</button>
      </div>
      <!-- 解决方案 下拉子菜单 -->
      <transition name="dropdown-fade">
        <div
          v-if="showSolutionMenu"
          ref="solutionMenu"
          class="solution-dropdown compact centered"
          @click.stop
        >
          <ul class="dropdown-list">
            <li
              v-for="item in solutionSubTabs"
              :key="item.id"
              class="dropdown-item"
              :class="{ selected: selectedSubTab === item.id }"
              @click="selectSubTab(item.id)"
            >
              <span class="item-title">{{ item.title }}</span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <!-- 浮层标题栏，仅在悬浮模式下显示 -->
  <div v-if="showUniReport && !disablePreview" class="floating-header uni-report-header">
      <!-- <h2 class="title">📊 IntraEU 卖家统一报告预览</h2> -->
      <div class="actions">
        <button class="export-btn" @click="exportPdfWrapper">导出PDF</button>
        <button class="export-btn" @click="exportHtmlWrapper">导出HTML</button>
        <button class="export-btn" @click="sendEmailWrapper">发送邮件</button>
        <!-- <button class="close-btn" @click="closeFloating">×</button> -->
      </div>
    </div>

    <!-- Tab 内容区域 -->
    <div class="tab-content">
      <!-- Tab 1: 概览 -->
      <div v-if="activeTab === 0" class="content-panel">
        <div class="content-header">
          <OverviewDirectory />
        </div>

        <div class="content-body">
          <!-- 未生成报告时显示使用步骤 -->
          <div v-if="!reportGenerated">
            <div style="margin-top: 30px">
              <h3
                style="
                  color: #333;
                  font-size: 20px;
                  margin-bottom: 20px;
                  border-bottom: 2px solid #ff8c00;
                  padding-bottom: 10px;
                "
              >
                📋 使用步骤
              </h3>
              <div
                style="
                  background: #f8f9fa;
                  border: 1px solid #e0e0e0;
                  border-radius: 8px;
                  padding: 20px;
                "
              >
                <div style="display: flex; align-items: center; margin-bottom: 15px">
                  <span
                    style="
                      background: #ff8c00;
                      color: white;
                      width: 24px;
                      height: 24px;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-weight: bold;
                      margin-right: 12px;
                    "
                    >1</span
                  >
                  <span style="color: #333; font-size: 14px">上传分析所需的数据文件</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 15px">
                  <span
                    style="
                      background: #ff8c00;
                      color: white;
                      width: 24px;
                      height: 24px;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-weight: bold;
                      margin-right: 12px;
                    "
                    >2</span
                  >
                  <span style="color: #333; font-size: 14px">填写 CEE 中欧计划分析参数</span>
                </div>
                <div style="display: flex; align-items: center">
                  <span
                    style="
                      background: #ff8c00;
                      color: white;
                      width: 24px;
                      height: 24px;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-weight: bold;
                      margin-right: 12px;
                    "
                    >3</span
                  >
                  <span style="color: #333; font-size: 14px">点击生成报告并查看结果</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 报告生成后显示概览信息 -->
          <div v-else>
            <div
              style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin: 20px 0;
              "
            >
              <!-- PanEU 概览卡片 -->
              <div v-if="panEUResult" class="overview-card" >
                <div class="card-header">
                  <h4>🌍 PanEU 分析</h4>
                  <span class="card-badge">已完成</span>
                </div>
                <div class="card-content">
                  <p>{{ panEUResult.report_title }}</p>
                  <div class="card-stats">
                    <span v-if="panEUResult.excel_data"
                      >{{ panEUResult.excel_data.rows.length }} 项指标</span
                    >
                  </div>
                </div>
              </div>

              <!-- DI 概览卡片 -->
              <div v-if="diResult" class="overview-card" >
                <div class="card-header">
                  <h4>🔄 DI 分析</h4>
                  <span class="card-badge">已完成</span>
                </div>
                <div class="card-content">
                  <p>{{ diResult.report_title }}</p>
                  <div class="card-stats">
                    <span v-if="diResult.data_table"
                      >{{ diResult.data_table.rows.length }} 个ASIN</span
                    >
                  </div>
                </div>
              </div>

              <!-- CEE 概览卡片 -->
              <div v-if="ceeResult" class="overview-card" >
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

      <!-- Tab 5: 欧洲站点拓展评估 -->
      <div v-if="activeTab === 4" class="center-wrap">
        <Tab5 
          :euExpansionCheckli="euExpansionCheckli"
          :euExpansionCheckliCee="euExpansionCheckliCee"
          :actionResult="actionResult" />
      </div>

      <!-- Tab 6: 欧洲站拓展解决方案定制 -->
      <div v-if="activeTab === 5" class="center-wrap">
        <Tab6
          :selectedSubTab="selectedSubTab"
          :panEUResult="panEUResult"
          :diResult="diResult"
          :ceeResult="ceeResult"
        />
      </div>

      <!-- Tab 7: 合规政策 -->
      <div v-if="activeTab === 6" class="center-wrap">
        <Tab7 
          :panEUResult="panEUResult"
          :policyResult="policyResult"
        />
      </div>

      <!-- Tab 8: 行动计划 -->
      <div v-if="activeTab === 7" class="center-wrap">
        <Tab8 :actionResult="actionResult" />
      </div>

      <!-- Tab 9: 其他 -->
      <div v-if="activeTab === 8" class="center-wrap">
        <Tab9 />
      </div>
    </div>
    <!-- 隐藏的 UniReport 用于导出 / 邮件功能 (不再直接显示其自带浮层) -->
    <div style="display: none">
      <UniReport
        ref="uniReportRef"
        :visible="true"
        :panEUResult="panEUResult"
        :diResult="diResult"
        :ceeResult="ceeResult"
        :euExpansionCheckli="euExpansionCheckli"
        :actionResult="actionResult"
        :showPitch="false"
      />
    </div>
  </div>

  <!-- 背景遮罩 -->
  <div v-if="showUniReport && !disablePreview" class="floating-backdrop" @click.self="closeFloating"></div>
  <!-- 导出进度弹窗 -->
  <transition name="fade">
    <div v-if="exportingPdf" class="export-progress-overlay">
      <div class="export-progress-dialog">
        <h3>正在生成 PDF...</h3>
        <p class="hint">请勿关闭窗口，当前进度：{{ exportProgress.current }} / {{ exportProgress.total }} 面板</p>
        <div class="bar-wrap">
          <div class="bar" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <p v-if="exportProgress.message" class="msg">{{ exportProgress.message }}</p>
        <div class="actions">
          <button class="cancel-btn" @click="cancelExport" :disabled="exportProgress.done">取消</button>
          <button v-if="exportProgress.done" class="close-btn" @click="closeExportOverlay">关闭</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Tab5 from './Tab5.vue'
import Tab6 from './Tab6.vue'
import Tab7 from './Tab7.vue'
import Tab8 from './Tab8.vue'
import Tab9 from './Tab9.vue'
import UniReport from './uniReport.vue'
import OverviewDirectory from './TianOffered/Overview_Directory.vue'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default {
  name: 'ReportTab',
  components: {
    Tab5,
    Tab6,
    Tab7,
    Tab8,
    Tab9,
    UniReport,
    OverviewDirectory,
  },
  props: {
    // 是否已生成报告
    reportGenerated: {
      type: Boolean,
      default: false,
    },
    // 是否禁用预览功能
    disablePreview: {
      type: Boolean,
      default: false,
    },
    // 是否在预览时使用全屏（100% 视口而不是 90vw/90vh 弹窗）
    previewFullScreen: {
      type: Boolean,
      default: false,
    },
    // PanEU 分析结果
    panEUResult: {
      type: Object,
      default: null,
    },
    // DI 分析结果
    diResult: {
      type: Object,
      default: null,
    },
    // CEE 成本分析结果
    ceeResult: {
      type: Object,
      default: null,
    },
    // 行动总结结果
    actionResult: {
      type: Object,
      default: null,
    },
    // EU 拓展检查表结果
    euExpansionCheckli: {
      type: Object,
      default: null,
    },
    euExpansionCheckliCee: {
      type: Object,
      default: null,
    },
    // 政策结果
    policyResult: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    // 当前活跃的标签页
    const activeTab = ref(0)
    const showSolutionMenu = ref(false)
    const selectedSubTab = ref(61)
    const showUniReport = ref(false)
    const uniReportRef = ref(null)
    // 导出进度状态
    const exportingPdf = ref(false)
    const cancelExportFlag = ref(false)
    const exportProgress = ref({ current: 0, total: 0, message: '', done: false })
    const progressPercent = computed(() => {
      if (!exportProgress.value.total) return 0
      return Math.min(100, (exportProgress.value.current / exportProgress.value.total) * 100)
    })
    const sleep = (ms) => new Promise(r => setTimeout(r, ms))

    const solutionSubTabs = [
      { id: 61, title: '欧盟内部物流方案（PanEU）', desc: '解决方案子页面 1 概述' },
      { id: 62, title: '英国和欧盟间物流方案（DI）', desc: '解决方案子页面 2 概述' },
      { id: 63, title: '更多成本节约（CEE）', desc: '解决方案子页面 3 概述' },
      { id: 64, title: '亚马逊英欧头程整合(BIXD)', desc: '解决方案子页面 4 概述' }
    ]

    // 完整的标签页配置
    const allTabs = [
      { id: 0, title: '概览', key: 'overview' },
      { id: 4, title: '欧洲站点拓展评估', key: 'europe_expansion_assessment' },
      { id: 5, title: '欧洲站拓展解决方案定制', key: 'europe_expansion_solution' },
      { id: 6, title: '合规政策', key: 'compliance_policy' },
      { id: 7, title: '行动计划', key: 'action_plan' },
      { id: 8, title: 'AM指导话术', key: 'others' },
    ]

    // 根据报告生成状态过滤可用的标签页
    const tabs = computed(() => {
      if (!props.reportGenerated) {
        // 报告未生成时，只显示概览标签页
        return allTabs.filter((tab) => tab.id === 0)
      }
      // 报告已生成时，显示所有标签页
      return allTabs
    })

    // 监听 reportGenerated 变化，确保在报告未生成时活跃标签页为概览
    watch(
      () => props.reportGenerated,
      (newValue) => {
        if (!newValue) {
          activeTab.value = 0
        }
      },
      { immediate: true },
    )

    // 切换标签页
    const closeSolutionMenu = () => {
      showSolutionMenu.value = false
    }

    const switchTab = (tabId) => {
      if (props.reportGenerated || tabId === 0) {
        activeTab.value = tabId
        if (tabId !== 5) closeSolutionMenu()
      }
    }

    const solutionTabRef = ref(null)
    const solutionMenu = ref(null)
    const updateMenuPosition = () => {
      const nav = document.querySelector('.tab-navigation')
      const tabsEl = nav?.querySelector('.tab-container')
      if (!tabsEl) return
      const menuEl = solutionMenu.value
      // 使用 data-tab 精确定位 id=5 的主标签项
      const target = tabsEl.querySelector('.tab-item[data-tab="5"]')
      if (target && menuEl) {
        const targetRect = target.getBoundingClientRect()
        const navRect = nav.getBoundingClientRect()
        // 考虑横向滚动偏移
        const scrollLeft = tabsEl.scrollLeft || 0
        const centerX = (targetRect.left - navRect.left) + targetRect.width / 2 + scrollLeft
        menuEl.style.left = centerX + 'px'
        menuEl.style.transform = 'translateX(-50%)' // 居中对齐主标签
      }
    }

    const onMainTabClick = (tab) => {
      if (tab.id === 5) {
        // 若已在解决方案主标签，则切换子菜单显示
        if (activeTab.value === 5) {
          showSolutionMenu.value = !showSolutionMenu.value
        } else {
          switchTab(5)
          showSolutionMenu.value = true
        }
        // 下一个微任务更新定位
        requestAnimationFrame(() => updateMenuPosition())
      } else {
        switchTab(tab.id)
      }
    }

    const selectSubTab = (id) => {
      selectedSubTab.value = id
      // 保持菜单展示状态，或可选择自动关闭：
      showSolutionMenu.value = false
    }

    // 打开浮层预览
  const lockBodyScroll = () => { document.documentElement.style.overflow = 'hidden'; document.body.style.overflow = 'hidden' }
  const unlockBodyScroll = () => { document.documentElement.style.overflow = ''; document.body.style.overflow = '' }
  const openFloatingPreview = () => { if (!props.disablePreview) { showUniReport.value = true; if (props.previewFullScreen) lockBodyScroll() } }
  const closeFloating = () => { showUniReport.value = false; unlockBodyScroll() }
    const togglePreview = () => { if (props.disablePreview) return; showUniReport.value ? closeFloating() : openFloatingPreview() }

    // 包装导出与邮件发送（调用隐藏 UniReport 实例）
    // 多标签导出（排除 AM 指导话术 id=8），生成与当前 ReportTab 相似的可切换页面
    // 构建导出数据（多标签 HTML + 解决方案子菜单交互），排除 AM 指导话术
    const buildMultiTabHtml = async () => {
      const inst = uniReportRef.value
      // 收集样式：即便有 UniReport，也一并收集页面其余组件样式，避免“合规政策”(Tab 6) 丢失格式
      const styleBlocks = new Set()
      if (inst && typeof inst.collectStylesProcessed === 'function') {
        const uniStyles = inst.collectStylesProcessed()
        if (uniStyles) styleBlocks.add(uniStyles)
      }
      document.querySelectorAll('style').forEach(s => {
        if (s && s.innerHTML) {
          styleBlocks.add(s.innerHTML)
        }
      })
      let styles = Array.from(styleBlocks).join('\n')
      // 去掉 scoped data-v 选择器，保证导出后仍生效
      styles = styles.replace(/\[data-v-[^\]]+\]/g, '')
      const exportTabs = (props.reportGenerated ? tabs.value : tabs.value.filter(t=>t.id===0)).filter(t => t.id !== 8)
      if (!exportTabs.length) return null
      const originalMain = activeTab.value
      const originalSub = selectedSubTab.value
      const captured = []
      for (const t of exportTabs) {
        activeTab.value = t.id
        await nextTick()
        if (t.id === 5) { // 解决方案：采集所有子页
          const subPanels = []
          for (const sub of solutionSubTabs) {
            selectedSubTab.value = sub.id
            await nextTick()
            const subRoot = document.querySelector('.tab-content')
            if (!subRoot) continue
            let subHtml = subRoot.innerHTML
            subHtml = subHtml.replace(/<button[\s\S]*?<\/button>/g, m => {
              const text = m.replace(/<[^>]+>/g,'').trim()
              return `<span class=\"export-static-label\">${text}</span>`
            })
            subPanels.push({ subId: sub.id, title: sub.title, html: subHtml })
          }
          captured.push({ id: t.id, title: t.title, _solution: true, subPanels })
        } else {
          const contentRoot = document.querySelector('.tab-content')
          if (!contentRoot) continue
          let html = contentRoot.innerHTML
          html = html.replace(/<button[\s\S]*?<\/button>/g, m => {
            const text = m.replace(/<[^>]+>/g,'').trim()
            return `<span class=\"export-static-label\">${text}</span>`
          })
          captured.push({ id: t.id, title: t.title, html })
        }
      }
      // 还原状态
      activeTab.value = originalMain
      selectedSubTab.value = originalSub
      await nextTick()
      // 样式（含子菜单）
      styles += `\n/* Export Frame + Solution SubMenu */\nhtml,body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#f5f5f5;}*{box-sizing:border-box;}\n.tab-export-root{display:flex;flex-direction:column;min-height:100vh;}\n.export-nav{background:#232f3e;padding:0 12px;display:flex;align-items:center;gap:0;box-shadow:0 2px 8px rgba(35,47,62,.15);position:sticky;top:0;z-index:30;}\n.export-nav .nav-item{color:#fff;padding:12px 16px;cursor:pointer;font-size:13px;position:relative;user-select:none;transition:.25s;border-bottom:3px solid transparent;}\n.export-nav .nav-item.active{color:#ff9900;border-bottom-color:#ff9900;background:rgba(255,153,0,.1);}\n.export-nav .nav-item:hover{background:rgba(255,255,255,.1);}\n.export-nav .nav-item.solution-has-sub:after{content:'▾';font-size:10px;margin-left:6px;opacity:.85;}\n.export-nav .nav-item.solution-has-sub.open:after{content:'▴';}\n.export-submenu{position:absolute;top:100%;left:0;background:#fff;border:1px solid #e5e7eb;box-shadow:0 8px 18px -4px rgba(0,0,0,.15),0 4px 8px -2px rgba(0,0,0,.08);border-radius:8px;padding:6px 0;min-width:300px;z-index:40;display:none;}\n.export-submenu .sub-item{padding:8px 14px;font-size:12px;line-height:1.3;cursor:pointer;border-left:3px solid transparent;white-space:normal;transition:.25s;}\n.export-submenu .sub-item:hover{background:#fff8ec;border-left-color:#ff9900;}\n.export-submenu .sub-item.active{background:#fff3e0;border-left-color:#ff9900;color:#c25600;}\n.export-panels{flex:1;overflow:auto;background:#f5f5f5;}\n.export-panel{display:none;animation:fadeIn .25s ease;position:relative;}\n.export-panel.active{display:block;}\n@keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}\n.export-static-label{display:inline-block;background:#f0f0f0;border:1px solid #ccc;border-radius:4px;padding:2px 6px;font-size:12px;color:#555;}\n.solution-panel-wrapper{position:relative;padding:0;margin:0;}\n.sub-panels{position:relative;}\n.sub-panel{display:none;}\n.sub-panel.active{display:block;}\n.content-panel{background:#fff;margin:0;padding:24px;min-height:100%;}table{border-collapse:collapse;width:100%;}th,td{border:1px solid #d9d9d9;padding:6px 8px;font-size:12px;}th{background:#232f3e;color:#fff;}\n`
      const solution = captured.find(c=>c._solution)
      const navHtml = captured
        .map((c,i)=>`<div class="nav-item${c._solution ? ' solution-has-sub' : ''}${i===0 ? ' active' : ''}" data-tab="${c.id}">${c.title}</div>`)
        .join('') + (solution ? `<div class="export-submenu" id="exportSubMenu">${solution.subPanels.map((sp,i)=>`<div class="sub-item${i===0?' active':''}" data-sub="${sp.subId}">${sp.title}</div>`).join('')}</div>` : '')
      const panelsHtml = captured.map((c,i)=>{
        if (c._solution) {
          const inner = c.subPanels.map((sp,j)=>`<div class="sub-panel${j===0?' active':''}" data-sub="${sp.subId}">${sp.html}</div>`).join('\n')
          return `<div class="export-panel${i===0?' active':''}" data-tab="${c.id}"><div class="solution-panel-wrapper"><div class="sub-panels">${inner}</div></div></div>`
        }
        return `<div class="export-panel${i===0?' active':''}" data-tab="${c.id}">${c.html}</div>`
      }).join('\n')
      const script = `<script>(()=>{const navItems=[...document.querySelectorAll('.export-nav .nav-item')];const panels=[...document.querySelectorAll('.export-panel')];const submenu=document.getElementById('exportSubMenu');let currentTab=navItems.find(n=>n.classList.contains('active'))?.getAttribute('data-tab');function activateTab(id){currentTab=id;navItems.forEach(n=>n.classList.toggle('active',n.getAttribute('data-tab')===id));panels.forEach(p=>p.classList.toggle('active',p.getAttribute('data-tab')===id));if(id!=='5'){hideSub();}}function hideSub(){if(submenu){submenu.style.display='none';}navItems.forEach(n=>n.classList.remove('open'));}navItems.forEach(it=>{it.addEventListener('click',()=>{const id=it.getAttribute('data-tab');if(it.classList.contains('solution-has-sub')){if(currentTab==='5' && id==='5'){submenu.style.display = (submenu.style.display==='none'||!submenu.style.display)?'block':'none';it.classList.toggle('open');positionSub(it);return;}activateTab('5');submenu.style.display='block';it.classList.add('open');positionSub(it);} else {activateTab(id);}});});function positionSub(trigger){if(!submenu) return;const rect=trigger.getBoundingClientRect();submenu.style.left=rect.left+'px';submenu.style.top=(rect.bottom)+'px';}document.addEventListener('click',e=>{if(!submenu) return; if(!submenu.contains(e.target) && !e.target.closest('.nav-item.solution-has-sub')) hideSub();});const subItems=[...(submenu?submenu.querySelectorAll('.sub-item'):[])];const panel5=document.querySelector('.export-panel[data-tab="5"]');const subPanels=panel5?panel5.querySelectorAll('.sub-panel'):[];function activateSub(id){subItems.forEach(s=>s.classList.toggle('active',s.getAttribute('data-sub')===id));subPanels.forEach(p=>p.classList.toggle('active',p.getAttribute('data-sub')===id));}subItems.forEach(it=>it.addEventListener('click',()=>{activateSub(it.getAttribute('data-sub'));}));})();</`+`script>`
      const html = `<!DOCTYPE html><html lang=\"zh\"><head><meta charset=\"utf-8\"/><title>ReportTab导出</title><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/><style>${styles}</style></head><body><div class=\"tab-export-root\"><div class=\"export-nav\">${navHtml}</div><div class=\"export-panels\">${panelsHtml}</div></div>${script}</body></html>`
      return new Blob([html], { type:'text/html;charset=utf-8' })
    }

    const exportHtmlWrapper = async () => {
      try {
        const blob = await buildMultiTabHtml()
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'ReportTab_Export.html'
        a.click()
        URL.revokeObjectURL(url)
      } catch (e) { console.error('导出 ReportTab 页面失败', e) }
    }

    const sendEmailWrapper = async () => {
      try {
        const blob = await buildMultiTabHtml()
        if (!blob) return
        const fileName = 'ReportTab_Export.html'
        // 1. Web Share Level 2 尝试
        if (navigator.share && navigator.canShare) {
          const file = new File([blob], fileName, { type:'text/html' })
          if (navigator.canShare({ files:[file] })) {
            try {
              await navigator.share({ title:'IntraEU Report (No AM Tab)', text:'附上导出报告（已去除 AM 指导话术）。', files:[file] })
              return
            } catch (err) { console.warn('Web Share 取消或失败，回退 Outlook', err) }
          }
        }
        // 2. 回退：生成 helper 页面，指导 Outlook 发送
        // 2.1 先触发文件下载，保证用户有本地文件
        const dlUrl = URL.createObjectURL(blob)
        const a = document.createElement('a'); a.href = dlUrl; a.download = fileName; a.click();
        setTimeout(()=>URL.revokeObjectURL(dlUrl), 5000)
        // 2.2 生成 base64 供 helper 按需重新下载
        const reader = new FileReader()
        reader.onload = () => {
          const base64 = reader.result.split(',')[1]
          const mailSubject = 'IntraEU 报告 (不含 AM 指导)'
          const mailBody = '您好,\n\n附件为 IntraEU 多标签报告。请使用浏览器打开 HTML 查看。\n\n祝好\n'
          const helper = `<!DOCTYPE html><html lang='zh'><head><meta charset='utf-8'><title>发送邮件助手</title><meta name='viewport' content='width=device-width,initial-scale=1'/><style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;margin:0;background:linear-gradient(135deg,#f5f7fa,#eef2f7);padding:34px 20px;color:#1f2933;}h1{margin:0 0 18px;font-size:22px;}p{line-height:1.55;margin:0 0 14px;}button{cursor:pointer;border:none;border-radius:8px;padding:10px 16px;font-weight:600;letter-spacing:.5px;font-size:13px;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 4px rgba(0,0,0,.15);background:#ff9900;color:#232f3e;transition:.25s;}button:hover{background:#ffad33;} .secondary{background:#e5e7eb;color:#333;} .secondary:hover{background:#d5d7da;} .row{display:flex;flex-wrap:wrap;gap:12px;margin:12px 0 24px;}textarea{width:100%;min-height:160px;padding:12px 14px;border:1px solid #d0d7de;border-radius:10px;font:13px/1.5 monospace;background:#fff;}textarea:focus{outline:2px solid #ff9900;border-color:#ff9900;}code{background:#232f3e;color:#fff;padding:2px 6px;border-radius:4px;font-size:12px;}footer{margin-top:40px;font-size:11px;color:#6b7280;text-align:center;} .badge{background:#ff9900;color:#232f3e;padding:2px 8px;font-size:11px;border-radius:12px;font-weight:600;letter-spacing:.5px;margin-left:6px;} .hint{font-size:12px;background:#fff8eb;border:1px solid #ffe0b2;padding:10px 12px;border-radius:10px;margin-top:10px;} </style></head><body><main style='max-width:820px;margin:0 auto;background:#fff;border:1px solid #e3e8ee;border-radius:18px;padding:40px 42px;box-shadow:0 10px 26px -6px rgba(0,0,0,.12),0 4px 10px -2px rgba(0,0,0,.06);'><h1>📨 发送报告 <span class='badge'>助手</span></h1><p>已为你生成并自动下载 <code>${fileName}</code>。若需要再次获取，可点击“重新下载”。</p><div class='row'><button id='redl'>重新下载</button><button id='corp' class='secondary'>打开 Outlook (企业)</button><button id='copy' class='secondary'>复制正文</button></div><label style='font-size:13px;font-weight:600;display:block;margin:0 0 6px;'>邮件正文建议：</label><textarea id='body'>${mailBody}</textarea><div class='hint'>提示：浏览器及 mailto 无法自动附加本地文件，请在打开的邮件窗口中手动添加已下载的 ${fileName}。</div><footer>IntraEU Report Helper • 数据仅在本地处理</footer><script>(()=>{const b64='${base64}';const fn='${fileName}';const toBlob=()=>{const byteChars=atob(b64);const aBuf=new ArrayBuffer(byteChars.length);const u8=new Uint8Array(aBuf);for(let i=0;i<byteChars.length;i++)u8[i]=byteChars.charCodeAt(i);return new Blob([u8],{type:'text/html'});} ;const redl=document.getElementById('redl');const corp=document.getElementById('corp');const live=document.getElementById('live');const copy=document.getElementById('copy');const ta=document.getElementById('body');redl.onclick=()=>{const blob=toBlob();const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=fn;a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);} ;const enc=encodeURIComponent;corp.onclick=()=>{const url='https://outlook.office.com/mail/deeplink/compose?subject='+enc('${mailSubject}')+'&body='+enc(ta.value);window.open(url,'_blank');};live.onclick=()=>{const url='https://outlook.live.com/mail/0/deeplink/compose?subject='+enc('${mailSubject}')+'&body='+enc(ta.value);window.open(url,'_blank');};copy.onclick=async()=>{try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(ta.value);}else{ta.select();document.execCommand('copy');}copy.textContent='已复制';setTimeout(()=>copy.textContent='复制正文',1500);}catch(_){alert('复制失败，请手动选择文本复制');}};})();</`+`script></main></body></html>`
          const helperBlob = new Blob([helper], { type:'text/html;charset=utf-8' })
          const helperUrl = URL.createObjectURL(helperBlob)
          window.open(helperUrl,'_blank')
        }
        reader.readAsDataURL(blob)
      } catch (e) { console.error('发送邮件失败', e) }
    }

    // 点击外部关闭下拉
    const handleBodyClick = (e) => {
      const dropdown = document.querySelector('.solution-dropdown')
      const nav = document.querySelector('.tab-navigation')
      if (
        showSolutionMenu.value &&
        dropdown &&
        !dropdown.contains(e.target) &&
        nav &&
        !nav.contains(e.target)
      ) {
        closeSolutionMenu()
      }
    }
    onMounted(() => {
      document.addEventListener('click', handleBodyClick)
      window.addEventListener('resize', updateMenuPosition)
    })
    onBeforeUnmount(() => {
      document.removeEventListener('click', handleBodyClick)
      window.removeEventListener('resize', updateMenuPosition)
    })

    // === PDF 导出实现 ===
    const exportPdfWrapper = async () => {
      if (!props.reportGenerated) {
        console.warn('报告未生成，无法导出 PDF')
        return
      }
      try {
        exportingPdf.value = true
        cancelExportFlag.value = false
        exportProgress.value = { current: 0, total: 0, message: '初始化...', done: false }
        // 先渲染进度层
        await nextTick()
        // 再稍作延迟让浏览器完成一次绘制，避免首帧看不到弹窗
        await sleep(30)
        // 优先视觉模式
        await exportPdfVisualMode()
      } catch (e) {
        console.warn('视觉模式失败，切换文本模式', e)
        const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
        await exportPdfTextMode(pdf)
        pdf.save('IntraEU_Report.pdf')
        exportProgress.value.message = '文本模式完成'
        exportProgress.value.done = true
        setTimeout(()=>{ exportingPdf.value = false }, 1200)
      }
    }

    // 纯文本回退版本（保留原逻辑）
    const exportPdfTextMode = async (pdf) => {
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const marginX = 36
      const marginY = 40
      const lineHeight = 14
      let cursorY = marginY

      const title = 'IntraEU 综合分析报告'
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(16)
      pdf.text(title, pageWidth / 2, cursorY, { align: 'center' })
      cursorY += 28

      const exportTabConfigs = tabs.value.filter(t => t.id !== 8)
      const originalMain = activeTab.value
      const originalSub = selectedSubTab.value

      const addSectionHeader = (txt) => {
        if (cursorY + 40 > pageHeight - marginY) { pdf.addPage(); cursorY = marginY }
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(13); pdf.setTextColor(35,47,62)
        pdf.text(txt, marginX, cursorY); cursorY += 22
      }
      const addParagraphLines = (text) => {
        pdf.setFont('helvetica','normal'); pdf.setFontSize(10); pdf.setTextColor(60,60,60)
        const maxWidth = pageWidth - marginX*2
        const lines = pdf.splitTextToSize(text, maxWidth)
        lines.forEach(l => { if (cursorY + lineHeight > pageHeight - marginY) { pdf.addPage(); cursorY = marginY } pdf.text(l, marginX, cursorY); cursorY += lineHeight })
        cursorY += 4
      }
      const extractPlainText = (htmlString) => {
        const tmp = document.createElement('div'); tmp.innerHTML = htmlString
        tmp.querySelectorAll('script,style,button').forEach(n=>n.remove())
        tmp.querySelectorAll('table').forEach(tbl => {
          const rows = [...tbl.rows].map(r => [...r.cells].map(c => c.innerText.trim()).join(' | ')).join('\n')
          const pre = document.createElement('pre'); pre.textContent = rows; tbl.replaceWith(pre)
        })
        return tmp.innerText.replace(/\n{3,}/g,'\n\n').trim()
      }
      for (const tabCfg of exportTabConfigs) {
        activeTab.value = tabCfg.id; await nextTick()
        if (tabCfg.id === 5) {
          addSectionHeader(tabCfg.title)
          for (const sub of solutionSubTabs) {
            selectedSubTab.value = sub.id; await nextTick()
            const contentRoot = document.querySelector('.tab-content'); if (!contentRoot) continue
            const text = extractPlainText(contentRoot.innerHTML)
            addSectionHeader('• ' + sub.title)
            addParagraphLines(text || '(无数据)')
          }
          selectedSubTab.value = originalSub; await nextTick()
        } else {
          const contentRoot = document.querySelector('.tab-content'); if (!contentRoot) continue
          const text = extractPlainText(contentRoot.innerHTML)
          addSectionHeader(tabCfg.title)
          addParagraphLines(text || '(无数据)')
        }
      }
      activeTab.value = originalMain; selectedSubTab.value = originalSub; await nextTick()
    }

    // 视觉模式：截图每个面板
    const exportPdfVisualMode = async () => {
      const tStart = performance.now()
      const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const scale = 2 // 高清

      const originalMain = activeTab.value
      const originalSub = selectedSubTab.value
      const exportTabConfigs = tabs.value.filter(t => t.id !== 8)

      // 构建隐藏根节点
      const tempRoot = document.createElement('div')
      Object.assign(tempRoot.style, {
        position: 'fixed', left: '-10000px', top: '0', width: '1200px',
        background: '#fff', padding: '0', margin: '0', zIndex: '-1'
      })
      document.body.appendChild(tempRoot)

      const panels = []
      const addPanel = (title, sourceEl, level = 1) => {
        // 深克隆源内容 (保持现有 DOM 结构，而不是 innerHTML 重新解析)
        const clone = sourceEl.cloneNode(true)
        // 移除所有按钮
        clone.querySelectorAll('button').forEach(b => b.remove())
        // 包裹容器 + 标题
        const wrapper = document.createElement('div')
        wrapper.style.cssText = 'padding:32px 40px 40px;font-family:Helvetica,Arial,sans-serif;'
        const hTag = level === 0 ? 'h1' : (level === 1 ? 'h2' : 'h3')
        const size = level === 0 ? 38 : (level === 1 ? 26 : 20)
        const color = level === 2 ? '#ff9900' : '#232f3e'
        wrapper.innerHTML = `<${hTag} style="margin:0 0 20px;font-size:${size}px;color:${color};">${title}</${hTag}>`
        wrapper.appendChild(clone)
        tempRoot.appendChild(wrapper)
        panels.push({ title, el: wrapper })
      }

      // 封面（单独）
      const cover = document.createElement('div')
      cover.style.cssText = 'padding:80px 60px;font-family:Helvetica,Arial,sans-serif;'
      cover.innerHTML = `
        <h1 style="margin:0 0 24px;font-size:40px;color:#232f3e;">IntraEU 综合分析报告</h1>
        <p style="margin:0 0 10px;font-size:14px;color:#555;">生成时间：${new Date().toLocaleString()}</p>
        <p style="margin:0;font-size:12px;color:#777;">(不含 AM 指导话术 Tab)</p>`
      tempRoot.appendChild(cover)
      panels.push({ title: '封面', el: cover })

      // 逐 Tab 构建
      for (const tabCfg of exportTabConfigs) {
        activeTab.value = tabCfg.id
        await nextTick()
        if (tabCfg.id === 5) {
          // 主标题单独一个 panel（不复制内容）
          const headerBlock = document.createElement('div')
          headerBlock.style.cssText = 'padding:32px 40px 12px;font-family:Helvetica,Arial,sans-serif;background:#f5f5f5;border-bottom:1px solid #eee;'
          headerBlock.innerHTML = `<h2 style="margin:0;font-size:28px;color:#232f3e;">${tabCfg.title}</h2>`
          tempRoot.appendChild(headerBlock)
          panels.push({ title: tabCfg.title, el: headerBlock })
          for (const sub of solutionSubTabs) {
            selectedSubTab.value = sub.id
            await nextTick()
            const contentRoot = document.querySelector('.tab-content')
            if (!contentRoot) continue
            addPanel(sub.title, contentRoot, 2)
          }
        } else {
          const contentRoot = document.querySelector('.tab-content')
          if (!contentRoot) continue
            addPanel(tabCfg.title, contentRoot, 1)
        }
      }

      // 状态恢复
      activeTab.value = originalMain
      selectedSubTab.value = originalSub
      await nextTick()

      // 等待所有图片加载，避免空白
      const waitForImages = async (root) => {
        const imgs = Array.from(root.querySelectorAll('img'))
        await Promise.all(imgs.map(img => {
          if (img.complete) return Promise.resolve()
          return new Promise(res => { img.onload = () => res(); img.onerror = () => res() })
        }))
      }
      await waitForImages(tempRoot)
      // 方案A：先截图全部 panel 存储，再“瀑布流”合成
      exportProgress.value.total = panels.length
      exportProgress.value.current = 0
      exportProgress.value.message = '面板截图中...'

      const captured = [] // {canvas,width,height,title}
      for (const { el } of panels) {
        if (cancelExportFlag.value) break
        exportProgress.value.current++
        exportProgress.value.message = `截图 ${exportProgress.value.current}/${exportProgress.value.total}`
        try {
          const c = await html2canvas(el, { scale, backgroundColor: '#ffffff', useCORS: true, allowTaint: false, logging: false })
          captured.push({ canvas: c, width: c.width, height: c.height })
        } catch (e) {
          console.error('[PDF] 截图失败，插入占位', e)
          const ph = document.createElement('canvas')
          ph.width = 1200; ph.height = 200
          const ctx = ph.getContext('2d')
          ctx.fillStyle = '#f5f5f5'; ctx.fillRect(0,0,ph.width,ph.height)
          ctx.fillStyle = '#cc0000'; ctx.font = '28px sans-serif'; ctx.fillText('该面板截图失败', 40, 110)
          captured.push({ canvas: ph, width: ph.width, height: ph.height })
        }
      }

      // 若取消
      if (cancelExportFlag.value) {
        document.body.removeChild(tempRoot)
        exportProgress.value.message = '已取消'
        exportProgress.value.done = true
        return
      }

      exportProgress.value.message = '切分大面板...'
      const pageMarginX = 36
      const pageMarginY = 40
      const contentWidthPdf = pageWidth - pageMarginX * 2
      const contentHeightPdf = pageHeight - pageMarginY * 2

      // 将超高面板按 PDF 内容高度切分（以原始像素为基准）
      const pixelScaleToPdf = (w) => contentWidthPdf / w // 将原 canvas 宽度映射到 PDF 内容宽度的缩放系数
      const sliced = [] // {canvas,width,height}
      for (const item of captured) {
        const scaleToPdf = pixelScaleToPdf(item.width)
        const pdfHeight = item.height * scaleToPdf
        if (pdfHeight <= contentHeightPdf) {
          sliced.push(item)
        } else {
          // 需要切分
            const maxSlicePdfHeight = contentHeightPdf
            const pxPerPdfPoint = item.height / pdfHeight // 原像素 / PDF 点
            const maxSlicePxHeight = Math.floor(maxSlicePdfHeight * pxPerPdfPoint)
            let rendered = 0
            while (rendered < item.height) {
              const slicePxHeight = Math.min(maxSlicePxHeight, item.height - rendered)
              const sliceCanvas = document.createElement('canvas')
              sliceCanvas.width = item.width
              sliceCanvas.height = slicePxHeight
              const ctx = sliceCanvas.getContext('2d')
              ctx.drawImage(item.canvas, 0, rendered, item.width, slicePxHeight, 0, 0, item.width, slicePxHeight)
              sliced.push({ canvas: sliceCanvas, width: item.width, height: slicePxHeight })
              rendered += slicePxHeight
            }
        }
      }

      exportProgress.value.message = '合成分页...' 
      // 分组：累积多个切片在一页（瀑布流单列压缩留白）
      const groups = [] // 每组若干 image items
      let currentGroup = []
      let currentGroupPdfHeight = 0
      const gapPdf = 12 // pdf 点单位的间隙
      for (const item of sliced) {
        const scaleToPdf = pixelScaleToPdf(item.width)
        const hPdf = item.height * scaleToPdf
        const needed = (currentGroup.length === 0 ? hPdf : (currentGroupPdfHeight + gapPdf + hPdf))
        if (needed <= contentHeightPdf) {
          currentGroup.push(item)
          currentGroupPdfHeight = needed
        } else {
          if (currentGroup.length) groups.push(currentGroup)
          currentGroup = [item]
          currentGroupPdfHeight = hPdf
        }
      }
      if (currentGroup.length) groups.push(currentGroup)

      // 输出到 PDF
      let pageIndex = 0
      for (const group of groups) {
        if (pageIndex > 0) pdf.addPage()
        let y = pageMarginY
        for (let i=0;i<group.length;i++) {
          const it = group[i]
          const scaleToPdf = pixelScaleToPdf(it.width)
          const drawHeight = it.height * scaleToPdf
          pdf.addImage(it.canvas.toDataURL('image/jpeg', 0.9), 'JPEG', pageMarginX, y, contentWidthPdf, drawHeight)
          y += drawHeight + gapPdf
        }
        pageIndex++
        exportProgress.value.message = `分页合成 ${pageIndex}/${groups.length}`
      }

      document.body.removeChild(tempRoot)
      pdf.save('IntraEU_Report.pdf')
      exportProgress.value.message = 'PDF 已保存'
      exportProgress.value.done = true
      console.log(`[PDF] 视觉导出完成(瀑布流), 用时 ${(performance.now()-tStart).toFixed(0)} ms, 页数: ${pdf.getNumberOfPages()}`)
      setTimeout(()=>{ if (!cancelExportFlag.value) exportingPdf.value = false }, 1400)
    }

    const cancelExport = () => { cancelExportFlag.value = true; exportProgress.value.message = '取消中...'}
    const closeExportOverlay = () => { exportingPdf.value = false }

    return {
      activeTab,
      tabs,
      switchTab,
      onMainTabClick,
      showSolutionMenu,
      solutionSubTabs,
      selectedSubTab,
      selectSubTab,
      solutionMenu,
      showUniReport,
  openFloatingPreview,
  closeFloating,
  togglePreview,
      exportHtmlWrapper,
      sendEmailWrapper,
      uniReportRef,
      exportPdfWrapper
      ,exportingPdf, exportProgress, progressPercent, cancelExport, closeExportOverlay
    }
  },
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
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 浮层模式样式 */
.floating-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  z-index: 4000;
}
.report-frame.floating-mode {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90vw;
  height: 90vh;
  transform: translate(-50%, -50%);
  z-index: 4010;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  box-shadow:
    0 10px 30px -5px rgba(0, 0, 0, 0.25),
    0 4px 10px -2px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: popIn 0.35s ease;
  background: #fff;
}
/* 全屏模式覆盖尺寸、圆角与定位 */
.report-frame.floating-mode.fullscreen {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform: none;
  border-radius: 0;
  border: none;
  box-shadow: none;
  animation: fadeInFs .25s ease;
}
@keyframes fadeInFs { from { opacity:0; } to { opacity:1; } }
.report-frame.floating-mode.fullscreen .tab-navigation { border-radius: 0; }
.report-frame.floating-mode.fullscreen .floating-header { border-radius: 0; }
@keyframes popIn {
  from {
    opacity: 0;
    transform: translate(-50%, -46%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
.report-frame.floating-mode .tab-navigation {
  border-radius: 14px 14px 0 0;
}
.floating-header {
  position: relative;
  background: #232f3e;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* left align content; actions will push to right */
  padding: 12px 18px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  z-index: 20;
}
.floating-header .title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
}
.floating-header .actions {
  display: flex;
  gap: 10px;
  margin-left: auto; /* push action buttons to far right */
}
.floating-header .export-btn,
.floating-header .close-btn {
  border: none;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: 0.25s;
}
.floating-header .export-btn {
  background: #ff9900;
  color: #232f3e;
}
.floating-header .export-btn:hover {
  background: #ffad33;
}
.floating-header .close-btn {
  background: #ff5f56;
  color: #fff;
}
.floating-header .close-btn:hover {
  background: #ff3b30;
}
.report-frame.floating-mode .tab-content {
  flex: 1;
}

/* Tab 导航栏样式 - AWS 风格 */
.tab-navigation {
  background-color: #232f3e;
  border-bottom: none;
  padding: 0 12px;
  box-shadow: 0 2px 8px rgba(35, 47, 62, 0.15);
  position: relative;
  display: flex;
  align-items: center;
}

.tab-container {
  display: flex;
  gap: 0;
  width: 100%;
  margin: 0;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tab-container::-webkit-scrollbar {
  display: none;
}

.nav-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 12px;
}
.preview-btn {
  background: #ff9900;
  border: none;
  color: #232f3e;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transition: 0.25s;
  letter-spacing: 0.5px;
  text-transform: lowercase;
}
.preview-btn:hover {
  background: #ffad33;
}
.preview-btn:active {
  transform: translateY(1px);
}
.preview-btn.active { background:#ff4d4f; color:#fff; text-transform:none; }
.preview-btn.active:hover { background:#ff7875; }

/* 导出进度弹窗样式 */
.export-progress-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.35); backdrop-filter:blur(3px); z-index:5000; display:flex; align-items:center; justify-content:center; }
.export-progress-dialog { width: min(420px,90%); background:#ffffff; border:1px solid #e3e8ee; border-radius:16px; padding:28px 30px 26px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; box-shadow:0 12px 32px -6px rgba(0,0,0,0.28),0 4px 12px -2px rgba(0,0,0,0.12); animation:scaleIn .35s ease; }
.export-progress-dialog h3 { margin:0 0 12px; font-size:18px; color:#232f3e; font-weight:600; letter-spacing:.5px; }
.export-progress-dialog .hint { margin:0 0 18px; font-size:12px; color:#555; line-height:1.5; }
.bar-wrap { height:10px; background:#f1f3f5; border-radius:6px; overflow:hidden; position:relative; box-shadow:inset 0 0 0 1px #e2e6ea; }
.bar-wrap .bar { height:100%; background:linear-gradient(90deg,#ff9900,#ffb347); width:0; transition:width .35s ease; }
.export-progress-dialog .msg { margin:12px 0 0; font-size:11px; color:#666; letter-spacing:.3px; }
.export-progress-dialog .actions { margin-top:22px; display:flex; gap:12px; justify-content:flex-end; }
.export-progress-dialog button { border:none; cursor:pointer; padding:8px 16px; font-size:12px; font-weight:600; border-radius:8px; letter-spacing:.5px; display:inline-flex; align-items:center; gap:4px; transition:.25s; }
.export-progress-dialog .cancel-btn { background:#ff4d4f; color:#fff; }
.export-progress-dialog .cancel-btn:hover:not(:disabled) { background:#ff7375; }
.export-progress-dialog .cancel-btn:disabled { opacity:.5; cursor:default; }
.export-progress-dialog .close-btn { background:#232f3e; color:#fff; }
.export-progress-dialog .close-btn:hover { background:#394b5d; }
@keyframes scaleIn { from { opacity:0; transform:translateY(8px) scale(.96);} to { opacity:1; transform:translateY(0) scale(1);} }
.fade-enter-active, .fade-leave-active { transition: opacity .25s ease; }
.fade-enter-from, .fade-leave-to { opacity:0; }

.tab-item {
  position: relative;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
  white-space: nowrap;
  color: #ffffff;
  flex-shrink: 0;
  min-width: fit-content;
}

.tab-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.tab-item.active {
  color: #ff9900;
  border-bottom-color: #ff9900;
  background-color: rgba(255, 153, 0, 0.1);
}

/* 解决方案 子菜单 */
.solution-dropdown {
  position: absolute;
  top: 100%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  z-index: 30;
  padding: 8px 0;
  box-shadow:
    0 8px 18px -4px rgba(0, 0, 0, 0.12),
    0 4px 8px -2px rgba(0, 0, 0, 0.08);
  width: 240px;
  border-radius: 8px;
}
.solution-dropdown.centered {
  left: 50%;
  transform: translateX(-50%);
}
.solution-dropdown.compact {
  right: auto;
}
.dropdown-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.dropdown-item {
  display: flex;
  flex-direction: column;
  padding: 8px 12px 6px;
  border-left: 3px solid transparent;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.25s ease;
}
.dropdown-item:hover {
  background: #fff8ec;
  border-left-color: #ff9900;
}
.dropdown-item.selected {
  background: #fff3e0;
  border-left-color: #ff9900;
}
.dropdown-item .item-title {
  font-size: 13px;
  font-weight: 600;
  color: #232f3e;
  line-height: 1.2;
  margin-bottom: 2px;
}
.dropdown-item .item-desc {
  font-size: 11px;
  color: #666;
  line-height: 1.3;
  white-space: normal;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.3s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.tab-title {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.2px;
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

/* 统一各分析页签内容宽度并居中 */
.center-wrap { 
  max-width: 1400px; 
  margin: 0 auto; 
  padding: 24px 32px 48px; 
  box-sizing: border-box; 
}
.center-wrap > * { width: 100%; }
/* 去除子组件可能自带的外层 margin 影响整体对齐 */
.center-wrap :deep(.content-panel) { margin:0 !important; }
.center-wrap :deep(.sub-tab-panel) { margin:0 !important; }

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
  background-color: #232f3e;
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
    padding: 0 8px;
  }

  .tab-item {
    padding: 10px 12px;
  }

  .tab-title {
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
