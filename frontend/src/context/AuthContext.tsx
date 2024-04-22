import { PropsWithChildren, createContext } from 'react';
import { useFetch } from '../custom-hooks/useFetch';
import useAuth from '../custom-hooks/useAuth';

export type IUser = {
  [key in '_id' | 'username' | 'email' | 'firstName' | 'lastName']: string;
};

export const AuthContext = createContext<{
  data: { user: IUser } | null;
  loading: boolean;
  authByJWT: (jwt: string | undefined) => Promise<void>;
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
  } | null>(true);

  const { authByJWT } = useAuth(setLoad, request, data);

  return (
    <AuthContext.Provider value={{ data, loading, authByJWT, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
