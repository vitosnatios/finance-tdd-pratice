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
  setNewExpense: (newExpense: IExpense) => void;
}>({
  data: null,
  loading: false,
  authByJWT: async () => {},
  setError: async () => {},
  setNewExpense: async () => {},
});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const { data, loading, request, setLoad, setError, setFetchState } =
    useFetch<{
      user: IUser;
      expenses: IExpense[];
    } | null>(true);

  const { authByJWT } = useAuth(setLoad, request, data);

  const setNewExpense = (newExpense: IExpense) =>
    setFetchState((p) => {
      const lastData = p.data ? p.data : null;
      const lastExpensesValue = p.data?.expenses || [];
      if (!lastData) return { ...p, data: null };
      return {
        ...p,
        data: {
          ...lastData,
          expenses: [...lastExpensesValue, newExpense],
        },
      };
    });

  return (
    <AuthContext.Provider
      value={{ data, loading, authByJWT, setError, setNewExpense }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
