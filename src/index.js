import { handleRoutes } from './handlers/routes.js';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  return handleRoutes(request);
}
