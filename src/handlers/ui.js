import { getNavigationData } from '../services/kv.js';
import { jsonResponse } from '../utils/response.js';
import { renderNavigationPage } from '../templates/index.js';

export async function handleHomePage(request) {
  return new Response(await renderNavigationPage(), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function handleGetData(request) {
  const navigationData = await getNavigationData();
  return jsonResponse(navigationData);
}
