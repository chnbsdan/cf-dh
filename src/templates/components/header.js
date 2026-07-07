export function getHeader() {
  return `<header class="header">
  <div class="header-content">
    <div class="header-logo" onclick="openSearchModal()" title="点击搜索">
      <img src="https://cdn.jsdelivr.net/gh/chnbsdan/cloudflare-workers-blog@master/themes/mya/files/hangdn.ico" 
           alt="导航图标" 
           class="logo-icon">
      <h1>Hangdn nav</h1>
    </div>
    <p>高效组织你的网络世界</p>
  </div>
</header>`;
}
