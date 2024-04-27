import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../utils/cookie';
import { useCallback, useEffect } from 'react';
import { IUser } from '../context/AuthContext';
import { IExpense } from '../pages/AddExpenses';

const useAuth = (
  setLoad: (loadState: boolean) => void,
  request: (
    endpoint: string,
    options?: RequestInit | undefined
  ) => Promise<
    | {
        user: IUser;
        expenses: IExpense[];
      }
    | null
    | undefined
  >
  // data: {
  //   user: IUser;
  // } | null
) => {
  const navigate = useNavigate();

  const publicRoutes = useCallback(
    () => ['/login', '/create-account', '/'],
    []
  );

  const isntPublic = useCallback(
    (pathname: string) => !publicRoutes().includes(pathname),
    [publicRoutes]
  );

  const navigateIfPrivate = useCallback(
    (pathname: string) => isntPublic(pathname) && navigate('/login'),
    [navigate, isntPublic]
  );

  const authByJWT = useCallback(
    async (jwt: string | undefined, login: boolean = false) => {
      if (!jwt && isntPublic(location.pathname)) {
        setLoad(false);
        navigateIfPrivate(location.pathname);
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
        navigateIfPrivate(location.pathname);
        removeCookie('jwt');
        return;
      }
      if (isntPublic(location.pathname)) return;
      if (login) navigate('/');
    },
    [request, navigate, setLoad, navigateIfPrivate, isntPublic]
  );

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

  return { authByJWT };
};

export default useAuth;
