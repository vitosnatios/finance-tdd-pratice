import { Link } from 'react-router-dom';
import { removeCookie } from '../../../utils/cookie';
import { useAuthContext } from '../../../context/useAuthContext';
import { MouseEvent } from 'react';
import { PacmanLoader } from 'react-spinners';

const NavLinks = () => {
  const { setError, loading, data } = useAuthContext();

  const loggedLinks = [
    { text: 'Add Expenses', to: '/add-expenses' },
    { text: 'View Expenses', to: '/view-expenses' },
    { text: 'Settings', to: '/settings' },
    { text: 'Logout', to: '/logout' },
  ];

  const unloggedLinks = [
    { text: 'Create Account', to: '/create-account' },
    { text: 'Log In', to: '/login' },
    { text: 'Settings', to: '/settings' },
  ];
  const linksToRender = data ? loggedLinks : unloggedLinks;

  return (
    <nav aria-label='header-navbar'>
      <ul aria-label='header-links-list' className='flex space-x-4'>
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
                  className='text-xl font-medium'
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
