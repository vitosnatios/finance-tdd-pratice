import { useState } from 'react';
import Label from '../Label';
import Input from '../Input';
import useForm from '../../../custom-hooks/useAuthForm';
import FormStructure from '../FormStructure';

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
    <FormStructure
      loading={loading}
      error={error}
      title='Login'
      handleSubmit={handleSubmit}
      buttonText='Login'
      linkText='New here? Create a new account!'
      linkUrl='/create-account'
    >
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
    </FormStructure>
  );
};

export default LoginForm;
