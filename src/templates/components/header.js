export function getHeader() {
  return `
<header class="header" style="position:fixed; top:0; left:0; right:0; z-index:100; background:rgba(0,0,0,0.2); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border-bottom:1px solid rgba(255,255,255,0.06); padding:0.6rem 0;">
  <div class="header-content" style="gap:0.3rem;">
    <div class="header-logo" onclick="openSearchModal()" title="点击搜索" style="gap:0.5rem;">
      <img src="https://cdn.jsdelivr.net/gh/chnbsdan/cloudflare-workers-blog@master/themes/mya/files/hangdn.ico" 
           alt="导航图标" 
           class="logo-icon" style="width:32px; height:32px;">
      <h1 style="font-size:1.4rem; text-shadow:2px 2px 4px rgba(0,0,0,0.5);">Hangdn nav</h1>
    </div>
    <p style="font-size:0.8rem; opacity:0.7; text-shadow:1px 1px 2px rgba(0,0,0,0.3); margin:0;">高效组织你的网络世界</p>
  </div>
</header>
<!-- 占位元素，防止内容被固定标题遮挡 -->
<div style="height:90px;"></div>`;
}
