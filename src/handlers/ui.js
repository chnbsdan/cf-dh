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
  <style>
    body {
      margin:0;
      background:rgba(0,0,0,0.6);
      backdrop-filter:blur(8px);
      display:flex;
      align-items:center;
      justify-content:center;
      min-height:100vh;
      font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
      padding:20px;
      box-sizing:border-box;
    }
    .about-card {
      background:rgba(255,255,255,0.30);
      backdrop-filter:blur(20px);
      border-radius:20px;
      padding:40px 48px;
      max-width:600px;
      width:100%;
      max-height:85vh;
      overflow-y:auto;
      border:1px solid rgba(255,255,255,0.12);
      box-shadow:0 20px 60px rgba(0,0,0,0.3);
      position:relative;
      color:rgba(255,255,255,0.85);
      line-height:1.8;
      font-size:14px;
    }
    .about-card::-webkit-scrollbar {
      width:4px;
    }
    .about-card::-webkit-scrollbar-track {
      background:transparent;
    }
    .about-card::-webkit-scrollbar-thumb {
      background:rgba(255,255,255,0.2);
      border-radius:2px;
    }
    .close-btn {
      position:absolute;
      top:12px;
      right:16px;
      background:none;
      border:none;
      color:rgba(255,255,255,0.4);
      font-size:24px;
      cursor:pointer;
      transition:color 0.3s;
    }
    .close-btn:hover {
      color:#fff;
    }
    .about-title {
      text-align:center;
      margin-bottom:20px;
    }
    .about-title img {
      width:56px;
      height:56px;
      border-radius:14px;
      margin-bottom:8px;
    }
    .about-title h2 {
      color:#fff;
      font-size:22px;
      font-weight:700;
      margin:0;
    }
    .about-title p {
      color:rgba(255,255,255,0.4);
      font-size:13px;
      margin-top:2px;
    }
    .section {
      margin-bottom:16px;
      padding-bottom:16px;
      border-bottom:1px solid rgba(255,255,255,0.06);
    }
    .section:last-child {
      border-bottom:none;
      margin-bottom:0;
      padding-bottom:0;
    }
    .section h4 {
      color:#10b981;
      font-size:15px;
      font-weight:600;
      margin:0 0 8px 0;
      display:flex;
      align-items:center;
      gap:8px;
    }
    .section p, .section li {
      margin:4px 0;
      color:rgba(255,255,255,0.75);
    }
    .section ul {
      margin:6px 0 6px 18px;
      padding:0;
      color:rgba(255,255,255,0.75);
    }
    .section ul li {
      margin:2px 0;
    }
    .highlight {
      color:#10b981;
      font-weight:500;
    }
    .tag {
      display:inline-block;
      padding:2px 10px;
      border-radius:12px;
      font-size:12px;
      margin:2px 4px 2px 0;
    }
    .tag-green {
      background:rgba(16,185,129,0.15);
      color:#10b981;
    }
    .tag-purple {
      background:rgba(99,102,241,0.15);
      color:#a5b4fc;
    }
    .tag-orange {
      background:rgba(245,158,11,0.15);
      color:#fbbf24;
    }
    .link-btn {
      display:inline-block;
      padding:6px 16px;
      border-radius:6px;
      background:rgba(255,255,255,0.06);
      color:rgba(255,255,255,0.7);
      text-decoration:none;
      font-size:13px;
      transition:all 0.3s;
      margin-right:6px;
    }
    .link-btn:hover {
      background:rgba(255,255,255,0.12);
      color:#fff;
    }
    .link-btn i {
      margin-right:4px;
    }
  </style>
</head>
<body>
  <div class="about-card">
    <button class="close-btn" onclick="window.parent.postMessage('closeAbout','*')">&times;</button>
    
    <div class="about-title">
      <img src="https://cdn.jsdelivr.net/gh/chnbsdan/cloudflare-workers-blog@master/themes/mya/files/hangdn.ico" alt="logo">
      <h2>Hangdn nav</h2>
      <p>个人智能导航 · 基于 Cloudflare</p>
    </div>

    <div class="section">
      <h4><span class="iconify" data-icon="mdi:information-outline" style="font-size:18px;"></span> 关于本站</h4>
      <p>感谢来访，本站致力于简洁高效的上网导航和搜索入口，安全快捷。</p>
      <p>搜索入口正常网页中看不到，为隐藏设计，需要用鼠标点击本站LOGO图标就会弹出搜索框。</p>
      <p>如果您喜欢我们的网站，请将本站添加到收藏夹（快捷键Ctrl+D），并设为浏览器主页，方便您的下次访问，感谢支持。</p>
      <p style="margin-top:8px;color:rgba(255,255,255,0.5);font-size:13px;font-style:italic;">希望能成为你的主页的导航站~</p>
    </div>

    <div class="section">
      <h4><span class="iconify" data-icon="mdi:shield-check" style="font-size:18px;"></span> 本站承诺</h4>
      <p><span class="highlight">✅ 绝对不会收集用户的隐私信息</span></p>
      <p>区别于部分导航网站，本站链接直接跳转目标，不会对链接处理再后跳转，不会收集用户的隐藏信息，包括但不限于点击记录、访问记录和搜索记录，请放心使用。</p>
      <p style="margin-top:6px;font-size:13px;color:rgba(255,255,255,0.5);">没有广告和推广，没有SEO更没有浪费时间的二次跳转</p>
    </div>

    <div class="section">
      <h4><span class="iconify" data-icon="mdi:link-plus" style="font-size:18px;"></span> 申请收录</h4>
      <p>本站可以直接申请友链，填写表单后提交，管理员后台审核批准后就可以显示在导航上。</p>
      <p style="font-size:13px;color:rgba(255,255,255,0.5);">收录标准：<span class="tag tag-green">有用</span> <span class="tag tag-orange">有趣</span></p>
      <p style="margin-top:4px;">请点击右下角的 <span class="highlight">申请友链按钮</span> 进行申请。</p>
    </div>

    <div class="section">
      <h4><span class="iconify" data-icon="mdi:email-outline" style="font-size:18px;"></span> 联系我们</h4>
      <p>若您在使用本站时遇到了包括但不限于以下问题：</p>
      <ul>
        <li>图标缺失</li>
        <li>目标网站无法打开</li>
        <li>描述错误</li>
        <li>网站违规</li>
        <li>收录加急处理</li>
        <li>链接删除</li>
      </ul>
      <p style="margin-top:6px;font-size:13px;color:rgba(255,255,255,0.5);">意见反馈 &amp; 好站推荐 务必联系我们 👇</p>
      <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:8px;">
        <a href="mailto:chnbsdan@gmail.com" class="link-btn"><span class="iconify" data-icon="mdi:email" style="vertical-align:middle;"></span> chnbsdan@gmail.com</a>
        <a href="https://t.me/ben_mesa" target="_blank" class="link-btn"><span class="iconify" data-icon="mdi:telegram" style="vertical-align:middle;"></span> Telegram</a>
      </div>
    </div>

    <div class="section">
      <h4><span class="iconify" data-icon="mdi:heart-outline" style="font-size:18px;"></span> 致谢</h4>
      <p style="font-size:13px;color:rgba(255,255,255,0.5);">本站个人导航现已开源</p>
      <a href="https://github.com/chnbsdan/cf-dh" target="_blank" style="color:#10b981;text-decoration:none;font-weight:500;">🎉 https://github.com/chnbsdan/cf-dh</a>
    </div>

    <div class="section" style="border-bottom:none;margin-bottom:0;padding-bottom:0;">
      <h4><span class="iconify" data-icon="mdi:lightbulb-outline" style="font-size:18px;"></span> 使用贴士</h4>
      <ul style="font-size:13px;color:rgba(255,255,255,0.6);">
        <li>热门站点单纯根据点击量排名的，朴实无华且枯燥</li>
        <li>工具直达是特地收集的在线工具网站，应该会有些用</li>
        <li>点击导航项图标即可进入详情页（可以查看更详细的介绍，比如地址发布页，附加资源等），点击其他位置则会直接跳转</li>
      </ul>
    </div>

    <div style="margin-top:16px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;color:rgba(255,255,255,0.2);font-size:11px;">
      Made with ❤️ by Hangdn
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
