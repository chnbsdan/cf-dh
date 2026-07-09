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

// ============ About 页面 ============
export async function handleAbout(request) {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>关于</title>
  <script src="https://code.iconify.design/2/2.0.3/iconify.min.js"></script>
</head>
<body style="margin:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;">
  <div style="background:rgba(255,255,255,0.10);backdrop-filter:blur(20px);border-radius:20px;padding:40px 48px;max-width:520px;width:90%;border:1px solid rgba(255,255,255,0.12);box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative;">
    
    <button onclick="window.parent.postMessage('closeAbout','*')" style="position:absolute;top:12px;right:16px;background:none;border:none;color:rgba(255,255,255,0.5);font-size:24px;cursor:pointer;transition:color 0.3s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">&times;</button>
    
    <div style="text-align:center;margin-bottom:24px;">
      <img src="https://cdn.jsdelivr.net/gh/chnbsdan/cloudflare-workers-blog@master/themes/mya/files/hangdn.ico" style="width:64px;height:64px;border-radius:16px;margin-bottom:12px;">
      <h2 style="color:#fff;font-size:24px;font-weight:700;margin:0;">Hangdn nav</h2>
      <p style="color:rgba(255,255,255,0.5);font-size:14px;margin-top:4px;">个人智能导航 · 基于 Cloudflare</p>
    </div>
    
    <div style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.8;">
      <p>高效组织你的网络世界，快速访问常用网站。</p>
      <p style="margin-top:8px;">
        <span style="color:rgba(255,255,255,0.4);">版本</span> v1.0<br>
        <span style="color:rgba(255,255,255,0.4);">驱动</span> Cloudflare Workers + KV<br>
        <span style="color:rgba(255,255,255,0.4);">图标</span> <a href="https://iconify.design" target="_blank" style="color:#10b981;text-decoration:none;">Iconify</a>
      </p>
    </div>
    
    <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap;">
      <a href="https://blog.hangdn.com" target="_blank" style="flex:1;padding:10px 0;text-align:center;background:rgba(255,255,255,0.06);border-radius:8px;color:rgba(255,255,255,0.7);text-decoration:none;font-size:13px;display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.12)';this.style.color='white'" onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.7)'">
        <span class="iconify" data-icon="mdi:newspaper-variant-outline" style="font-size:18px;"></span>
        Blog
      </a>
      <a href="https://github.com/chnbsdan/cf-dh" target="_blank" style="flex:1;padding:10px 0;text-align:center;background:rgba(255,255,255,0.06);border-radius:8px;color:rgba(255,255,255,0.7);text-decoration:none;font-size:13px;display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.12)';this.style.color='white'" onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.7)'">
        <span class="iconify" data-icon="mdi:github" style="font-size:18px;"></span>
        GitHub
      </a>
    </div>
    
    <div style="margin-top:16px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;color:rgba(255,255,255,0.25);font-size:12px;">
      Made with ❤️ by Hangdn
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
