import {
  getCategoryList,
  getTopBooks,
  getBooksByCategory,
  getBookById,
} from './api-functions.js';

import {
  renderCategories,
  renderCategoryDpopList,
  renderBookCardlist,
} from './render-functions.js';

export async function initCategories() {
  try {
    const categories = await getCategoryList();
    // тут можна рендерити категорії в DOM
    renderCategoryDpopList(categories);
  } catch (error) {
    console.error(error);
  }
}
initCategories();

export async function initCategoriesDesk() {
  try {
    const categories = await getCategoryList();
    // тут можна рендерити категорії в DOM
    renderCategories(categories);
  } catch (error) {
    console.error(error);
  }
}
initCategoriesDesk();

async function initBooks() {
  try {
    const topbooks = await getTopBooks();

    // ✅ Визначаємо ширину екрана
    const screenWidth = window.innerWidth;

    // ✅ Залежно від розміру екрана — обрізаємо масив
    const limitedBooks =
      screenWidth < 768 ? topbooks.slice(0, 10) : topbooks.slice(0, 24);

    renderBookCardlist(limitedBooks);
  } catch (error) {
    console.error('initBooks error:', error);
  }
}
initBooks();

/* TECTУВАННЯ API  */
/*
    export async function testAPI() {
      try {
        console.log('📘 Тест 1: getCategoryList()');
        const categories = await getCategoryList();
        console.log('✅ Отримані категорії:', categories);
        console.log('----------------------------------');
    
        console.log('📚 Тест 2: getTopBooks()');
        const topBooks = await getTopBooks();
        console.log('✅ Отримані топ-книги (перша книга):', topBooks[0]);
        console.log('----------------------------------');
    
        console.log('📗 Тест 3: getBooksByCategory()');
        // використовуємо першу категорію зі списку, щоб не писати вручну
        const booksByCategory = await getBooksByCategory(categories[0]);
        console.log(`✅ Книги з категорії "${categories[0]}":`, booksByCategory);
        console.log('----------------------------------');
    
        console.log('📙 Тест 4: getBookById()');
        // беремо id першої книги з попереднього запиту
        const bookDetails = await getBookById(booksByCategory[0]._id);
        console.log('✅ Деталі книги:', bookDetails);
        console.log('----------------------------------');
      } catch (error) {
        console.error('❌ Помилка під час тестування API:', error);
      }
    }
    testAPI();
*/
