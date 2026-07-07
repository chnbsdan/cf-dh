export function getSidebar() {
  return `<div class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <h3 class="sidebar-title">
      <span class="iconify" data-icon="mdi:menu"></span>
      分类导航
    </h3>
  </div>
  <ul class="category-list" id="categoryList"></ul>
</div>

<button class="sidebar-toggle" id="sidebarToggle" title="显示/隐藏分类菜单">
  <span class="iconify" data-icon="mdi:menu"></span>
</button>`;
}
