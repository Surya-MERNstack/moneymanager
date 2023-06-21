import React from 'react';
import 'boxicons';
import { default as api } from '../store/apiSlice';
import { getSum } from '../helper/helper';

const List = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  console.log(data);

  const [deleteTransaction] = api.useDeleteTransactionMutation();

  const handleClick = async (e, recordId) => {
    try {
      await deleteTransaction(recordId);
    } catch (err) {
      console.log(err);
    }
  };

  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = data.map((v, i) => (
      <Transaction key={i} category={v} handler={(e) => handleClick(e, v._id)} />
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div className='flex flex-col py-6 gap-3'>
      <h1 className='py-4 font-bold text-xl'>History</h1>
      {Transactions}
    </div>
  );
};
function Transaction({ category, handler }) {
  if (!category) return null;

  let categoryColor;
  if (category.type === 'Saving') {
    categoryColor = 'rgb(75, 192, 192)';
  } else if (category.type === 'Expense') {
    categoryColor = 'rgb(255, 205, 86)';
  } else if (category.type === 'Investment') {
    categoryColor = 'rgb(255, 99, 132)';
  } else {
    categoryColor = category.color;
  }

  return (
    <div
      className='item flex justify-center bg-gray-50 py-2 rounded-r'
      style={{ borderRight: `8px solid ${categoryColor || '#e5e5e5'}` }}
    >
      <button className='px-3' onClick={handler}>
        <box-icon
          data-id={category._id || ''}
          color={categoryColor || '#e5e5e5'}
          size='15px'
          name='trash'
        ></box-icon>
      </button>
      <span className='block w-full'>{category.name || ''}</span>
    </div>
  );
}


export default List;

