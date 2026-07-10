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
  <title>关于本站</title>
  <script src="https://code.iconify.design/2/2.0.3/iconify.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/twikoo@1.6.41/dist/twikoo.all.min.js"></script>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{margin:0;background:rgba(0,0,0,0.3);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:20px}
    .card{background:rgba(255,255,255,0.85);backdrop-filter:blur(20px);border-radius:20px;padding:32px 40px 20px;max-width:720px;width:100%;max-height:90vh;overflow-y:hidden;border:1px solid rgba(255,255,255,0.3);box-shadow:0 20px 60px rgba(0,0,0,0.15);position:relative;color:#1e293b;line-height:1.8;font-size:14px}
    
    /* 关闭按钮 - 固定在屏幕右上角 */
    .close-btn{position:fixed;top:20px;right:20px;z-index:999;background:rgba(255,255,255,0.9);backdrop-filter:blur(8px);border:1px solid rgba(0,0,0,0.08);border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:16px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.06)}
    .close-btn:hover{background:#fff;color:#1e293b;transform:scale(1.08);box-shadow:0 4px 12px rgba(0,0,0,0.12)}
    
    .title{text-align:center;margin-bottom:16px}
    .title p{color:#94a3b8;font-size:13px;margin-top:4px}
    .sec{margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid rgba(0,0,0,0.06)}
    .sec:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
    .sec h4{color:#6366f1;font-size:14px;font-weight:600;margin:0 0 4px 0;display:flex;align-items:center;gap:6px}
    .sec p,.sec li{margin:3px 0;color:#475569}
    .sec ul{margin:4px 0 4px 16px;padding:0;color:#475569}
    .sec ul li{margin:2px 0}
    .highlight{color:#10b981;font-weight:500}
    .tag{display:inline-block;padding:2px 10px;border-radius:12px;font-size:12px;margin:2px 4px 2px 0}
    .tag-green{background:rgba(16,185,129,0.12);color:#059669}
    .tag-orange{background:rgba(245,158,11,0.12);color:#d97706}
    .link-btn{display:inline-block;padding:6px 16px;border-radius:6px;background:rgba(0,0,0,0.04);color:#475569;text-decoration:none;font-size:13px;transition:all 0.2s;margin-right:4px}
    .link-btn:hover{background:rgba(0,0,0,0.08);color:#1e293b}
    .footer{text-align:center;padding-top:12px;margin-top:12px;border-top:1px solid rgba(0,0,0,0.06)}
    .footer p{color:#94a3b8;font-size:12px;margin:0;line-height:1.6}
    .footer .footer-link{color:#94a3b8;cursor:pointer;transition:color 0.2s;text-decoration:none}
    .footer .footer-link:hover{color:#1e293b}
    .footer .powered{color:#94a3b8;font-size:11px;margin-top:2px}
    .footer .powered a{color:#94a3b8;text-decoration:none;transition:color 0.2s}
    .footer .powered a:hover{color:#1e293b}
    .footer .powered .cf{color:#f48120;font-weight:600}
    .twikoo-wrap{margin-top:8px}
    .twikoo-wrap .tk-input{background:#f8fafc !important;border:1px solid #e2e8f0 !important;color:#1e293b !important;border-radius:8px !important}
    .twikoo-wrap .tk-input:focus{border-color:#6366f1 !important;box-shadow:0 0 0 3px rgba(99,102,241,0.1) !important}
    .twikoo-wrap .tk-submit{background:#6366f1 !important;border:none !important;color:#fff !important;border-radius:6px !important;padding:6px 18px !important}
    .twikoo-wrap .tk-submit:hover{background:#4f46e5 !important}
    .twikoo-wrap .tk-comment{background:#f8fafc;border-radius:8px;padding:12px 14px;border:1px solid #e2e8f0;margin-bottom:8px}
    .twikoo-wrap .tk-comment .tk-nick{color:#6366f1 !important;font-weight:600}
    .twikoo-wrap .tk-comment .tk-time{color:#94a3b8;font-size:12px}
    .twikoo-wrap .tk-comment .tk-content{color:#1e293b}
    .twikoo-wrap .tk-reply{color:#94a3b8;font-size:12px;cursor:pointer}
    .twikoo-wrap .tk-reply:hover{color:#6366f1}
  </style>
</head>
<body>
  <button class="close-btn" onclick="window.parent.postMessage('closeAbout','*')">✕</button>

  <div class="card">
    <div class="title">
      <div style="display:flex; align-items:center; justify-content:center; gap:12px;">
        <img src="https://cdn.jsdelivr.net/gh/chnbsdan/cloudflare-workers-blog@master/themes/mya/files/hangdn.ico" alt="logo" style="width:44px; height:44px; border-radius:12px;">
        <h2 style="color:#1e293b; font-size:22px; font-weight:700; margin:0;">
          <a href="https://aoso.hangdn.com" target="_blank" style="color:#1e293b; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='#1e293b'">Hangdn nav</a>
        </h2>
      </div>
      <p>个人智能导航 · 基于 Cloudflare</p>
    </div>

    <div class="sec">
      <h4><span class="iconify" data-icon="mdi:information-outline" style="font-size:16px;"></span> 关于本站</h4>
      <p>感谢来访，本站致力于简洁高效的上网导航和搜索入口，安全快捷。</p>
      <p>搜索入口为隐藏设计，点击本站 LOGO 图标即可弹出搜索框。</p>
      <p>如果您喜欢，请将本站添加到收藏夹（Ctrl+D），设为浏览器主页。</p>
    </div>

    <div class="sec">
      <h4><span class="iconify" data-icon="mdi:shield-check" style="font-size:16px;"></span> 本站承诺</h4>
      <p><span class="highlight">✅ 绝不收集用户隐私信息</span></p>
      <p>本站链接直接跳转目标，无二次跳转，不收集点击、访问、搜索记录。</p>
      <p style="color:#94a3b8;font-size:13px;">无广告 · 无推广 · 无 SEO 跟踪</p>
    </div>

    <div class="sec">
      <h4><span class="iconify" data-icon="mdi:link-plus" style="font-size:16px;"></span> 申请收录</h4>
      <p>本站支持友链申请，审核通过后即可展示在导航上。</p>
      <p style="font-size:13px;color:#94a3b8;">收录标准：<span class="tag tag-green">有用</span> <span class="tag tag-orange">有趣</span></p>
      <p style="margin-top:4px;">点击右下角 <span class="highlight">申请友链</span> 按钮即可提交。</p>
    </div>

    <div class="sec">
      <h4><span class="iconify" data-icon="mdi:email-outline" style="font-size:16px;"></span> 联系我们</h4>
      <p>遇到以下问题可联系我们：</p>
      <ul>
        <li>图标缺失 · 链接失效</li>
        <li>网站违规 · 内容错误</li>
        <li>收录加急 · 链接删除</li>
      </ul>
      <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:6px;">
        <a href="mailto:chnbsdan@gmail.com" class="link-btn">📧 chnbsdan@gmail.com</a>
        <a href="https://t.me/ben_mesa" target="_blank" class="link-btn">💬 Telegram</a>
      </div>
    </div>

    <div class="sec" style="border-bottom:none;margin-bottom:0;padding-bottom:0;">
      <h4><span class="iconify" data-icon="mdi:chat-outline" style="font-size:16px;"></span> 留言板</h4>
      <p style="font-size:13px;color:#94a3b8;margin-bottom:6px;">欢迎留言交流，提出建议或反馈问题。</p>
      <div id="twikoo" class="twikoo-wrap"></div>
    </div>

    <div class="footer">
      <p>
        Copyright ©2024-2025 <a href="https://aoso.hangdn.com" target="_blank" class="footer-link" style="color:#94a3b8;text-decoration:none;" onmouseover="this.style.color='#1e293b'" onmouseout="this.style.color='#94a3b8'">Hangdn nav</a>. All Rights Reserved.
      </p>
      <p class="powered">
        Powered by <span class="cf">Cloudflare</span> · 
        <a href="https://github.com/chnbsdan/cf-dh" target="_blank">GitHub</a>
      </p>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof twikoo !== 'undefined') {
        twikoo.init({
          el: '#twikoo',
          envId: 'https://twikoo.hangdn.net/',
          lang: 'zh-CN',
          path: window.location.pathname,
        });
      }
    });
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
