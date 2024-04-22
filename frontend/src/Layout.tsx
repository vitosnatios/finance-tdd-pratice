import { Outlet } from 'react-router-dom';
import Header from './components/partials/header/Header';
import Footer from './components/partials/footer/Footer';
import { useAuthContext } from './context/useAuthContext';
import { ClipLoader } from 'react-spinners';

const Layout = () => {
  const { loading } = useAuthContext();
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-grow p-4 m-auto max-w-screen-xl'>
        {loading ? <ClipLoader color='#3b82f6' size='200' /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
