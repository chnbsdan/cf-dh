import { getNavigationData } from '../services/kv.js';
import { getHead } from './head.js';
import { getStyles } from './styles.js';
import { getBody } from './body.js';
import { getMainScript } from './scripts/main.js';
import { getPlayerScript } from './scripts/player.js';

export async function renderNavigationPage() {
  const navigationData = await getNavigationData();
  
  // 返回压缩后的 HTML（去掉所有多余空白，变成一行）
  return `<!DOCTYPE html>
<html lang="zh-CN">
${getHead()}
${getStyles()}
<body>
${getBody()}
${getMainScript()}
${getPlayerScript()}
</body>
</html>`.replace(/\s+/g, ' ');
}
