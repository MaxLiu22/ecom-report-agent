<template>
	<div v-if="visible" class="uni-report-overlay">
		<div class="uni-report-modal">
			<div class="uni-report-header">
				<h2 class="title">📊 IntraEU 卖家统一报告预览</h2>
				<div class="actions">
					<button class="export-btn" @click="exportHtml">导出HTML</button>
					<button class="export-btn" @click="sendEmail">发送邮件</button>
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
			// 统一生成导出 HTML 文档字符串 & Blob
			_buildHtmlBlob() {
				const original = this.$el.querySelector('.uni-report-body')
				if (!original) return null
				const clone = original.cloneNode(true)
				this.normalizeContent(clone)
				const styles = this.collectStylesProcessed()
				const docHtml = `<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8"/><title>IntraEU统一报告</title><meta name="viewport" content="width=device-width,initial-scale=1"/><style>${styles}</style></head><body class="export-body"><div class="export-stack">${clone.innerHTML}</div></body></html>`
				return new Blob([docHtml], { type: 'text/html;charset=utf-8' })
			},
		exportHtml() {
			// 改进：克隆节点，标准化表格与布局样式，收集/去作用域化 CSS，避免 scoped 失效造成“样式变形”
			try {
					const blob = this._buildHtmlBlob()
					if (!blob) return
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
			async sendEmail() {
				// 生成 HTML Blob
				try {
					const blob = this._buildHtmlBlob()
					if (!blob) return
					const fileName = 'IntraEU_UniReport.html'
					// 优先使用 Web Share Level 2 (部分现代浏览器支持, Safari 17+ 对文件支持有限)
					if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], fileName, { type: 'text/html' })] })) {
						const file = new File([blob], fileName, { type: 'text/html' })
						try {
							await navigator.share({
								title: 'IntraEU 统一报告',
								text: '附上最新生成的 IntraEU 卖家统一报告 HTML 文件。',
								files: [file]
							})
							return
						} catch (shareErr) {
							console.warn('Web Share 取消或失败, 回退 mailto', shareErr)
						}
					}
					// 回退方案：生成 data URL + mailto (无法直接附件, 提示用户使用 Outlook 粘贴 / 或打开 Outlook Web)
					const reader = new FileReader()
					reader.onload = () => {
						const base64 = reader.result.split(',')[1]
						// 构建 Outlook Web 说明页面
						const helperHtml = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>发送邮件指引</title><style>body{font-family:system-ui;padding:32px;line-height:1.55;}code{background:#f4f4f4;padding:2px 4px;border-radius:4px;}textarea{width:100%;height:180px;}button{padding:6px 12px;margin-top:12px;}</style></head><body><h2>📨 发送 IntraEU 报告 (Outlook 指引)</h2><ol><li>已生成 HTML 报告文件: <strong>${fileName}</strong></li><li>点击下面“下载附件”获取文件；然后在 Outlook 新建邮件时 <em>拖拽</em> 或 <em>附件</em> 形式添加。</li><li>可复制下面推荐的邮件正文。</li></ol><p><button id='dl'>下载附件</button> <a id='mailto' href='mailto:?subject=IntraEU统一报告&body=请先点击下载按钮保存附件, 然后在邮件中手动添加该 HTML 文件为附件。'>打开邮件客户端</a></p><h3>推荐正文</h3><textarea id='body'>您好，\n\n附件为最新生成的 IntraEU 卖家统一分析报告（HTML 版本），包含：\n1. 欧洲站点拓展评估\n2. PanEU / DI 物流对比与分析\n3. CEE 成本节约测算\n4. 行动计划\n5. AM 指导话术（如适用）\n\n请下载后用浏览器打开查看。\n\n祝好\n</textarea><p><button id='copy'>复制正文</button></p><script>document.getElementById('copy').onclick=()=>{const ta=document.getElementById('body');ta.select();document.execCommand('copy');alert('已复制');};document.getElementById('dl').onclick=()=>{const b64='${base64}';const byteChars=atob(b64);const byteNumbers=new Array(byteChars.length);for(let i=0;i<byteChars.length;i++){byteNumbers[i]=byteChars.charCodeAt(i);}const blob=new Blob([new Uint8Array(byteNumbers)],{type:'text/html'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='${fileName}';a.click();};</scr` + `ipt></body></html>`
						const helperBlob = new Blob([helperHtml], { type: 'text/html;charset=utf-8' })
						const helperUrl = URL.createObjectURL(helperBlob)
						window.open(helperUrl, '_blank')
					}
					reader.readAsDataURL(blob)
				} catch (e) {
					console.error('发送邮件流程失败', e)
				}
			},
		// 收集并“去 scoped”处理样式
		collectStylesProcessed() {
			const styleBlocks = []
			// 1. 内联 <style>
			for (const s of Array.from(document.querySelectorAll('style'))) {
				if (!s.innerHTML) continue
				styleBlocks.push(s.innerHTML)
			}
			// 2. link 样式（只收集同源且 rel=stylesheet）尝试内联
			for (const link of Array.from(document.querySelectorAll('link[rel="stylesheet"]'))) {
				try {
					const href = link.getAttribute('href')
					if (href && /^\/?(?!https?:)/.test(href)) { // 相对路径
						// 尝试同步 fetch（无法同步，只能跳过或使用已加载规则）——此处保留占位注释
						// 可选：可在构建时通过服务端聚合
					}
				} catch (_) { /* ignore */ }
			}
			let merged = styleBlocks.join('\n')
			// 3. 去除 scoped 属性选择器  data-v-xxxx
			merged = merged.replace(/\[data-v-[^\]]+\]/g, '')
			// 4. 增补导出专用基础样式
			return merged + '\n' + this.exportBaseCss()
		},
		exportBaseCss() {
			return `/* Export Base */\nhtml,body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#fff;color:#222;}\nbody.export-body{padding:24px;}\n*{box-sizing:border-box;}\n h1,h2,h3,h4,h5{font-weight:600;margin:0 0 12px;}\n p{line-height:1.55;margin:0 0 12px;}\n table{border-collapse:collapse;width:100%;background:#fff;}\n th,td{border:1px solid #d9d9d9;padding:8px 10px;font-size:12px;vertical-align:middle;}\n th{background:#232f3e;color:#fff;font-weight:600;}\n tr:nth-child(even) td{background:#f8f9fb;}\n .export-stack{display:flex;flex-direction:column;align-items:stretch;gap:28px;max-width:1400px;margin:0 auto;}\n .export-stack > *{display:block !important;width:100% !important;clear:both;}\n .export-stack section,.export-stack .report-section{display:block;width:100%;} \n .export-stack .content-panel,.export-stack .sub-tab-panel{width:100%!important;display:block!important;}\n .export-stack [style*='flex: 1']{flex:initial!important;}\n .section-title{margin:0 0 14px;font-size:20px;color:#232f3e;border-left:6px solid #ff9900;padding-left:10px;}\n .intro-box{background:#f8f9fa;border:1px solid #e2e8f0;padding:14px 18px;border-radius:8px;font-size:13px;}\n .report-section{page-break-inside:avoid;}\n @media print{.export-btn,.close-btn,.actions{display:none!important;} body.export-body{padding:0;} .section-title{page-break-after:avoid;} .export-stack{gap:20px;}}\n`
		},
		// 内容规范化：移除不必要交互 & 补充缺省表格样式（若某些表格无类名）
		normalizeContent(root) {
			// 移除按钮/交互元素（除非在文本中）
			root.querySelectorAll('button, input, textarea, svg[data-interactive]')?.forEach(el => {
				// 若按钮只是纯显示容器可以替换为 span
				const span = document.createElement('span')
				span.textContent = el.textContent?.trim() || ''
				span.className = 'export-static-label'
				el.replaceWith(span)
			})
			// 标准化所有表格
			root.querySelectorAll('table').forEach(tbl => {
				tbl.setAttribute('cellspacing', '0')
				tbl.setAttribute('cellpadding', '0')
				if (!tbl.style.width) tbl.style.width = '100%'
			})
			// 删除空的脚本
			root.querySelectorAll('script').forEach(s => s.remove())
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
