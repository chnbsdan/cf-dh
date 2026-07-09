import { handleHomePage, handleGetData, handleBackup, handleRestore } from './ui.js';
import { handleLogin } from './auth.js';
import { 
  handleAddCategory, 
  handleDeleteCategory 
} from './categories.js';
import { 
  handleAddSite, 
  handleDeleteSite, 
  handleEditSite 
} from './sites.js';
import { 
  handleApplyLink, 
  handleGetPendingLinks, 
  handleApproveLink, 
  handleRejectLink 
} from './links.js';
import { withAuth } from './auth.js';
import { handleNotFound } from '../utils/response.js';
// 在 import 中添加
import { handleAbout } from './ui.js';

const routes = {
  'GET /': handleHomePage,
  'GET /data': handleGetData,
  'GET /backup': withAuth(handleBackup),
  'POST /restore': withAuth(handleRestore),
  'POST /login': handleLogin,
  'POST /add-category': withAuth(handleAddCategory),
  'POST /add-site': withAuth(handleAddSite),
  'POST /delete-category': withAuth(handleDeleteCategory),
  'POST /delete-site': withAuth(handleDeleteSite),
  'POST /edit-site': withAuth(handleEditSite),
  'POST /apply-link': handleApplyLink,
  'GET /pending-links': withAuth(handleGetPendingLinks),
  'POST /approve-link': withAuth(handleApproveLink),
  'POST /reject-link': withAuth(handleRejectLink),
    // 在 routes 中添加
  'GET /about': handleAbout,
};

export function handleRoutes(request) {
  const { pathname } = new URL(request.url);
  const method = request.method;
  const routeKey = `${method} ${pathname}`;
  
  const handler = routes[routeKey] || handleNotFound;
  return handler(request);
}
