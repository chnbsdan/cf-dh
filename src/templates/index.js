import { getNavigationData } from '../services/kv.js';
import { getHead } from './head.js';
import { getStyles } from './styles.js';
import { getBody } from './body.js';
import { getMainScript } from './scripts/main.js';
import { getPlayerScript } from './scripts/player.js';

export async function renderNavigationPage() {
  const navigationData = await getNavigationData();
  
  let html = `<!DOCTYPE html>
<html lang="zh-CN">
${getHead()}
${getStyles()}
<body>
${getBody()}
${getMainScript()}
${getPlayerScript()}
</body>
</html>`;

  // 提取并保护 style 和 script 内容
  const styleBlocks = [];
  const scriptBlocks = [];
  
  html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, content) => {
    styleBlocks.push(content);
    return `__STYLE_BLOCK_${styleBlocks.length - 1}__`;
  });
  
  html = html.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, (match, content) => {
    scriptBlocks.push(content);
    return `__SCRIPT_BLOCK_${scriptBlocks.length - 1}__`;
  });

  // 压缩 HTML：去掉换行、多余空格、缩进
  html = html
    .replace(/\r?\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();

  // 恢复 style 和 script
  styleBlocks.forEach((content, i) => {
    html = html.replace(`__STYLE_BLOCK_${i}__`, `<style>${content}</style>`);
  });
  scriptBlocks.forEach((content, i) => {
    html = html.replace(`__SCRIPT_BLOCK_${i}__`, `<script>${content}</script>`);
  });

  return html;
}
