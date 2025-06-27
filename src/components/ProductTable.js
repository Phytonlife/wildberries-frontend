


import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Slider,
  Box,
  Button,
  Typography,
} from '@mui/material';

function ProductTable({ filters, onFiltersChange, data, loading }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setLocalFilters({ ...localFilters, [key]: value });
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const sliderMin = 0;
  const sliderMax = 100000;

  const currentMinPrice = Number(localFilters.min_price) || sliderMin;
  const currentMaxPrice = Number(localFilters.max_price) || sliderMax;

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Мин. рейтинг"
            type="number"
            value={localFilters.min_rating || ''}
            onChange={(e) => handleFilterChange('min_rating', e.target.value)}
          />
          <TextField
            label="Мин. отзывов"
            type="number"
            value={localFilters.min_reviews || ''}
            onChange={(e) => handleFilterChange('min_reviews', e.target.value)}
          />
        </Box>

        <Box sx={{ width: '100%', maxWidth: 600 }}>
          <Typography gutterBottom>Цена: {currentMinPrice} - {currentMaxPrice}</Typography>
          <Slider
            value={[currentMinPrice, currentMaxPrice]}
            onChangeCommitted={(e, newValue) => {
              setLocalFilters({
                ...localFilters,
                min_price: newValue[0],
                max_price: newValue[1],
              });
            }}
            valueLabelDisplay="auto"
            min={sliderMin}
            max={sliderMax}
          />
        </Box>

        <Button variant="contained" onClick={handleApplyFilters}>
          Применить фильтры
        </Button>
      </Box>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Цена со скидкой</TableCell>
              <TableCell>Рейтинг</TableCell>
              <TableCell>Отзывы</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.sale_price}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>{product.reviews_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

export default ProductTable;
