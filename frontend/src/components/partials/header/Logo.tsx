import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to='/'>
      <h1 className='text-3xl font-bold text-white' aria-label='header-logo'>
        Finance App (TDD Pratice)
      </h1>
    </Link>
  );
};

export default Logo;
