import { handleHomePage, handleGetData, handleBackup, handleRestore, handleAbout } from './ui.js';
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

const routes = {
  'GET /': handleHomePage,
  'GET /data': handleGetData,
  'GET /backup': withAuth(handleBackup),
  'POST /restore': withAuth(handleRestore),
  'POST /login': handleLogin,
  'POST /add-category': withAuth(handleAddCategory),
  'POST /add-site': withAuth(handleAddSite),
  'POST /edit-site': withAuth(handleEditSite),
  'POST /delete-category': withAuth(handleDeleteCategory),
  'POST /delete-site': withAuth(handleDeleteSite),
  'POST /apply-link': handleApplyLink,
  'GET /pending-links': withAuth(handleGetPendingLinks),
  'POST /approve-link': withAuth(handleApproveLink),
  'POST /reject-link': withAuth(handleRejectLink),
  'GET /about': handleAbout,
};

export function handleRoutes(request) {
  const { pathname } = new URL(request.url);
  const method = request.method;
  const routeKey = `${method} ${pathname}`;
  
  const handler = routes[routeKey] || handleNotFound;
  return handler(request);
}
