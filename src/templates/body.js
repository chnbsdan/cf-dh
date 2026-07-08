import { getHeader } from './components/header.js';
import { getSidebar } from './components/sidebar.js';
import { getFooter } from './components/footer.js';
import { getPlayer } from './components/player.js';
import { getModals } from './components/modals.js';

export function getBody() {
  return `
<div class="background-container" id="bgContainer"></div>

<div class="bg-overlay"></div>

${getSidebar()}

<div class="datetime-display">
  <div id="currentDate" class="date-text"></div>
  <div id="currentTime" class="time-text"></div>
  <button onclick="changeBackground()" style="position:absolute; bottom:10px; right:10px; width:32px; height:32px; border:1px solid rgba(255,255,255,0.25); border-radius:50%; background:rgba(255,255,255,0.1); backdrop-filter:blur(8px); color:#fff; cursor:pointer; transition:all 0.3s; display:flex; align-items:center; justify-content:center; padding:0;" onmouseover="this.style.background='rgba(255,255,255,0.25)';this.style.transform='scale(1.1)'" onmouseout="this.style.background='rgba(255,255,255,0.1)';this.style.transform='scale(1)'" title="换背景">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  </button>
</div>

${getPlayer()}

<div class="container" id="mainContainer">
  ${getHeader()}
  
  <div class="control-panel" id="controlPanel">
    <div class="auth-section">
      <button class="btn btn-success" onclick="openAddCategoryModal()">
        <span class="iconify" data-icon="mdi:plus"></span> 添加分类
      </button>
      <button class="btn btn-primary" onclick="openAddSiteModal()">
        <span class="iconify" data-icon="mdi:web-plus"></span> 添加网站
      </button>
      <button class="btn btn-warning" onclick="openApproveLinksModal()" id="approveLinksBtn">
        <span class="iconify" data-icon="mdi:account-check"></span> 审批友链
      </button>
      <button class="btn" onclick="downloadBackup()" style="background:linear-gradient(135deg,#10b981,#059669);color:white;">
        <span class="iconify" data-icon="mdi:download"></span> 备份数据
      </button>
      <button class="btn" onclick="uploadRestore()" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:white;">
        <span class="iconify" data-icon="mdi:upload"></span> 恢复数据
      </button>
    </div>
  </div>

  <div id="content"></div>
</div>

<button class="back-to-top" onclick="scrollToTop()" title="返回顶部">
  <span class="iconify" data-icon="mdi:chevron-up"></span>
</button>

<div class="admin-floating-btn">
  <button class="gear-btn" id="adminBtn" onclick="openLoginModal()" title="管理员登录">
    <span class="iconify" data-icon="mdi:cog"></span>
  </button>
  <button class="logout-btn hidden" id="logoutBtn" onclick="logout()" title="退出登录">
    <span class="iconify" data-icon="mdi:logout"></span>
  </button>
  <button class="apply-link-btn" onclick="openApplyLinkModal()" title="申请友链">
    <span class="iconify" data-icon="mdi:link-plus"></span>
  </button>
</div>

${getModals()}
${getFooter()}`;
}
