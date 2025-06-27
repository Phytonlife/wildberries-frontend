
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function PriceHistogram({ products }) {
  // Создаём интервалы цен
  const bins = [0, 2000, 4000, 6000, 8000, 10000, 15000, 20000, 50000, 100000];
  const counts = new Array(bins.length - 1).fill(0);

  products.forEach(product => {
    const price = parseFloat(product.price);
    for (let i = 0; i < bins.length - 1; i++) {
      if (price >= bins[i] && price < bins[i + 1]) {
        counts[i]++;
        break;
      }
    }
  });

  const data = {
    labels: bins.slice(0, -1).map((v, i) => `${v} - ${bins[i + 1]}`),
    datasets: [
      {
        label: 'Количество товаров',
        data: counts,
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <Bar data={data} />
    </div>
  );
}

export default PriceHistogram;
