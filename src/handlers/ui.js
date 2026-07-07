import { getNavigationData, setNavigationData } from '../services/kv.js';
import { jsonResponse } from '../utils/response.js';
import { renderNavigationPage } from '../templates/index.js';

export async function handleHomePage(request) {
  return new Response(await renderNavigationPage(), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function handleGetData(request) {
  const navigationData = await getNavigationData();
  return jsonResponse(navigationData);
}

// ============ 备份功能 ============
export async function handleBackup(request) {
  try {
    // 获取导航数据
    const navigationData = await getNavigationData();
    
    // 获取所有友链申请
    const list = await NAVIGATION_DATA.list({ prefix: 'link_apply:' });
    const linkApplies = [];
    for (const key of list.keys) {
      const applyData = await NAVIGATION_DATA.get(key.name);
      if (applyData) {
        linkApplies.push(JSON.parse(applyData));
      }
    }
    
    // 获取所有会话（可选）
    const sessionList = await NAVIGATION_DATA.list({ prefix: 'session:' });
    const sessions = [];
    for (const key of sessionList.keys) {
      const sessionData = await NAVIGATION_DATA.get(key.name);
      if (sessionData) {
        sessions.push(JSON.parse(sessionData));
      }
    }
    
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      data: navigationData,
      linkApplies: linkApplies,
      sessions: sessions
    };
    
    return new Response(JSON.stringify(backupData, null, 2), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="kv_backup_${new Date().toISOString().slice(0,10)}.json"`
      }
    });
  } catch (error) {
    return jsonResponse({ error: '备份失败: ' + error.message }, 500);
  }
}

// ============ 恢复功能 ============
export async function handleRestore(request) {
  try {
    const backupData = await request.json();
    
    // 验证格式
    if (!backupData.data || !backupData.data.categories) {
      return jsonResponse({ error: '无效的备份文件格式' }, 400);
    }
    
    // 恢复导航数据
    await setNavigationData(backupData.data);
    
    // 恢复友链申请
    if (backupData.linkApplies && Array.isArray(backupData.linkApplies)) {
      for (const apply of backupData.linkApplies) {
        if (apply.id) {
          await NAVIGATION_DATA.put(`link_apply:${apply.id}`, JSON.stringify(apply));
        }
      }
    }
    
    // 恢复会话（可选）
    if (backupData.sessions && Array.isArray(backupData.sessions)) {
      for (const session of backupData.sessions) {
        // 会话有 TTL，需要特殊处理
        // 这里只恢复，不设置过期时间，由原逻辑控制
      }
    }
    
    return jsonResponse({ 
      message: '恢复成功！',
      restored: {
        categories: backupData.data.categories ? backupData.data.categories.length : 0,
        linkApplies: backupData.linkApplies ? backupData.linkApplies.length : 0
      }
    });
  } catch (error) {
    return jsonResponse({ error: '恢复失败: ' + error.message }, 500);
  }
}
