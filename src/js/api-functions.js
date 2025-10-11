import axios from 'axios';

axios.defaults.baseURL = 'https://books-backend.p.goit.global/';

export async function getCategoryList() {
  try {
    const response = await axios.get(`books/category-list`);
    console.log(response.data);
    // 🔹 Вибираємо лише об'єкти з непорожнім list_name
    const categories = response.data
      .filter(item => item.list_name && item.list_name.trim() !== '')
      .map(item => item.list_name);
    return categories;
  } catch (error) {
    console.error('getCategoryList error:', error);
    throw error;
  }
}

export async function getTopBooks() {
  try {
    const response = await axios.get('books/top-books');
    console.log(response.data);
    const topbooks = response.data.flatMap(item => item.books);
    console.log(topbooks);
    return topbooks;
  } catch (error) {
    console.error('getTopBooks error:', error);
    throw error;
  }
}
