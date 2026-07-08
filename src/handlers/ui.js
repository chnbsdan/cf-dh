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
    const navigationData = await getNavigationData();
    
    const list = await NAVIGATION_DATA.list({ prefix: 'link_apply:' });
    const linkApplies = [];
    for (const key of list.keys) {
      const applyData = await NAVIGATION_DATA.get(key.name);
      if (applyData) {
        linkApplies.push(JSON.parse(applyData));
      }
    }
    
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
    
    if (!backupData.data || !backupData.data.categories) {
      return jsonResponse({ error: '无效的备份文件格式' }, 400);
    }
    
    await setNavigationData(backupData.data);
    
    if (backupData.linkApplies && Array.isArray(backupData.linkApplies)) {
      for (const apply of backupData.linkApplies) {
        if (apply.id) {
          await NAVIGATION_DATA.put(`link_apply:${apply.id}`, JSON.stringify(apply));
        }
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

// ============ 歌单管理 ============
// 获取歌单列表
export async function handleGetPlaylists(request) {
  try {
    const playlistsJson = await NAVIGATION_DATA.get('playlists');
    const playlists = playlistsJson ? JSON.parse(playlistsJson) : [];
    const current = await NAVIGATION_DATA.get('playlist_id') || '14148542684';
    
    return jsonResponse({ playlists, current });
  } catch (error) {
    return jsonResponse({ error: error.message }, 500);
  }
}

// 添加歌单
export async function handleAddPlaylist(request) {
  try {
    const { name, id } = await request.json();
    
    if (!name || !id || !/^\d+$/.test(id)) {
      return jsonResponse({ error: '无效的歌单名称或ID' }, 400);
    }
    
    const playlistsJson = await NAVIGATION_DATA.get('playlists');
    const playlists = playlistsJson ? JSON.parse(playlistsJson) : [];
    
    const exists = playlists.some(item => item.id === id);
    if (exists) {
      return jsonResponse({ error: '歌单已存在' }, 400);
    }
    
    playlists.push({ name, id });
    await NAVIGATION_DATA.put('playlists', JSON.stringify(playlists));
    
    if (playlists.length === 1) {
      await NAVIGATION_DATA.put('playlist_id', id);
    }
    
    return jsonResponse({ message: '添加成功', playlists });
  } catch (error) {
    return jsonResponse({ error: error.message }, 500);
  }
}

// 删除歌单
export async function handleDeletePlaylist(request) {
  try {
    const { playlistId } = await request.json();
    
    if (!playlistId) {
      return jsonResponse({ error: '缺少歌单ID' }, 400);
    }
    
    const playlistsJson = await NAVIGATION_DATA.get('playlists');
    const playlists = playlistsJson ? JSON.parse(playlistsJson) : [];
    
    const filtered = playlists.filter(item => item.id !== playlistId);
    
    if (filtered.length === playlists.length) {
      return jsonResponse({ error: '歌单不存在' }, 404);
    }
    
    await NAVIGATION_DATA.put('playlists', JSON.stringify(filtered));
    
    const current = await NAVIGATION_DATA.get('playlist_id');
    if (current === playlistId) {
      const newCurrent = filtered.length > 0 ? filtered[0].id : '14148542684';
      await NAVIGATION_DATA.put('playlist_id', newCurrent);
    }
    
    return jsonResponse({ message: '删除成功' });
  } catch (error) {
    return jsonResponse({ error: error.message }, 500);
  }
}

// 切换歌单
export async function handleSwitchPlaylist(request) {
  try {
    const { playlistId } = await request.json();
    
    if (!playlistId) {
      return jsonResponse({ error: '缺少歌单ID' }, 400);
    }
    
    const playlistsJson = await NAVIGATION_DATA.get('playlists');
    const playlists = playlistsJson ? JSON.parse(playlistsJson) : [];
    const exists = playlists.some(item => item.id === playlistId);
    
    if (!exists) {
      return jsonResponse({ error: '歌单不存在' }, 404);
    }
    
    await NAVIGATION_DATA.put('playlist_id', playlistId);
    
    return jsonResponse({ message: '切换成功', playlistId });
  } catch (error) {
    return jsonResponse({ error: error.message }, 500);
  }
}
