import { useState } from 'react';
import FormComponent from '../FormComponent';
import Label from '../Label';
import Input from '../Input';
import Button from '../Button';
import StyledLink from '../../text/StyledLink';
import Error from '../../text/Error';
import Title from '../../text/Title';
import useForm from '../../../custom-hooks/useAuthForm';

const LoginForm = () => {
  const [form, setForm] = useState<{ [key: string]: string }>({
    username: '',
    password: '',
  });

  const { loading, error, handleSubmit, handleInputChange } = useForm(
    form,
    setForm,
    '/api/user/login'
  );

  return (
    <FormComponent onSubmit={handleSubmit} aria-label='login-form'>
      <Title aria-label='login-title'>Login</Title>
      <Label htmlFor='username'>
        Username
        <Input
          onChange={handleInputChange}
          value={form.username}
          id='username'
          type='text'
        />
      </Label>
      <Label htmlFor='password'>
        Password
        <Input
          onChange={handleInputChange}
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
