// src/handlers/sites.js
import { getNavigationData, setNavigationData } from '../services/kv.js';
import { jsonResponse } from '../utils/response.js';

// 确保使用 export 关键字导出函数
export async function handleAddSite(request) {
  try {
    const requestBody = await request.json();
    const navigationData = await getNavigationData();
    const { categoryIndex, siteName, siteUrl, siteIcon } = requestBody;
    
    // ... (保持原有逻辑不变)
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

// 确保 handleEditSite 被正确导出
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
    
    // 检查原分类和网站是否存在
    // 注意：这里 categoryIndex 是前端传递的新分类索引
    // 我们需要先验证网站是否存在。由于网站索引 siteIndex 是唯一的，我们可以在所有分类中查找。
    let siteFound = false;
    for (const category of navigationData.categories) {
      if (category.sites && category.sites[siteIndex]) {
        siteFound = true;
        break;
      }
    }
    
    if (!siteFound) {
      return jsonResponse({ error: 'Site not found' }, 404);
    }
    
    // 从所有分类中移除该网站
    let siteToMove = null;
    for (const category of navigationData.categories) {
      if (category.sites && category.sites[siteIndex]) {
        siteToMove = category.sites.splice(siteIndex, 1)[0];
        break;
      }
    }
    
    if (!siteToMove) {
      return jsonResponse({ error: 'Site not found' }, 404);
    }
    
    // 更新网站信息
    siteToMove.name = siteName;
    siteToMove.url = siteUrl;
    siteToMove.icon = siteIcon;
    
    // 添加到新分类
    if (!navigationData.categories[categoryIndex]) {
      return jsonResponse({ error: 'Target category not found' }, 404);
    }
    navigationData.categories[categoryIndex].sites.push(siteToMove);
    
    await setNavigationData(navigationData);
    
    return jsonResponse({ message: 'Site updated successfully' });
  } catch (error) {
    console.error('Edit site error:', error);
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}
