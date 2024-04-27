import { ChangeEvent, useState } from 'react';
import Button from '../form/Button';
import { IExpense } from '../../pages/AddExpenses';
import { numberToDolar } from '../../utils/numberToDolar';

type Props = { categoriesKeysByBiggerPrice: string[]; expenses: IExpense[] };

const SelectACategory = ({ categoriesKeysByBiggerPrice, expenses }: Props) => {
  const [sort, setSort] = useState<'biggest' | 'lowest' | 'newer' | 'older'>(
    'biggest'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    if (
      target.value == 'biggest' ||
      target.value == 'lowest' ||
      target.value == 'newer' ||
      target.value == 'older'
    )
      setSort(target.value);
  };

  const sortBy = (a: IExpense, b: IExpense): number => {
    if (!a.date || !b.date) return 0;
    const dateToTime = (date: string) => new Date(date).getTime();

    const by = {
      biggest: Number(b.price) - Number(a.price),
      lowest: Number(a.price) - Number(b.price),
      newer: dateToTime(b.date) - dateToTime(a.date),
      older: dateToTime(a.date) - dateToTime(b.date),
    };
    return by[sort];
  };

  return (
    <>
      <div className='flex flex-col gap-4 items-center'>
        <div className='flex flex-wrap gap-3'>
          {categoriesKeysByBiggerPrice.map((categoryName, i) => (
            <Button
              onClick={() => setSelectedCategory(categoryName)}
              type='button'
              aria-label='category-button'
              key={i}
              className={`${
                categoryName === selectedCategory
                  ? 'bg-indigo-900 text-gray-400'
                  : ''
              } disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-700 font-medium rounded-md px-4 py-2 disabled:cursor-not-allowed`}
            >
              {categoryName}
            </Button>
          ))}
        </div>

        {selectedCategory && (
          <>
            <p>Select a Category</p>
            <label className='flex gap-2 items-center' htmlFor='by'>
              By
              <select
                id='by'
                value={sort}
                onChange={handleChange}
                className='bg-indigo-200 text-stone-900 w-full px-2 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500'
              >
                <option value='biggest'>Biggest</option>
                <option value='lowest'>Lowest</option>
                <option value='newer'>Newer</option>
                <option value='older'>Older</option>
              </select>
            </label>
          </>
        )}

        <div className='flex flex-col gap-3'>
          {expenses
            .filter(({ category }) => category === selectedCategory)
            .sort(sortBy)
            .map(({ price, date, _id }) => (
              <div key={_id}>
                <small aria-label='category-date'>{String(date)}</small>
                <p className='text-emerald-400'>{numberToDolar(price)}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SelectACategory;
