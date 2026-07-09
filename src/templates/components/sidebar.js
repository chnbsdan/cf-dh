export function getSidebar() {
  return `
<div class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <h3 class="sidebar-title">
      <span class="iconify" data-icon="mdi:menu"></span>
      分类导航
    </h3>
    <!-- 快速搜索按钮 -->
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
  <ul class="category-list" id="categoryList"></ul>
</div>

<button class="sidebar-toggle" id="sidebarToggle" title="显示/隐藏分类菜单">
  <span class="iconify" data-icon="mdi:menu"></span>
</button>`;
}
