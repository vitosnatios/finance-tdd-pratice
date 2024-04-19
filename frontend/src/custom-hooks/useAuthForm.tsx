import { FormEvent } from 'react';
import { useFetch } from './useFetch';
import { setCookie } from '../utils/cookie';
import { useAuthContext } from '../context/useAuthContext';

export default function useForm(
  form: { [keys: string]: string },
  setForm: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >,
  endpoint: string
) {
  const { authByJWT } = useAuthContext();
  const { loading, error, request, setError } = useFetch<{
    jwt: string;
  }>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const key in form) {
      if (!form[key].trim()) return setError('Please, fill all the fields');
    }
    const json = await request(endpoint, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!json) return setError('Something went wrong');
    setCookie('jwt', String(json.jwt));
    await authByJWT(json.jwt);
  };

  const handleInputChange = ({ currentTarget }: FormEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [currentTarget.id]: currentTarget.value }));

  return { loading, error, handleSubmit, handleInputChange };
}
