import { getHeader } from './components/header.js';
import { getSidebar } from './components/sidebar.js';
import { getFooter } from './components/footer.js';
import { getPlayer } from './components/player.js';
import { getModals } from './components/modals.js';

export function getBody() {
  return `
<div class="background-container">
  <img src="https://webp.hangdn.com/fg/fg1.jpg" class="background-slide active" alt="bg1">
  <img src="https://webp.hangdn.com/fg/fg2.jpg" class="background-slide" alt="bg2">
  <img src="https://webp.hangdn.com/fg/yk5.jpg" class="background-slide" alt="bg3">
  <img src="https://pan.hangdn.com/raw/img/352347587.jpg" class="background-slide" alt="bg4">
  <img src="https://pan.hangdn.com/raw/img/377786273.jpg" class="background-slide" alt="bg5">
  <img src="https://webp.hangdn.com/fg/fj22.jpg" class="background-slide" alt="bg6">
  <img src="https://webp.hangdn.com/fg/yk1.jpg" class="background-slide" alt="bg7">
  <img src="https://webp.hangdn.com/fg/yk2.jpg" class="background-slide" alt="bg8">
  <img src="https://webp.hangdn.com/fg/yk3.jpg" class="background-slide" alt="bg9">
  <img src="https://webp.hangdn.com/fg/sh3.jpg" class="background-slide" alt="bg10">
  <img src="https://webp.hangdn.com/fg/sh2.jpg" class="background-slide" alt="bg11">
  <img src="https://webp.hangdn.com/fg/sh1.jpg" class="background-slide" alt="bg12">
  <img src="https://webp.hangdn.com/fg/bj1.jpg" class="background-slide" alt="bg13">
</div>

<div class="bg-overlay"></div>

${getSidebar()}

<div class="datetime-display">
  <div id="currentDate" class="date-text"></div>
  <div id="currentTime" class="time-text"></div>
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
