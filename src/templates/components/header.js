export function getHeader() {
  return `
<header style="position:fixed; top:0; left:0; right:0; z-index:100; background:rgba(0,0,0,0.25); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); border-bottom:1px solid rgba(255,255,255,0.06); padding:0.5rem 0;">
  <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; max-width:1200px; margin:0 auto; padding:0 160px 0 20px;">
    <div onclick="openSearchModal()" title="点击搜索" style="display:flex; align-items:center; gap:10px; cursor:pointer;">
      <img src="https://cdn.jsdelivr.net/gh/chnbsdan/cloudflare-workers-blog@master/themes/mya/files/hangdn.ico" 
           alt="导航图标" 
           style="width:32px; height:32px; border-radius:10px; box-shadow:0 4px 20px rgba(0,0,0,0.3);">
      <h1 style="font-size:1.3rem; font-weight:800; margin:0; color:white; text-shadow:2px 2px 6px rgba(0,0,0,0.5); letter-spacing:1px;">Hangdn nav</h1>
    </div>
    <p style="font-size:0.7rem; opacity:0.6; margin:0; color:white; text-shadow:1px 1px 2px rgba(0,0,0,0.5);">高效组织你的网络世界</p>
  </div>
</header>
<!-- 占位 -->
<div style="height:80px;"></div>`;
}
