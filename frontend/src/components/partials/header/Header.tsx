import Logo from './Logo';
import NavLinks from './NavLinks';

const Header = () => {
  return (
    <header className='bg-gray-800'>
      <div className='text-white py-6 flex justify-between items-center max-w-screen-xl m-auto'>
        <Logo />
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
