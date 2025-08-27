# 聊天Agent应用架构设计

## 项目概述

一个基于Vue3 + JavaScript的前端聊天agent应用，支持用户对话和报告预览功能（CSV、PDF、网页格式）。纯前端实现，无需后端服务器，数据存储在浏览器本地IndexedDB中。每个浏览器实例对应一个用户，无需登录注册。

## 技术栈

### 前端
- **Vue 3** - 渐进式JavaScript框架
- **Vite** - 快速构建工具
- **Vue Router** - 路由管理
- **Pinia** - 状态管理
- **原生CSS** - 样式设计
- **jsPDF** - PDF生成
- **Papa Parse** - CSV处理
- **FileSaver.js** - 文件下载

### 本地存储
- **IndexedDB** - 浏览器数据库
- **File API** - 文件处理

### 开发工具
- **ESLint** - 代码规范
- **Prettier** - 代码格式化
- **nodemon** - 开发服务器热重载

## 项目结构

```
chat-agent-app/
├── public/                 # 静态资源
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
├── src/                    # 前端源码
│   ├── components/         # Vue组件
│   │   ├── Chat/
│   │   │   ├── ChatWindow.vue
│   │   │   ├── MessageList.vue
│   │   │   ├── MessageItem.vue
│   │   │   ├── InputArea.vue
│   │   │   └── TypingIndicator.vue
│   │   ├── Reports/
│   │   │   ├── ReportViewer.vue
│   │   │   ├── CsvViewer.vue
│   │   │   ├── PdfViewer.vue
│   │   │   └── HtmlViewer.vue
│   │   ├── Common/
│   │   │   ├── Header.vue
│   │   │   ├── Sidebar.vue
│   │   │   ├── Loading.vue
│   │   │   └── ErrorBoundary.vue
│   │   └── Settings/
│   │       └── UserSettings.vue
│   ├── views/              # 页面视图
│   │   ├── Home.vue
│   │   ├── Chat.vue
│   │   ├── Reports.vue
│   │   └── Profile.vue
│   ├── models/             # 数据模型定义
│   │   ├── User.js
│   │   ├── Message.js
│   │   ├── Report.js
│   │   └── Session.js
│   ├── stores/             # Pinia状态管理
│   │   ├── chat.js
│   │   ├── reports.js
│   │   ├── user.js
│   │   └── settings.js
│   ├── services/           # 本地服务
│   │   ├── chatService.js
│   │   ├── reportService.js
│   │   └── fileService.js

│   ├── router/             # 路由配置
│   │   └── index.js
│   ├── assets/             # 资源文件
│   │   ├── css/
│   │   ├── images/
│   │   └── icons/
│   ├── App.vue
│   └── main.js
├── storage/                # 本地存储管理
│   ├── indexedDB.js        # IndexedDB封装
│   └── fileStorage.js      # 文件存储管理
├── package.json
├── vite.config.js
├── .env
├── .gitignore
└── README.md
```

## 核心功能模块

### 1. 用户设置模块
- 本地用户偏好设置
- 界面主题配置
- 数据导出/导入

### 2. 聊天模块
- 本地消息存储
- 消息历史记录
- 消息搜索
- 文件处理
- 对话管理

### 3. 报告生成模块
- CSV报告生成和预览
- PDF报告生成和下载
- HTML报告生成和在线查看
- 报告模板管理
- 报告历史记录

### 4. 文件管理模块
- 文件上传/下载
- 文件格式验证
- 文件存储管理
- 文件预览

## 内存数据模型设计

### User模型
```javascript
{
  id: string,                    // 固定为 'current_user'
  username: string,              // 用户昵称
  avatar_url: string,            // 头像URL
  theme: 'light' | 'dark',       // 主题设置
  language: string,              // 语言设置
  created_at: Date,              // 创建时间
  last_active: Date,             // 最后活跃时间
  preferences: {                 // 用户偏好
    auto_save: boolean,
    notifications: boolean,
    sound_enabled: boolean
  }
}
```

### Message模型
```javascript
{
  id: string,
  sender_id: string,
  receiver_id: string,
  content: string,
  message_type: 'text' | 'file' | 'report',
  file_url: string,
  is_read: boolean,
  created_at: Date
}
```

### Report模型
```javascript
{
  id: string,
  user_id: string,
  title: string,
  description: string,
  report_type: 'csv' | 'pdf' | 'html',
  file_path: string,
  file_size: number,
  status: 'pending' | 'completed' | 'failed',
  created_at: Date
}
```

### Session模型
```javascript
{
  id: string,                    // 会话ID
  user_id: string,              // 固定为 'current_user'
  session_data: {               // 会话数据
    current_conversation_id: string,
    last_message_id: string,
    unread_count: number
  },
  created_at: Date,             // 创建时间
  updated_at: Date              // 更新时间
}
```

## 模型层级分析

这些数据模型(User, Message, Report, Session)属于领域模型，应该放置在以下位置：

### 1. 模型定义层 - `src/models/`
创建专门的模型目录存放数据模型定义：
```
src/
├── models/
│   ├── User.js          # User模型定义（单用户）
│   ├── Message.js       # Message模型定义
│   ├── Report.js        # Report模型定义
│   └── Session.js       # Session模型定义（本地会话）
```

### 2. 状态管理层 - `src/stores/`
在stores中使用 - 状态管理中使用这些模型：
```
src/
├── stores/
│   ├── userStore.js     # 使用User模型进行状态管理（单用户）
│   ├── messageStore.js  # 使用Message模型进行状态管理
│   ├── reportStore.js   # 使用Report模型进行状态管理
│   └── sessionStore.js  # 使用Session模型进行状态管理（本地会话）
```

### 3. 服务层 - `src/services/`
在services中使用 - IndexedDB服务层使用这些模型进行数据交互：
```
src/
├── services/
│   ├── userService.js     # IndexedDB服务层使用User模型进行数据交互
│   ├── messageService.js  # IndexedDB服务层使用Message模型进行数据交互
│   ├── reportService.js   # IndexedDB服务层使用Report模型进行数据交互
│   └── sessionService.js  # IndexedDB服务层使用Session模型进行数据交互
```

### 架构层次说明
- **模型层 (Models)** - 定义数据结构、提供数据验证、包含业务逻辑
- **状态管理层 (Stores)** - 使用模型进行状态管理、处理数据流、管理应用状态
- **服务层 (Services)** - IndexedDB服务层使用模型、处理本地数据交互、管理浏览器存储

这种分层架构确保了关注点分离、可维护性、可重用性和类型安全。由于是单用户应用，所有数据都存储在本地IndexedDB中，无需后端服务器。

## IndexedDB存储设计

### 数据库结构
- **数据库名称**: `chat_agent_db`
- **版本**: 1.0
- **用户ID**: 固定为 `'current_user'`

### 对象存储(Object Stores)

#### 1. users
```javascript
{
  id: 'current_user',
  username: string,
  avatar_url: string,            // 前期固定为默认头像URL
  theme: 'light' | 'dark',       // 前期固定为 'light'
  language: string,              // 前期固定为 'zh-CN'
  created_at: Date,
  last_active: Date,
  preferences: {
    auto_save: boolean,
    notifications: boolean,
    sound_enabled: boolean
  }
}
```

#### 2. conversations
```javascript
{
  id: string,
  title: string,
  created_at: Date,
  updated_at: Date,
  message_count: number,
  last_message: string
}
```

#### 3. messages
```javascript
{
  id: string,
  conversation_id: string,
  content: string,
  message_type: 'text' | 'file' | 'report',
  file_url: string,
  created_at: Date,
  is_read: boolean
}
```

#### 4. reports
```javascript
{
  id: string,
  title: string,
  description: string,
  report_type: 'csv' | 'pdf' | 'html',
  file_path: string,
  file_size: number,
  status: 'pending' | 'completed' | 'failed',
  created_at: Date
}
```

#### 5. sessions
```javascript
{
  id: string,
  user_id: 'current_user',
  session_data: {
    current_conversation_id: string,
    last_message_id: string,
    unread_count: number
  },
  created_at: Date,
  updated_at: Date
}
```

### 索引设计
- **users**: 主键 `id`
- **conversations**: 主键 `id`, 索引 `created_at`
- **messages**: 主键 `id`, 索引 `conversation_id`, 索引 `created_at`
- **reports**: 主键 `id`, 索引 `report_type`, 索引 `created_at`
- **sessions**: 主键 `id`, 索引 `user_id`

### 数据操作
- **CRUD操作**: 通过IndexedDB API进行增删改查
- **事务管理**: 确保数据一致性
- **错误处理**: 完善的错误处理机制
- **数据迁移**: 支持数据库版本升级

## 本地事件管理

### 应用事件
- `app:init` - 应用初始化
- `app:ready` - 应用就绪
- `app:error` - 错误处理

### 数据事件
- `data:save` - 数据保存
- `data:load` - 数据加载
- `data:clear` - 数据清理

## 安全考虑

### 本地安全
- 数据加密存储
- 隐私保护
- 数据备份
- 清理机制

### 数据安全
- XSS攻击防护
- 文件类型验证
- 数据验证
- 错误处理

### 性能优化
- 消息分页加载
- 图片懒加载
- 文件压缩
- 缓存策略

## 部署方案

### 开发环境
- 前端：Vite开发服务器 (端口3000)
- 本地存储：浏览器IndexedDB

### 生产环境
- 前端：静态文件部署
- 本地存储：浏览器IndexedDB
- 文件存储：浏览器File API

## 开发计划

### 第一阶段：基础架构
1. 项目初始化和配置
2. 本地存储设计
3. 用户管理界面
4. 基础UI组件

### 第二阶段：聊天功能
1. 本地消息存储
2. 聊天界面
3. 消息历史
4. 对话管理

### 第三阶段：报告功能
1. 报告生成逻辑
2. 文件格式支持
3. 报告预览
4. 下载功能

### 第四阶段：优化和测试
1. 性能优化
2. 错误处理
3. 单元测试
4. 集成测试

## 技术难点和解决方案

### 1. 本地存储
- 使用IndexedDB存储数据
- 数据同步机制
- 存储空间管理

### 2. 文件处理
- 流式文件上传
- 大文件分片处理
- 文件格式转换

### 3. 报告生成
- 异步任务处理
- 模板引擎
- 文件格式兼容

### 4. 性能优化
- 虚拟滚动
- 图片懒加载
- 数据缓存

这个架构设计考虑了小型应用的特点，使用轻量级技术栈，同时保证了功能的完整性和可扩展性。
