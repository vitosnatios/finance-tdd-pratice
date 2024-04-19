import { useState } from 'react';
import Title from '../../text/Title';
import FormComponent from '../FormComponent';
import Input from '../Input';
import Label from '../Label';
import Button from '../Button';
import StyledLink from '../../text/StyledLink';
import Error from '../../text/Error';
import { handleInputChange } from '../../../utils/authFormUtils';
import useForm from '../../../custom-hooks/useAuthForm';

const Form = () => {
  const [form, setForm] = useState<{ [key: string]: string }>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const { loading, error, handleSubmit } = useForm(form, '/api/user/create');

  return (
    <FormComponent onSubmit={handleSubmit} aria-label='login-form'>
      <Title aria-label='create-account-title'>Create Your Account</Title>
      <Label htmlFor='username'>
        Username
        <Input
          onChange={(e) => handleInputChange(e, 'username', setForm)}
          value={form.username}
          id='username'
          type='text'
        />
      </Label>
      <Label htmlFor='email'>
        Email
        <Input
          onChange={(e) => handleInputChange(e, 'email', setForm)}
          value={form.email}
          id='email'
          type='email'
        />
      </Label>

      <Label htmlFor='firstName'>
        First Name
        <Input
          onChange={(e) => handleInputChange(e, 'firstName', setForm)}
          value={form.firstName}
          id='firstName'
          type='text'
        />
      </Label>

      <Label htmlFor='lastName'>
        Last Name
        <Input
          onChange={(e) => handleInputChange(e, 'lastName', setForm)}
          value={form.lastName}
          id='lastName'
          type='text'
        />
      </Label>

      <Label htmlFor='password'>
        Password
        <Input
          onChange={(e) => handleInputChange(e, 'password', setForm)}
          value={form.password}
          id='password'
          type='password'
        />
      </Label>
      <div className='flex flex-col-reverse gap-4 sm:flex-row items-center justify-between'>
        <Button type='submit' aria-label='submit-create'>
          {loading ? 'Loading' : 'Login'}
        </Button>
        <StyledLink to='/login' aria-label='make-login-link'>
          Already Registered? Make Login!
        </StyledLink>
      </div>
      {error && <Error>{error}</Error>}
    </FormComponent>
  );
};

export default Form;
