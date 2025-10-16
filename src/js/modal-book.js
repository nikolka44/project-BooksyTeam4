import { refs } from './refs.js';
import { renderBookModal } from './render-functions.js';
import { getBookById } from './api-functions.js';
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

export function initBookModal() {
  if (!refs.bookCardList) return;
  // Якщо вже прив'язували слухач — нічого не робимо
  if (refs.bookCardList.dataset.modalInited === 'true') return;

  refs.bookCardList.addEventListener('click', onLearnMoreClick);
  refs.bookCardList.dataset.modalInited = 'true';
}

async function onLearnMoreClick(e) {
  const btn = e.target.closest('.books-card-btn');
  if (!btn) return;
  //   console.log(btn);

  const card = btn.closest('.books-card');
  const bookId = card.dataset.id;
  if (!bookId) return;
  console.log(bookId);

  try {
    const book = await getBookById(bookId);
    openBookModal(book);
    bookOrderForm();
  } catch (error) {
    console.error('❌ Error loading book details:', error);
    iziToast.error({
      message: 'Не вдалося завантажити дані книги 😢',
      position: 'topRight',
    });
  }
}

function openBookModal(book) {
  refs.bookModalContent.innerHTML = renderBookModal(book);
  refs.bookModalBackdrop.classList.remove('is-hidden');

  refs.bookModalClose.addEventListener('click', closeBookModal);
  refs.bookModalBackdrop.addEventListener('click', onBackdropClick);
  // refs.buyBtn.addEventListener('submit', onBuyNowClick);
  document.addEventListener('keydown', onEscClose);
  refs.body.classList.add('noScroll');
}

function bookOrderForm() {
  // на початку openBookModal або перед bookOrderForm()
  const modal = refs.bookModalContent;
  if (!modal) {
    console.warn(
      'bookOrderForm: refs.bookModalContent not found — skipping form init'
    );
    return;
  }
  // знаходимо всі елементи в DOM модалки
  const form = modal.querySelector('.book-modal-actions');
  const plusBtn = modal.querySelector('.plus');
  const minusBtn = modal.querySelector('.minus');
  const quantityInput = modal.querySelector('.qty-value');
  const addToCartBtn = modal.querySelector('.add-to-cart-btn');

  // перевірка — якщо форма не знайдена, виходимо
  if (!form || !plusBtn || !minusBtn || !quantityInput || !addToCartBtn) {
    console.warn('⚠️ Book order form not found in modal');
    return;
  }
  // +1
  plusBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value < parseInt(quantityInput.max)) {
      quantityInput.value = value + 1;
    }
  });
  // -1
  minusBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value > parseInt(quantityInput.min)) {
      quantityInput.value = value - 1;
    }
  });
  // Add To Cart — просто показує кількість у консолі та повідомленні
  addToCartBtn.addEventListener('click', () => {
    const quantity = quantityInput.value;
    console.log(`Додано до кошика ${quantity} книг(и).`);
    iziToast.show({
      message: `Додано до кошика ${quantity} книг(и).`,
      backgroundColor: '#fceee6',
      position: 'topRight',
      close: false,
      messageSize: '20',
      timeout: 2000,
      closeOnClick: true,
    });
  });

  // Buy Now — відправка форми
  form.addEventListener('submit', e => {
    e.preventDefault();
    iziToast.show({
      message: 'Дякуємо за покупку 💛💙',
      backgroundColor: '#e15d05',
      position: 'topRight',
      close: false,
      messageSize: '20',
      timeout: 2000,
    });
  });
}

function closeBookModal() {
  refs.bookModalBackdrop.classList.add('is-hidden');
  refs.bookModalContent.innerHTML = '';

  refs.bookModalClose.removeEventListener('click', closeBookModal);
  refs.bookModalBackdrop.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onEscClose);
  refs.body.classList.remove('noScroll');
}

function onBackdropClick(e) {
  if (e.target === refs.bookModalBackdrop) closeBookModal();
}

function onEscClose(e) {
  if (e.key === 'Escape') closeBookModal();
}
