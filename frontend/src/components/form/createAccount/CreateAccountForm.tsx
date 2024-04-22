import { useState } from 'react';
import Input from '../Input';
import Label from '../Label';
import useForm from '../../../custom-hooks/useAuthForm';
import FormStructure from '../FormStructure';

const Form = () => {
  const [form, setForm] = useState<{ [key: string]: string }>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const { loading, error, handleSubmit, handleInputChange } = useForm(
    form,
    setForm,
    '/api/user/create'
  );

  return (
    <FormStructure
      loading={loading}
      error={error}
      title='Create Your Account'
      handleSubmit={handleSubmit}
      buttonText='Create'
      linkText='Already Registered? Make Login!'
      linkUrl='/login'
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
      <Label htmlFor='email'>
        Email
        <Input
          onChange={handleInputChange}
          value={form.email}
          id='email'
          type='email'
        />
      </Label>
      <Label htmlFor='firstName'>
        First Name
        <Input
          onChange={handleInputChange}
          value={form.firstName}
          id='firstName'
          type='text'
        />
      </Label>
      <Label htmlFor='lastName'>
        Last Name
        <Input
          onChange={handleInputChange}
          value={form.lastName}
          id='lastName'
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

export default Form;
