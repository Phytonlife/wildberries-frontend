


import React, { useEffect, useState } from 'react';
import ProductTable from './components/ProductTable';
import PriceHistogram from './components/PriceHistogram';
import DiscountVsRatingChart from './components/DiscountVsRatingChart';
import { fetchProducts } from './api';
import { Container } from '@mui/material';

function App() {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = () => {
    setLoading(true);
    fetchProducts(filters)
      .then(response => {
        setProducts(response.data.results);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <Container>
      <h1>Wildberries Products Dashboard</h1>

      <ProductTable
        filters={filters}
        onFiltersChange={(newFilters) => setFilters(newFilters)}
        data={products}
        loading={loading}
      />

      <h2>Гистограмма цен</h2>
      <PriceHistogram products={products} />

      <h2>Скидка vs Рейтинг</h2>
      <DiscountVsRatingChart products={products} />
    </Container>
  );
}

export default App;
