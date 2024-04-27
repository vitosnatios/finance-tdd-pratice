import { useAuthContext } from '../context/useAuthContext';
import ViewExpensesComponent from '../components/ViewExpenses/ViewExpensesComponent';

const ViewExpenses = () => {
  const { data } = useAuthContext();

  return <ViewExpensesComponent expenses={data?.expenses} />;
};

export default ViewExpenses;
