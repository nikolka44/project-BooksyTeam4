import { refs } from './refs.js';
import {
  getCategoryList,
  getTopBooks,
  getBooksByCategory,
  getBookById,
} from './api-functions.js';
import {
  renderCategories,
  renderCategoryDropList,
  renderBookCardlist,
  initDropdownBehavior,
} from './render-functions.js';
import { initBookModal } from './modal-book.js';

// ====== Глобальні змінні ======

let currentBooks = []; // усі завантажені книги
let currentCategory = 'All categories'; // поточна категорія
// Змінна для відстеження кількості видимих книг
let visibleBooksCount = 0;
//Константа для кількості книг, що додаються за клік
const BOOKS_PER_PAGE = 4;

// ====== Функція визначає, скільки книг показати ======
function getInitialLimit() {
  return window.innerWidth < 768 ? 10 : 24;
}

// Початково ховаємо кнопку
if (refs.showMoreBtn) refs.showMoreBtn.classList.add('is-hidden');

//  Функція для оновлення видимості кнопки "Show More"
function updateShowMoreButton() {
  // Якщо видимих книг стільки ж або більше, ніж усього, ховаємо кнопку
  if (visibleBooksCount >= currentBooks.length) {
    refs.showMoreBtn.classList.add('is-hidden');
  } else {
    // Інакше — показуємо
    refs.showMoreBtn.classList.remove('is-hidden');
  }
}

// ====== Функція відмалювання книг (без нових запитів) ======
function renderVisibleBooks(isLoadMore = false) {
  // Переконаємось, що visibleBooksCount не більше, ніж доступно
  visibleBooksCount = Math.min(visibleBooksCount, currentBooks.length);

  const booksToRender = isLoadMore
    ? currentBooks.slice(visibleBooksCount - BOOKS_PER_PAGE, visibleBooksCount)
    : currentBooks.slice(0, visibleBooksCount);

  if (!isLoadMore) {
    refs.bookCardList.innerHTML = '';
  }
  renderBookCardlist(booksToRender);

  // Оновлюємо лічильники
  if (refs.booksShown) {
    refs.booksShown.textContent = visibleBooksCount;
  }
  if (refs.booksTotal) {
    refs.booksTotal.textContent = currentBooks.length;
  }

  // Оновлюємо стан кнопки після кожного рендеру
  updateShowMoreButton();

  // Ініціалізуємо модалку для нових карток
  initBookModal();
}

// ====== Завантаження категорії (один запит) ======
async function loadBooksByCategory(category) {
  try {
    // Ховаємо кнопку, поки дані не прийдуть
    refs.showMoreBtn.classList.add('is-hidden');
    refs.bookCardList.innerHTML = '';
    currentCategory = category;
    let booksData;

    if (category === 'All categories' || category === 'All' || !category) {
      booksData = await getTopBooks();
    } else {
      booksData = await getBooksByCategory(category);
    }

    // Зберігаємо результат
    currentBooks = booksData;
    //  Встановлюємо початкову кількість видимих книг
    visibleBooksCount = getInitialLimit();
    // Рендеримо першу порцію книг
    renderVisibleBooks();

    // Кнопка оновиться тільки після того, як книги вже з’явилися
    updateShowMoreButton();
  } catch (error) {
    console.error('loadBooksByCategory error:', error);
  }
}

//  Обробник для кнопки "Show More"
function handleShowMore() {
  // Збільшуємо лічильник видимих книг
  visibleBooksCount += BOOKS_PER_PAGE;
  // Перемальовуємо список з новою кількістю
  renderVisibleBooks(true);
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

// ====== Прив'язка слухачів ======

// НОВЕ: Додаємо слухача на кнопку "Show More"
refs.showMoreBtn.addEventListener('click', handleShowMore);
// ====== При зміні ширини екрана — тільки перерендер локальних даних ======
window.addEventListener('resize', () => {
  renderVisibleBooks(); // без запитів, тільки зміна кількості
});

initBooks();
