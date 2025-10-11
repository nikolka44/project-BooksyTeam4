import { refs } from './refs.js';

export function renderCategoryList(categories) {
  // додаємо "All categories" на початок
  // const allCategories = ['All categories', ...categories];
  // або:
  categories.unshift('All');
  const markup = categories
    .map(category => `<li class="dropdown-item">${category}</li>`)
    .join('');
  refs.dropdownMenu.innerHTML = markup;

  // відкриття/закриття меню
  refs.dropdownToggle.addEventListener('click', e => {
    e.stopPropagation(); // щоб клік не закрив меню одразу
    refs.dropdownMenu.classList.toggle('open');
    refs.dropdownToggle.classList.toggle('active');
  });

  // вибір категорії
  refs.dropdownMenu.addEventListener('click', e => {
    if (e.target.classList.contains('dropdown-item')) {
      refs.dropdownToggle.textContent = e.target.textContent;
      refs.dropdownMenu.classList.remove('open');
      refs.dropdownToggle.classList.remove('active');
    }
  });

  // автозакриття при кліку поза меню
  document.addEventListener('click', e => {
    if (
      !refs.dropdownMenu.contains(e.target) &&
      !refs.dropdownToggle.contains(e.target)
    ) {
      refs.dropdownMenu.classList.remove('open');
      refs.dropdownToggle.classList.remove('active');
    }
  });
}

// відмальовуємо список книг:
export function renderBookCardlist(topbooks) {
  const markupBooks = topbooks
    .map(
      ({
        _id,
        book_image,
        description,
        title,
        author,
        price,
      }) => `<li class="books-card" data-id="${_id}>
        <img class="books-card-image" src="${book_image}" alt="${description}" />
        <div class="books-card-text-wrapper">
          <h3 class="books-card-title">${title}</h3>
          <p class="books-card-author">${author}</p>
        </div>
        <p class="books-card-price">${price}</p>
        <button class="books-card-btn" type="button">Learn More</button>
      </li>`
    )
    .join('');
  refs.bookCardlist.innerHTML = markupBooks;
}
