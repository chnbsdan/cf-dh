export function getModals() {
  return `
<!-- 登录模态框 -->
<div id="loginModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">管理员登录</h3>
      <button class="close-btn" onclick="closeLoginModal()">&times;</button>
    </div>
    <form id="loginForm">
      <div class="form-group">
        <label class="form-label">密码</label>
        <input type="password" class="form-input" id="password" placeholder="请输入管理员密码" required>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">
        <span class="iconify" data-icon="mdi:login"></span> 登录
      </button>
    </form>
  </div>
</div>

<!-- 添加分类模态框 -->
<div id="addCategoryModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">添加分类</h3>
      <button class="close-btn" onclick="closeAddCategoryModal()">&times;</button>
    </div>
    <form id="addCategoryForm">
      <div class="form-group">
        <label class="form-label">分类名称</label>
        <input type="text" class="form-input" name="name" placeholder="请输入分类名称" required>
      </div>
      <div class="form-group">
        <label class="form-label">主题颜色</label>
        <input type="color" class="form-input" name="color" value="#6366f1" style="height: 50px;">
      </div>
      <button type="submit" class="btn btn-success" style="width: 100%;">
        <span class="iconify" data-icon="mdi:check"></span> 添加分类
      </button>
    </form>
  </div>
</div>

<!-- 添加网站模态框 -->
<div id="addSiteModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">添加网站</h3>
      <button class="close-btn" onclick="closeAddSiteModal()">&times;</button>
    </div>
    <form id="addSiteForm">
      <div class="form-group">
        <label class="form-label">选择分类</label>
        <select class="form-input form-select" name="categoryIndex" required></select>
      </div>
      <div class="form-group">
        <label class="form-label">网站名称</label>
        <input type="text" class="form-input" name="siteName" placeholder="请输入网站名称" required>
      </div>
      <div class="form-group">
        <label class="form-label">网站链接</label>
        <input type="url" class="form-input" name="siteUrl" placeholder="https://example.com" required>
      </div>
      <div class="form-group">
        <label class="form-label">图标代码</label>
        <input type="text" class="form-input" name="siteIcon" placeholder="例如: mdi:github 或 https://example.com/icon.ico" required>
        <small style="color: var(--text-secondary); margin-top: 0.5rem; display: block;">
          支持 Iconify 图标代码或外部图标链接。
          <a href="https://icon-sets.iconify.design/" target="_blank" style="color: #6366f1; text-decoration: none;">
            点击这里查看所有可用的Iconify图标
          </a>
        </small>
      </div>
      <button type="submit" class="btn btn-success" style="width: 100%;">
        <span class="iconify" data-icon="mdi:check"></span> 添加网站
      </button>
    </form>
  </div>
</div>

<!-- 编辑网站模态框 -->
<div id="editSiteModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">编辑网站</h3>
      <button class="close-btn" onclick="closeEditSiteModal()">&times;</button>
    </div>
    <form id="editSiteForm">
      <input type="hidden" name="currentCategoryIndex" id="currentCategoryIndex">
      <input type="hidden" name="siteIndex" id="siteIndex">
      <div class="form-group">
        <label class="form-label">选择分类</label>
        <select class="form-input form-select" name="categoryIndex" id="editCategoryIndex" required></select>
      </div>
      <div class="form-group">
        <label class="form-label">网站名称</label>
        <input type="text" class="form-input" name="siteName" id="editSiteName" required>
      </div>
      <div class="form-group">
        <label class="form-label">网站链接</label>
        <input type="url" class="form-input" name="siteUrl" id="editSiteUrl" required>
      </div>
      <div class="form-group">
        <label class="form-label">图标代码</label>
        <input type="text" class="form-input" name="siteIcon" id="editSiteIcon" required>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%;">
        <span class="iconify" data-icon="mdi:content-save"></span> 保存修改
      </button>
    </form>
  </div>
</div>

<!-- 申请友链模态框 -->
<div id="applyLinkModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">申请友链</h3>
      <button class="close-btn" onclick="closeApplyLinkModal()">&times;</button>
    </div>
    <form id="applyLinkForm">
      <div class="form-group">
        <label class="form-label">网站名称</label>
        <input type="text" class="form-input" name="siteName" placeholder="请输入网站名称" required>
      </div>
      <div class="form-group">
        <label class="form-label">网站链接</label>
        <input type="url" class="form-input" name="siteUrl" placeholder="https://example.com" required>
      </div>
      <div class="form-group">
        <label class="form-label">图标代码</label>
        <input type="text" class="form-input" name="siteIcon" placeholder="例如: mdi:github 或 https://example.com/icon.ico" required>
        <small style="color: var(--text-secondary); margin-top: 0.5rem; display: block;">
          支持 Iconify 图标代码或外部图标链接
          <a href="https://icon-sets.iconify.design/" target="_blank" style="color: #6366f1; text-decoration: none;">
            点击这里查看所有可用的Iconify图标
          </a>
        </small>
      </div>
      <div class="form-group">
        <label class="form-label">网站描述</label>
        <textarea class="form-input" name="description" placeholder="请输入网站描述（可选）" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">联系方式</label>
        <input type="text" class="form-input" name="contact" placeholder="邮箱或QQ等（可选）">
      </div>
      <button type="submit" class="btn btn-success" style="width: 100%;">
        <span class="iconify" data-icon="mdi:send"></span> 提交申请
      </button>
    </form>
  </div>
</div>

<!-- 审批友链模态框 -->
<div id="approveLinksModal" class="modal">
  <div class="modal-content modal-content-wide">
    <div class="modal-header">
      <h3 class="modal-title">待审批友链</h3>
      <button class="close-btn" onclick="closeApproveLinksModal()">&times;</button>
    </div>
    <div id="pendingLinksList" style="max-height: 400px; overflow-y: auto;"></div>
  </div>
</div>

<!-- 搜索模态框 -->
<div id="searchModal" class="modal">
  <div class="modal-content" style="max-width: 600px;">
    <div class="modal-header">
      <h3 class="modal-title">快速搜索</h3>
      <button class="close-btn" onclick="closeSearchModal()">&times;</button>
    </div>
    <div style="padding: 1rem 0;">
      <div class="form-group">
        <input type="text" class="form-input" id="searchInput" placeholder="请输入搜索内容" style="font-size: 1.1rem; padding: 1rem;">
      </div>
      <div class="search-engines-grid">
        <button class="search-engine-btn" onclick="performSearch('https://www.baidu.com/s?word=')">
          <span class="iconify" data-icon="simple-icons:baidu" style="font-size: 2rem;"></span>
          <span>百度</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://www.sogou.com/web?query=')">
          <span class="iconify" data-icon="simple-icons:sogou" style="font-size: 2rem;"></span>
          <span>搜狗</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://cn.bing.com/search?q=')">
          <span class="iconify" data-icon="simple-icons:microsoftbing" style="font-size: 2rem;"></span>
          <span>必应</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://www.zhihu.com/search?q=')">
          <span class="iconify" data-icon="simple-icons:zhihu" style="font-size: 2rem;"></span>
          <span>知乎</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://search.bilibili.com/all?keyword=')">
          <span class="iconify" data-icon="simple-icons:bilibili" style="font-size: 2rem;"></span>
          <span>哔哩哔哩</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://s.weibo.com/weibo/')">
          <span class="iconify" data-icon="simple-icons:sinaweibo" style="font-size: 2rem;"></span>
          <span>微博</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://www.google.com/search?q=')">
          <span class="iconify" data-icon="simple-icons:google" style="font-size: 2rem;"></span>
          <span>谷歌</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://fanyi.baidu.com/#auto/zh/')">
          <span class="iconify" data-icon="mdi:translate" style="font-size: 2rem;"></span>
          <span>翻译</span>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- 关于本站模态框 -->
<div id="aboutModal" class="modal">
  <div class="modal-content modal-content-wide" style="background:rgba(255,255,255,0.95); backdrop-filter:blur(20px);">
    <div class="modal-header">
      <h3 class="modal-title" style="color:#1e293b;">关于本站</h3>
      <button class="close-btn" onclick="closeAboutModal()" style="color:#64748b;">&times;</button>
    </div>
    <div style="max-height: 70vh; overflow-y: auto; padding: 0.5rem 0;">
      <div style="margin-bottom:1.5rem; background:rgba(99,102,241,0.06); border:1px solid rgba(99,102,241,0.12); border-radius:12px; padding:1.2rem;">
        <h4 style="color:#1e293b; margin-bottom:0.8rem; font-size:1rem; display:flex; align-items:center; gap:0.5rem;">
          <span class="iconify" data-icon="mdi:information" style="color:#6366f1;"></span> 关于本站
        </h4>
        <div style="color: #475569; line-height: 1.8; font-size: 0.95rem;">
          <p>感谢来访，本站致力于简洁高效的上网导航和搜索入口，安全快捷。</p>
          <p style="margin-top:0.5rem;">搜索入口正常网页中看不到，为隐藏设计，需要用鼠标点击本站LOGO图标就会弹出搜索框。</p>
          <p style="margin-top:0.5rem;">如果您喜欢我们的网站，请将本站添加到收藏夹（快捷键Ctrl+D），并设为浏览器主页，方便您的下次访问，感谢支持。</p>
        </div>
      </div>

      <div style="margin-bottom:1.5rem; background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.12); border-radius:12px; padding:1.2rem;">
        <h4 style="color:#1e293b; margin-bottom:0.8rem; font-size:1rem; display:flex; align-items:center; gap:0.5rem;">
          <span class="iconify" data-icon="mdi:shield-check" style="color:#10b981;"></span> 本站承诺
        </h4>
        <div style="color: #475569; line-height: 1.8; font-size: 0.95rem;">
          <p style="color: #059669; font-weight: 600; margin-bottom: 0.8rem;">✅ 绝对不会收集用户的隐私信息</p>
          <p>区别于部分导航网站，本站链接直接跳转目标，不会对链接处理再后跳转，不会收集用户的隐藏信息，包括但不限于点击记录，访问记录和搜索记录，请放心使用。</p>
          <p style="margin-top: 0.8rem;">
            <strong>申请收录：</strong>本站可以直接申请友链，填写表单后提交，管理员后台审核批准后就可以显示在导航上；请点击右下角的
            <a href="javascript:void(0)" onclick="closeAboutModal(); openApplyLinkModal();" style="color: #059669; font-weight: 600; text-decoration: none; border-bottom: 1px dashed #059669; cursor: pointer;">申请友链按钮</a>
            进行申请。
          </p>
        </div>
      </div>

      <div style="margin-bottom:1.5rem; background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.12); border-radius:12px; padding:1.2rem;">
        <h4 style="color:#1e293b; margin-bottom:0.8rem; font-size:1rem; display:flex; align-items:center; gap:0.5rem;">
          <span class="iconify" data-icon="mdi:email" style="color:#f59e0b;"></span> 联系我们
        </h4>
        <div style="color: #475569; line-height: 1.8; font-size: 0.95rem;">
          <p>若您在使用本站时遇到了包括但不限于以下问题：</p>
          <ul style="margin: 0.5rem 0 0.8rem 1.5rem; color: #475569;">
            <li>图标缺失</li>
            <li>目标网站无法打开</li>
            <li>描述错误</li>
            <li>网站违规</li>
            <li>收录加急处理</li>
            <li>链接删除</li>
          </ul>
          <p>请发邮件与我们联系</p>
        </div>
      </div>

      <div style="margin-bottom:1.5rem; background:rgba(239,68,68,0.05); border:1px solid rgba(239,68,68,0.10); border-radius:12px; padding:1.2rem;">
        <h4 style="color:#1e293b; margin-bottom:0.8rem; font-size:1rem; display:flex; align-items:center; gap:0.5rem;">
          <span class="iconify" data-icon="mdi:email-fast" style="color:#ef4444;"></span> 联系邮箱
        </h4>
        <div style="color: #475569; line-height: 1.8; font-size: 0.95rem;">
          <p style="background: rgba(239,68,68,0.06); padding: 0.8rem 1rem; border-radius: 8px; border-left: 4px solid #ef4444; color:#1e293b; font-weight:500;">
            chnbsdan@gmail.com
          </p>
          <p style="margin-top: 0.5rem; color: #475569; font-weight:400;">
            或留言：<a href="https://aoso.hangdn.com/guestbook" target="_blank" style="color: #6366f1; text-decoration: none; border-bottom: 1px dashed #6366f1; font-weight:500;">https://aoso.hangdn.com/guestbook</a>
          </p>
        </div>
      </div>

      <div style="background:rgba(99,102,241,0.04); border:1px solid rgba(99,102,241,0.08); border-radius:12px; padding:1.2rem;">
        <h4 style="color:#1e293b; margin-bottom:0.8rem; font-size:1rem; display:flex; align-items:center; gap:0.5rem;">
          <span class="iconify" data-icon="mdi:help-circle" style="color:#6366f1;"></span> 联系说明
        </h4>
        <div style="color: #475569; line-height: 1.8; font-size: 0.95rem;">
          <p>为了您的问题能快速被处理，建议在邮件主题添加：</p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.8rem 0 0 0;">
            <span style="background: rgba(99,102,241,0.12); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.85rem; color:#4338ca;">【反馈】</span>
            <span style="background: rgba(239,68,68,0.10); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.85rem; color:#b91c1c;">【投诉】</span>
            <span style="background: rgba(16,185,129,0.10); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.85rem; color:#047857;">【推荐】</span>
            <span style="background: rgba(245,158,11,0.10); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.85rem; color:#b45309;">【友链】</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 歌单管理模态框 -->
<div id="playlistModal" class="modal">
  <div class="modal-content" style="max-width: 500px;">
    <div class="modal-header">
      <h3 class="modal-title">🎵 歌单管理</h3>
      <button class="close-btn" onclick="closePlaylistModal()">&times;</button>
    </div>
    <div style="padding: 0.5rem 0;">
      <!-- 当前播放 -->
      <div style="background:rgba(99,102,241,0.08); border-radius:8px; padding:10px 14px; margin-bottom:12px; border-left:3px solid #6366f1;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="color:rgba(255,255,255,0.5); font-size:12px;">▶ 当前播放</span>
          <span id="currentPlaylistName" style="color:#fff; font-weight:600; font-size:14px;">加载中...</span>
        </div>
        <div style="color:rgba(255,255,255,0.3); font-size:11px; margin-top:2px;">ID: <span id="currentPlaylistId">-</span></div>
      </div>

      <!-- 歌单列表 -->
      <div style="margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="color:rgba(255,255,255,0.5); font-size:12px;">📋 我的歌单</span>
          <span id="playlistCount" style="color:rgba(255,255,255,0.3); font-size:11px;">0 个</span>
        </div>
        <div id="playlistList" style="max-height:200px; overflow-y:auto;">
          <div style="text-align:center; padding:20px 0; color:rgba(255,255,255,0.3); font-size:13px;">暂无歌单，请添加</div>
        </div>
      </div>

      <!-- 添加歌单 -->
      <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:12px;">
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <input type="text" id="playlistNameInput" placeholder="歌单名称" style="flex:1; min-width:100px; padding:6px 10px; border:1px solid rgba(255,255,255,0.15); border-radius:6px; background:rgba(255,255,255,0.06); color:white; font-size:13px; outline:none;">
          <input type="text" id="playlistIdInput" placeholder="歌单ID" style="flex:1; min-width:100px; padding:6px 10px; border:1px solid rgba(255,255,255,0.15); border-radius:6px; background:rgba(255,255,255,0.06); color:white; font-size:13px; outline:none;">
          <button onclick="addPlaylist()" style="padding:6px 16px; background:linear-gradient(135deg,#6366f1,#8b5cf6); border:none; border-radius:6px; color:white; cursor:pointer; font-size:13px; white-space:nowrap;">➕ 添加</button>
        </div>
        <div id="playlistFormStatus" style="margin-top:6px; font-size:12px; text-align:center; display:none;"></div>
        <div style="margin-top:4px; color:rgba(255,255,255,0.2); font-size:10px;">从网易云歌单URL获取ID，如: https://music.163.com/playlist?id=14148542684</div>
      </div>
    </div>
  </div>
</div>`;
}
