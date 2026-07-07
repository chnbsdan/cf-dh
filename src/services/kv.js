// 数据存储函数
export async function getNavigationData() {
  const data = await NAVIGATION_DATA.get('data');
  return data ? JSON.parse(data) : { categories: [] };
}

export async function setNavigationData(data) {
  await NAVIGATION_DATA.put('data', JSON.stringify(data));
}
