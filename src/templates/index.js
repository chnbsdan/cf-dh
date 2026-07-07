import { getHead } from './head.js';
import { getStyles } from './styles.js';
import { getBody } from './body.js';
import { getMainScript } from './scripts/main.js';
import { getPlayerScript } from './scripts/player.js';
import { getBackgroundScript } from './scripts/background.js';

export async function renderNavigationPage() {
  const navigationData = await getNavigationData();
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
${getHead()}
${getStyles()}
<body>
${getBody()}
${getMainScript()}
${getPlayerScript()}
${getBackgroundScript()}
</body>
</html>`;
}
