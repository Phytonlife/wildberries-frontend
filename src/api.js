
import axios from 'axios';

export const fetchProducts = (filters) => {
  return axios.get('http://localhost:8000/api/products/', { params: filters });
};

export const fetchPriceHistogram = (filters) => {
  return axios.get('http://localhost:8000/api/products/histogram/', { params: filters });
};

export const fetchDiscountRating = (filters) => {
  return axios.get('http://localhost:8000/api/products/discount-rating/', { params: filters });
};
