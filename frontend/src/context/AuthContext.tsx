import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
} from 'react';
import { getCookie, removeCookie } from '../utils/cookie';
import { useFetch } from '../custom-hooks/useFetch';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { data, loading, request, setLoad, setError } = useFetch<{
    user: IUser;
  } | null>(true);
  const publicRoutes = useCallback(
    () => ['/login', '/create-account', '/'],
    []
  );

  const authByJWT = useCallback(
    async (jwt: string | undefined) => {
      if (!jwt) {
        setLoad(false);
        navigate('/login');
        return;
      }
      const jwtResponse = await request('/api/auth/jwt', {
        method: 'POST',
        body: JSON.stringify({ jwt }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!jwtResponse) {
        navigate('/login');
        removeCookie('jwt');
        return;
      }

      if (!publicRoutes().includes(location.pathname)) return;
      navigate('/');
    },
    [publicRoutes, request, navigate, setLoad]
  );

  useEffect(() => {
    if (data && publicRoutes().includes(location.pathname)) {
      navigate('/');
    } else if (!data && !publicRoutes().includes(location.pathname)) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authByJWT, location.pathname, data, publicRoutes, navigate]);

  useEffect(() => {
    setLoad(true);
    authByJWT(getCookie('jwt'));

    const authInterval = 1200000;
    const intervalRef = setInterval(async () => {
      const jwt = getCookie('jwt');
      await authByJWT(jwt);
    }, authInterval);

    return () => {
      clearInterval(intervalRef);
    };
  }, [authByJWT, setLoad]);

  return (
    <AuthContext.Provider value={{ data, loading, authByJWT, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
