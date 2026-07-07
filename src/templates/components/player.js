export function getPlayer() {
  return `<div id="floating-lyrics">
  <div class="current-line"></div>
  <div class="next-line"></div>
</div>

<div id="music-capsule" title="点击展开音乐播放器">
  <img id="capsule-cover" src="https://p2.music.126.net/4HGEnXVexEfF2M4WdDdfrQ==/109951166354363385.jpg" alt="capsule cover">
</div>

<div id="player-wrap" aria-hidden="true">
  <div id="aplayer-container"></div>
</div>

<ul id="right-menu" role="menu" aria-hidden="true">
  <li id="menu-play">▶ 播放 / 暂停</li>
  <li id="menu-prev">⏮ 上一首</li>
  <li id="menu-next">⏭ 下一首</li>
  <li id="menu-volup">🔊 音量 +</li>
  <li id="menu-voldown">🔉 音量 -</li>
  <li id="menu-lyrics">📜 显示/隐藏歌词</li>
  <li id="menu-support">💡 技术支持</li>
  <li id="menu-fullscreen">🖥️ 全屏模式</li>
  <li id="menu-close">❌ 关闭播放器</li>
</ul>`;
}
