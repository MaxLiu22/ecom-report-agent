<template>
  <div class="report-frame" :class="{ 'floating-mode': showUniReport }">
    <!-- Tab 导航栏 -->
    <div class="tab-navigation">
      <div class="tab-container">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-item"
          :class="{ active: activeTab === tab.id }"
          @click="onMainTabClick(tab)"
        >
          <span class="tab-title">{{ tab.title }}</span>
          <div class="tab-indicator" v-if="activeTab === tab.id"></div>
        </div>
      </div>
      <!-- 预览统一报告按钮 -->
      <div class="nav-actions" v-if="reportGenerated">
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
    <div v-if="showUniReport" class="floating-header uni-report-header">
      <!-- <h2 class="title">📊 IntraEU 卖家统一报告预览</h2> -->
      <div class="actions">
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
              <div v-if="panEUResult" class="overview-card" @click="switchTab(1)">
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
              <div v-if="diResult" class="overview-card" @click="switchTab(2)">
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

      <!-- Tab 5: 欧洲站点拓展评估 -->
      <div v-if="activeTab === 4" class="center-wrap">
        <Tab5 :euExpansionCheckli="euExpansionCheckli" />
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
        <Tab7 />
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
  <div v-if="showUniReport" class="floating-backdrop" @click.self="closeFloating"></div>
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
  },
  setup(props) {
    // 当前活跃的标签页
    const activeTab = ref(0)
    const showSolutionMenu = ref(false)
    const selectedSubTab = ref(61)
    const showUniReport = ref(false)
    const uniReportRef = ref(null)

    const solutionSubTabs = [
      { id: 61, title: '欧盟内部物流方案（PanEU）', desc: '解决方案子页面 1 概述' },
      { id: 62, title: '英国和欧盟间物流方案（DI）', desc: '解决方案子页面 2 概述' },
      { id: 63, title: '更多成本节约（CEE）', desc: '解决方案子页面 3 概述' },
      // { id: 64, title: '页面4', desc: '解决方案子页面 4 概述' }
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
      // 找到“解决方案” tab DOM
      const target = [...tabsEl.children].find((child) => child.textContent.trim() === '解决方案')
      const menuEl = solutionMenu.value
      if (target && menuEl) {
        const targetRect = target.getBoundingClientRect()
        const navRect = nav.getBoundingClientRect()
        const centerX = targetRect.left + targetRect.width / 2 - navRect.left
        menuEl.style.left = centerX + 'px'
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
    const openFloatingPreview = () => { showUniReport.value = true }
    const closeFloating = () => { showUniReport.value = false }
    const togglePreview = () => { showUniReport.value ? closeFloating() : openFloatingPreview() }

    // 包装导出与邮件发送（调用隐藏 UniReport 实例）
    // 多标签导出（排除 AM 指导话术 id=8），生成与当前 ReportTab 相似的可切换页面
    const exportHtmlWrapper = async () => {
      try {
        const inst = uniReportRef.value
        let styles = ''
        if (inst && typeof inst.collectStylesProcessed === 'function') {
          styles = inst.collectStylesProcessed()
        } else {
          styles = ''
          document.querySelectorAll('style').forEach(s => { if (s.innerHTML) styles += s.innerHTML + '\n' })
          styles = styles.replace(/\[data-v-[^\]]+\]/g, '')
        }
        // 需要导出的标签（排除 AM 指导话术）
        const exportTabs = (props.reportGenerated ? tabs.value : tabs.value.filter(t=>t.id===0)).filter(t => t.id !== 8)
        if (!exportTabs.length) return
        const original = activeTab.value
        const captured = []
        for (const t of exportTabs) {
          activeTab.value = t.id
          await nextTick()
          const contentRoot = document.querySelector('.tab-content')
          if (!contentRoot) continue
          // innerHTML 只含当前激活面板
          let html = contentRoot.innerHTML
          // 去除内部按钮交互
          html = html.replace(/<button[\s\S]*?<\/button>/g, m => {
            const text = m.replace(/<[^>]+>/g,'').trim()
            return `<span class=\"export-static-label\">${text}</span>`
          })
          captured.push({ id: t.id, title: t.title, html })
        }
        activeTab.value = original
        await nextTick()

        // 追加导出基础样式
        styles += `\n/* Export Frame */\nhtml,body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#f5f5f5;}*{box-sizing:border-box;}\n.tab-export-root{display:flex;flex-direction:column;min-height:100vh;}\n.export-nav{background:#232f3e;padding:0 12px;display:flex;align-items:center;gap:0;box-shadow:0 2px 8px rgba(35,47,62,.15);position:sticky;top:0;z-index:10;}\n.export-nav .nav-item{color:#fff;padding:12px 16px;cursor:pointer;font-size:13px;position:relative;user-select:none;transition:.25s;border-bottom:3px solid transparent;}\n.export-nav .nav-item.active{color:#ff9900;border-bottom-color:#ff9900;background:rgba(255,153,0,.1);}\n.export-nav .nav-item:hover{background:rgba(255,255,255,.1);}\n.export-panels{flex:1;overflow:auto;background:#f5f5f5;}\n.export-panel{display:none;animation:fadeIn .25s ease;}\n.export-panel.active{display:block;}\n@keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}\n.export-static-label{display:inline-block;background:#f0f0f0;border:1px solid #ccc;border-radius:4px;padding:2px 6px;font-size:12px;color:#555;}\n.content-panel{background:#fff;margin:0;padding:24px;min-height:100%;}table{border-collapse:collapse;width:100%;}th,td{border:1px solid #d9d9d9;padding:6px 8px;font-size:12px;}th{background:#232f3e;color:#fff;}\n`

        const navHtml = captured.map((c,i)=>`<div class=\"nav-item${i===0?' active':''}\" data-tab=\"${c.id}\">${c.title}</div>`).join('')
        const panelsHtml = captured.map((c,i)=>`<div class=\"export-panel${i===0?' active':''}\" data-tab=\"${c.id}\">${c.html}</div>`).join('\n')
        const script = `<script>(()=>{const navItems=document.querySelectorAll('.nav-item');const panels=document.querySelectorAll('.export-panel');navItems.forEach(it=>it.addEventListener('click',()=>{const id=it.getAttribute('data-tab');navItems.forEach(n=>n.classList.remove('active'));it.classList.add('active');panels.forEach(p=>p.classList.toggle('active',p.getAttribute('data-tab')===id));}));})();</`+`script>`
        const html = `<!DOCTYPE html><html lang=\"zh\"><head><meta charset=\"utf-8\"/><title>ReportTab导出</title><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/><style>${styles}</style></head><body><div class=\"tab-export-root\"><div class=\"export-nav\">${navHtml}</div><div class=\"export-panels\">${panelsHtml}</div></div>${script}</body></html>`
        const blob = new Blob([html], { type:'text/html;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'ReportTab_Export.html'
        a.click()
        URL.revokeObjectURL(url)
      } catch (e) {
        console.error('导出 ReportTab 页面失败', e)
      }
    }
    const sendEmailWrapper = () => {
      const inst = uniReportRef.value
      if (inst && typeof inst.sendEmail === 'function') inst.sendEmail()
      else console.warn('UniReport 实例不可用：发送失败')
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
