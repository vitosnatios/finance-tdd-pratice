import { Link } from 'react-router-dom';
import Title from '../text/Title';
import { IExpense } from '../../pages/AddExpenses';
import ExpensesCharts from './ExpensesCharts';
import SelectACategory from './SelectACategory';

type Props = {
  expenses: IExpense[] | undefined | null;
};

const ViewExpensesComponent = ({ expenses }: Props) => {
  const dataWithTotalPrice = new Map();
  expenses?.forEach(({ category, price }) => {
    if (!dataWithTotalPrice.has(category))
      return dataWithTotalPrice.set(category, price);
    const previousValue = dataWithTotalPrice.get(category);
    dataWithTotalPrice.set(category, previousValue + price);
  });

  const categoriesKeys = Array.from(dataWithTotalPrice.keys());

  const categoriesKeysByBiggerPrice = categoriesKeys.sort((a, b) => {
    return dataWithTotalPrice.get(b) - dataWithTotalPrice.get(a);
  });

  const thereIsntExpenses = !expenses || expenses.length == 0;
  return (
    <>
      <Title aria-label='your-expenses-title'>Your expenses</Title>
      {thereIsntExpenses ? (
        <>
          <p aria-label='no-expenses-text'>
            You haven't added any expenses yet.
          </p>
          <Link aria-label='add-expenses-link' to='/add-expenses'>
            Add some expenses to view them
          </Link>
        </>
      ) : (
        <div className='flex flex-col gap-8'>
          <ExpensesCharts
            dataWithTotalPrice={dataWithTotalPrice}
            categoriesKeysByBiggerPrice={categoriesKeysByBiggerPrice}
          />
          <SelectACategory
            categoriesKeysByBiggerPrice={categoriesKeysByBiggerPrice}
            expenses={expenses}
          />
        </div>
      )}
    </>
  );
};

export default ViewExpensesComponent;
