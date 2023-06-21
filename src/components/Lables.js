import React from 'react';
import { useGetLabelsQuery } from '../store/apiSlice';
import { getLabels } from '../helper/helper';

const labelColors = {
  Investment: 'rgb(255, 99, 132)',
  Salary: 'rgb(54, 162, 235)',
  Expense: 'rgb(255, 205, 86)',
  Saving: 'rgb(75, 192, 192)', // Use the same color as Expense or choose a different color
};

const Labels = () => {
  const { data, isFetching, isSuccess, isError } = useGetLabelsQuery();

  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = getLabels(data).map((v, i) => (
      <LabelComponent key={i} data={v} color={labelColors[v.type]} />
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return <>{Transactions}</>;
};

const LabelComponent = ({ data, color }) => {
  if (!data) return <></>;

  const { type, percent } = data;

  return (
    <div className='labels flex justify-between'>
      <div className='flex gap-2'>
        <div className='w-2 h-2 rounded py-3' style={{ background: color ?? '#f9c74f' }}></div>
        <h3 className='text-md'>{type || 'Error'}</h3>
      </div>
      <h3 className='font-bold'>{Math.round(percent) || 0}%</h3>
    </div>
  );
};

export default Labels;
