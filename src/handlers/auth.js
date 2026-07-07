import { jsonResponse } from '../utils/response.js';

// 从环境变量读取密码，如果没有则使用默认值
const ADMIN_PASSWORD = globalThis.ADMIN_PASSWORD || 'bsdan';

async function getSession(token) {
  const session = await NAVIGATION_DATA.get(`session:${token}`);
  return session ? JSON.parse(session) : null;
}

async function createSession(userId) {
  const token = generateToken();
  const session = { userId, createdAt: Date.now() };
  await NAVIGATION_DATA.put(`session:${token}`, JSON.stringify(session), { expirationTtl: 86400 });
  return token;
}

export function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function withAuth(handler) {
  return async (request) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return jsonResponse({ error: 'Unauthorized' }, 401);
    }
    
    const token = authHeader.substring(7);
    const session = await getSession(token);
    if (!session) {
      return jsonResponse({ error: 'Invalid token' }, 401);
    }
    
    return handler(request);
  };
}

export async function handleLogin(request) {
  try {
    const { password } = await request.json();
    if (password === ADMIN_PASSWORD) {
      const token = await createSession('admin');
      return jsonResponse({ token, message: 'Login successful' });
    }
    return jsonResponse({ error: 'Invalid password' }, 401);
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}
