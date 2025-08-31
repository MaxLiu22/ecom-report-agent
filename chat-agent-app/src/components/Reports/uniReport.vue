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

				<!-- 3. 合规政策 (Tab7) -->
				<section class="report-section" id="section-compliance">
					<h3 class="section-title">3. 🛡️ 合规政策</h3>
					<div class="section-content">
						<Tab7 />
					</div>
				</section>

				<!-- 4. 行动计划 -->
				<section class="report-section" id="section-action">
					<h3 class="section-title">4. 📅 行动计划</h3>
					<div class="section-content">
						<Tab8 :actionResult="actionResult" />
					</div>
				</section>

				<!-- 5. AM 指导话术 (简化版 Tab9 内容) -->
				<section class="report-section" id="section-am" v-if="showPitch">
					<h3 class="section-title">5. 💬 AM 指导话术（参考）</h3>
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
import Tab7 from './Tab7.vue'
import Tab8 from './Tab8.vue'
import Tab9 from './Tab9.vue'

export default {
	name: 'UniReport',
	components: { Tab5, Tab61, Tab62, Tab63, Tab7, Tab8, Tab9 },
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
						const helperHtml = `<!DOCTYPE html><html lang='zh'><head><meta charset='utf-8'><title>发送邮件指引 - IntraEU 统一报告</title><meta name='viewport' content='width=device-width,initial-scale=1'/><style>
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:linear-gradient(135deg,#f5f7fa,#eef2f7);color:#1f2933;line-height:1.55;padding:40px 18px;}h1,h2,h3{margin:0 0 18px;font-weight:600;letter-spacing:.5px;}h2{font-size:22px;display:flex;align-items:center;gap:8px;color:#232f3e;}ol{margin:0 0 22px 22px;padding:0;counter-reset:step;}ol li{margin:0 0 10px;position:relative;padding-left:4px;}ol li strong{color:#ff7a00;}a{text-decoration:none;color:#0066c2;}a:hover{text-decoration:underline;}code{background:#272e35;color:#fff;padding:2px 6px;border-radius:4px;font-size:12px;}textarea{width:100%;min-height:200px;resize:vertical;padding:12px 14px;font:13px/1.5 monospace;border:1px solid #d0d7de;border-radius:8px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.04);}textarea:focus{outline:2px solid #ff9900;border-color:#ff9900;} .card{max-width:880px;margin:0 auto;background:#ffffff;border:1px solid #e3e8ee;border-radius:18px;padding:40px 46px 48px;box-shadow:0 12px 28px -6px rgba(0,0,0,.12),0 4px 10px -2px rgba(0,0,0,.06);} .badge{display:inline-block;background:#ff9900;color:#232f3e;font-size:12px;padding:2px 10px;border-radius:20px;font-weight:600;letter-spacing:.5px;margin-left:6px;} .steps-head{margin-top:-4px;margin-bottom:4px;font-size:15px;color:#394b59;font-weight:500;} .btn-row{display:flex;flex-wrap:wrap;gap:12px;margin:6px 0 24px;} .btn{appearance:none;border:none;cursor:pointer;font-weight:600;letter-spacing:.5px;font-size:13px;padding:10px 18px;border-radius:10px;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 4px rgba(0,0,0,.15);transition:.25s;background:#edf1f5;color:#1f2933;} .btn-primary{background:#ff9900;color:#232f3e;} .btn-primary:hover{background:#ffad33;} .btn-secondary:hover{background:#e2e8ee;} .btn:active{transform:translateY(1px);} .hint{background:#fff8eb;border:1px solid #ffe0b2;padding:12px 14px;border-radius:10px;font-size:12px;margin-top:4px;color:#5c3b00;} footer{margin-top:40px;font-size:11px;color:#6b7280;text-align:center;} .status{font-size:12px;margin-left:8px;color:#16a34a;font-weight:600;display:none;} .divider{height:1px;background:linear-gradient(90deg,rgba(0,0,0,.08),rgba(0,0,0,.02));margin:30px 0;} .file-badge{background:#232f3e;color:#fff;font-size:11px;border-radius:6px;padding:2px 8px;margin-left:6px;} @media (max-width:680px){.card{padding:28px 22px 34px;border-radius:14px;} .btn-row{flex-direction:column;align-items:stretch;} textarea{min-height:160px;} }
</style></head><body><main class='card'>
<h2>📨 发送 IntraEU 报告 <span class='badge'>辅助向导</span></h2>
<p class='steps-head'>若浏览器暂不支持直接分享附件，可按以下步骤通过 Outlook / 邮件客户端发送：</p>
<ol>
	<li>系统已生成报告文件：<strong>${fileName}</strong> <span class='file-badge'>HTML</span></li>
	<li>点击下方 <code>下载文件</code> 获取本地文件。</li>
	<li>在 Outlook / 邮件客户端中新建邮件，<em>拖拽</em> 该文件或使用“添加附件”。</li>
	<li>复制推荐正文并根据需要调整后发送。</li>
</ol>
<div class='btn-row'>
	<button id='dl' class='btn btn-primary'>⬇ 下载文件</button>
	<button id='copy' class='btn btn-secondary'>📋 复制正文</button>
	<button id='openMail' class='btn btn-secondary'>✉ 打开邮件客户端</button>
	<span class='status' id='statusOk'>已复制</span>
</div>
<label style='font-size:13px;font-weight:600;color:#232f3e;display:block;margin:0 0 8px;'>推荐邮件正文：</label>
					<textarea id='body'>您好，\n\n附件为最新生成的 IntraEU 卖家统一分析报告（HTML 版本），包含：\n1. 欧洲站点拓展评估\n2. PanEU / DI 物流对比与分析\n3. CEE 成本节约测算\n4. 合规政策\n5. 行动计划\n6. AM 指导话术（如适用）\n\n请下载后用浏览器打开查看。\n\n祝好\n</textarea>
<div class='hint'>提示：若 mailto 打开后正文未完整显示，请在邮件窗口中手动粘贴上面已复制的正文。</div>
<div class='divider'></div>
<footer>IntraEU Unified Report Helper • 本页面仅本地生成，数据不会上传服务器</footer>
<script>
	const decodeB64ToBlob=(b64,contentType)=>{const byteChars=atob(b64);const len=byteChars.length;const bytes=new Uint8Array(len);for(let i=0;i<len;i++){bytes[i]=byteChars.charCodeAt(i);}return new Blob([bytes],{type:contentType||'text/html'});} ;
	const fileName='${fileName}';
	const base64='${base64}';
	const dlBtn=document.getElementById('dl');
	const copyBtn=document.getElementById('copy');
	const openMailBtn=document.getElementById('openMail');
	const statusOk=document.getElementById('statusOk');
	const ta=document.getElementById('body');
	dlBtn.onclick=()=>{const blob=decodeB64ToBlob(base64,'text/html');const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fileName;a.click();};
	copyBtn.onclick=()=>{ta.select();document.execCommand('copy');statusOk.style.display='inline';setTimeout(()=>statusOk.style.display='none',1800);} ;
	openMailBtn.onclick=()=>{const subject=encodeURIComponent('IntraEU统一报告');const body=encodeURIComponent(ta.value+'\n\n(请记得添加附件: '+fileName+')');window.location.href='mailto:?subject='+subject+'&body='+body};
<\/script></main></body></html>`
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
