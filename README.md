# Chat Agent (Vue3)
纯前端本地聊天+报告预览，无后端，数据存 IndexedDB。
特性：聊天历史、CSV/PDF/HTML 报告、文件下载、单用户偏好。
技术：Vue3 + Vite + Pinia + Router + jsPDF + PapaParse + FileSaver。
运行：
```bash
cd chat-agent-app && pnpm install && pnpm dev
```
构建：`pnpm build` 产出 dist/ 可静态部署。
更多：详见 `ARCHITECTURE.md`。
