import { getNavigationData, setNavigationData } from '../services/kv.js';
import { jsonResponse } from '../utils/response.js';

export async function handleAddCategory(request) {
  try {
    const requestBody = await request.json();
    const navigationData = await getNavigationData();
    
    const categoryExists = navigationData.categories.some(
      category => category.name === requestBody.name
    );
    
    if (categoryExists) {
      return jsonResponse({ error: 'Category already exists' }, 400);
    }
    
    const newCategory = { 
      name: requestBody.name, 
      sites: [],
      color: requestBody.color || '#6366f1'
    };
    navigationData.categories.push(newCategory);
    await setNavigationData(navigationData);
    
    return jsonResponse({ message: 'Category added successfully' });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

export async function handleDeleteCategory(request) {
  try {
    const requestBody = await request.json();
    const navigationData = await getNavigationData();
    const { categoryIndex } = requestBody;
    
    navigationData.categories.splice(categoryIndex, 1);
    await setNavigationData(navigationData);
    
    return jsonResponse({ message: 'Category deleted successfully' });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}
