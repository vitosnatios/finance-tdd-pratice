import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Layout from './Layout.tsx';
import './index.css';
import CreateAccount from './pages/CreateAccount';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <>home</>,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'create-account',
        element: <CreateAccount />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
