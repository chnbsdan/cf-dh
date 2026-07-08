export function getStyles() {
  return `<style>
  :root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --success-color: #10b981;
    --danger-color: #ef4444;
    --warning-color: #f59e0b;
    --background-color: #f8fafc;
    --card-background: rgba(255, 255, 255, 0.85);
    --glass-background: rgba(255, 255, 255, 0.25);
    --glass-border: rgba(255, 255, 255, 0.18);
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --border-color: rgba(255, 255, 255, 0.3);
    --shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--background-color);
    color: var(--text-primary);
    line-height: 1.6;
    transition: all 0.3s ease;
    min-height: 100vh;
    background-image: url('https://webp.hangdn.com/fg/fg1.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .background-container {
    position: fixed;
    inset: 0;
    z-index: -2;
    overflow: hidden;
  }

  .background-slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1.6s ease;
  }

  .background-slide.active {
    opacity: 1;
  }

  .bg-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.30);
    z-index: -1;
    pointer-events: none;
  }

  .container {
    padding: 20px;
    min-height: 100vh;
    margin-left: 60px;
    transition: margin-left 0.3s ease;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 200px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    overflow-y: auto;
    padding: 15px 0;
  }

  .sidebar.active {
    transform: translateX(0);
  }

  .sidebar-toggle {
    position: fixed;
    left: 15px;
    top: 21px;
    width: 20px;
    height: 20px;
    background: rgba(249, 115, 22, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e879f9;
    font-size: 1.1rem;
    z-index: 1001;
    transition: all 0.3s ease;
  }

  .sidebar-toggle:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  .sidebar-header {
    padding: 0 15px 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 15px;
  }

  .sidebar-title {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .category-list {
    list-style: none;
    padding: 0;
  }

  .category-item {
    padding: 10px 15px;
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
  }

  .category-item:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #f97316;
    border-left-color: var(--primary-color);
  }

  .category-item.active {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    border-left-color: var(--primary-color);
  }

  .category-icon {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .category-count {
    margin-left: auto;
    background: rgba(255, 255, 255, 0.2);
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 0.75rem;
    min-width: 20px;
    text-align: center;
  }

  .container.sidebar-expanded {
    margin-left: 200px;
  }

  @media (max-width: 768px) {
    .container {
      margin-left: 0;
      padding: 15px;
    }
    .sidebar {
      width: 250px;
    }
    .container.sidebar-expanded {
      margin-left: 0;
    }
    .sidebar-toggle {
      left: 10px;
      top: 10px;
    }
  }

  .header {
    color: white;
    padding: 1rem 0;
    margin-bottom: 1rem;
    text-align: center;
    position: relative;
    width: 100%;
  }

  .header-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .header-logo {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 0.3rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .header-logo:hover {
    transform: scale(1.05);
  }

  .logo-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    object-fit: cover;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }

  .logo-icon:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
  }

  .header h1 {
    font-size: 2rem;
    font-weight: 800;
    margin: 0;
    color: white;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
    letter-spacing: 1px;
  }

  .header p {
    font-size: 1rem;
    opacity: 0.95;
    font-weight: 500;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin: 0;
  }

  .back-to-top {
    position: fixed;
    bottom: 110px;
    right: 30px;
    width: 30px;
    height: 30px;
    background: #ffa500;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
    color: white;
    font-size: 1.2rem;
    z-index: 1000;
  }

  .back-to-top:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(99, 102, 241, 0.4);
  }

  .admin-floating-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .gear-btn, .logout-btn, .apply-link-btn {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
  }

  .gear-btn {
    background: #87ceeb;
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  }

  .gear-btn:hover {
    transform: rotate(90deg) scale(1.1);
    box-shadow: 0 12px 35px rgba(99, 102, 241, 0.4);
  }

  .logout-btn {
    background: linear-gradient(135deg, var(--danger-color), #f97316);
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
  }

  .logout-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(239, 68, 68, 0.4);
  }

  .apply-link-btn {
    background: linear-gradient(135deg, var(--success-color), #22c55e);
    box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
    font-size: 1.5rem;
  }

  .apply-link-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(34, 197, 94, 0.4);
  }

  .control-panel {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 1.2rem;
    border-radius: 16px;
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
    display: none;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .control-panel.active {
    display: flex;
  }

  .auth-section {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    font-size: 0.9rem;
  }

  .btn-primary {
    background: var(--primary-color);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
  }

  .btn-danger {
    background: var(--danger-color);
    color: white;
  }

  .btn-success {
    background: var(--success-color);
    color: white;
  }

  .btn-warning {
    background: var(--warning-color);
    color: white;
  }

  .category {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .category:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.2);
  }

  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

  .category-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  .category-actions {
    display: flex;
    gap: 0.5rem;
  }

  .icon-btn {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.5rem;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .icon-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  /* ===== 网站网格 - 更紧凑（一行8个） ===== */
  .sites-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.8rem;
  }

  /* ===== 网站卡片 - 更紧凑 ===== */
  .site-card {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    padding: 0.8rem 0.4rem;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
    cursor: pointer;
  }

  .site-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: var(--primary-color);
    background: rgba(255, 255, 255, 0.3);
  }

  /* ===== 网站图标 - 更小 ===== */
  .site-icon {
    width: 44px;
    height: 44px;
    margin: 0 auto 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.6rem;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5));
  }

  .site-icon img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    border-radius: 8px;
  }

  /* ===== 网站名称 - 更小 ===== */
  .site-name {
    font-weight: 600;
    color: white;
    margin-bottom: 0.2rem;
    font-size: 0.78rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ===== 网站地址 - 更小 ===== */
  .site-url {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.6);
    word-break: break-all;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .site-actions {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    gap: 0.25rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .site-card:hover .site-actions {
    opacity: 1;
  }

  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 2000;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background: var(--card-background);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 2rem;
    max-width: 450px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow);
    animation: modalSlideIn 0.3s ease;
  }

  .modal-content-wide {
    max-width: 800px;
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-50px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .modal-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-secondary);
    padding: 0.25rem;
    border-radius: 6px;
    transition: all 0.3s ease;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: var(--text-primary);
  }

  .form-group {
    margin-bottom: 1.2rem;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.9rem;
  }

  .form-input {
    width: 100%;
    padding: 0.7rem 1rem;
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    background: rgba(255, 255, 255, 0.15);
  }

  .form-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1rem;
  }

  .hidden {
    display: none !important;
  }

  .text-center {
    text-align: center;
  }

  .empty-state {
    text-align: center;
    padding: 3rem 2rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .empty-state .iconify {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
    color: white;
  }

  #player-wrap {
    position: fixed;
    left: 18px;
    bottom: 92px;
    width: 360px;
    max-width: calc(100% - 36px);
    z-index: 15000;
    display: none;
    transform-origin: left bottom;
  }

  #player-wrap.show {
    display: block;
    animation: popIn .18s ease;
  }

  @keyframes popIn {
    from { opacity: 0; transform: scale(.96); }
    to { opacity: 1; transform: scale(1); }
  }

  .aplayer {
    border-radius: 12px !important;
    overflow: hidden !important;
    background: rgba(255, 255, 255, 0.9) !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .aplayer .aplayer-lrc p {
    color: orange !important;
    font-weight: 700;
  }

  .aplayer .aplayer-info .aplayer-music .aplayer-title {
    color: #000 !important;
    font-weight: bold;
  }

  .aplayer .aplayer-list ol li {
    color: #000 !important;
  }

  .aplayer .aplayer-list ol li .aplayer-list-title {
    color: #000 !important;
  }

  .aplayer .aplayer-lrc p {
    color: #ff8c00 !important;
  }

  .aplayer .aplayer-lrc p.aplayer-lrc-current {
    color: #ff4500 !important;
    font-weight: bold;
    font-size: 16px;
  }

  .aplayer .aplayer-info {
    border-top: none;
    padding: 12px 15px 8px;
  }

  .aplayer .aplayer-list ol li {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .aplayer .aplayer-list ol li:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  .aplayer .aplayer-list ol li.aplayer-list-light {
    background: rgba(255, 140, 0, 0.1);
  }

  .pending-link-item {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .pending-link-item h4 {
    color: white;
    margin: 0;
  }

  .pending-link-item p {
    color: rgba(255, 255, 255, 0.8);
    margin: 0.5rem 0;
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    z-index: 100;
  }

  .footer-content {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  .footer-link {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    transition: all 0.3s ease;
    padding-bottom: 1px;
    cursor: pointer;
  }

  .footer-link:hover {
    color: white;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }

  .datetime-display {
    position: fixed;
    top: 20px;
    right: 20px;
    text-align: center;
    z-index: 100;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    min-width: 140px;
  }

  .date-text {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 4px;
    color: #10b981;
  }

  .time-text {
    font-size: 1.4rem;
    font-weight: 700;
    color: #f97316;
    font-family: 'Courier New', monospace;
  }

  @media (max-width: 768px) {
    .datetime-display {
      top: 15px;
      right: 15px;
      padding: 10px 12px;
      min-width: 120px;
    }
    .date-text {
      font-size: 0.8rem;
    }
    .time-text {
      font-size: 1.2rem;
    }
    .footer {
      padding: 0.8rem 0;
    }
    .footer-content {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .datetime-display {
      top: 10px;
      right: 10px;
      padding: 8px 10px;
      min-width: 100px;
    }
    .date-text {
      font-size: 0.7rem;
    }
    .time-text {
      font-size: 1rem;
    }
  }

  .footer-link-section {
    background: #0066cc;
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 1.2rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 1.5rem;
  }

  .footer-link-section h4 {
    color: #4CAF50;
    margin-bottom: 0.8rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .footer-link-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-link-list li {
    margin-bottom: 0.5rem;
  }

  .footer-link-list a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 0.85rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .footer-link-list a:hover {
    color: white;
    transform: translateX(5px);
  }

  .search-engine-btn {
    background: #4CAF50;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    padding: 1rem 0.5rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    backdrop-filter: blur(10px);
  }

  .search-engine-btn:hover {
    background: rgba(76, 175, 80, 0.5);
    transform: translateY(-2px);
    border-color: var(--primary-color);
  }

  .search-engine-btn span:last-child {
    font-size: 0.85rem;
    font-weight: 600;
  }

  .search-engines-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }

  /* ===== 歌词窗口滚动条 ===== */
  #lyrics-content::-webkit-scrollbar {
    width: 4px;
  }
  #lyrics-content::-webkit-scrollbar-track {
    background: transparent;
  }
  #lyrics-content::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.3);
    border-radius: 4px;
  }
  #lyrics-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.5);
  }

  /* ===== 颜色选择器样式 ===== */
  #lyricsColorPicker::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  #lyricsColorPicker::-webkit-color-swatch {
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 4px;
  }

  /* ===== 音乐胶囊动画 ===== */
  #music-capsule.playing {
    background: radial-gradient(circle at 30% 30%, #ff9500,#ff5e00);
    box-shadow: 0 8px 28px rgba(255,140,0,0.28);
  }

  #music-capsule.playing img {
    animation: spin 6s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0); }
    to { transform: rotate(360deg); }
  }

  /* ===== 右键菜单样式 ===== */
  #right-menu {
    position: fixed;
    display: none;
    z-index: 99999;
    min-width: 220px;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    padding: 6px 0;
    border: 2px solid #10b981;
  }

  #right-menu.show {
    display: flex;
    opacity: 1;
    transform: scale(1);
    flex-direction: column;
  }

  #right-menu li {
    list-style: none;
    padding: 10px 16px;
    cursor: pointer;
    white-space: nowrap;
    font-weight: 700;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  #right-menu li:hover {
    background: #3b82f6 !important;
    color: white !important;
    border-radius: 6px;
    transform: translateX(5px);
  }

  #right-menu li:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  #right-menu li:hover::before {
    left: 100%;
  }

  #right-menu::after {
    content: "";
    position: absolute;
    top: -8px;
    left: var(--arrow-left, 24px);
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid rgba(255, 255, 255, 0.12);
  }

  #right-menu li:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* ===== 响应式 ===== */
  @media (max-width:900px) {
    #music-capsule {
      left: 18px;
      bottom: 22px;
    }
    #player-wrap {
      left: 12px;
      bottom: 84px;
      width: calc(100% - 24px);
    }
  }

  /* ===== 移动端卡片适配 ===== */
  @media (max-width: 600px) {
    .sites-grid {
      grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
      gap: 0.5rem;
    }
    .site-card {
      padding: 0.5rem 0.2rem;
      border-radius: 8px;
    }
    .site-icon {
      width: 36px;
      height: 36px;
      font-size: 1.2rem;
      margin: 0 auto 0.3rem;
    }
    .site-icon img {
      width: 24px;
      height: 24px;
    }
    .site-name {
      font-size: 0.65rem;
    }
    .site-url {
      font-size: 0.55rem;
    }
    .category {
      padding: 0.8rem;
    }
    .category-title {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 400px) {
    .sites-grid {
      grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
      gap: 0.4rem;
    }
    .site-card {
      padding: 0.4rem 0.1rem;
      border-radius: 6px;
    }
    .site-icon {
      width: 30px;
      height: 30px;
      font-size: 1rem;
      margin: 0 auto 0.2rem;
    }
    .site-icon img {
      width: 20px;
      height: 20px;
    }
    .site-name {
      font-size: 0.55rem;
    }
    .site-url {
      display: none;
    }
  }
  /* ===== 歌单管理 ===== */
  .playlist-current {
    background: rgba(99,102,241,0.08);
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 12px;
    border-left: 3px solid #6366f1;
  }
  .playlist-current-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .playlist-current-label {
    color: rgba(255,255,255,0.5);
    font-size: 12px;
  }
  .playlist-current-name {
    color: #fff;
    font-weight: 600;
    font-size: 14px;
  }
  .playlist-current-id {
    color: rgba(255,255,255,0.3);
    font-size: 11px;
    margin-top: 2px;
  }
  .playlist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }
  .playlist-header-label {
    color: rgba(255,255,255,0.5);
    font-size: 12px;
  }
  .playlist-header-count {
    color: rgba(255,255,255,0.3);
    font-size: 11px;
  }
  .playlist-list {
    max-height: 200px;
    overflow-y: auto;
  }
  .playlist-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 6px;
    margin-bottom: 4px;
  }
  .playlist-item-active {
    background: rgba(99,102,241,0.15);
    border: 1px solid rgba(99,102,241,0.3);
  }
  .playlist-item-inactive {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.04);
  }
  .playlist-item-icon {
    font-size: 14px;
  }
  .playlist-item-name {
    flex: 1;
    font-size: 13px;
  }
  .playlist-item-name-active {
    color: #fff;
    font-weight: 600;
  }
  .playlist-item-name-inactive {
    color: rgba(255,255,255,0.6);
    font-weight: 400;
  }
  .playlist-item-id {
    color: rgba(255,255,255,0.25);
    font-size: 10px;
  }
  .playlist-btn-play {
    padding: 3px 10px;
    border-radius: 4px;
    border: 1px solid rgba(99,102,241,0.2);
    cursor: pointer;
    font-size: 11px;
  }
  .playlist-btn-play-active {
    background: rgba(16,185,129,0.2);
    border-color: rgba(16,185,129,0.3);
    color: #10b981;
  }
  .playlist-btn-play-inactive {
    background: rgba(99,102,241,0.15);
    color: rgba(255,255,255,0.6);
  }
  .playlist-btn-delete {
    padding: 3px 6px;
    background: rgba(239,68,68,0.1);
    border: none;
    border-radius: 4px;
    color: rgba(239,68,68,0.5);
    cursor: pointer;
    font-size: 11px;
  }
  .playlist-add {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 12px;
  }
  .playlist-add-form {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .playlist-add-input {
    flex: 1;
    min-width: 100px;
    padding: 6px 10px;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px;
    background: rgba(255,255,255,0.06);
    color: white;
    font-size: 13px;
    outline: none;
  }
  .playlist-add-btn {
    padding: 6px 16px;
    background: linear-gradient(135deg,#6366f1,#8b5cf6);
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    font-size: 13px;
    white-space: nowrap;
  }
  .playlist-status {
    margin-top: 6px;
    font-size: 12px;
    text-align: center;
    display: none;
  }
  .playlist-hint {
    margin-top: 4px;
    color: rgba(255,255,255,0.2);
    font-size: 10px;
  }

  /* ===== 歌单管理2 ===== */
  .playlist-current {
    background: rgba(99,102,241,0.08);
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 12px;
    border-left: 3px solid #6366f1;
  }
  .playlist-current-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .playlist-current-label {
    color: rgba(255,255,255,0.5);
    font-size: 12px;
  }
  .playlist-current-name {
    color: #fff;
    font-weight: 600;
    font-size: 14px;
  }
  .playlist-current-id {
    color: rgba(255,255,255,0.3);
    font-size: 11px;
    margin-top: 2px;
  }
  .playlist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }
  .playlist-header-label {
    color: rgba(255,255,255,0.5);
    font-size: 12px;
  }
  .playlist-header-count {
    color: rgba(255,255,255,0.3);
    font-size: 11px;
  }
  .playlist-list {
    max-height: 200px;
    overflow-y: auto;
  }
  .playlist-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 6px;
    margin-bottom: 4px;
  }
  .playlist-item-active {
    background: rgba(99,102,241,0.15);
    border: 1px solid rgba(99,102,241,0.3);
  }
  .playlist-item-inactive {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.04);
  }
  .playlist-item-icon {
    font-size: 14px;
  }
  .playlist-item-name {
    flex: 1;
    font-size: 13px;
  }
  .playlist-item-name-active {
    color: #fff;
    font-weight: 600;
  }
  .playlist-item-name-inactive {
    color: rgba(255,255,255,0.6);
    font-weight: 400;
  }
  .playlist-item-id {
    color: rgba(255,255,255,0.25);
    font-size: 10px;
  }
  .playlist-btn-play {
    padding: 3px 10px;
    border-radius: 4px;
    border: 1px solid rgba(99,102,241,0.2);
    cursor: pointer;
    font-size: 11px;
  }
  .playlist-btn-play-active {
    background: rgba(16,185,129,0.2);
    border-color: rgba(16,185,129,0.3);
    color: #10b981;
  }
  .playlist-btn-play-inactive {
    background: rgba(99,102,241,0.15);
    color: rgba(255,255,255,0.6);
  }
  .playlist-btn-delete {
    padding: 3px 6px;
    background: rgba(239,68,68,0.1);
    border: none;
    border-radius: 4px;
    color: rgba(239,68,68,0.5);
    cursor: pointer;
    font-size: 11px;
  }
  .playlist-add {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 12px;
  }
  .playlist-add-form {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .playlist-add-input {
    flex: 1;
    min-width: 100px;
    padding: 6px 10px;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px;
    background: rgba(255,255,255,0.06);
    color: white;
    font-size: 13px;
    outline: none;
  }
  .playlist-add-btn {
    padding: 6px 16px;
    background: linear-gradient(135deg,#6366f1,#8b5cf6);
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    font-size: 13px;
    white-space: nowrap;
  }
  .playlist-status {
    margin-top: 6px;
    font-size: 12px;
    text-align: center;
    display: none;
  }
  .playlist-hint {
    margin-top: 4px;
    color: rgba(255,255,255,0.2);
    font-size: 10px;
  }
  
</style>`;
}
