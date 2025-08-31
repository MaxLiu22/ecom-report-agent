<template>
	<div v-if="visible" class="uni-report-overlay">
		<div class="uni-report-modal">
			<div class="uni-report-header">
				<h2 class="title">📊 IntraEU 卖家统一报告预览</h2>
				<div class="actions">
					<button class="export-btn" @click="exportHtml">导出HTML</button>
					<button class="close-btn" @click="close">×</button>
				</div>
			</div>
			<div class="uni-report-body" ref="scrollBody">
				<!-- 概览提示 -->
				<div class="intro-box">
					<p>本报告整合了各分析子模块（站点拓展评估、欧盟内部物流、英欧物流方案、CEE 成本节约、行动计划与 AM 指导话术）。以下为生成版本的静态预览（互动元素已最小化以便打印/导出）。</p>
				</div>

				<!-- 1. 欧洲站点拓展评估 (Tab5) -->
				<section class="report-section" id="section-expansion">
					<h3 class="section-title">1. 🌍 欧洲站点拓展评估</h3>
					<div class="section-content">
						<Tab5 :euExpansionCheckli="euExpansionCheckli" />
					</div>
				</section>

				<!-- 2.1 欧盟内部物流方案 (Tab61) -->
				<section class="report-section" id="section-internal">
					<h3 class="section-title">2.1 欧盟内部物流方案（PanEU）</h3>
					<div class="section-content">
						<Tab61 :panEUResult="panEUResult" />
					</div>
				</section>

				<!-- 2.2 英国和欧盟间物流方案 (Tab62) -->
				<section class="report-section" id="section-di">
					<h3 class="section-title">2.2 英国和欧盟间物流方案（DI）</h3>
					<div class="section-content">
						<Tab62 :diResult="diResult" />
					</div>
				</section>

				<!-- 2.3 更多成本节约（CEE） -->
				<section class="report-section" id="section-cee">
					<h3 class="section-title">2.3 更多成本节约（CEE 中欧计划）</h3>
						<div class="section-content">
							<Tab63 :ceeResult="ceeResult" />
						</div>
				</section>

				<!-- 3. 行动计划 -->
				<section class="report-section" id="section-action">
					<h3 class="section-title">3. 📅 行动计划</h3>
					<div class="section-content">
						<Tab8 :actionResult="actionResult" />
					</div>
				</section>

				<!-- 4. AM 指导话术 (简化版 Tab9 内容) -->
				<section class="report-section" id="section-am" v-if="showPitch">
					<h3 class="section-title">4. 💬 AM 指导话术（参考）</h3>
					<div class="section-content">
						<Tab9 />
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
// 复用已有各分 tab 组件，保持展示逻辑一致
import Tab5 from './Tab5.vue'
import Tab61 from './Tab61.vue'
import Tab62 from './Tab62.vue'
import Tab63 from './Tab63.vue'
import Tab8 from './Tab8.vue'
import Tab9 from './Tab9.vue'

export default {
	name: 'UniReport',
	components: { Tab5, Tab61, Tab62, Tab63, Tab8, Tab9 },
	props: {
		visible: { type: Boolean, default: false },
		panEUResult: { type: Object, default: null },
		diResult: { type: Object, default: null },
		ceeResult: { type: Object, default: null },
		euExpansionCheckli: { type: Object, default: null },
		actionResult: { type: Object, default: null },
		showPitch: { type: Boolean, default: true }
	},
	emits: ['update:visible', 'close'],
	methods: {
		close() {
			this.$emit('update:visible', false)
			this.$emit('close')
		},
		exportHtml() {
			// 导出当前报告主体为一个简单 HTML
			try {
				const container = this.$el.querySelector('.uni-report-body')
				if (!container) return
				const html = `<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8"/><title>IntraEU统一报告</title><style>${this.collectStyles()}</style></head><body>${container.innerHTML}</body></html>`
				const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
				const url = URL.createObjectURL(blob)
				const a = document.createElement('a')
				a.href = url
				a.download = 'IntraEU_UniReport.html'
				a.click()
				URL.revokeObjectURL(url)
			} catch (e) {
				console.error('导出失败', e)
			}
		},
		collectStyles() {
			// 简单收集当前页面内嵌样式，保证导出大致样式
			const styleTags = Array.from(document.querySelectorAll('style'))
			return styleTags.map(s => s.innerHTML).join('\n') + this.inlineExtraCss()
		},
		inlineExtraCss() {
			return `\nbody{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#fff;padding:16px;}\n.section-title{margin:32px 0 16px;font-size:20px;color:#232f3e;border-left:6px solid #ff9900;padding-left:10px;}\n`
		}
	}
}
</script>

<style scoped>
.uni-report-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.45); backdrop-filter:blur(4px); display:flex; align-items:flex-start; justify-content:center; padding:40px 30px 60px; z-index:3000; overflow:auto; }
.uni-report-modal { background:#ffffff; width: min(1400px, 100%); max-height:100%; border-radius:14px; box-shadow:0 10px 30px -5px rgba(0,0,0,0.25),0 4px 10px -2px rgba(0,0,0,0.15); display:flex; flex-direction:column; overflow:hidden; border:1px solid #e5e7eb; }
.uni-report-header { display:flex; align-items:center; justify-content:space-between; padding:16px 24px; background:#232f3e; color:#fff; position:sticky; top:0; z-index:10; }
.uni-report-header .title { margin:0; font-size:20px; font-weight:600; letter-spacing:.5px; }
.uni-report-header .actions { display:flex; gap:10px; }
.close-btn, .export-btn { border:none; cursor:pointer; padding:8px 14px; border-radius:6px; font-size:13px; font-weight:600; letter-spacing:.5px; display:inline-flex; align-items:center; gap:6px; transition:.25s; }
.close-btn { background:#ff5f56; color:#fff; }
.close-btn:hover { background:#ff3b30; }
.export-btn { background:#ff9900; color:#232f3e; }
.export-btn:hover { background:#ffad33; }
.uni-report-body { padding:20px 26px 40px; overflow-y:auto; }
.intro-box { background:#f8f9fa; border:1px solid #e2e8f0; padding:14px 18px; border-radius:8px; font-size:13px; line-height:1.6; color:#444; box-shadow:0 1px 2px rgba(0,0,0,0.04); }
.report-section { margin-top:10px; }
.report-section + .report-section { margin-top:30px; }
.section-title { margin:0 0 16px; font-size:18px; font-weight:600; color:#232f3e; position:relative; padding-left:10px; }
.section-title:before { content:''; position:absolute; left:0; top:2px; bottom:2px; width:4px; border-radius:2px; background:#ff9900; }
.section-content { background:#ffffff; border:1px solid #e5e7eb; border-radius:10px; padding:18px 20px; box-shadow:0 2px 6px rgba(0,0,0,0.05); }
/* 精简嵌套组件的外层间距 */
.section-content :deep(.content-panel) { padding:0; box-shadow:none; }
.section-content :deep(.content-header) { display:none; }
.section-content :deep(.sub-tab-panel) { padding:0; border:none; box-shadow:none; }
.section-content :deep(.analysis-section) { margin-top:20px; }
.section-content :deep(table) { font-size:12px; }
@media (max-width: 1024px) { .uni-report-modal { width:100%; } .uni-report-overlay { padding:20px 10px 40px; } .uni-report-header .title { font-size:18px; } }
</style>
