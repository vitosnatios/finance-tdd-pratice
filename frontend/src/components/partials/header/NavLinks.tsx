import { Link } from 'react-router-dom';

type Props = { authenticated: boolean };

const NavLinks = ({ authenticated }: Props) => {
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
  const linksToRender = authenticated ? loggedLinks : unloggedLinks;

  return (
    <nav aria-label='header-navbar'>
      <ul aria-label='header-links-list' className='flex space-x-4'>
        {linksToRender.map(({ text, to }, i) => (
          <li key={i} className='hover:text-gray-200 dark:hover:text-gray-400'>
            <Link
              aria-label='header-link'
              to={to}
              className='text-xl font-medium'
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
