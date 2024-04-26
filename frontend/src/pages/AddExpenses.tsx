import { FormEvent, useState } from 'react';
import FormStructure from '../components/form/FormStructure';
import Label from '../components/form/Label';
import Input from '../components/form/Input';
import { useAuthContext } from '../context/useAuthContext';
import { useFetch } from '../custom-hooks/useFetch';
import { getCookie } from '../utils/cookie';

export interface IExpense {
  userId: string;
  category: string;
  price: string;
  _id?: string;
  date?: null | Date;
}

const AddExpenses = () => {
  const { data, setNewExpense } = useAuthContext();

  const [form, setForm] = useState<IExpense>({
    userId: String(data?.user._id),
    category: '',
    price: '',
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
      !String(form.price).trim()
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
