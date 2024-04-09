import Logo from './Logo';
import NavLinks from './NavLinks';

const Header = () => {
  return (
    <header className='bg-gray-800 text-white px-4 py-6 flex justify-between items-center'>
      <Logo />
      <NavLinks authenticated={false} />
    </header>
  );
};

export default Header;
