import './js/books.js';
import './js/hero.js';
import './js/feedbacks.js';
import './js/events.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import { getCategoryList } from './js/api-functions.js';
// import { renderCategoryList } from './js/render-functions.js';

async function initCategories() {
  try {
    const categories = await getCategoryList();
    // тут можна рендерити категорії в DOM
    renderCategoryList(categories);
  } catch (error) {
    console.error(error);
  }
}
// initCategories();

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
// initBooks();
import './js/menu.js';

//footer
const foterFormEl = document.querySelector('.footer-form');
foterFormEl.addEventListener('submit', onJoinSubmit);

function onJoinSubmit(event) {
  event.preventDefault();
  iziToast.show({
    message: 'Дякуємо за реєстрацію!',
    backgroundColor: '#fceee6',
    position: 'topRight',
    close: false,
    messageSize: '18',
    timeout: 2000,
  });
  event.target.reset();
}
