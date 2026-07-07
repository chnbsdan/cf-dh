# CF Navigation - Cloudflare Workers 导航站

基于 Cloudflare Workers 和 KV 存储的智能导航网站。

## 功能特性

- 分类导航管理（增删改查）
- 网站链接管理
- 友链申请与审批
- 管理员认证
- 音乐播放器
- 背景轮播
- 快速搜索

## 部署步骤

### 1. 创建 KV Namespace
在 Cloudflare Dashboard 中创建 KV Namespace：
```bash
wrangler kv:namespace create "NAVIGATION_DATA"


是的，这是完整的目录结构。让我列出所有文件及其说明：

## 完整目录结构

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

## 各文件功能说明

| 文件 | 功能 | 行数（约） |
|------|------|-----------|
| `src/index.js` | Worker 入口，监听 fetch 事件 | 10 |
| `src/handlers/routes.js` | 路由映射，请求分发 | 40 |
| `src/handlers/auth.js` | 登录、会话管理、认证中间件 | 60 |
| `src/handlers/categories.js` | 分类增删 | 60 |
| `src/handlers/sites.js` | 网站增删改 | 120 |
| `src/handlers/links.js` | 友链申请审批 | 180 |
| `src/handlers/ui.js` | 首页和数据接口 | 25 |
| `src/services/kv.js` | KV 读写 | 15 |
| `src/utils/response.js` | JSON 响应工具 | 30 |
| `src/templates/index.js` | 组装 HTML | 20 |
| `src/templates/head.js` | Head 标签 | 10 |
| `src/templates/styles.js` | CSS 样式 | 450 |
| `src/templates/body.js` | Body 结构 | 120 |
| `src/templates/components/header.js` | 头部 HTML | 20 |
| `src/templates/components/sidebar.js` | 侧边栏 HTML | 20 |
| `src/templates/components/footer.js` | 页脚 HTML | 10 |
| `src/templates/components/player.js` | 播放器 HTML | 35 |
| `src/templates/components/modals.js` | 所有模态框 HTML | 260 |
| `src/templates/scripts/main.js` | 主 JS 逻辑 | 450 |
| `src/templates/scripts/player.js` | 播放器 JS | 250 |
| `src/templates/scripts/background.js` | 背景轮播 JS | 15 |
| `wrangler.toml` | CF 配置 | 15 |
| `package.json` | NPM 配置 | 20 |
| `.gitignore` | Git 忽略 | 10 |
| `README.md` | 项目说明 | 50 |

**总计约 2200 行代码**，比原来的 3400+ 行精简了许多，并且模块化清晰，易于维护。


## 目录结构

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


## 文件依赖关系


```
index.js
  └── handlers/routes.js
        ├── handlers/ui.js
        │     ├── services/kv.js
        │     └── templates/index.js
        │           ├── head.js
        │           ├── styles.js
        │           ├── body.js
        │           │     ├── components/header.js
        │           │     ├── components/sidebar.js
        │           │     ├── components/footer.js
        │           │     ├── components/player.js
        │           │     └── components/modals.js
        │           ├── scripts/main.js
        │           ├── scripts/player.js
        │           └── scripts/background.js
        ├── handlers/auth.js
        │     └── utils/response.js
        ├── handlers/categories.js
        │     ├── services/kv.js
        │     └── utils/response.js
        ├── handlers/sites.js
        │     ├── services/kv.js
        │     └── utils/response.js
        └── handlers/links.js
              ├── services/kv.js
              ├── utils/response.js
              └── handlers/auth.js (generateToken)
```
