import axios from 'axios';

axios.defaults.baseURL = 'https://books-backend.p.goit.global';

// Універсальна функція обробки помилок
function handleError(error, source) {
  console.error(`${source} error:`, error.message || error);
  throw error;
}

// 🔹 Отримати всі категорії
export async function getCategoryList() {
  try {
    const response = await axios.get(`/books/category-list`);
    // console.log(response.data);
    // 🔹 Вибираємо лише об'єкти з непорожнім list_name
    const categories = response.data
      .filter(item => item.list_name && item.list_name.trim() !== '')
      .map(item => item.list_name);
    return categories;
  } catch (error) {
    handleError(error, 'getCategoryList');
  }
}

// 🔹 Отримати топ книги
export async function getTopBooks() {
  try {
    const response = await axios.get('/books/top-books');
    // console.log(response.data);
    // ✅ Кожен елемент — об’єкт із полем books (масив книг)
    const topbooks = response.data.flatMap(item => item.books);
    // console.log(topbooks);
    return topbooks;
  } catch (error) {
    handleError(error, 'getTopBooks');
  }
}

// 🔹 Отримати книги певної категорії
export async function getBooksByCategory(category) {
  try {
    const { data } = await axios.get(`/books/category`, {
      params: { category },
    });
    console.log(data);

    return data;
  } catch (error) {
    handleError(error, 'getBooksByCategory');
  }
}

// 🔹 Отримати книгу за ID
export async function getBookById(id) {
  try {
    const { data } = await axios.get(`/books/${id}`);
    return data;
  } catch (error) {
    handleError(error, 'getBookById');
  }
}
