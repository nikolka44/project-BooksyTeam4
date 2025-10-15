import { refs } from './refs.js';
import { renderBookModal } from './render-functions.js';
import { getBookById } from './api-functions.js';

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
  } catch (error) {
    console.error('❌ Error loading book details:', error);
  }
}


document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  const spanCounter = document.querySelector('.qty-value');
  if (!btn) return;

  const action = btn.dataset.action;
  if (action === 'increase') {
    if (spanCounter.textContent >= 0) {
      spanCounter.textContent++;
    }
  } else if (action === 'decrease') {
    if (spanCounter.textContent > 1) {
      spanCounter.textContent--;
    }
  }
});


function openBookModal(book) {
  refs.bookModalContent.innerHTML = renderBookModal(book);
  refs.bookModalBackdrop.classList.remove('is-hidden');

  refs.bookModalClose.addEventListener('click', closeBookModal);
  refs.bookModalBackdrop.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onEscClose);
  refs.body.classList.add('noScroll');
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
