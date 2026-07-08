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
      <button type="submit" class="btn btn-primary full-width-btn">
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
        <input type="color" class="form-input" name="color" value="#6366f1">
      </div>
      <button type="submit" class="btn btn-success full-width-btn">
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
        <input type="text" class="form-input" name="siteIcon" placeholder="例如: mdi:github" required>
        <small class="form-hint">支持 Iconify 图标代码或外部图标链接</small>
      </div>
      <button type="submit" class="btn btn-success full-width-btn">
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
      <button type="submit" class="btn btn-primary full-width-btn">
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
        <input type="text" class="form-input" name="siteIcon" placeholder="例如: mdi:github" required>
        <small class="form-hint">支持 Iconify 图标代码或外部图标链接</small>
      </div>
      <div class="form-group">
        <label class="form-label">网站描述</label>
        <textarea class="form-input" name="description" placeholder="请输入网站描述（可选）" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">联系方式</label>
        <input type="text" class="form-input" name="contact" placeholder="邮箱或QQ等（可选）">
      </div>
      <button type="submit" class="btn btn-success full-width-btn">
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
    <div id="pendingLinksList" class="pending-list"></div>
  </div>
</div>

<!-- 搜索模态框 -->
<div id="searchModal" class="modal">
  <div class="modal-content modal-content-search">
    <div class="modal-header">
      <h3 class="modal-title">快速搜索</h3>
      <button class="close-btn" onclick="closeSearchModal()">&times;</button>
    </div>
    <div>
      <div class="form-group">
        <input type="text" class="form-input search-input-lg" id="searchInput" placeholder="请输入搜索内容">
      </div>
      <div class="search-engines-grid">
        <button class="search-engine-btn" onclick="performSearch('https://www.baidu.com/s?word=')">
          <span class="iconify" data-icon="simple-icons:baidu"></span>
          <span>百度</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://www.sogou.com/web?query=')">
          <span class="iconify" data-icon="simple-icons:sogou"></span>
          <span>搜狗</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://cn.bing.com/search?q=')">
          <span class="iconify" data-icon="simple-icons:microsoftbing"></span>
          <span>必应</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://www.zhihu.com/search?q=')">
          <span class="iconify" data-icon="simple-icons:zhihu"></span>
          <span>知乎</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://search.bilibili.com/all?keyword=')">
          <span class="iconify" data-icon="simple-icons:bilibili"></span>
          <span>哔哩哔哩</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://s.weibo.com/weibo/')">
          <span class="iconify" data-icon="simple-icons:sinaweibo"></span>
          <span>微博</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://www.google.com/search?q=')">
          <span class="iconify" data-icon="simple-icons:google"></span>
          <span>谷歌</span>
        </button>
        <button class="search-engine-btn" onclick="performSearch('https://fanyi.baidu.com/')">
          <span class="iconify" data-icon="mdi:translate"></span>
          <span>翻译</span>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- 关于本站模态框 -->
<div id="aboutModal" class="modal">
  <div class="modal-content modal-content-wide">
    <div class="modal-header">
      <h3 class="modal-title">关于本站</h3>
      <button class="close-btn" onclick="closeAboutModal()">&times;</button>
    </div>
    <div>
      <div class="footer-link-section">
        <h4><span class="iconify" data-icon="mdi:information"></span> 关于本站</h4>
        <div>
          <p>感谢来访，本站致力于简洁高效的上网导航和搜索入口，安全快捷。</p>
          <p>搜索入口正常网页中看不到，为隐藏设计，需要用鼠标点击本站LOGO图标就会弹出搜索框。</p>
          <p>如果您喜欢我们的网站，请将本站添加到收藏夹（快捷键Ctrl+D），并设为浏览器主页，方便您的下次访问，感谢支持。</p>
        </div>
      </div>

      <div class="footer-link-section">
        <h4><span class="iconify" data-icon="mdi:shield-check"></span> 本站承诺</h4>
        <div>
          <p style="color:#4ade80;font-weight:600;margin-bottom:1rem;">绝对不会收集用户的隐私信息</p>
          <p>区别于部分导航网站，本站链接直接跳转目标，不会对链接处理再后跳转，不会收集用户的隐藏信息，包括但不限于点击记录，访问记录和搜索记录，请放心使用。</p>
          <p style="margin-top:1rem;">
            <strong>申请收录：</strong>本站可以直接申请友链，填写表单后提交，管理员后台审核批准后就可以显示在导航上；请点击右下角的
            <a href="javascript:void(0)" onclick="closeAboutModal(); openApplyLinkModal();" style="color:#4ade80;font-weight:600;text-decoration:none;border-bottom:1px dashed #4ade80;cursor:pointer;">申请友链按钮</a>
            进行申请。
          </p>
        </div>
      </div>

      <div class="footer-link-section">
        <h4><span class="iconify" data-icon="mdi:email"></span> 联系我们</h4>
        <div>
          <p>若您在使用本站时遇到了包括但不限于以下问题：</p>
          <ul>
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

      <div class="footer-link-section">
        <h4><span class="iconify" data-icon="mdi:email-fast"></span> 联系邮箱</h4>
        <div>
          <p style="background:rgba(255,255,255,0.05);padding:1rem;border-radius:8px;border-left:4px solid #6366f1;">
            <strong>chnbsdan@gmail.com</strong>
          </p>
          <p style="margin-top:0.5rem;">或留言：<a href="https://aoso.hangdn.com/guestbook" target="_blank" style="color:#6366f1;text-decoration:none;border-bottom:1px dashed #6366f1;">https://aoso.hangdn.com/guestbook</a></p>
        </div>
      </div>

      <div class="footer-link-section">
        <h4><span class="iconify" data-icon="mdi:help-circle"></span> 联系说明</h4>
        <div>
          <p>为了您的问题能快速被处理，建议在邮件主题添加：</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin:1rem 0;">
            <span style="background:rgba(99,102,241,0.2);padding:0.4rem 0.8rem;border-radius:6px;font-size:0.85rem;">【反馈】</span>
            <span style="background:rgba(239,68,68,0.2);padding:0.4rem 0.8rem;border-radius:6px;font-size:0.85rem;">【投诉】</span>
            <span style="background:rgba(34,197,94,0.2);padding:0.4rem 0.8rem;border-radius:6px;font-size:0.85rem;">【推荐】</span>
            <span style="background:rgba(245,158,11,0.2);padding:0.4rem 0.8rem;border-radius:6px;font-size:0.85rem;">【友链】</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


</div>`;
}
