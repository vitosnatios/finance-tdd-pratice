import { FormEvent, useState } from 'react';
import FormStructure from '../components/form/FormStructure';
import Label from '../components/form/Label';
import Input from '../components/form/Input';
import { useAuthContext } from '../context/useAuthContext';
import { useFetch } from '../custom-hooks/useFetch';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';

export interface IExpense {
  userId: string;
  category: string;
  description: string;
  price: number;
  _id?: string;
  date?: null | string;
}

const AddExpenses = () => {
  const navigate = useNavigate();
  const { data, setNewExpense } = useAuthContext();

  const [form, setForm] = useState<IExpense>({
    userId: String(data?.user._id),
    category: '',
    description: '',
    price: 0,
    _id: '',
    date: null,
  });

  const { loading, error, request, setError } = useFetch<{
    expense: IExpense;
  }>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !form.userId.trim() ||
      !form.category.trim() ||
      !form.description.trim() ||
      !String(form.price).trim() ||
      !form.price
    )
      return setError('Please, fill all the fields');
    const json = await request('/api/expense/create', {
      method: 'POST',
      body: JSON.stringify({
        expense: {
          ...form,
          price: form.price,
        },
        jwt: getCookie('jwt'),
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!json) return setError('Something went wrong');
    setNewExpense(json.expense);
    navigate('/view-expenses');
  };

  const handleInputChange = ({ currentTarget }: FormEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [currentTarget.id]: currentTarget.value }));

  return (
    <FormStructure
      loading={loading}
      error={error}
      title='Add a new Expense'
      handleSubmit={handleSubmit}
      buttonText='Add'
      className='flex flex-col space-y-2 rounded-md shadow-md p-4'
    >
      <Label htmlFor='category'>
        Category
        <Input
          onChange={handleInputChange}
          value={form.category}
          id='category'
          type='text'
        />
      </Label>

      <Label htmlFor='description'>
        Description
        <Input
          onChange={handleInputChange}
          value={form.description}
          id='description'
          type='text'
        />
      </Label>

      <Label htmlFor='price'>
        Price
        <Input
          onChange={handleInputChange}
          value={form.price}
          id='price'
          type='number'
        />
      </Label>
    </FormStructure>
  );
};

export default AddExpenses;
