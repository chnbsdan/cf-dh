export function getPlayerScript() {
  return `<script>
// 获取歌单ID（从localStorage或默认）
function getPlaylistId() {
  return localStorage.getItem('playlistId') || '14148542684';
}

const capsule = document.getElementById('music-capsule');
const capsuleCover = document.getElementById('capsule-cover');
const playerWrap = document.getElementById('player-wrap');
const aplayerContainer = document.getElementById('aplayer-container');
const rightMenu = document.getElementById('right-menu');

// 歌词窗口元素
const lyricsWindow = document.getElementById('lyrics-window');
const lyricsContent = document.getElementById('floating-lyrics');
const currentLineEl = document.getElementById('currentLine');
const nextLineEl = document.getElementById('nextLine');
const colorPicker = document.getElementById('lyricsColorPicker');
const lyricsToggleBtn = document.getElementById('lyricsToggleBtn');
const lyricsCloseBtn = document.getElementById('lyricsCloseBtn');

let aplayer = null;
let lyricsInterval = null;
let currentLyric = '';
let lyricsVisible = false;
let isDragging = false;

// ============ 歌词窗口拖动功能 ============
function initDrag() {
  const dragArea = document.getElementById('lyrics-content');
  let startX, startY, origLeft, origTop;
  
  if (!dragArea) return;
  
  dragArea.addEventListener('mousedown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
    
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    origLeft = parseInt(lyricsWindow.style.left) || 100;
    origTop = parseInt(lyricsWindow.style.top) || 100;
    
    lyricsWindow.style.cursor = 'grabbing';
    dragArea.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    let newLeft = origLeft + dx;
    let newTop = origTop + dy;
    
    const maxLeft = window.innerWidth - lyricsWindow.offsetWidth - 20;
    const maxTop = window.innerHeight - lyricsWindow.offsetHeight - 20;
    newLeft = Math.max(20, Math.min(newLeft, maxLeft));
    newTop = Math.max(20, Math.min(newTop, maxTop));
    
    lyricsWindow.style.left = newLeft + 'px';
    lyricsWindow.style.top = newTop + 'px';
  });

  document.addEventListener('mouseup', function() {
    if (isDragging) {
      isDragging = false;
      lyricsWindow.style.cursor = 'default';
      if (dragArea) dragArea.style.cursor = 'grab';
    }
  });
}

// ============ 歌词窗口调整大小 ============
function initResize() {
  const resizeHandle = document.getElementById('resize-handle');
  if (!resizeHandle) return;
  
  let isResizing = false;
  let startX, startY, startWidth, startHeight;
  
  resizeHandle.addEventListener('mouseenter', function() {
    this.style.background = 'rgba(255,255,255,0.10)';
  });
  resizeHandle.addEventListener('mouseleave', function() {
    if (!isResizing) {
      this.style.background = 'rgba(255,255,255,0.04)';
    }
  });
  
  resizeHandle.addEventListener('mousedown', function(e) {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = lyricsWindow.offsetWidth;
    startHeight = lyricsWindow.offsetHeight;
    lyricsWindow.style.cursor = 'nwse-resize';
    this.style.background = 'rgba(255,255,255,0.15)';
    e.preventDefault();
    e.stopPropagation();
  });

  document.addEventListener('mousemove', function(e) {
    if (!isResizing) return;
    
    let newWidth = startWidth + (e.clientX - startX);
    let newHeight = startHeight + (e.clientY - startY);
    
    newWidth = Math.max(280, Math.min(600, newWidth));
    newHeight = Math.max(120, Math.min(500, newHeight));
    
    lyricsWindow.style.width = newWidth + 'px';
    lyricsWindow.style.height = newHeight + 'px';
    
    const content = document.getElementById('lyrics-content');
    if (content) {
      content.style.maxHeight = (newHeight - 70) + 'px';
    }
  });

  document.addEventListener('mouseup', function() {
    if (isResizing) {
      isResizing = false;
      lyricsWindow.style.cursor = 'default';
      const handle = document.getElementById('resize-handle');
      if (handle) handle.style.background = 'rgba(255,255,255,0.04)';
      localStorage.setItem('lyricsWidth', lyricsWindow.offsetWidth);
      localStorage.setItem('lyricsHeight', lyricsWindow.offsetHeight);
    }
  });
}

// ============ 颜色修改功能 ============
function initColorPicker() {
  if (!colorPicker) return;
  
  colorPicker.addEventListener('input', function() {
    const color = this.value;
    lyricsContent.style.color = color;
    currentLineEl.style.color = color;
    nextLineEl.style.color = color;
    localStorage.setItem('lyricsColor', color);
  });
  
  const savedColor = localStorage.getItem('lyricsColor');
  if (savedColor) {
    colorPicker.value = savedColor;
    lyricsContent.style.color = savedColor;
    currentLineEl.style.color = savedColor;
    nextLineEl.style.color = savedColor;
  }
}

// ============ 歌词显示函数 ============
function showLyrics(currentText, nextText) {
  if (!lyricsVisible) return;
  if (currentText === currentLyric && currentText) return;
  
  currentLyric = currentText;
  
  if (currentText && currentText.trim()) {
    const color = localStorage.getItem('lyricsColor') || '#ff4500';
    currentLineEl.style.color = color;
    nextLineEl.style.color = color;
    
    currentLineEl.innerHTML = '';
    const chars = currentText.split('');
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < chars.length) {
        currentLineEl.textContent += chars[index];
        index++;
        const container = document.getElementById('lyrics-content');
        if (container) container.scrollTop = container.scrollHeight;
      } else {
        clearInterval(typeInterval);
      }
    }, 30);
    
    nextLineEl.textContent = nextText || '';
    lyricsWindow.style.display = 'block';
    lyricsContent.style.display = 'block';
  } else {
    currentLineEl.textContent = '🎵 等待播放...';
    nextLineEl.textContent = '';
  }
}

// ============ 歌词窗口开关 ============
function toggleLyricsVisibility() {
  lyricsVisible = !lyricsVisible;
  
  if (lyricsVisible) {
    lyricsWindow.style.display = 'block';
    lyricsContent.style.display = 'block';
    lyricsToggleBtn.textContent = '▾';
    if (aplayer && !aplayer.audio.paused) {
      startLyricsUpdate();
    }
  } else {
    lyricsWindow.style.display = 'none';
    lyricsToggleBtn.textContent = '▸';
    if (lyricsInterval) {
      clearInterval(lyricsInterval);
    }
  }
  
  localStorage.setItem('lyricsVisible', lyricsVisible.toString());
}

function closeLyricsWindow() {
  lyricsVisible = false;
  lyricsWindow.style.display = 'none';
  lyricsToggleBtn.textContent = '▸';
  if (lyricsInterval) {
    clearInterval(lyricsInterval);
  }
  localStorage.setItem('lyricsVisible', 'false');
}

window.toggleLyricsVisibility = toggleLyricsVisibility;
window.closeLyricsWindow = closeLyricsWindow;

if (lyricsToggleBtn) {
  lyricsToggleBtn.addEventListener('click', toggleLyricsVisibility);
}
if (lyricsCloseBtn) {
  lyricsCloseBtn.addEventListener('click', closeLyricsWindow);
}

// ============ 歌词更新 ============
function startLyricsUpdate() {
  if (lyricsInterval) {
    clearInterval(lyricsInterval);
  }
  lyricsInterval = setInterval(updateLyricsFromDOM, 100);
}

function updateLyricsFromDOM() {
  try {
    if (!lyricsVisible) return;
    
    const lrcContainer = document.querySelector('.aplayer-lrc');
    if (!lrcContainer) {
      showLyrics('🎵 暂无歌词', '');
      return;
    }
    
    const currentLrc = lrcContainer.querySelector('p.aplayer-lrc-current');
    const allLrcLines = lrcContainer.querySelectorAll('p');
    
    if (currentLrc && currentLrc.textContent.trim()) {
      const currentText = currentLrc.textContent.trim();
      let nextText = '';
      
      for (let i = 0; i < allLrcLines.length; i++) {
        if (allLrcLines[i] === currentLrc && i < allLrcLines.length - 1) {
          nextText = allLrcLines[i + 1].textContent.trim();
          break;
        }
      }
      
      showLyrics(currentText, nextText);
    } else {
      showLyrics('🎵 等待播放...', '');
    }
  } catch (error) {
    console.log('歌词更新错误:', error);
  }
}

// ============ 初始化播放器（支持动态歌单） ============
function initMeting() {
  if (aplayer) return Promise.resolve(aplayer);
  return new Promise(async (resolve, reject) => {
    try {
      aplayerContainer.innerHTML = '';
      
      const playlistId = getPlaylistId();
      const apiUrl = 'https://api.injahow.cn/meting/?server=netease&type=playlist&id=' + playlistId;
      const response = await fetch(apiUrl);
      const songs = await response.json();
      
      if (!songs || songs.length === 0) {
        throw new Error('歌单加载失败');
      }
      
      const audioList = [];
      for (const song of songs) {
        let lrc = song.lrc || '';
        if (!lrc || lrc === '') {
          try {
            const lrcUrl = 'https://api.uomg.com/api/163/lyric?id=' + song.id;
            const lrcRes = await fetch(lrcUrl);
            const lrcData = await lrcRes.json();
            lrc = lrcData.lyric || '';
          } catch(e) {
            console.log('获取歌词失败:', song.name);
          }
        }
        
        audioList.push({
          name: song.name,
          artist: song.artist,
          url: song.url,
          cover: song.pic,
          lrc: lrc
        });
      }
      
      aplayer = new APlayer({
        container: aplayerContainer,
        audio: audioList,
        theme: '#49b1f5',
        loop: 'all',
        preload: 'auto',
        volume: 0.7,
        lrcType: 3
      });
      
      bindAPlayerEvents(aplayer);
      resolve(aplayer);
    } catch (error) {
      console.error('歌单加载失败:', error);
      reject(error);
    }
  });
}

function bindAPlayerEvents(ap) {
  if (!ap) return;
  
  function updateCover() {
    try {
      const info = ap.list.audios[ap.list.index];
      if (info && info.cover) capsuleCover.src = info.cover;
    } catch(e){}
  }
  
  ap.on('loadeddata', updateCover);
  ap.on('listswitch', updateCover);
  ap.on('play', () => {
    capsule.classList.add('playing');
    if (lyricsVisible) {
      startLyricsUpdate();
    }
  });
  ap.on('pause', () => {
    capsule.classList.remove('playing');
    if (lyricsInterval) {
      clearInterval(lyricsInterval);
    }
    showLyrics('⏸ 已暂停', '');
  });
  ap.on('ended', () => {
    showLyrics('🎵 播放结束', '');
  });
}

async function ensurePlayerAndRun(fn) {
  try {
    const ap = await initMeting();
    if (typeof fn === 'function') fn(ap);
  } catch(err) {
    console.warn('播放器未就绪：', err);
  }
}

// ============ 胶囊点击 - 展开播放器 ============
capsule.addEventListener('click', () => {
  capsule.style.display = 'none';
  playerWrap.style.display = 'block';
  initMeting().catch(() => {});
});

// ============ 右键菜单 ============
function showRightMenuAt(clientX, clientY) {
  rightMenu.style.display = 'block';
  rightMenu.classList.remove('show');
  requestAnimationFrame(() => {
    const mw = rightMenu.offsetWidth || 220;
    const mh = rightMenu.offsetHeight || 280;
    let left = Math.round(clientX - mw/2);
    left = Math.max(8, Math.min(left, window.innerWidth - mw - 8));
    let top = clientY - mh - 12;
    if (top < 8) top = clientY + 12;
    if (top + mh > window.innerHeight - 8) top = Math.max(8, window.innerHeight - mh - 8);
    rightMenu.style.left = left + 'px';
    rightMenu.style.top = top + 'px';
    const arrowLeft = Math.max(12, Math.min(clientX - left, mw - 12));
    rightMenu.style.setProperty('--arrow-left', arrowLeft + 'px');
    rightMenu.classList.add('show');
  });
}

document.addEventListener('contextmenu', (e) => {
  if (e.ctrlKey) return true;
  e.preventDefault();
  showRightMenuAt(e.clientX, e.clientY);
});

function hideRightMenuImmediate() {
  rightMenu.classList.remove('show');
  rightMenu.style.display = 'none';
}

document.addEventListener('click', (e) => {
  if (rightMenu.style.display !== 'none' && !rightMenu.contains(e.target)) {
    hideRightMenuImmediate();
  }
});

document.addEventListener('touchstart', (e) => {
  if (rightMenu.style.display !== 'none' && !rightMenu.contains(e.target)) {
    hideRightMenuImmediate();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideRightMenuImmediate();
});

// ============ 菜单事件 ============
document.getElementById('menu-play').addEventListener('click', () => { 
  ensurePlayerAndRun(ap => ap.toggle()); 
  hideRightMenuImmediate(); 
});

document.getElementById('menu-prev').addEventListener('click', () => { 
  ensurePlayerAndRun(ap => ap.skipBack()); 
  hideRightMenuImmediate(); 
});

document.getElementById('menu-next').addEventListener('click', () => { 
  ensurePlayerAndRun(ap => ap.skipForward()); 
  hideRightMenuImmediate(); 
});

document.getElementById('menu-volup').addEventListener('click', () => { 
  ensurePlayerAndRun(ap => ap.volume(Math.min((ap.audio.volume||0.8)+0.1,1), true)); 
  hideRightMenuImmediate(); 
});

document.getElementById('menu-voldown').addEventListener('click', () => { 
  ensurePlayerAndRun(ap => ap.volume(Math.max((ap.audio.volume||0.2)-0.1,0), true)); 
  hideRightMenuImmediate(); 
});

document.getElementById('menu-lyrics').addEventListener('click', () => { 
  toggleLyricsVisibility(); 
  hideRightMenuImmediate(); 
});

document.getElementById('menu-support').addEventListener('click', () => { 
  window.open('https://1356666.xyz','_blank'); 
  hideRightMenuImmediate(); 
});

document.getElementById('menu-fullscreen').addEventListener('click', () => {
  hideRightMenuImmediate();
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
});

document.getElementById('menu-close').addEventListener('click', () => {
  ensurePlayerAndRun(ap => ap.pause());
  playerWrap.style.display = 'none';
  capsule.style.display = 'flex';
  hideRightMenuImmediate();
});

// ============ 初始化 ============
document.addEventListener('DOMContentLoaded', function() {
  initDrag();
  initColorPicker();
  initResize();
  
  const savedWidth = localStorage.getItem('lyricsWidth');
  const savedHeight = localStorage.getItem('lyricsHeight');
  if (savedWidth) lyricsWindow.style.width = savedWidth + 'px';
  if (savedHeight) lyricsWindow.style.height = savedHeight + 'px';
  
  const savedVisible = localStorage.getItem('lyricsVisible');
  if (savedVisible === 'true') {
    lyricsVisible = true;
    lyricsWindow.style.display = 'block';
    lyricsToggleBtn.textContent = '▾';
  }
  
  initMeting().then(() => {
    console.log('APlayer初始化完成');
  }).catch(() => {
    console.log('APlayer初始化失败');
  });
});
</script>`;
}
