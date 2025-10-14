import { refs } from './refs.js';

export function renderCategoryDropList(categories) {
  // додаємо "All categories" на початок
  //categories.unshift('All');
  // або:
  // не мутуємо вхідний масив (щоб уникнути побічних ефектів)
  const allCategories = ['All categories', ...categories];
  const markup = allCategories
    .map(category => `<li class="dropdown-item">${category}</li>`)
    .join('');
  refs.dropdownMenu.innerHTML = markup;

  // відкриття/закриття меню
  // refs.dropdownToggle.addEventListener('click', e => {
  //   e.stopPropagation(); // щоб клік не закрив меню одразу
  //   refs.dropdownMenu.classList.toggle('open');
  //   refs.dropdownToggle.classList.toggle('active');
  // });

  // вибір категорії
  // refs.dropdownMenu.addEventListener('click', e => {
  //   if (e.target.classList.contains('dropdown-item')) {
  //     refs.dropdownToggle.textContent = e.target.textContent;
  //     refs.dropdownMenu.classList.remove('open');
  //     refs.dropdownToggle.classList.remove('active');
  //   }
  // });

  // автозакриття при кліку поза меню
  // document.addEventListener('click', e => {
  //   if (
  //     !refs.dropdownMenu.contains(e.target) &&
  //     !refs.dropdownToggle.contains(e.target)
  //   ) {
  //     refs.dropdownMenu.classList.remove('open');
  //     refs.dropdownToggle.classList.remove('active');
  //   }
  // });
}

// Рендер десктопного списку категорій
export function renderCategories(categories) {
  // не мутуємо вхідний масив (щоб уникнути побічних ефектів)
  const allCategories = ['All categories', ...categories];
  const markuoCategories = allCategories
    .map(
      category =>
        `<li class="categories-item" data-category="${category}">${category}</li>`
    )
    .join('');
  refs.categoriesList.innerHTML = markuoCategories;
}

//  Допоміжна функція для перетворення тексту у формат "Title Case"
// Вона перетворює "SOME TITLE" -> "Some Title"
function toTitleCase(str) {
  // Якщо рядок порожній, повертаємо його без змін
  if (!str) {
    return '';
  }
  // Перетворюємо рядок в нижній регістр, розбиваємо на слова,
  // робимо першу літеру кожного слова великою і з'єднуємо назад.
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Рендер списку книг (отримуєш вже відфільтрований або обрізаний масив)
export function renderBookCardlist(topbooks) {
  const markupBooks = topbooks
    .map(
      ({
        _id,
        book_image,
        description = 'description || title',
        title,
        author,
        price,
      }) => {
        // ЗМІНЕНО: Форматуємо назву перед вставкою в HTML
        const formattedTitle = toTitleCase(title);
        // Отримуємо тільки цілу частину ціни
        const formattedPrice = parseInt(price);
        return `<li class="books-card" data-id="${_id}">
        <img class="books-card-image" src="${book_image}" alt="${description}" />
         <div class="books-card-text-wrapper"> 
            
            <div class="books-card-info">
              <h3 class="books-card-title">${formattedTitle}</h3> 
              <p class="books-card-author">${author}</p>
            </div>
            
            <p class="books-card-price">$${formattedPrice}</p> 
          
          </div> 
        <button class="books-card-btn" type="button">Learn More</button>
      </li>`;
      }
    )
    .join('');
  refs.bookCardList.innerHTML = markupBooks;
}

export function renderBookModal(book) {
  return `
    <div class="book-modal-wrapper">
      <img
        src="${book.book_image}"
        alt="${book.title}"
        class="book-modal-image"
      />
      <h2 class="book-modal-title">${book.title}</h2>
      <p class="book-modal-author">${book.author}</p>
      <p class="book-modal-price">$${book.price}</p>

      <div class="book-modal-actions">
        <div class="quantity-control">
          <button class="qty-btn" data-action="decrease">-</button>
          <span class="qty-value">1</span>
          <button class="qty-btn" data-action="increase">+</button>
        </div>
        <button class="add-to-cart-btn">Add To Cart</button>
        <button class="buy-now-btn">Buy Now</button>
      </div>

      <div class="book-modal-details">
        <details>
          <summary>Details</summary>
          <p>${book.description || book.title}</p>
        </details>
        <details>
          <summary>Shipping</summary>
          <p>We ship across the United States within 2–5 business days. All orders are processed through USPS or a reliable courier service. Enjoy free standard shipping on orders over $50.</p>
        </details>
        <details>
          <summary>Returns</summary>
          <p>You can return an item within 14 days of receiving your order, provided it hasn’t been used and is in its original condition. To start a return, please contact our support team — we’ll guide you through the process quickly and hassle-free.</p>
        </details>
      </div>
    </div>
  `;
}

// Ініціалізація поведінки dropdown (додає слухачі один раз)
export function initDropdownBehavior() {
  const toggle = refs.dropdownToggle;
  const menu = refs.dropdownMenu;

  if (!toggle || !menu) return;

  // Якщо вже ініціалізовано — не додаємо слухачі вдруге
  if (toggle.dataset.dropdownInited === 'true') return;

  // відкриття / закриття меню
  toggle.addEventListener('click', e => {
    e.stopPropagation();
    menu.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  // вибір категорії
  menu.addEventListener('click', e => {
    const item = e.target.closest('.dropdown-item');
    if (!item) return;
    toggle.textContent = item.textContent;
    menu.classList.remove('open');
    toggle.classList.remove('active');

    // корисний хук: диспатчимо власну подію, щоб інші модулі могли відреагувати
    const category = item.dataset.category;
    const event = new CustomEvent('category:selected', {
      detail: { category },
    });
    document.dispatchEvent(event);
  });

  // автозакриття при кліку поза меню
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    }
  });

  // мітка, що вже ініціалізовано
  toggle.dataset.dropdownInited = 'true';
}
