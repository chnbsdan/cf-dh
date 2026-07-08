export function getPlayer() {
  return `
<!-- 浮动歌词窗口 - 整个窗口可拖动 -->
<div id="lyrics-window" style="display:none; position:fixed; z-index:9999; min-width:280px; min-height:120px; max-width:600px; max-height:500px; background:rgba(255,255,255,0.12); backdrop-filter:blur(24px) saturate(180%); -webkit-backdrop-filter:blur(24px) saturate(180%); border-radius:16px; border:1px solid rgba(255,255,255,0.25); box-shadow:0 20px 60px rgba(0,0,0,0.4); overflow:hidden; left:100px; top:100px;">
  
  <!-- 顶部工具栏 -->
  <div id="lyrics-header" style="display:flex; justify-content:flex-end; align-items:center; padding:4px 8px 2px 8px; gap:3px; background:rgba(255,255,255,0.02); border-bottom:1px solid rgba(255,255,255,0.04); cursor:grab;">
    <input type="color" id="lyricsColorPicker" value="#ff4500" style="width:14px; height:14px; border:none; border-radius:3px; cursor:pointer; background:transparent; padding:0; border:1px solid rgba(255,255,255,0.12);">
    <button id="lyricsToggleBtn" style="background:rgba(255,255,255,0.05); border:none; color:rgba(255,255,255,0.5); cursor:pointer; padding:1px 6px; border-radius:3px; font-size:10px;">▾</button>
    <button id="lyricsCloseBtn" style="background:rgba(255,255,255,0.05); border:none; color:rgba(255,255,255,0.5); cursor:pointer; padding:1px 5px; border-radius:3px; font-size:10px;">✕</button>
  </div>
  
  <!-- 歌词内容 -->
  <div id="lyrics-content" style="padding:8px 16px 6px 16px; min-height:50px; max-height:350px; overflow-y:auto; cursor:grab; scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.2) transparent;">
    <div id="floating-lyrics" style="text-align:left; color:#ff4500; font-weight:bold; text-shadow:0 2px 20px rgba(0,0,0,0.5);">
      <div id="currentLine" style="font-size:24px; margin-bottom:4px; min-height:28px; line-height:1.4;"></div>
      <div id="nextLine" style="font-size:14px; opacity:0.6; min-height:18px; color:inherit;"></div>
    </div>
  </div>
  
  <!-- 底部粗线拖拽条 -->
  <div id="resize-handle" style="position:absolute; bottom:0; left:0; right:0; height:8px; cursor:nwse-resize; background:rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:center; user-select:none; border-top:1px solid rgba(255,255,255,0.10);">
    <div style="display:flex; gap:3px; align-items:center; opacity:0.3;">
      <span style="display:block; width:16px; height:2px; background:rgba(255,255,255,0.5); border-radius:1px;"></span>
      <span style="display:block; width:16px; height:2px; background:rgba(255,255,255,0.5); border-radius:1px;"></span>
      <span style="display:block; width:16px; height:2px; background:rgba(255,255,255,0.5); border-radius:1px;"></span>
    </div>
  </div>
</div>

<!-- 音乐胶囊 -->
<div id="music-capsule" style="position:fixed; left:22px; bottom:96px; width:72px; height:72px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:30000; background:radial-gradient(circle at 30% 30%, #00c3ff,#0061ff); box-shadow:0 8px 28px rgba(0,180,255,0.12);">
  <img id="capsule-cover" src="https://p2.music.126.net/4HGEnXVexEfF2M4WdDdfrQ==/109951166354363385.jpg" alt="capsule cover" style="width:95%; height:95%; border-radius:50%; object-fit:cover; transition:transform .3s;">
</div>

<!-- 播放器容器 -->
<div id="player-wrap" style="position:fixed; left:18px; bottom:92px; width:360px; max-width:calc(100% - 36px); z-index:15000; display:none; transform-origin:left bottom;">
  <div id="aplayer-container"></div>
</div>

<!-- 右键菜单 -->
<ul id="right-menu" style="position:fixed; display:none; z-index:99999; min-width:150px; background:rgba(255,255,255,0.12); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); color:#fff; border-radius:10px; box-shadow:0 8px 32px rgba(0,0,0,0.2); padding:2px 0; border:1px solid rgba(255,255,255,0.15);">
  <li id="menu-play" style="list-style:none; padding:4px 12px; cursor:pointer; font-size:12.5px; color:#fff; transition:background 0.12s; border-radius:3px; margin:0 3px;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:6px;"><polygon points="5 3 19 12 5 21 5 3"/></svg> 播放/暂停
  </li>
  <li id="menu-prev" style="list-style:none; padding:4px 12px; cursor:pointer; font-size:12.5px; color:#fff; transition:background 0.12s; border-radius:3px; margin:0 3px;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:6px;"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg> 上一首
  </li>
  <li id="menu-next" style="list-style:none; padding:4px 12px; cursor:pointer; font-size:12.5px; color:#fff; transition:background 0.12s; border-radius:3px; margin:0 3px;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:6px;"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg> 下一首
  </li>
  <li id="menu-volup" style="list-style:none; padding:4px 12px; cursor:pointer; font-size:12.5px; color:#fff; transition:background 0.12s; border-radius:3px; margin:0 3px;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:6px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> 音量+
  </li>
  <li id="menu-voldown" style="list-style:none; padding:4px 12px; cursor:pointer; font-size:12.5px; color:#fff; transition:background 0.12s; border-radius:3px; margin:0 3px;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:6px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg> 音量-
  </li>
  <li id="menu-lyrics" style="list-style:none; padding:4px 12px; cursor:pointer; font-size:12.5px; color:#fff; transition:background 0.12s; border-radius:3px; margin:0 3px;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:6px;"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> 显示/隐藏歌词
  </li>
  <li id="menu-support" style="list-style:none; padding:4px 12px; cursor:pointer; font-size:12.5px; color:#fff; transition:background 0.12s; border-radius:3px; margin:0 3px;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:6px;"><circle cx="12" cy="12" r="10"/><line x1="9.09" y1="9" x2="9.09" y2="9.01"/><line x1="14.09" y1="9" x2="14.09" y2="9.01"/><path d="M9 15a3 3 0 0 0 6 0"/></svg> 支持
  </li>
  <li id="menu-fullscreen" style="list-style:none; padding:4px 12px; cursor:pointer; font-size:12.5px; color:#fff; transition:background 0.12s; border-radius:3px; margin:0 3px;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:6px;"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg> 全屏
  </li>
  <li id="menu-close" style="list-style:none; padding:4px 12px; cursor:pointer; font-size:12.5px; color:#f87171; transition:background 0.12s; border-radius:3px; margin:0 3px;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:6px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> 关闭
  </li>
</ul>`;
}
