import { createBrowserRouter } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Settings from './pages/Settings';
import AddExpenses from './pages/AddExpenses';
import ViewExpenses from './pages/ViewExpenses';

export const routes: {
  path: string;
  element: JSX.Element;
}[] = [
  {
    path: '',
    element: <Home />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'create-account',
    element: <CreateAccount />,
  },
  {
    path: 'settings',
    element: <Settings />,
  },
  {
    path: 'add-expenses',
    element: <AddExpenses />,
  },
  {
    path: 'view-expenses',
    element: <ViewExpenses />,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthContextProvider>
        <Layout />
      </AuthContextProvider>
    ),
    children: routes,
  },
]);

export default router;
