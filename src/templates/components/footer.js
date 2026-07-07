export function getFooter() {
  return `<footer class="footer">
  <div class="footer-content">
    <p>Copyright ©2024-2025 <span class="footer-link" onclick="openAboutModal()">Hangdn nav</span>. All Rights Reserved.</p>
    <p style="font-size:0.8rem; margin-top:4px; opacity:0.7;">
      <a href="https://github.com/chnbsdan/cf-dh" target="_blank" style="color:rgba(255,255,255,0.7); text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.7)'">
        <span class="iconify" data-icon="mdi:github" style="font-size:1rem;"></span> 项目地址
      </a>
    </p>
  </div>
</footer>`;
}
