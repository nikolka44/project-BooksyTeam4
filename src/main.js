import { getCategoryList } from './js/api-functions.js';
import { renderCategoryList } from './js/render-functions.js';

async function initCategories() {
  try {
    const categories = await getCategoryList();
    console.log('categories:', categories);
    // тут можна рендерити категорії в DOM
    renderCategoryList(categories);
  } catch (error) {
    console.error(error);
  }
}
initCategories();
