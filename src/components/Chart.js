import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import Labels from './Lables';
import { chart_Data, getTotal } from '../helper/helper';
import apiSlice from '../store/apiSlice';

Chart.register(ArcElement);

const Charts = () => {
  const { data, isFetching, isSuccess, isError } = apiSlice.useGetLabelsQuery();
  const [chartConfig, setChartConfig] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      const updatedConfig = chart_Data(data);
      setChartConfig(updatedConfig);
    }
  }, [data, isSuccess]);

  const defaultConfig = {
    data: {
      datasets: [
        {
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };

  return (
    <div className='flex justify-content max-w-xs mx-auto'>
      <div className='item'>
        <div className='chart relative'>
          {chartConfig ? <Doughnut {...chartConfig} /> : <Doughnut {...defaultConfig} />}
          <h3 className='mb-4 font-bold title'>
            Total
            <span className='block text-3xl text-emerald-400'>${getTotal(data) ?? 0}</span>
          </h3>
        </div>

        <div className='flex flex-col py-10 gap-10'>
          {/* labels */}
          <Labels />
        </div>
      </div>
    </div>
  );
};

export default Charts;