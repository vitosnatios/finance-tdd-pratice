import { FormEvent, useState } from 'react';
import FormComponent from '../FormComponent';
import Label from '../Label';
import Input from '../Input';
import Button from '../Button';
import StyledLink from '../../text/StyledLink';
import { useFetch } from '../../../custom-hooks/useFetch';
import Error from '../../text/Error';
import { setCookie } from '../../../utils/cookie';
import Title from '../../text/Title';

const LoginForm = () => {
  const [form, setForm] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  });

  const { loading, error, request, setError } = useFetch<{
    jwt: string;
  }>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = form;
    if (!username.trim() || !password.trim())
      return setError('Please, fill all the fields');
    const json = await request('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (json) setCookie('jwt', json.jwt);
  };

  const handleInputChange = (
    { currentTarget }: FormEvent<HTMLInputElement>,
    field: string
  ) => setForm((p) => ({ ...p, [field]: currentTarget.value }));

  return (
    <FormComponent onSubmit={handleSubmit} aria-label='login-form'>
      <Title aria-label='login-title'>Login</Title>
      <Label htmlFor='username'>
        Username
        <Input
          onChange={(e) => handleInputChange(e, 'username')}
          value={form.username}
          id='username'
          type='text'
        />
      </Label>
      <Label htmlFor='password'>
        Password
        <Input
          onChange={(e) => handleInputChange(e, 'password')}
          value={form.password}
          id='password'
          type='password'
        />
      </Label>
      <div className='flex flex-col-reverse gap-4 sm:flex-row items-center justify-between'>
        <Button type='submit' aria-label='submit-login'>
          {loading ? 'Loading' : 'Login'}
        </Button>
        <StyledLink to='/create-account' aria-label='create-account-link'>
          New here? Create a new account!
        </StyledLink>
      </div>
      {error && <Error>{error}</Error>}
    </FormComponent>
  );
};

export default LoginForm;
