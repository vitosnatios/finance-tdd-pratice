import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-gray-800 py-4'>
      <div className='flex flex-col md:flex-row justify-between items-center px-4 mx-auto max-w-screen-xl'>
        <div className='flex items-center space-x-4'>
          <Link to='/' className='text-xl font-bold'>
            Financial App
          </Link>
        </div>
        <div className='text-sm'>&copy; 2024 by Vitos Deveolper.</div>
      </div>
    </footer>
  );
};

export default Footer;
