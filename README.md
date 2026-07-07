# CF-DH 个人智能导航

基于 Cloudflare Workers 和 KV 存储的智能导航网站，支持分类管理、网站管理、友链申请与审批等功能。

## ✨ 功能特性

- 📂 分类导航管理（增删改查）
- 🔗 网站链接管理（增删改查）
- 🤝 友链申请与审批
- 🔐 管理员认证登录
- 🎵 音乐播放器（网易云歌单）
- 🖼️ 背景轮播
- 🔍 快速搜索（多搜索引擎）
- 🎨 毛玻璃 UI 设计

## 📁 项目结构

```
cf-dh/
├── src/
│   ├── index.js              # Worker 入口文件
│   ├── handlers/
│   │   ├── routes.js         # 路由定义
│   │   ├── auth.js           # 认证模块（登录/会话管理）
│   │   ├── categories.js     # 分类管理（添加/删除）
│   │   ├── sites.js          # 网站管理（添加/删除/编辑）
│   │   ├── links.js          # 友链管理（申请/审批/拒绝）
│   │   └── ui.js             # 页面渲染
│   ├── services/
│   │   └── kv.js             # KV 存储操作
│   ├── templates/
│   │   ├── index.js          # HTML 模板主入口
│   │   ├── head.js           # HTML head 部分
│   │   ├── styles.js         # 所有 CSS 样式
│   │   ├── body.js           # body 内容组装
│   │   ├── components/
│   │   │   ├── header.js     # 头部组件
│   │   │   ├── sidebar.js    # 侧边栏组件
│   │   │   ├── footer.js     # 页脚组件
│   │   │   ├── player.js     # 播放器组件
│   │   │   └── modals.js     # 所有模态框
│   │   └── scripts/
│   │       ├── main.js       # 主要业务逻辑
│   │       ├── player.js     # 音乐播放器逻辑
│   │       └── background.js # 背景轮播逻辑
│   └── utils/
│       └── response.js       # 响应工具函数
├── wrangler.toml             # Cloudflare 配置文件
├── package.json              # 项目依赖配置
├── .gitignore                # Git 忽略文件
└── README.md                 # 项目说明
```

## 🚀 快速部署

### 1. 安装依赖

```bash
npm install
```

### 2. 创建 KV Namespace

```bash
npx wrangler kv:namespace create "NAVIGATION_DATA"
```

### 3. 配置环境变量

修改 `wrangler.toml` 文件：

```toml
name = "cf-dh"
main = "src/index.js"
compatibility_date = "2026-07-07"
account_id = "你的Cloudflare账户ID"
workers_dev = true

[vars]
ADMIN_PASSWORD = "你的管理员密码"  # ⚠️ 修改这里

[[kv_namespaces]]
binding = "NAVIGATION_DATA"
id = "你的KV-Namespace-ID"         # ⚠️ 修改这里
```

### 4. 部署

```bash
npx wrangler deploy
```

## 🔧 主要配置修改说明

### 1. 管理员密码修改

| 文件 | 位置 | 说明 |
|------|------|------|
| `wrangler.toml` | `ADMIN_PASSWORD = "你的密码"` | 设置管理员登录密码 |
| `src/handlers/auth.js` | `const ADMIN_PASSWORD = globalThis.ADMIN_PASSWORD \|\| 'bsdan'` | 从环境变量读取密码，默认 `bsdan` |

### 2. KV 存储配置

| 文件 | 位置 | 说明 |
|------|------|------|
| `wrangler.toml` | `[[kv_namespaces]]` 下的 `id` | 填写 KV Namespace ID |
| `src/services/kv.js` | `NAVIGATION_DATA.get('data')` | 读取导航数据 |
| `src/services/kv.js` | `NAVIGATION_DATA.put('data', ...)` | 写入导航数据 |

### 3. 音乐播放器修改

| 文件 | 位置 | 说明 |
|------|------|------|
| `src/templates/scripts/player.js` | `const PLAYLIST_ID = '14148542684'` | 修改网易云歌单 ID |
| `src/templates/components/player.js` | 播放器 HTML 结构 | 修改播放器 UI |

### 4. 背景图片修改

| 文件 | 位置 | 说明 |
|------|------|------|
| `src/templates/body.js` | `<img src="...">` 标签 | 修改背景图片链接 |
| `src/templates/scripts/background.js` | `setInterval(..., 10000)` | 修改轮播间隔时间 |

### 5. 搜索引擎修改

| 文件 | 位置 | 说明 |
|------|------|------|
| `src/templates/components/modals.js` | 搜索模态框中的按钮 | 添加/修改搜索引擎 |

### 6. 网站数据存储

| 文件 | 位置 | 说明 |
|------|------|------|
| `src/services/kv.js` | `getNavigationData()` | 读取所有导航数据 |
| `src/services/kv.js` | `setNavigationData()` | 保存所有导航数据 |

数据格式：
```json
{
  "categories": [
    {
      "name": "分类名称",
      "color": "#6366f1",
      "sites": [
        {
          "name": "网站名称",
          "url": "https://example.com",
          "icon": "mdi:github"
        }
      ]
    }
  ]
}
```

## 🛣️ API 接口

| 方法 | 路径 | 说明 | 需要认证 |
|------|------|------|----------|
| GET | `/` | 首页 | ❌ |
| GET | `/data` | 获取导航数据 | ❌ |
| POST | `/login` | 管理员登录 | ❌ |
| POST | `/add-category` | 添加分类 | ✅ |
| POST | `/add-site` | 添加网站 | ✅ |
| POST | `/delete-category` | 删除分类 | ✅ |
| POST | `/delete-site` | 删除网站 | ✅ |
| POST | `/edit-site` | 编辑网站 | ✅ |
| POST | `/apply-link` | 申请友链 | ❌ |
| GET | `/pending-links` | 获取待审批友链 | ✅ |
| POST | `/approve-link` | 批准友链 | ✅ |
| POST | `/reject-link` | 拒绝友链 | ✅ |

## 🔐 登录使用

1. 点击右下角齿轮图标 🔧
2. 输入管理员密码（`wrangler.toml` 中设置的密码）
3. 登录后显示管理面板：
   - 添加分类
   - 添加网站
   - 审批友链
4. 每个分类和网站卡片上会出现编辑和删除按钮

## 📝 友链申请流程

1. 访客点击右下角「申请友链」按钮 ➕
2. 填写网站信息并提交
3. 管理员登录后点击「审批友链」
4. 选择分类并批准或拒绝

## 🎵 音乐播放器

- 点击左下角音乐胶囊展开播放器
- 右键点击播放器区域可弹出控制菜单
- 支持显示歌词（带打字机效果）
- 歌单 ID 可在 `src/templates/scripts/player.js` 中修改

## 🖼️ 背景轮播

- 自动轮播背景图片
- 轮播间隔 10 秒
- 图片列表在 `src/templates/body.js` 中修改

## 🔍 搜索功能

- 点击顶部 Logo 弹出搜索框
- 支持百度、搜狗、必应、知乎、B站、微博、谷歌、翻译

## 📦 依赖

- [wrangler](https://github.com/cloudflare/workers-sdk) - Cloudflare Workers 部署工具
- [APlayer](https://github.com/DIYgod/APlayer) - 音乐播放器
- [Iconify](https://iconify.design/) - 图标库

## 📄 License

MIT

## 📧 联系方式

如有问题，请发邮件至：sfx@hangdn.com
```

这个 README 包含了：
- 项目结构说明
- 部署步骤
- **所有配置修改位置**（哪个文件改什么）
- API 接口列表
- 使用说明







```

cf-navigation/
├── src/
│   ├── index.js                          # ✅ 入口文件
│   ├── handlers/
│   │   ├── routes.js                     # ✅ 路由定义
│   │   ├── auth.js                       # ✅ 认证模块（登录、会话管理）
│   │   ├── categories.js                 # ✅ 分类管理（添加、删除）
│   │   ├── sites.js                      # ✅ 网站管理（添加、删除、编辑）
│   │   ├── links.js                      # ✅ 友链管理（申请、审批、拒绝）
│   │   └── ui.js                         # ✅ 页面渲染（首页、数据接口）
│   ├── services/
│   │   └── kv.js                         # ✅ KV 存储操作（读写数据）
│   ├── utils/
│   │   └── response.js                   # ✅ 响应工具（JSON响应、404处理）
│   └── templates/
│       ├── index.js                      # ✅ 模板主入口（组装所有部分）
│       ├── head.js                       # ✅ HTML head 部分
│       ├── styles.js                     # ✅ 所有 CSS 样式（完整）
│       ├── body.js                       # ✅ body 内容组装
│       ├── components/
│       │   ├── header.js                 # ✅ 头部组件（logo、标题）
│       │   ├── sidebar.js                # ✅ 侧边栏组件
│       │   ├── footer.js                 # ✅ 页脚组件
│       │   ├── player.js                 # ✅ 播放器组件（胶囊、菜单、歌词）
│       │   └── modals.js                 # ✅ 所有模态框（登录、添加、编辑、搜索等）
│       └── scripts/
│           ├── main.js                   # ✅ 主要业务逻辑（CRUD、认证、渲染）
│           ├── player.js                 # ✅ 音乐播放器逻辑
│           └── background.js             # ✅ 背景轮播逻辑
├── wrangler.toml                         # ✅ Cloudflare 配置
├── package.json                          # ✅ 项目配置
├── .gitignore                            # ✅ Git 忽略文件
└── README.md                             # ✅ 项目说明

```


