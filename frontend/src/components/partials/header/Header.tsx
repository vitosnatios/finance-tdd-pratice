import { useAuthContext } from '../../../context/useAuthContext';
import Logo from './Logo';
import NavLinks from './NavLinks';

const Header = () => {
  const { setError, loading, data } = useAuthContext();

  return (
    <header className='bg-gray-800'>
      <div className='text-white py-6 flex justify-between items-center max-w-screen-xl m-auto'>
        <Logo />
        <NavLinks setError={setError} loading={loading} data={data} />
      </div>
    </header>
  );
};

export default Header;
