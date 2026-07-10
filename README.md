# CF-DH 个人智能导航

> 基于 Cloudflare Workers 和 KV 存储的轻量级个人导航站，支持分类管理、网站管理、友链申请与审批、数据备份恢复、音乐播放器、动态背景切换等功能。

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/chnbsdan/cf-dh)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange)](https://workers.cloudflare.com/)

## 📖 目录

- [在线体验](#-在线体验)
- [功能特性](#-功能特性)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [配置说明](#-配置说明)
- [API 接口](#-api-接口)
- [使用指南](#-使用指南)
- [常见问题](#-常见问题)
- [更新日志](#-更新日志)
- [许可证](#-许可证)
- [联系方式](#-联系方式)

## 🌐 在线体验

- **演示地址**：[https://cf-dh.pages.dev](https://cf-dh.pages.dev)
- **备用地址**：[https://dh.chnbsdan.workers.dev](https://dh.chnbsdan.workers.dev)

## ✨ 功能特性

### 核心功能
- 📂 **分类管理** - 支持分类的增删，自定义分类颜色
- 🔗 **网站管理** - 支持网站的增删改，图标支持 Iconify 和图片链接
- 🤝 **友链系统** - 游客申请 + 管理员审批，完整流程闭环
- 🔐 **权限控制** - 管理员登录认证，Session 有效期 24 小时
- 💾 **数据备份与恢复** - 一键导出 JSON 备份，上传恢复数据

### 用户体验
- 🎨 **毛玻璃 UI** - 现代化毛玻璃设计，背景半透明模糊效果
- 🎵 **音乐播放器** - 集成 APlayer，支持网易云歌单，歌词显示
- 🖼️ **动态背景** - 一键换背景，调用 API 获取随机图片，自动记忆
- 🔍 **多引擎搜索** - 支持百度、谷歌、必应、知乎、B站等 8 个搜索引擎
- 📱 **响应式设计** - 完美适配桌面、平板、手机端
- ⌨️ **快捷键支持** - `/` 快速搜索，`ESC` 关闭弹窗
- 🎯 **卡片链接显示** - 鼠标悬停卡片显示网址，支持右键复制

### 管理功能
- 💾 **数据备份** - 一键导出 JSON 备份文件
- 📥 **数据恢复** - 上传备份文件恢复数据
- 🖼️ **换背景** - 点击时间区域按钮，随机切换背景图片

## 📁 项目结构

```
cf-dh/
├── src/
│   ├── index.js                    # Worker 入口文件
│   ├── handlers/                   # 路由处理器
│   │   ├── routes.js               # 路由定义与分发
│   │   ├── auth.js                 # 认证模块（登录/会话管理）
│   │   ├── categories.js           # 分类管理（添加/删除）
│   │   ├── sites.js                # 网站管理（添加/删除/编辑）
│   │   ├── links.js                # 友链管理（申请/审批/拒绝）
│   │   └── ui.js                   # 页面渲染与数据接口
│   ├── services/                   # 服务层
│   │   └── kv.js                   # KV 存储操作封装
│   ├── templates/                  # 前端模板
│   │   ├── index.js                # HTML 模板主入口
│   │   ├── head.js                 # HTML head 部分
│   │   ├── styles.js               # 全局 CSS 样式
│   │   ├── body.js                 # Body 内容组装
│   │   ├── components/             # UI 组件
│   │   │   ├── header.js           # 头部组件（Logo/标题）
│   │   │   ├── sidebar.js          # 侧边栏组件（分类导航）
│   │   │   ├── footer.js           # 页脚组件（版权/链接）
│   │   │   ├── player.js           # 播放器组件（胶囊/歌词/右键菜单）
│   │   │   └── modals.js           # 模态框组件（登录/添加/编辑/搜索等）
│   │   └── scripts/                # JavaScript 逻辑
│   │       ├── main.js             # 主要业务逻辑（CRUD/认证/渲染/换背景）
│   │       └── player.js           # 音乐播放器逻辑（歌词/右键菜单）
│   └── utils/                      # 工具函数
│       └── response.js             # 响应工具（JSON/404）
├── wrangler.toml                   # Cloudflare Workers 配置
├── package.json                    # 项目依赖与脚本
├── .gitignore                      # Git 忽略文件
└── README.md                       # 项目文档
```

## 🚀 快速开始

### 前置要求

- [Node.js](https://nodejs.org/) (v18 或更高)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- Cloudflare 账户
- Cloudflare KV Namespace

### 安装步骤

#### 1. 克隆项目

```bash
git clone https://github.com/chnbsdan/cf-dh.git
cd cf-dh
```

#### 2. 安装依赖

```bash
npm install
```

#### 3. 创建 KV Namespace

```bash
npx wrangler kv:namespace create "NAVIGATION_DATA"
```

#### 4. 配置环境变量

编辑 `wrangler.toml`：

```toml
name = "cf-dh"
main = "src/index.js"
compatibility_date = "2026-07-07"
account_id = "你的Cloudflare账户ID"
workers_dev = true

[vars]
ADMIN_PASSWORD = "你的管理员密码"

[[kv_namespaces]]
binding = "NAVIGATION_DATA"
id = "你的KV-Namespace-ID"
```

#### 5. 本地测试

```bash
npx wrangler dev
```

访问 `http://localhost:8787` 预览效果。

#### 6. 部署到 Cloudflare

```bash
npx wrangler deploy
```

## 🔧 配置说明

### 管理员密码

| 配置文件 | 字段 | 说明 |
|----------|------|------|
| `wrangler.toml` | `ADMIN_PASSWORD` | 生产环境密码 |
| `src/handlers/auth.js` | `ADMIN_PASSWORD` | 默认密码（环境变量未设置时使用） |

### KV 存储

| 操作 | 文件 | 方法 |
|------|------|------|
| 读取数据 | `src/services/kv.js` | `getNavigationData()` |
| 写入数据 | `src/services/kv.js` | `setNavigationData(data)` |

### 数据格式

```json
{
  "categories": [
    {
      "name": "常用工具",
      "color": "#6366f1",
      "sites": [
        {
          "name": "GitHub",
          "url": "https://github.com",
          "icon": "mdi:github"
        }
      ]
    }
  ]
}
```

### 音乐播放器

| 文件 | 字段 | 说明 |
|------|------|------|
| `src/templates/scripts/player.js` | `PLAYLIST_ID` | 网易云歌单 ID |

### 动态背景

| 文件 | 字段 | 说明 |
|------|------|------|
| `src/templates/scripts/main.js` | `https://pico.1356666.xyz/api/tg` | 换背景 API 接口 |
| `src/templates/body.js` | 默认背景图 | 首次加载显示的背景 |

### 搜索引擎

| 文件 | 位置 | 说明 |
|------|------|------|
| `src/templates/components/modals.js` | `search-engines-grid` | 搜索模态框里的搜索引擎按钮 |

## 🛣️ API 接口

### 公开接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/` | 首页 |
| GET | `/data` | 获取导航数据 |
| POST | `/login` | 管理员登录 |
| POST | `/apply-link` | 游客申请友链 |

### 认证接口（需登录）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/add-category` | 添加分类 |
| POST | `/add-site` | 添加网站 |
| POST | `/delete-category` | 删除分类 |
| POST | `/delete-site` | 删除网站 |
| POST | `/edit-site` | 编辑网站 |
| GET | `/pending-links` | 获取待审批友链 |
| POST | `/approve-link` | 批准友链 |
| POST | `/reject-link` | 拒绝友链 |
| GET | `/backup` | 下载数据备份 |
| POST | `/restore` | 恢复数据 |

## 📝 使用指南

### 管理员登录

1. 点击右下角齿轮图标 🔧
2. 输入管理员密码
3. 登录成功后显示管理面板

### 添加分类

1. 登录管理员
2. 点击「添加分类」按钮
3. 输入分类名称，选择颜色
4. 点击「添加分类」

### 添加网站

1. 登录管理员
2. 点击「添加网站」按钮
3. 选择分类，填写网站信息
4. 点击「添加网站」

### 编辑/删除网站

- 鼠标悬停网站卡片
- 右上角出现编辑 ✏️ 和删除 🗑️ 按钮
- 点击相应按钮进行操作

### 友链申请

1. 访客点击右下角「申请友链」按钮
2. 填写网站信息并提交
3. 管理员登录后点击「审批友链」
4. 选择分类，批准或拒绝

### 数据备份与恢复

1. 登录管理员
2. 点击「备份数据」下载 JSON 文件
3. 点击「恢复数据」上传备份文件
4. 确认覆盖当前数据

### 动态背景切换

1. 点击右上角时间区域右下角的圆形按钮 🖼️
2. 自动调用 API 获取随机背景图
3. 更换后自动记忆，刷新页面保留

### 搜索功能

- **快捷键**：按 `/` 或 `Ctrl+K` 快速打开搜索
- **搜索引擎**：支持百度、搜狗、必应、知乎、B站、微博、谷歌、翻译
- **关闭**：按 `ESC` 关闭搜索弹窗

### 音乐播放器

- 点击左下角音乐胶囊展开播放器
- 右键点击播放器区域弹出控制菜单
- 支持显示歌词（可拖动调整窗口大小）
- 支持修改歌词颜色

## ❓ 常见问题

### Q: 登录后看不到管理按钮？

A: 检查 `wrangler.toml` 中的 `ADMIN_PASSWORD` 是否正确，重新部署后再试。

### Q: 数据备份/恢复失败？

A: 确保已登录管理员，Token 有效期为 24 小时，过期需重新登录。

### Q: 音乐播放器无法播放？

A: 检查歌单 ID 是否正确，或更换 API 代理地址。

### Q: 部署后卡片内容不显示？

A: 检查 KV Namespace ID 是否正确绑定，确保 KV 中有数据。

### Q: 换背景没反应？

A: 检查 API 接口是否可访问，F12 控制台查看报错信息。

## 📦 依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| [wrangler](https://github.com/cloudflare/workers-sdk) | ^3.0.0 | Cloudflare Workers 部署 |
| [APlayer](https://github.com/DIYgod/APlayer) | v1.10.1 | 音乐播放器 |
| [Iconify](https://iconify.design/) | v2.0.3 | 图标库 |



## 用户可修改内容清单

| # | 修改内容 | 文件路径 | 代码位置 | 说明 |
|---|---------|---------|---------|------|
| 1 | 管理员密码 | `wrangler.toml` | `ADMIN_PASSWORD = "你的密码"` | 登录密码 |
| 2 | 管理员密码(备用) | `src/handlers/auth.js` | `const ADMIN_PASSWORD = globalThis.ADMIN_PASSWORD \|\| 'bsdan'` | 环境变量未设置时使用 |
| 3 | 浏览器标题 | `src/templates/head.js` | `<title>Hangdn个人智能导航</title>` | 标签页标题 |
| 4 | Logo图标 | `src/templates/components/header.js` | `<img src="https://cdn.jsdelivr.net/gh/chnbsdan/.../hangdn.ico">` | 左上角图标 |
| 5 | 默认背景图 | `src/templates/body.js`，src/templates/styles.js | `<img src="https://webp.hangdn.com/fg/fg1.jpg" class="background-slide active" alt="默认背景">` ，body {
  background-image: url('https://webp.hangdn.com/fg/fg1.jpg');| 首次加载显示 |
| 6 | 换背景API | `src/templates/scripts/main.js` | `const url = 'https://pico.1356666.xyz/api/tg?t=' + Date.now();` | 随机图片接口 |
| 7 | 背景轮播间隔 | `src/templates/scripts/background.js` | `setInterval(..., 10000)` | 10秒切换(已删除) |
| 8 | 歌单ID | `src/templates/scripts/player.js` | `const PLAYLIST_ID = '14148542684'` | 网易云歌单 |
| 9 | 技术支持链接 | `src/templates/scripts/player.js` | `window.open('https://1356666.xyz','_blank')` | 右键菜单支持链接 |
| 10 | 页脚版权年份 | `src/templates/components/footer.js` | `Copyright ©2024-2025` | 版权信息 |
| 11 | 页脚Cloudflare链接 | `src/templates/components/footer.js` | `<a href="https://www.cloudflare.com/"` | Cloudflare官网链接 |
| 12 | 页脚GitHub链接 | `src/templates/components/footer.js` | `<a href="https://github.com/chnbsdan/cf-dh"` | 项目源码链接 |
| 13 | 联系邮箱 | `src/templates/components/modals.js` | `chnbsdan@gmail.com` | 关于本站邮箱 |
| 14 | 留言板链接 | `src/templates/components/modals.js` | `https://aoso.hangdn.com/guestbook` | 关于本站留言板 |
| 15 | 搜索引擎列表 | `src/templates/components/modals.js` | `search-engines-grid` 中的按钮 | 搜索模态框搜索引擎 |
| 16 | 关于本站内容 | `src/templates/components/modals.js` | `aboutModal` 中的所有文字 | 弹窗内容 |
| 17 | 网站数据 | `src/services/kv.js` | KV存储 `data` 键 | 通过后台管理 |


## 详细代码位置

### 1. 管理员密码

**文件：`wrangler.toml`**
```toml
[vars]
ADMIN_PASSWORD = "admin123"  # ← 改这里
```

**文件：`src/handlers/auth.js`**
```javascript
const ADMIN_PASSWORD = globalThis.ADMIN_PASSWORD || 'bsdan';  // ← 改这里(备用)
```

---

### 2. 浏览器标题

**文件：`src/templates/head.js`**
```html
<title>Hangdn个人智能导航</title>  <!-- ← 改这里 -->
```

---

### 3. Logo图标

**文件：`src/templates/components/header.js`**
```html
<img src="https://cdn.jsdelivr.net/gh/chnbsdan/cloudflare-workers-blog@master/themes/mya/files/hangdn.ico" 
     alt="导航图标" 
     class="logo-icon">
<!-- ↑ 改 src 链接 -->
```

---

### 4. 默认背景图

**文件：`src/templates/body.js`**
```html
<div class="background-container" id="bgContainer">
  <img src="https://webp.hangdn.com/fg/fg1.jpg" class="background-slide active" alt="默认背景">
  <!-- ↑ 改 src 链接 -->
</div>
```

---

### 5. 换背景API接口

**文件：`src/templates/scripts/main.js`**
```javascript
function changeBackground() {
  // ...
  const url = 'https://pico.1356666.xyz/api/tg?t=' + Date.now();
  // ↑ 改 API 地址
  // ...
}
```

---

### 6. 歌单ID

**文件：`src/templates/scripts/player.js`**
```javascript
const PLAYLIST_ID = '14148542684';  // ← 改歌单ID
```

---

### 7. 技术支持链接

**文件：`src/templates/scripts/player.js`**
```javascript
document.getElementById('menu-support').addEventListener('click', () => { 
  window.open('https://1356666.xyz','_blank');  // ← 改链接
  hideRightMenuImmediate(); 
});
```

---

### 8. 页脚信息

**文件：`src/templates/components/footer.js`**
```html
<p>
  Copyright ©2024-2025 <span class="footer-link" onclick="openAboutModal()">Hangdn nav</span>. All Rights Reserved.
  <!-- ↑ 改年份和文字 -->
</p>
<p style="font-size:0.8rem; margin-top:4px; opacity:0.6;">
  Powered by 
  <a href="https://www.cloudflare.com/" target="_blank" style="color:#f48120; font-weight:600; text-decoration:none;">Cloudflare</a>
  <!-- ↑ 改 Cloudflare 链接 -->
  &nbsp;·&nbsp;
  <a href="https://github.com/chnbsdan/cf-dh" target="_blank">GitHub</a>
  <!-- ↑ 改 GitHub 链接 -->
</p>
```

---

### 9. 联系邮箱和留言板

**文件：`src/templates/components/modals.js`**
```html
<!-- 联系邮箱 -->
<p style="background: rgba(239,68,68,0.06); padding: 0.8rem 1rem; border-radius: 8px; border-left: 4px solid #ef4444; color:#1e293b; font-weight:500;">
  chnbsdan@gmail.com  <!-- ← 改邮箱 -->
</p>

<!-- 留言板 -->
<p style="margin-top: 0.5rem; color: #475569; font-weight:400;">
  或留言：<a href="https://aoso.hangdn.com/guestbook" target="_blank" style="color: #6366f1; text-decoration: none; border-bottom: 1px dashed #6366f1; font-weight:500;">
    https://aoso.hangdn.com/guestbook  <!-- ← 改留言板链接 -->
  </a>
</p>
```

---

### 10. 搜索引擎列表

**文件：`src/templates/components/modals.js`**
```html
<div class="search-engines-grid">
  <button class="search-engine-btn" onclick="performSearch('https://www.baidu.com/s?word=')">
    <span class="iconify" data-icon="simple-icons:baidu"></span>
    <span>百度</span>
  </button>
  <!-- ↑ 增删改搜索引擎按钮 -->
</div>
```

---

### 11. 关于本站内容

**文件：`src/templates/components/modals.js`**
```html
<!-- 关于本站模态框内所有文字都可以改 -->
<div id="aboutModal" class="modal">
  <div class="modal-content modal-content-wide">
    <!-- 所有 <p> <h4> 文字内容 -->
  </div>
</div>
```

---

### 12. 网站数据(KV)

**文件：`src/services/kv.js`**
```javascript
export async function getNavigationData() {
  const data = await NAVIGATION_DATA.get('data');  // KV key 名
  return data ? JSON.parse(data) : { categories: [] };
}

export async function setNavigationData(data) {
  await NAVIGATION_DATA.put('data', JSON.stringify(data));  // KV key 名
}
```

---

## 快速定位表

| 修改内容 | 搜索关键词 |
|---------|-----------|
| 密码 | `ADMIN_PASSWORD` |
| 标题 | `<title>` |
| Logo | `logo-icon` |
| 默认背景 | `bgContainer` |
| 换背景API | `API用户自已的或必映` |
| 歌单ID | `PLAYLIST_ID` |
| 技术支持 | `menu-support` |
| 页脚 | `Powered by` |
| 邮箱 | `gmail.com` |
| 留言板 | `guestbook` |
| 搜索引擎 | `search-engines-grid` |



## 🔄 更新日志

### v1.1.0 (2026-07-08)

- ✅ 新增动态背景切换功能（API 随机换背景）
- ✅ 优化歌词窗口（更紧凑，减少干扰）
- ✅ 优化右键菜单（毛玻璃风格，紧凑布局）
- ✅ 优化卡片链接显示（鼠标悬停显示网址）
- ✅ 移除背景轮播（改用 API 换背景）

### v1.0.0 (2026-07-07)

- ✅ 初始版本发布
- ✅ 分类/网站 CRUD 功能
- ✅ 友链申请与审批系统
- ✅ 管理员认证与权限控制
- ✅ 数据备份与恢复
- ✅ 音乐播放器与歌词显示
- ✅ 背景轮播
- ✅ 多引擎搜索
- ✅ 响应式设计

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 📧 联系方式

- **邮箱**：chnbsdan@gmail.com
- **留言板**：[https://aoso.hangdn.com/guestbook](https://aoso.hangdn.com/guestbook)
- **GitHub**：[https://github.com/chnbsdan/cf-dh](https://github.com/chnbsdan/cf-dh)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/chnbsdan">chnbsdan</a>
</p>
