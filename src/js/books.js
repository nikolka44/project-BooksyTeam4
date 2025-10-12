import { refs } from './refs.js';
import {
  getCategoryList,
  getTopBooks,
  getBooksByCategory,
} from './api-functions.js';
import {
  renderCategories,
  renderCategoryDropList,
  renderBookCardlist,
  initDropdownBehavior,
} from './render-functions.js';

// ====== Глобальні змінні ======
let currentBooks = []; // усі завантажені книги
let currentCategory = 'All categories'; // поточна категорія

// ====== Функція визначає, скільки книг показати ======
function getLimit() {
  return window.innerWidth < 768 ? 10 : 24;
}

// ====== Функція відмалювання книг (без нових запитів) ======
function renderVisibleBooks() {
  const limit = getLimit();
  const visibleBooks = currentBooks.slice(0, limit);
  renderBookCardlist(visibleBooks);
}

// ====== Завантаження категорії (один запит) ======
async function loadBooksByCategory(category) {
  try {
    currentCategory = category;
    let booksData;

    if (category === 'All categories' || category === 'All' || !category) {
      booksData = await getTopBooks();
    } else {
      booksData = await getBooksByCategory(category);
    }

    // Зберігаємо результат
    currentBooks = booksData;
    renderVisibleBooks();
  } catch (error) {
    console.error('loadBooksByCategory error:', error);
  }
}

// ====== Ініціалізація категорій ======
async function initCategories() {
  try {
    const categories = await getCategoryList();
    renderCategoryDropList(categories);
    renderCategories(categories);
    initDropdownBehavior();

    // слухачі для dropdown
    refs.dropdownMenu.addEventListener('click', e => {
      const item = e.target.closest('.dropdown-item');
      if (!item) return;
      const category = item.dataset.category || item.textContent.trim();
      refs.dropdownToggle.textContent = item.textContent.trim();
      loadBooksByCategory(category);
    });

    // слухачі для desktop списку
    refs.categoriesList.addEventListener('click', e => {
      const item = e.target.closest('.categories-item');
      if (!item) return;
      const category = item.dataset.category || item.textContent.trim();

      // візуально активна категорія
      refs.categoriesList
        .querySelectorAll('.categories-item')
        .forEach(el => el.classList.remove('active'));
      item.classList.add('active');

      loadBooksByCategory(category);
    });
  } catch (error) {
    console.error('initCategories error:', error);
  }
}

// ====== Початкова ініціалізація ======
async function initBooks() {
  await initCategories();
  await loadBooksByCategory('All categories');
}

// ====== При зміні ширини екрана — тільки перерендер локальних даних ======
window.addEventListener('resize', () => {
  renderVisibleBooks(); // без запитів, тільки зміна кількості
});

initBooks();
