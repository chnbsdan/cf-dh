export function getPlayerScript() {
  return `<script>
const PLAYLIST_ID = '14148542684';

const capsule = document.getElementById('music-capsule');
const capsuleCover = document.getElementById('capsule-cover');
const playerWrap = document.getElementById('player-wrap');
const aplayerContainer = document.getElementById('aplayer-container');
const rightMenu = document.getElementById('right-menu');

let aplayer = null;
let lyricsInterval = null;
let currentLyric = '';
let lyricsVisible = true;

const floatingLyrics = document.getElementById('floating-lyrics');
const currentLineEl = floatingLyrics.querySelector('.current-line');
const nextLineEl = floatingLyrics.querySelector('.next-line');

function showLyricsWithEffect(currentText, nextText) {
  if (!lyricsVisible) return;
  if (currentText === currentLyric) return;
  
  currentLyric = currentText;
  currentLineEl.innerHTML = '';
  
  if (currentText && currentText.trim()) {
    const typingSpan = document.createElement('span');
    typingSpan.className = 'typing-text';
    typingSpan.textContent = currentText;
    
    const fadeSpan = document.createElement('span');
    fadeSpan.className = 'fade-in-text';
    fadeSpan.textContent = currentText;
    
    if (currentText.length > 15) {
      currentLineEl.appendChild(fadeSpan);
    } else {
      currentLineEl.appendChild(typingSpan);
    }
    
    nextLineEl.textContent = nextText || '';
    floatingLyrics.classList.add('show');
  } else {
    floatingLyrics.classList.remove('show');
  }
}

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
      floatingLyrics.classList.remove('show');
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
      
      showLyricsWithEffect(currentText, nextText);
    } else {
      floatingLyrics.classList.remove('show');
      currentLyric = '';
    }
  } catch (error) {
    console.log('歌词更新错误:', error);
    floatingLyrics.classList.remove('show');
    currentLyric = '';
  }
}

function initMeting() {
  if (aplayer) return Promise.resolve(aplayer);
  return new Promise(async (resolve, reject) => {
    try {
      aplayerContainer.innerHTML = '';
      
      const apiUrl = 'https://api.injahow.cn/meting/?server=netease&type=playlist&id=' + PLAYLIST_ID;
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
    startLyricsUpdate();
  });
  ap.on('pause', () => {
    capsule.classList.remove('playing');
    floatingLyrics.classList.remove('show');
    currentLyric = '';
  });
  ap.on('ended', () => {
    floatingLyrics.classList.remove('show');
    currentLyric = '';
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

capsule.addEventListener('click', () => {
  capsule.style.display = 'none';
  playerWrap.classList.add('show');
  initMeting().catch(() => {});
});

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
  if (!rightMenu.contains(e.target)) hideRightMenuImmediate();
});

document.addEventListener('touchstart', (e) => {
  if (!rightMenu.contains(e.target)) hideRightMenuImmediate();
});

function toggleLyricsVisibility() {
  lyricsVisible = !lyricsVisible;
  
  if (lyricsVisible) {
    floatingLyrics.classList.add('show');
    if (aplayer && !aplayer.audio.paused) {
      startLyricsUpdate();
    }
  } else {
    floatingLyrics.classList.remove('show');
    currentLineEl.textContent = '';
    nextLineEl.textContent = '';
    currentLyric = '';
  }
  
  const lyricsMenuItem = document.getElementById('menu-lyrics');
  lyricsMenuItem.textContent = lyricsVisible ? '📜 隐藏歌词' : '📜 显示歌词';
  localStorage.setItem('lyricsVisible', lyricsVisible.toString());
}

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
  playerWrap.classList.remove('show');
  capsule.style.display = 'flex';
  hideRightMenuImmediate();
});

initMeting().then(() => {
  console.log('APlayer初始化完成');
}).catch(() => {
  console.log('APlayer初始化失败');
});

document.addEventListener('DOMContentLoaded', function() {
  const savedLyricsVisible = localStorage.getItem('lyricsVisible');
  if (savedLyricsVisible !== null) {
    lyricsVisible = savedLyricsVisible === 'true';
  }
  const lyricsMenuItem = document.getElementById('menu-lyrics');
  lyricsMenuItem.textContent = lyricsVisible ? '📜 隐藏歌词' : '📜 显示歌词';
  if (!lyricsVisible) {
    floatingLyrics.classList.remove('show');
  }
});
</script>`;
}
