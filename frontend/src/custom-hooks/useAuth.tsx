import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../utils/cookie';
import { useCallback, useEffect } from 'react';
import { IUser } from '../context/AuthContext';

const useAuth = (
  setLoad: (loadState: boolean) => void,
  request: (
    endpoint: string,
    options?: RequestInit | undefined
  ) => Promise<
    | {
        user: IUser;
      }
    | null
    | undefined
  >,
  data: {
    user: IUser;
  } | null
) => {
  const navigate = useNavigate();

  const publicRoutes = useCallback(
    () => ['/login', '/create-account', '/'],
    []
  );

  const isntAPublicPath = useCallback(
    (pathname: string) => !publicRoutes().includes(pathname),
    [publicRoutes]
  );

  const navigateIfPathnameIsPrivate = useCallback(
    (pathname: string) => isntAPublicPath(pathname) && navigate('/login'),
    [navigate, isntAPublicPath]
  );

  const authByJWT = useCallback(
    async (jwt: string | undefined) => {
      if (!jwt) {
        setLoad(false);
        navigateIfPathnameIsPrivate(location.pathname);
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
        navigateIfPathnameIsPrivate(location.pathname);
        removeCookie('jwt');
        return;
      }
      if (isntAPublicPath(location.pathname)) return;
      navigate('/');
      return;
    },
    [request, navigate, setLoad, navigateIfPathnameIsPrivate, isntAPublicPath]
  );

  useEffect(() => {
    if (data && publicRoutes().includes(location.pathname)) {
      navigate('/');
    } else if (!data && isntAPublicPath(location.pathname)) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    authByJWT,
    location.pathname,
    data,
    publicRoutes,
    navigate,
    isntAPublicPath,
  ]);

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
