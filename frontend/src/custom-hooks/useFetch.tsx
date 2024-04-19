import { Dispatch, useCallback, useState } from 'react';

type IFetchType<T> = {
  data: null | T;
  loading: boolean;
  error: null | string;
};

export async function fetchRequest<T>(
  endpoint: string,
  setFetchState: Dispatch<React.SetStateAction<IFetchType<T>>>,
  options?: RequestInit
) {
  const setError = (err: string) => {
    setFetchState({
      data: null,
      loading: false,
      error: err,
    });
  };
  try {
    setFetchState({
      loading: true,
      error: null,
      data: null,
    });
    const res = await fetch(
      import.meta.env.VITE_SERVER_URL + endpoint,
      options
    );
    if (!res.ok) throw new Error((await res.json()).message);
    const json = (await res.json()) as T;
    setFetchState({
      data: json,
      loading: false,
      error: null,
    });
    return json;
  } catch (error) {
    const err = error instanceof Error ? error.message : 'Error fetching data';
    setError(err);
    return;
  }
}

export const useFetch = <T,>(loadingState: boolean = false) => {
  const [fetchState, setFetchState] = useState<IFetchType<T>>({
    data: null,
    loading: loadingState,
    error: null,
  });

  const setError = (err: string) => {
    setFetchState({
      data: null,
      loading: false,
      error: err,
    });
  };

  const setLoad = useCallback((loadState: boolean) => {
    setFetchState((p) => ({ ...p, loading: loadState }));
  }, []);

  const request = useCallback(
    async (endpoint: string, options?: RequestInit) => {
      return await fetchRequest<T>(endpoint, setFetchState, options);
    },
    []
  );

  const { data, loading, error } = fetchState;
  return { data, loading, error, request, setError, setLoad };
};
