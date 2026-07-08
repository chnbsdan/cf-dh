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
  
  <!-- 歌单切换 -->
  <div style="position:relative;">
    <button class="apply-link-btn" onclick="document.getElementById('playlistMenu').style.display=document.getElementById('playlistMenu').style.display==='block'?'none':'block'" title="切换歌单" style="background:linear-gradient(135deg,#8b5cf6,#6366f1);">
      <span class="iconify" data-icon="mdi:playlist-music"></span>
    </button>
    <div id="playlistMenu" style="display:none;position:absolute;bottom:45px;right:0;background:rgba(0,0,0,0.9);backdrop-filter:blur(10px);border-radius:10px;padding:8px 0;min-width:140px;border:1px solid rgba(255,255,255,0.1);">
      <script>
        (function() {
          var list = window.PLAYLIST_DATA || [];
          var current = localStorage.getItem('playlistId') || (list[0] ? list[0].id : '');
          var html = '';
          list.forEach(function(item) {
            var isActive = (item.id === current);
            html += '<div onclick="switchPlaylist(\'' + item.id + '\')" style="padding:8px 16px;color:' + (isActive ? '#10b981' : 'rgba(255,255,255,0.8)') + ';cursor:pointer;font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);" onmouseover="this.style.background=\'rgba(255,255,255,0.1)\'" onmouseout="this.style.background=\'transparent\'">';
            html += (isActive ? '✓ ' : '') + item.name;
            html += '</div>';
          });
          document.write(html);
        })();
      </script>
    </div>
  </div>
</div>

${getModals()}
${getFooter()}`;
}
