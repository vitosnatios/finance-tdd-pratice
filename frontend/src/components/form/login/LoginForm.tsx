import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({
  handleFormSubmit,
}: {
  handleFormSubmit?: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);

  const handleLoginFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    handleFormSubmit ? await handleFormSubmit(e) : handleLoginFormSubmit(e);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} aria-label='login-form'>
      <label htmlFor='username'>Username</label>
      <input id='username' type='text' />
      <label htmlFor='password'>Password</label>
      <input id='password' type='password' />

      <div>
        <button type='submit' aria-label='submit-login'>
          {loading ? 'Loading' : 'Login'}
        </button>
        <Link to='/create-account' aria-label='create-account-link'>
          New here? Create a new account!
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
