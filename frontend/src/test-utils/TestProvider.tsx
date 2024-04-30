import { PropsWithChildren } from 'react';
import AuthContextProvider from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const TestProvider = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <AuthContextProvider>{children}</AuthContextProvider>
    </BrowserRouter>
  );
};

export default TestProvider;
