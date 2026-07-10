// src/handlers/sites.js
import { getNavigationData, setNavigationData } from '../services/kv.js';
import { jsonResponse } from '../utils/response.js';

export async function handleAddSite(request) {
  try {
    const requestBody = await request.json();
    const navigationData = await getNavigationData();
    const { categoryIndex, siteName, siteUrl, siteIcon } = requestBody;
    
    if (!siteName || !siteUrl || !siteIcon) {
      return jsonResponse({ error: 'Missing required fields' }, 400);
    }
    
    try {
      new URL(siteUrl);
    } catch {
      return jsonResponse({ error: 'Invalid URL format' }, 400);
    }
    
    navigationData.categories[categoryIndex].sites.push({ 
      name: siteName, 
      url: siteUrl, 
      icon: siteIcon 
    });
    await setNavigationData(navigationData);
    
    return jsonResponse({ message: 'Site added successfully' });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

export async function handleDeleteSite(request) {
  try {
    const requestBody = await request.json();
    const navigationData = await getNavigationData();
    const { categoryIndex, siteIndex } = requestBody;
    
    navigationData.categories[categoryIndex].sites.splice(siteIndex, 1);
    await setNavigationData(navigationData);
    
    return jsonResponse({ message: 'Site deleted successfully' });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

export async function handleEditSite(request) {
  try {
    const requestBody = await request.json();
    const navigationData = await getNavigationData();
    const { categoryIndex, siteIndex, siteName, siteUrl, siteIcon } = requestBody;
    
    if (!siteName || !siteUrl || !siteIcon) {
      return jsonResponse({ error: 'Missing required fields' }, 400);
    }
    
    try {
      new URL(siteUrl);
    } catch {
      return jsonResponse({ error: 'Invalid URL format' }, 400);
    }
    
    // 查找网站当前在哪个分类
    let oldCategoryIndex = -1;
    let oldSiteIndex = -1;
    let siteData = null;
    
    for (let i = 0; i < navigationData.categories.length; i++) {
      const sites = navigationData.categories[i].sites;
      for (let j = 0; j < sites.length; j++) {
        if (j === siteIndex && sites[j]) {
          // 通过 URL 和名称双重验证
          if (sites[j].url === siteUrl || sites[j].name === siteName) {
            oldCategoryIndex = i;
            oldSiteIndex = j;
            siteData = sites[j];
            break;
          }
        }
      }
      if (siteData) break;
    }
    
    // 如果没找到，用原分类索引找
    if (!siteData) {
      if (navigationData.categories[categoryIndex] && 
          navigationData.categories[categoryIndex].sites[siteIndex]) {
        siteData = navigationData.categories[categoryIndex].sites[siteIndex];
        oldCategoryIndex = categoryIndex;
        oldSiteIndex = siteIndex;
      } else {
        return jsonResponse({ error: 'Site not found' }, 404);
      }
    }
    
    // 更新网站数据
    siteData.name = siteName;
    siteData.url = siteUrl;
    siteData.icon = siteIcon;
    
    // 如果分类没变，直接更新
    if (oldCategoryIndex === categoryIndex) {
      navigationData.categories[categoryIndex].sites[oldSiteIndex] = siteData;
    } else {
      // 从旧分类删除
      if (oldCategoryIndex >= 0 && oldCategoryIndex < navigationData.categories.length) {
        navigationData.categories[oldCategoryIndex].sites.splice(oldSiteIndex, 1);
      }
      
      // 添加到新分类
      if (categoryIndex >= 0 && categoryIndex < navigationData.categories.length) {
        navigationData.categories[categoryIndex].sites.push(siteData);
      } else {
        return jsonResponse({ error: 'Target category not found' }, 404);
      }
    }
    
    await setNavigationData(navigationData);
    
    return jsonResponse({ message: 'Site updated successfully' });
  } catch (error) {
    console.error('Edit site error:', error);
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}
