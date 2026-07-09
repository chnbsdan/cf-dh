export function getSidebar() {
  return `
<div class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <h3 class="sidebar-title">
      <span class="iconify" data-icon="mdi:menu"></span>
      分类导航
    </h3>
    <div style="margin-top: 8px;">
      <button onclick="openSearchModalKeep()" style="
        width:100%;
        padding:4px 8px;
        border:1px solid rgba(255,255,255,0.15);
        border-radius:4px;
        background:rgba(255,255,255,0.06);
        color:rgba(255,255,255,0.7);
        font-size:12px;
        cursor:pointer;
        transition:all 0.3s;
        text-align:left;
        display:flex;
        align-items:center;
        gap:6px;
      " onmouseover="this.style.background='rgba(255,255,255,0.12)';this.style.borderColor='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.borderColor='rgba(255,255,255,0.15)'">
        <span class="iconify" data-icon="mdi:magnify" style="font-size:14px;"></span>
        <span>快速搜索</span>
        <span style="margin-left:auto; font-size:10px; color:rgba(255,255,255,0.3);">Ctrl+K</span>
      </button>
    </div>
  </div>
  
  <!-- 分类列表 - 可滚动区域 -->
  <div style="flex:1; overflow-y:auto; padding-bottom:10px;">
    <ul class="category-list" id="categoryList"></ul>
  </div>
  
  <!-- 底部链接 - 固定在最下方 -->
  <div style="padding:10px 16px 14px 16px; border-top:1px solid rgba(255,255,255,0.06); flex-shrink:0; display:flex; flex-direction:column; align-items:center; background:rgba(255,255,255,0.03);">
    <a href="https://blog.hangdn.com" target="_blank" style="display:flex; align-items:center; gap:8px; color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; padding:4px 0; transition:color 0.3s; width:100%; justify-content:center;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">
      <span class="iconify" data-icon="mdi:newspaper-variant-outline" style="font-size:16px;"></span>
      Blog
    </a>
    <a href="https://github.com/chnbsdan/cf-dh" target="_blank" style="display:flex; align-items:center; gap:8px; color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; padding:4px 0; transition:color 0.3s; width:100%; justify-content:center;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">
      <span class="iconify" data-icon="mdi:github" style="font-size:16px;"></span>
      GitHub
    </a>
    <a href="javascript:void(0)" onclick="openSidebarAbout()" style="display:flex; align-items:center; gap:8px; color:rgba(255,255,255,0.6); text-decoration:none; font-size:13px; padding:4px 0; transition:color 0.3s; width:100%; justify-content:center;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">
      <span class="iconify" data-icon="mdi:information-outline" style="font-size:16px;"></span>
      About
    </a>
  </div>
</div>

<button class="sidebar-toggle" id="sidebarToggle" title="显示/隐藏分类菜单">
  <span class="iconify" data-icon="mdi:menu"></span>
</button>`;
}
