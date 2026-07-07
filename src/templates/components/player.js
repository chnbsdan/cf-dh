export function getPlayer() {
  return `
<!-- 浮动歌词窗口 - 毛玻璃 + 可调整大小 -->
<div id="lyrics-window" style="display:none; position:fixed; z-index:9999; min-width:280px; min-height:120px; max-width:600px; max-height:500px; background:rgba(255,255,255,0.12); backdrop-filter:blur(24px) saturate(180%); -webkit-backdrop-filter:blur(24px) saturate(180%); border-radius:16px; border:1px solid rgba(255,255,255,0.25); box-shadow:0 20px 60px rgba(0,0,0,0.4); overflow:hidden; left:100px; top:100px;">
  
  <!-- 顶部工具栏 -->
  <div style="display:flex; justify-content:flex-end; align-items:center; padding:10px 14px 4px 14px; gap:6px; background:rgba(255,255,255,0.05); border-bottom:1px solid rgba(255,255,255,0.08);">
    <input type="color" id="lyricsColorPicker" value="#ff4500" style="width:26px; height:26px; border:none; border-radius:6px; cursor:pointer; background:transparent; padding:0; border:1px solid rgba(255,255,255,0.2);">
    <button id="lyricsToggleBtn" style="background:rgba(255,255,255,0.1); border:none; color:rgba(255,255,255,0.8); cursor:pointer; padding:3px 12px; border-radius:6px; font-size:12px;">隐藏</button>
    <button id="lyricsCloseBtn" style="background:rgba(255,255,255,0.1); border:none; color:rgba(255,255,255,0.8); cursor:pointer; padding:3px 10px; border-radius:6px; font-size:12px;">✕</button>
  </div>
  
  <!-- 歌词内容 -->
  <div id="lyrics-content" style="padding:12px 20px 20px 20px; min-height:60px; max-height:400px; overflow-y:auto; cursor:grab; scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.2) transparent;">
    <div id="floating-lyrics" style="text-align:left; color:#ff4500; font-weight:bold; text-shadow:0 2px 20px rgba(0,0,0,0.5);">
      <div id="currentLine" style="font-size:26px; margin-bottom:6px; min-height:32px; line-height:1.4;"></div>
      <div id="nextLine" style="font-size:15px; opacity:0.6; min-height:20px; color:inherit;"></div>
    </div>
  </div>
  
  <!-- 右下角拖拽调整大小手柄 -->
  <div id="resize-handle" style="position:absolute; bottom:4px; right:6px; width:16px; height:16px; cursor:nwse-resize; opacity:0.5; display:flex; align-items:center; justify-content:center; font-size:14px; color:rgba(255,255,255,0.4); user-select:none;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round">
      <path d="M16 20L20 16M12 20L20 12M8 20L20 8"/>
    </svg>
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
<ul id="right-menu" style="position:fixed; display:none; z-index:99999; min-width:220px; background:rgba(255,255,255,0.12); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); color:#fff; border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,0.35); padding:6px 0; border:2px solid #10b981;">
  <li id="menu-play" style="list-style:none; padding:10px 16px; cursor:pointer; white-space:nowrap; font-weight:700; transition:all 0.3s ease;">▶ 播放 / 暂停</li>
  <li id="menu-prev" style="list-style:none; padding:10px 16px; cursor:pointer; white-space:nowrap; font-weight:700; transition:all 0.3s ease;">⏮ 上一首</li>
  <li id="menu-next" style="list-style:none; padding:10px 16px; cursor:pointer; white-space:nowrap; font-weight:700; transition:all 0.3s ease;">⏭ 下一首</li>
  <li id="menu-volup" style="list-style:none; padding:10px 16px; cursor:pointer; white-space:nowrap; font-weight:700; transition:all 0.3s ease;">🔊 音量 +</li>
  <li id="menu-voldown" style="list-style:none; padding:10px 16px; cursor:pointer; white-space:nowrap; font-weight:700; transition:all 0.3s ease;">🔉 音量 -</li>
  <li id="menu-lyrics" style="list-style:none; padding:10px 16px; cursor:pointer; white-space:nowrap; font-weight:700; transition:all 0.3s ease;">📜 显示/隐藏歌词</li>
  <li id="menu-support" style="list-style:none; padding:10px 16px; cursor:pointer; white-space:nowrap; font-weight:700; transition:all 0.3s ease;">💡 技术支持</li>
  <li id="menu-fullscreen" style="list-style:none; padding:10px 16px; cursor:pointer; white-space:nowrap; font-weight:700; transition:all 0.3s ease;">🖥️ 全屏模式</li>
  <li id="menu-close" style="list-style:none; padding:10px 16px; cursor:pointer; white-space:nowrap; font-weight:700; transition:all 0.3s ease;">❌ 关闭播放器</li>
</ul>`;
}
