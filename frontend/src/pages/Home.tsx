import { Link } from 'react-router-dom';
import DemoImage from './../assets/demo.webp';

const Home = () => {
  return (
    <>
      <h1 className='text-3xl font-bold mb-8'>Track Your Finances with Ease</h1>
      <p className='text-lg text-gray-300 mb-10'>
        Take control of your spending and visualize your financial goals with
        our intuitive app.
      </p>

      <img
        src={DemoImage}
        className='border border-gray-700 rounded-md mb-10'
        alt='Image description'
      />

      <div className='flex flex-col space-y-4'>
        <Link
          to='/add-expenses'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md text-center'
        >
          Add Expenses
        </Link>
        <Link to='/view-expenses' className='text-blue-500 hover:underline'>
          View Expense Charts
        </Link>
      </div>

      <p className='text-center text-sm text-gray-500 mt-16'>
        Get started today and gain valuable insights into your spending habits!
      </p>
    </>
  );
};

export default Home;
