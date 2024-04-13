import { useState } from 'react';

export const useFetch = <T,>() => {
  type IFetchType = {
    data: null | T;
    loading: boolean;
    error: null | string;
  };

  const [fetchState, setFetchState] = useState<IFetchType>({
    data: null,
    loading: false,
    error: null,
  });

  const request = async (endpoint: string, options?: RequestInit) => {
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
      if (!res.ok) throw new Error();
      const json = (await res.json()) as T;
      setFetchState({
        data: json,
        loading: false,
        error: null,
      });
      return json;
    } catch (error) {
      const err =
        error instanceof Error ? error.message : 'Error fetching data';
      setFetchState({
        data: null,
        loading: false,
        error: err,
      });
      return err;
    }
  };

  const { data, loading, error } = fetchState;
  return { data, loading, error, request };
};
