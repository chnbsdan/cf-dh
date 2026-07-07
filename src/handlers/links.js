import { getNavigationData, setNavigationData } from '../services/kv.js';
import { jsonResponse } from '../utils/response.js';
import { generateToken } from './auth.js';

// 游客申请友链
export async function handleApplyLink(request) {
  try {
    const requestBody = await request.json();
    const { siteName, siteUrl, siteIcon, description, contact } = requestBody;
    
    if (!siteName || !siteUrl || !siteIcon) {
      return jsonResponse({ error: '网站名称、链接和图标为必填项' }, 400);
    }
    
    try {
      new URL(siteUrl);
    } catch {
      return jsonResponse({ error: '无效的URL格式' }, 400);
    }
    
    const applyId = generateToken();
    const applyData = {
      id: applyId,
      siteName,
      siteUrl,
      siteIcon,
      description: description || '',
      contact: contact || '',
      status: 'pending',
      appliedAt: Date.now(),
      approvedAt: null,
      approvedBy: null
    };
    
    await NAVIGATION_DATA.put(`link_apply:${applyId}`, JSON.stringify(applyData));
    
    return jsonResponse({ 
      message: '友链申请提交成功，等待管理员审核',
      applyId 
    });
  } catch (error) {
    return jsonResponse({ error: '无效的请求' }, 400);
  }
}

// 获取待审核的友链申请
export async function handleGetPendingLinks(request) {
  try {
    const list = await NAVIGATION_DATA.list({ prefix: 'link_apply:' });
    const pendingLinks = [];
    
    for (const key of list.keys) {
      const applyData = await NAVIGATION_DATA.get(key.name);
      if (applyData) {
        const data = JSON.parse(applyData);
        if (data.status === 'pending') {
          pendingLinks.push(data);
        }
      }
    }
    
    pendingLinks.sort((a, b) => b.appliedAt - a.appliedAt);
    
    return jsonResponse({ pendingLinks });
  } catch (error) {
    return jsonResponse({ error: '获取申请列表失败' }, 500);
  }
}

// 批准友链申请
export async function handleApproveLink(request) {
  try {
    const { applyId, categoryIndex } = await request.json();
    
    if (!applyId || categoryIndex === undefined) {
      return jsonResponse({ error: '申请ID和分类索引为必填项' }, 400);
    }
    
    const applyData = await NAVIGATION_DATA.get(`link_apply:${applyId}`);
    if (!applyData) {
      return jsonResponse({ error: '申请不存在' }, 404);
    }
    
    const apply = JSON.parse(applyData);
    
    if (apply.status !== 'pending') {
      return jsonResponse({ error: '申请已被处理' }, 400);
    }
    
    const navigationData = await getNavigationData();
    
    if (!navigationData.categories[categoryIndex]) {
      return jsonResponse({ error: '分类不存在' }, 400);
    }
    
    navigationData.categories[categoryIndex].sites.push({
      name: apply.siteName,
      url: apply.siteUrl,
      icon: apply.siteIcon
    });
    
    apply.status = 'approved';
    apply.approvedAt = Date.now();
    apply.approvedBy = 'admin';
    
    await setNavigationData(navigationData);
    await NAVIGATION_DATA.put(`link_apply:${applyId}`, JSON.stringify(apply));
    
    return jsonResponse({ message: '友链申请已批准' });
  } catch (error) {
    console.error('Approve link error:', error);
    return jsonResponse({ error: '批准申请失败' }, 500);
  }
}

// 拒绝友链申请
export async function handleRejectLink(request) {
  try {
    const { applyId } = await request.json();
    
    if (!applyId) {
      return jsonResponse({ error: '申请ID为必填项' }, 400);
    }
    
    const applyData = await NAVIGATION_DATA.get(`link_apply:${applyId}`);
    if (!applyData) {
      return jsonResponse({ error: '申请不存在' }, 404);
    }
    
    const apply = JSON.parse(applyData);
    
    if (apply.status !== 'pending') {
      return jsonResponse({ error: '申请已被处理' }, 400);
    }
    
    apply.status = 'rejected';
    apply.approvedAt = Date.now();
    apply.approvedBy = 'admin';
    
    await NAVIGATION_DATA.put(`link_apply:${applyId}`, JSON.stringify(apply));
    
    return jsonResponse({ message: '友链申请已拒绝' });
  } catch (error) {
    return jsonResponse({ error: '拒绝申请失败' }, 500);
  }
}
