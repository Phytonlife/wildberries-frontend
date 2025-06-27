


import axios from 'axios';

const API_URL = 'http://localhost:8000/api/products/';

/**
 * Получить список продуктов с фильтрами.
 * @param {Object} filters
 */
export const fetchProducts = (filters) => {
  return axios.get(API_URL, { params: filters });
};

