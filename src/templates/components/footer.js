export function getFooter() {
  return `<footer class="footer">
  <div class="footer-content">
    <p>
      Copyright ©2024-2025 <span class="footer-link" onclick="openAboutModal()">Hangdn nav</span>. All Rights Reserved.
    </p>
    <p style="font-size:0.8rem; margin-top:4px; opacity:0.6;">
      Powered by 
      <a href="https://www.cloudflare.com/" target="_blank" style="color:#f48120; font-weight:600; text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='#faa51a'" onmouseout="this.style.color='#f48120'">
        Cloudflare
      </a>
      &nbsp;·&nbsp;
      <a href="https://github.com/chnbsdan/cf-dh" target="_blank" style="color:rgba(255,255,255,0.6); text-decoration:none; transition:color 0.3s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">
        <span class="iconify" data-icon="mdi:github" style="font-size:0.9rem; vertical-align:middle;"></span>
        GitHub
      </a>
    </p>
  </div>
</footer>`;
}
