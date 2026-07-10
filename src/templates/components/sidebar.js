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
    <!-- 站内搜索框 -->
    <div style="margin-top:6px; position:relative;">
      <input type="text" id="sidebarSearchInput" placeholder="搜索网站..." style="
        width:100%;
        padding:4px 28px 4px 8px;
        border:1px solid rgba(255,255,255,0.10);
        border-radius:4px;
        background:rgba(255,255,255,0.04);
        color:rgba(255,255,255,0.6);
        font-size:12px;
        outline:none;
        transition:all 0.3s;
        box-sizing:border-box;
      " onfocus="this.style.borderColor='rgba(255,255,255,0.25)';this.style.background='rgba(255,255,255,0.08)'" onblur="this.style.borderColor='rgba(255,255,255,0.10)';this.style.background='rgba(255,255,255,0.04)'">
      <span style="position:absolute;right:8px;top:50%;transform:translateY(-50%);color:rgba(255,255,255,0.2);font-size:12px;">🔍</span>
      <div id="sidebarSearchResults" style="
        display:none;
        position:absolute;
        top:100%;
        left:0;
        right:0;
        margin-top:2px;
        background:rgba(0,0,0,0.85);
        backdrop-filter:blur(12px);
        border-radius:6px;
        border:1px solid rgba(255,255,255,0.06);
        max-height:250px;
        overflow-y:auto;
        z-index:10000;
        min-width:160px;
      "></div>
    </div>
  </div>
  
  <!-- 分类列表 - 可滚动区域 -->
  <div class="sidebar-scroll" style="flex:1; overflow-y:auto; padding-bottom:10px;">
    <ul class="category-list" id="categoryList"></ul>
  </div>
  
  <!-- 底部链接 -->
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
