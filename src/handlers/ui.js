import { getNavigationData } from '../services/kv.js';
import { jsonResponse } from '../utils/response.js';
import { htmlTemplate } from './html.js';

export async function handleHomePage(request) {
  return new Response(htmlTemplate, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function handleGetData(request) {
  const navigationData = await getNavigationData();
  return jsonResponse(navigationData);
}
