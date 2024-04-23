import { PropsWithChildren, createContext } from 'react';
import { useFetch } from '../custom-hooks/useFetch';
import useAuth from '../custom-hooks/useAuth';
import { IExpense } from '../pages/AddExpenses';

export type IUser = {
  [key in '_id' | 'username' | 'email' | 'firstName' | 'lastName']: string;
};

export const AuthContext = createContext<{
  data: { user: IUser; expenses: IExpense[] } | null;
  loading: boolean;
  authByJWT: (jwt: string | undefined) => Promise<unknown>;
  setError: (err: string) => void;
}>({
  data: null,
  loading: false,
  authByJWT: async () => {},
  setError: async () => {},
});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const { data, loading, request, setLoad, setError } = useFetch<{
    user: IUser;
    expenses: IExpense[];
  } | null>(true);

  const { authByJWT } = useAuth(setLoad, request, data);

  return (
    <AuthContext.Provider value={{ data, loading, authByJWT, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
