import { createBrowserRouter } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import AddExpenses from './pages/AddExpenses';
import ViewExpenses from './pages/ViewExpenses';

const children: {
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
    children,
  },
]);

export const routes = children;
export default router;
