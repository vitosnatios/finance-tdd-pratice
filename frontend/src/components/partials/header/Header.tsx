import { useAuthContext } from '../../../context/useAuthContext';
import Logo from './Logo';
import NavLinks from './NavLinks';

const Header = () => {
  const { loading, data, authByJWT, setError } = useAuthContext();

  return (
    <header className='bg-gray-800'>
      <div className='text-white py-6 px-4 flex justify-between items-center max-w-screen-xl m-auto'>
        <Logo />
        <NavLinks
          authByJWT={authByJWT}
          loading={loading}
          data={data}
          setError={setError}
        />
      </div>
    </header>
  );
};

export default Header;
