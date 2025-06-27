
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Slider, Box, Button } from '@mui/material';

function ProductTable({ filters, onFiltersChange, data, loading }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setLocalFilters({ ...localFilters, [key]: value });
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Мин. рейтинг" type="number" value={localFilters.min_rating || ''} onChange={(e) => handleFilterChange('min_rating', e.target.value)} />
        <TextField label="Мин. отзывов" type="number" value={localFilters.min_reviews || ''} onChange={(e) => handleFilterChange('min_reviews', e.target.value)} />
        <Box sx={{ width: 200 }}>
          <Slider
            value={[Number(localFilters.min_price) || 0, Number(localFilters.max_price) || 100000]}
            onChangeCommitted={(e, newValue) => {
              setLocalFilters({
                ...localFilters,
                min_price: newValue[0],
                max_price: newValue[1],
              });
            }}
            valueLabelDisplay="auto"
            min={0}
            max={100000}
          />
        </Box>
        <Button variant="contained" onClick={handleApplyFilters}>Применить</Button>
      </Box>
      {loading ? <p>Загрузка...</p> : (
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
