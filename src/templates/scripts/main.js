export function getMainScript() {
  return `<script>
let authToken = localStorage.getItem('authToken');
let navigationData = [];
let currentCategoryIndex = -1;

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing...');
  checkAuthStatus();
  loadNavigationData();
  setupEventListeners();
  initDateTime();
  initBackToTop();
  initSidebar();
  restoreBackground();
});

function setupEventListeners() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  const addCategoryForm = document.getElementById('addCategoryForm');
  if (addCategoryForm) {
    addCategoryForm.addEventListener('submit', handleAddCategorySubmit);
  }

  const addSiteForm = document.getElementById('addSiteForm');
  if (addSiteForm) {
    addSiteForm.addEventListener('submit', handleAddSiteSubmit);
  }

  const editSiteForm = document.getElementById('editSiteForm');
  if (editSiteForm) {
    editSiteForm.addEventListener('submit', handleEditSiteSubmit);
  }

  const applyLinkForm = document.getElementById('applyLinkForm');
  if (applyLinkForm) {
    applyLinkForm.addEventListener('submit', handleApplyLinkSubmit);
  }

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch('https://www.baidu.com/s?word=');
      }
    });
  }

  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      if (e.target.getAttribute('data-keep') === 'true') return;
      e.target.style.display = 'none';
    }
  });
}

function initSidebar() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const mainContainer = document.getElementById('mainContainer');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      mainContainer.classList.toggle('sidebar-expanded');
    });
  }
}

function renderSidebarCategories() {
  const categoryList = document.getElementById('categoryList');
  if (!categoryList) return;

  categoryList.innerHTML = '';

  if (!navigationData.categories || navigationData.categories.length === 0) {
    categoryList.innerHTML = '<li style="color: rgba(255,255,255,0.6); padding: 20px; text-align: center;">暂无分类</li>';
    return;
  }

  // 添加"全部"选项
  const allLi = document.createElement('li');
  allLi.className = 'category-item';
  if (currentCategoryIndex === -1) {
    allLi.classList.add('active');
  }
  var totalSites = 0;
  navigationData.categories.forEach(function(cat) {
    if (cat.sites) totalSites += cat.sites.length;
  });
  allLi.innerHTML = \`
    <div class="category-icon">
      <span class="iconify" data-icon="mdi:apps"></span>
    </div>
    <span class="category-name">全部</span>
    <span class="category-count">\${totalSites}</span>
  \`;
  allLi.addEventListener('click', function() {
    document.querySelectorAll('.category-item').forEach(function(item) {
      item.classList.remove('active');
    });
    this.classList.add('active');
    currentCategoryIndex = -1;
    renderContent(-1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  categoryList.appendChild(allLi);

  navigationData.categories.forEach((category, index) => {
    const li = document.createElement('li');
    li.className = 'category-item';
    if (index === currentCategoryIndex) {
      li.classList.add('active');
    }
    
    li.innerHTML = \`
      <div class="category-icon">
        <span class="iconify" data-icon="mdi:folder"></span>
      </div>
      <span class="category-name">\${category.name}</span>
      <span class="category-count">\${category.sites ? category.sites.length : 0}</span>
    \`;
    
   li.addEventListener('click', function() {
  document.querySelectorAll('.category-item').forEach(function(item) {
    item.classList.remove('active');
  });
  this.classList.add('active');
  currentCategoryIndex = index;
  renderContent(index);
  // 滚动到该分类，定位在导航栏下方
  setTimeout(function() {
    var el = document.getElementById('category-' + index);
    if (el) {
      var rect = el.getBoundingClientRect();
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var headerHeight = 80;
      var targetY = rect.top + scrollTop - headerHeight - 10;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, 150);
});
    
    categoryList.appendChild(li);
  });
}

function scrollToCategory(categoryIndex) {
  currentCategoryIndex = categoryIndex;
  const categories = document.querySelectorAll('.category');
  if (categories[categoryIndex]) {
    categories[categoryIndex].scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

async function checkAuthStatus() {
  const adminBtn = document.getElementById('adminBtn');
  if (adminBtn) adminBtn.classList.remove('hidden');
  
  if (authToken) {
    try {
      const response = await fetch('/data', {
        headers: { 'Authorization': 'Bearer ' + authToken }
      });
      
      if (response.ok) {
        showAdminFeatures();
      } else {
        logout();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    }
  }
}

function showAdminFeatures() {
  const adminBtn = document.getElementById('adminBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const controlPanel = document.getElementById('controlPanel');
  
  if (adminBtn) adminBtn.classList.add('hidden');
  if (logoutBtn) logoutBtn.classList.remove('hidden');
  if (controlPanel) controlPanel.classList.add('active');
}

function hideAdminFeatures() {
  const adminBtn = document.getElementById('adminBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const controlPanel = document.getElementById('controlPanel');
  
  if (adminBtn) adminBtn.classList.remove('hidden');
  if (logoutBtn) logoutBtn.classList.add('hidden');
  if (controlPanel) controlPanel.classList.remove('active');
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const password = document.getElementById('password').value;
  await login(password);
}

async function handleAddCategorySubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const response = await fetch('/add-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      showNotification('分类添加成功', 'success');
      closeAddCategoryModal();
      loadNavigationData();
      e.target.reset();
    } else {
      showNotification('添加失败', 'error');
    }
  } catch (error) {
    showNotification('网络错误', 'error');
  }
}

async function handleAddSiteSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    categoryIndex: parseInt(formData.get('categoryIndex')),
    siteName: formData.get('siteName'),
    siteUrl: formData.get('siteUrl'),
    siteIcon: formData.get('siteIcon')
  };
  
  try {
    const response = await fetch('/add-site', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      showNotification('网站添加成功', 'success');
      closeAddSiteModal();
      loadNavigationData();
      e.target.reset();
    } else {
      showNotification('添加失败', 'error');
    }
  } catch (error) {
    showNotification('网络错误', 'error');
  }
}

async function handleEditSiteSubmit(e) {
  e.preventDefault();
  
  const oldCategoryIndex = parseInt(document.getElementById('currentCategoryIndex').value);
  const siteIndex = parseInt(document.getElementById('siteIndex').value);
  const newCategoryIndex = parseInt(document.getElementById('editCategoryIndex').value);
  const siteName = document.getElementById('editSiteName').value;
  const siteUrl = document.getElementById('editSiteUrl').value;
  const siteIcon = document.getElementById('editSiteIcon').value;

  if (!siteName || !siteUrl || !siteIcon) {
    showNotification('所有字段均为必填', 'error');
    return;
  }

  try {
    new URL(siteUrl);
  } catch {
    showNotification('无效的URL格式', 'error');
    return;
  }

  if (!navigationData.categories[oldCategoryIndex] || !navigationData.categories[oldCategoryIndex].sites[siteIndex]) {
    showNotification('网站数据不存在', 'error');
    return;
  }

  const data = {
    categoryIndex: newCategoryIndex,
    siteIndex: siteIndex,
    siteName: siteName,
    siteUrl: siteUrl,
    siteIcon: siteIcon
  };
  
  try {
    const response = await fetch('/edit-site', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      showNotification('网站修改成功', 'success');
      closeEditSiteModal();
      loadNavigationData();
    } else {
      const errorData = await response.json();
      showNotification('修改失败: ' + (errorData.error || '未知错误'), 'error');
    }
  } catch (error) {
    showNotification('网络错误: ' + error.message, 'error');
  }
}

async function handleApplyLinkSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    siteName: formData.get('siteName'),
    siteUrl: formData.get('siteUrl'),
    siteIcon: formData.get('siteIcon'),
    description: formData.get('description'),
    contact: formData.get('contact')
  };
  
  try {
    const response = await fetch('/apply-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (response.ok) {
      showNotification('申请提交成功！等待管理员审核', 'success');
      closeApplyLinkModal();
      e.target.reset();
    } else {
      showNotification(result.error || '提交失败', 'error');
    }
  } catch (error) {
    showNotification('网络错误，请重试', 'error');
  }
}

async function login(password) {
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const data = await response.json();
    
    if (response.ok) {
      authToken = data.token;
      localStorage.setItem('authToken', authToken);
      showAdminFeatures();
      closeLoginModal();
      showNotification('登录成功！', 'success');
    } else {
      showNotification(data.error || '登录失败', 'error');
    }
  } catch (error) {
    showNotification('网络错误，请重试', 'error');
  }
}

function logout() {
  authToken = null;
  localStorage.removeItem('authToken');
  hideAdminFeatures();
  showNotification('已退出登录', 'info');
}

async function loadNavigationData() {
  try {
    const response = await fetch('/data');
    navigationData = await response.json();
    renderContent();
    renderSidebarCategories();
  } catch (error) {
    console.error('加载数据失败:', error);
  }
}

function renderContent(filterCategoryIndex) {
  const contentEl = document.getElementById('content');
  if (!contentEl) return;
  
  if (!navigationData.categories || navigationData.categories.length === 0) {
    contentEl.innerHTML = \`
      <div class="empty-state">
        <span class="iconify" data-icon="mdi:folder-open-outline"></span>
        <h3>暂无分类</h3>
        <p>登录后可以添加分类和网站</p>
      </div>
    \`;
    return;
  }

  var categoriesToRender = [];
  if (filterCategoryIndex !== undefined && filterCategoryIndex >= 0 && filterCategoryIndex < navigationData.categories.length) {
    categoriesToRender = [navigationData.categories[filterCategoryIndex]];
  } else {
    categoriesToRender = navigationData.categories;
  }

  let html = '';
  
  categoriesToRender.forEach(function(category) {
    var categoryIndex = navigationData.categories.indexOf(category);
    html += '<div class="category" id="category-' + categoryIndex + '">';
    html += '<div class="category-header">';
    html += '<h2 class="category-title">';
    html += '<span class="iconify" data-icon="mdi:folder"></span>';
    html += category.name;
    html += '</h2>';
    
    if (authToken) {
      html += '<div class="category-actions">';
      html += '<button class="icon-btn" onclick="openAddSiteModal(' + categoryIndex + ')" title="添加网站">';
      html += '<span class="iconify" data-icon="mdi:plus"></span>';
      html += '</button>';
      html += '<button class="icon-btn" onclick="deleteCategory(' + categoryIndex + ')" title="删除分类">';
      html += '<span class="iconify" data-icon="mdi:delete"></span>';
      html += '</button>';
      html += '</div>';
    }
    
    html += '</div>';
    html += '<div class="sites-grid">';
    
    if (category.sites && category.sites.length > 0) {
      category.sites.forEach(function(site, siteIndex) {
        var escapedName = site.name.replace(/'/g, "\\\\'");
        var escapedUrl = site.url.replace(/'/g, "\\\\'");
        var escapedIcon = site.icon.replace(/'/g, "\\\\'");
        
        html += '<a href="' + escapedUrl + '" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit;display:block;">';
        html += '<div class="site-card">';
        html += '<div class="site-icon">';
        
        if (site.icon.startsWith('http://') || site.icon.startsWith('https://') || 
            site.icon.endsWith('.ico') || site.icon.endsWith('.png') || 
            site.icon.endsWith('.jpg') || site.icon.endsWith('.svg') ||
            site.icon.endsWith('.jpeg') || site.icon.endsWith('.gif')) {
          html += '<img src="' + site.icon + '" alt="' + escapedName + '" referrerpolicy="no-referrer" onerror="this.remove()">';
        } else {
          html += '<span class="iconify" data-icon="' + escapedIcon + '"></span>';
        }
        
        html += '</div>';
        html += '<div class="site-name">' + site.name + '</div>';
        
        if (authToken) {
          html += '<div class="site-actions">';
          html += '<button class="icon-btn" onclick="event.preventDefault(); event.stopPropagation(); openEditSiteModal(' + categoryIndex + ', ' + siteIndex + ')" title="编辑">';
          html += '<span class="iconify" data-icon="mdi:pencil"></span>';
          html += '</button>';
          html += '<button class="icon-btn" onclick="event.preventDefault(); event.stopPropagation(); deleteSite(' + categoryIndex + ', ' + siteIndex + ')" title="删除">';
          html += '<span class="iconify" data-icon="mdi:delete"></span>';
          html += '</button>';
          html += '</div>';
        }
        
        html += '</div></a>';
      });
    } else {
      html += '<div class="empty-state" style="padding: 2rem; grid-column: 1 / -1;">';
      html += '<span class="iconify" data-icon="mdi:web"></span>';
      html += '<p>暂无网站，点击上方 + 按钮添加</p>';
      html += '</div>';
    }
    
    html += '</div>';
    html += '</div>';
  });
  
  contentEl.innerHTML = html;
}

async function deleteCategory(categoryIndex) {
  if (!confirm('确定要删除这个分类吗？分类下的所有网站也会被删除。')) return;
  
  try {
    const response = await fetch('/delete-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      },
      body: JSON.stringify({ categoryIndex })
    });

    if (response.ok) {
      showNotification('分类删除成功', 'success');
      loadNavigationData();
    } else {
      showNotification('删除失败', 'error');
    }
  } catch (error) {
    showNotification('网络错误', 'error');
  }
}

async function deleteSite(categoryIndex, siteIndex) {
  if (!confirm('确定要删除这个网站吗？')) return;
  
  try {
    const response = await fetch('/delete-site', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      },
      body: JSON.stringify({ categoryIndex, siteIndex })
    });

    if (response.ok) {
      showNotification('网站删除成功', 'success');
      loadNavigationData();
    } else {
      showNotification('删除失败', 'error');
    }
  } catch (error) {
    showNotification('网络错误', 'error');
  }
}

function openLoginModal() {
  document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

function openAddCategoryModal() {
  document.getElementById('addCategoryModal').style.display = 'flex';
}

function closeAddCategoryModal() {
  document.getElementById('addCategoryModal').style.display = 'none';
}

function openAddSiteModal(categoryIndex) {
  var select = document.querySelector('#addSiteForm select[name="categoryIndex"]');
  if (select) {
    select.innerHTML = '';
    navigationData.categories.forEach(function(category, index) {
      var option = document.createElement('option');
      option.value = index;
      option.textContent = category.name;
      if (index === categoryIndex) option.selected = true;
      select.appendChild(option);
    });
  }
  document.getElementById('addSiteModal').style.display = 'flex';
}

function closeAddSiteModal() {
  document.getElementById('addSiteModal').style.display = 'none';
}

function openEditSiteModal(categoryIndex, siteIndex) {
  if (!navigationData.categories[categoryIndex] || !navigationData.categories[categoryIndex].sites[siteIndex]) {
    showNotification('网站数据不存在', 'error');
    return;
  }
  
  var site = navigationData.categories[categoryIndex].sites[siteIndex];
  
  document.getElementById('currentCategoryIndex').value = categoryIndex;
  document.getElementById('siteIndex').value = siteIndex;
  document.getElementById('editSiteName').value = site.name;
  document.getElementById('editSiteUrl').value = site.url;
  document.getElementById('editSiteIcon').value = site.icon;
  
  var categorySelect = document.getElementById('editCategoryIndex');
  if (categorySelect) {
    categorySelect.innerHTML = '';
    navigationData.categories.forEach(function(category, index) {
      var option = document.createElement('option');
      option.value = index;
      option.textContent = category.name;
      if (index === categoryIndex) {
        option.selected = true;
      }
      categorySelect.appendChild(option);
    });
  }
  
  document.getElementById('editSiteModal').style.display = 'flex';
}

function closeEditSiteModal() {
  document.getElementById('editSiteModal').style.display = 'none';
}

function openApplyLinkModal() {
  document.getElementById('applyLinkModal').style.display = 'flex';
}

function closeApplyLinkModal() {
  document.getElementById('applyLinkModal').style.display = 'none';
}

function openApproveLinksModal() {
  loadPendingLinks();
  document.getElementById('approveLinksModal').style.display = 'flex';
}

function closeApproveLinksModal() {
  document.getElementById('approveLinksModal').style.display = 'none';
}

function openAboutModal() {
  document.getElementById('aboutModal').style.display = 'flex';
}

function closeAboutModal() {
  document.getElementById('aboutModal').style.display = 'none';
}

function openSearchModal() {
  var modal = document.getElementById('searchModal');
  modal.removeAttribute('data-keep');
  modal.style.display = 'flex';
  document.getElementById('searchInput').focus();
}

function openSearchModalKeep() {
  var modal = document.getElementById('searchModal');
  if (!modal) return;
  modal.setAttribute('data-keep', 'true');
  modal.style.display = 'flex';
  var input = document.getElementById('searchInput');
  if (input) setTimeout(function() { input.focus(); }, 100);
}

function closeSearchModal() {
  document.getElementById('searchModal').style.display = 'none';
}

function performSearch(searchUrl) {
  var searchText = document.getElementById('searchInput').value.trim();
  if (searchText) {
    window.open(searchUrl + encodeURIComponent(searchText), '_blank');
    closeSearchModal();
  } else {
    alert('请输入搜索内容');
    document.getElementById('searchInput').focus();
  }
}

async function loadPendingLinks() {
  try {
    var response = await fetch('/pending-links', {
      headers: { 'Authorization': 'Bearer ' + authToken }
    });
    
    var data = await response.json();
    
    if (response.ok) {
      renderPendingLinks(data.pendingLinks);
    } else {
      showNotification('加载申请列表失败', 'error');
    }
  } catch (error) {
    showNotification('网络错误', 'error');
  }
}

function renderPendingLinks(links) {
  var container = document.getElementById('pendingLinksList');
  
  if (!links || links.length === 0) {
    container.innerHTML = '<div class="empty-state" style="padding: 2rem;"><p style="color: #059669;">暂无待审批的友链申请</p></div>';
    return;
  }
  
  var html = '';
  links.forEach(function(apply) {
    html += \`
      <div class="pending-link-item">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
          \${apply.siteIcon.startsWith('http') ? 
            \`<img src="\${apply.siteIcon}" alt="\${apply.siteName}" style="width: 32px; height: 32px; object-fit: contain; border-radius: 6px;">\` :
            \`<span class="iconify" data-icon="\${apply.siteIcon}" style="font-size: 2rem; color: white;"></span>\`
          }
          <div style="flex: 1;">
            <h4 style="color: #333; margin: 0;">\${apply.siteName}</h4>
            <p style="color: #333; margin: 0; font-size: 0.9rem;">\${apply.siteUrl}</p>
          </div>
        </div>
        \${apply.description ? \`<p style="color: #333; margin: 0.5rem 0;">\${apply.description}</p>\` : ''}
        \${apply.contact ? \`<p style="color: #333; margin: 0.5rem 0; font-size: 0.9rem;">联系方式: \${apply.contact}</p>\` : ''}
        <p style="color: #333; margin: 0.5rem 0; font-size: 0.8rem;">
          申请时间: \${new Date(apply.appliedAt).toLocaleString()}
        </p>
        <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
          <select class="form-input" style="flex: 1;" id="categorySelect_\${apply.id}">
            \${navigationData.categories.map(function(cat, idx) { 
              return \`<option value="\${idx}">\${cat.name}</option>\`;
            }).join('')}
          </select>
          <button class="btn btn-success" onclick="approveLink('\${apply.id}')" style="padding: 0.5rem 1rem;">
            <span class="iconify" data-icon="mdi:check"></span> 批准
          </button>
          <button class="btn btn-danger" onclick="rejectLink('\${apply.id}')" style="padding: 0.5rem 1rem;">
            <span class="iconify" data-icon="mdi:close"></span> 拒绝
          </button>
        </div>
      </div>
    \`;
  });
  
  container.innerHTML = html;
}

async function approveLink(applyId) {
  var categoryIndex = parseInt(document.getElementById(\`categorySelect_\${applyId}\`).value);
  
  try {
    var response = await fetch('/approve-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      },
      body: JSON.stringify({ applyId: applyId, categoryIndex: categoryIndex })
    });
    
    if (response.ok) {
      showNotification('友链已批准', 'success');
      loadPendingLinks();
      loadNavigationData();
    } else {
      showNotification('批准失败', 'error');
    }
  } catch (error) {
    showNotification('网络错误', 'error');
  }
}

async function rejectLink(applyId) {
  if (!confirm('确定要拒绝这个友链申请吗？')) return;
  
  try {
    var response = await fetch('/reject-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      },
      body: JSON.stringify({ applyId: applyId })
    });
    
    if (response.ok) {
      showNotification('友链已拒绝', 'success');
      loadPendingLinks();
    } else {
      showNotification('拒绝失败', 'error');
    }
  } catch (error) {
    showNotification('网络错误', 'error');
  }
}

function updateDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = (now.getMonth() + 1).toString().padStart(2, '0');
  var date = now.getDate().toString().padStart(2, '0');
  var weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  var weekday = weekdays[now.getDay()];
  var dateString = year + '年' + month + '月' + date + '日 ' + weekday;
  
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  var seconds = now.getSeconds().toString().padStart(2, '0');
  var timeString = hours + ':' + minutes + ':' + seconds;
  
  var dateElement = document.getElementById('currentDate');
  var timeElement = document.getElementById('currentTime');
  
  if (dateElement) dateElement.textContent = dateString;
  if (timeElement) timeElement.textContent = timeString;
}

function initDateTime() {
  updateDateTime();
  setInterval(updateDateTime, 1000);
}

function initBackToTop() {
  var backToTopBtn = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function() {
    backToTopBtn.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showNotification(message) {
  alert(message);
}

window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.openAddCategoryModal = openAddCategoryModal;
window.closeAddCategoryModal = closeAddCategoryModal;
window.openAddSiteModal = openAddSiteModal;
window.closeAddSiteModal = closeAddSiteModal;
window.openEditSiteModal = openEditSiteModal;
window.closeEditSiteModal = closeEditSiteModal;
window.deleteCategory = deleteCategory;
window.deleteSite = deleteSite;
window.logout = logout;
window.openApplyLinkModal = openApplyLinkModal;
window.closeApplyLinkModal = closeApplyLinkModal;
window.openApproveLinksModal = openApproveLinksModal;
window.closeApproveLinksModal = closeApproveLinksModal;
window.approveLink = approveLink;
window.rejectLink = rejectLink;
window.openAboutModal = openAboutModal;
window.closeAboutModal = closeAboutModal;
window.openSearchModal = openSearchModal;
window.openSearchModalKeep = openSearchModalKeep;
window.closeSearchModal = closeSearchModal;
window.performSearch = performSearch;
window.scrollToTop = scrollToTop;
window.scrollToCategory = scrollToCategory;

// ============ 备份功能 ============
async function downloadBackup() {
  try {
    showNotification('⏳ 正在备份...', 'info');
    
    var response = await fetch('/backup', {
      headers: { 'Authorization': 'Bearer ' + authToken }
    });
    
    if (!response.ok) {
      var error = await response.json();
      throw new Error(error.error || '备份失败');
    }
    
    var blob = await response.blob();
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'kv_backup_' + new Date().toISOString().slice(0,10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('✅ 备份下载成功！', 'success');
  } catch (error) {
    showNotification('❌ 备份失败: ' + error.message, 'error');
  }
}

// ============ 恢复功能 ============
function uploadRestore() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = async function(e) {
    var file = e.target.files[0];
    if (!file) return;
    
    try {
      var text = await file.text();
      var data = JSON.parse(text);
      
      if (!data.data || !data.data.categories) {
        showNotification('❌ 无效的备份文件格式', 'error');
        return;
      }
      
      if (!confirm('⚠️ 确定要恢复数据吗？这将覆盖当前所有数据！')) return;
      
      showNotification('⏳ 正在恢复...', 'info');
      
      var response = await fetch('/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify(data)
      });
      
      var result = await response.json();
      
      if (response.ok) {
        showNotification('✅ 恢复成功！共恢复 ' + result.restored.categories + ' 个分类，' + result.restored.linkApplies + ' 个友链', 'success');
        loadNavigationData();
      } else {
        showNotification('❌ 恢复失败: ' + result.error, 'error');
      }
    } catch (error) {
      showNotification('❌ 文件解析失败: ' + error.message, 'error');
    }
  };
  
  input.click();
}

window.downloadBackup = downloadBackup;
window.uploadRestore = uploadRestore;

// ============ 侧边栏 About 页面（现代版） ============
function openSidebarAbout() {
  var sidebar = document.getElementById('sidebar');
  var mainContainer = document.getElementById('mainContainer');
  if (sidebar) sidebar.classList.remove('active');
  if (mainContainer) mainContainer.classList.remove('sidebar-expanded');
  
  var existing = document.getElementById('sidebarAboutOverlay');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'sidebarAboutOverlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9998;display:flex;align-items:center;justify-content:center;';
  
  var iframe = document.createElement('iframe');
  iframe.src = '/about';
  iframe.style.cssText = 'width:100%;height:100%;border:none;background:transparent;';
  overlay.appendChild(iframe);
  document.body.appendChild(overlay);
  
  window.addEventListener('message', function(e) {
    if (e.data === 'closeAbout') {
      closeSidebarAbout();
    }
    if (e.data === 'openApplyLink') {
      closeSidebarAbout();
      setTimeout(function() {
        openApplyLinkModal();
      }, 300);
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSidebarAbout();
  });
}

function closeSidebarAbout() {
  var overlay = document.getElementById('sidebarAboutOverlay');
  if (overlay) overlay.remove();
}

window.openSidebarAbout = openSidebarAbout;
window.closeSidebarAbout = closeSidebarAbout;

// ============ 换背景功能 ============
function changeBackground() {
  var bgContainer = document.getElementById('bgContainer');
  if (!bgContainer) return;
  
  var url = 'https://pico.1356666.xyz/api/wallpaper?folder=sh?t=' + Date.now();
  
  var img = document.createElement('img');
  img.src = url;
  img.className = 'background-slide active';
  img.alt = 'bg-' + Date.now();
  img.onload = function() {
    bgContainer.innerHTML = '';
    bgContainer.appendChild(img);
    localStorage.setItem('customBg', url);
    console.log('背景更换成功');
  };
  img.onerror = function() {
    console.error('图片加载失败');
  };
}

function restoreBackground() {
  var savedBg = localStorage.getItem('customBg');
  if (savedBg) {
    var bgContainer = document.getElementById('bgContainer');
    if (bgContainer) {
      bgContainer.innerHTML = '';
      var img = document.createElement('img');
      img.src = savedBg;
      img.className = 'background-slide active';
      img.alt = 'bg-custom';
      bgContainer.appendChild(img);
      console.log('恢复背景成功');
    }
  }
}

window.changeBackground = changeBackground;
window.restoreBackground = restoreBackground;

</script>`;
}
