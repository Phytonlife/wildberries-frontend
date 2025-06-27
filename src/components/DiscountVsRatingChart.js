

import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function DiscountVsRatingChart({ products }) {
  const data = {
    datasets: [
      {
        label: 'Товары',
        data: products.map((product) => ({
          x: product.discount,
          y: product.rating,
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Скидка (%)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Рейтинг',
        },
        min: 0,
        max: 5,
      },
    },
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <Scatter data={data} options={options} />
    </div>
  );
}

export default DiscountVsRatingChart;
