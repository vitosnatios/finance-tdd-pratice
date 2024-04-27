import { Link } from 'react-router-dom';
import { removeCookie } from '../../../utils/cookie';
import { MouseEvent } from 'react';
import { PacmanLoader } from 'react-spinners';
import { IUser } from '../../../context/AuthContext';
import { IExpense } from '../../../pages/AddExpenses';

const NavLinks = ({
  setError,
  authByJWT,
  loading,
  data,
}: {
  setError: (err: string) => void;
  authByJWT: (
    jwt: string | undefined,
    login?: boolean | undefined
  ) => Promise<unknown>;
  loading: boolean;
  data: {
    user: IUser;
    expenses: IExpense[];
  } | null;
}) => {
  const loggedLinks = [
    { text: 'Add Expenses', to: '/add-expenses' },
    { text: 'View Expenses', to: '/view-expenses' },
    { text: 'Logout', to: '/logout' },
  ];

  const unloggedLinks = [
    { text: 'Create Account', to: '/create-account' },
    { text: 'Log In', to: '/login' },
  ];
  const linksToRender = data ? loggedLinks : unloggedLinks;

  return (
    <nav aria-label='header-navbar'>
      <ul aria-label='header-links-list' className='flex gap-4'>
        {loading ? (
          <PacmanLoader color='#3b82f6' size='18px' />
        ) : (
          linksToRender.map(({ text, to }, i) => {
            const logout = text === 'Logout';
            const handleLogoutClick = logout
              ? async (
                  e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
                ) => {
                  e.preventDefault();
                  removeCookie('jwt');
                  await authByJWT(undefined);
                  setError('');
                }
              : undefined;

            return (
              <li
                key={i}
                className='hover:text-gray-200 dark:hover:text-gray-400'
              >
                <Link
                  aria-label='header-link'
                  to={to}
                  className='text-sm md:text-xl font-medium'
                  onClick={handleLogoutClick}
                >
                  {text}
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </nav>
  );
};

export default NavLinks;
