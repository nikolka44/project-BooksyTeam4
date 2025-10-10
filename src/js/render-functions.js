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
