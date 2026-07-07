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
    
    if (!navigationData.categories[categoryIndex] || 
        !navigationData.categories[categoryIndex].sites[siteIndex]) {
      return jsonResponse({ error: 'Site not found' }, 404);
    }
    
    navigationData.categories[categoryIndex].sites[siteIndex] = { 
      name: siteName, 
      url: siteUrl, 
      icon: siteIcon 
    };
    
    await setNavigationData(navigationData);
    
    return jsonResponse({ message: 'Site updated successfully' });
  } catch (error) {
    console.error('Edit site error:', error);
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}
