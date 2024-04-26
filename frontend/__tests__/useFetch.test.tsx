import { renderHook } from '@testing-library/react';
import { fetchRequest, useFetch } from './../src/custom-hooks/useFetch';
import { describe, expect, it, vi } from 'vitest';

describe('useFetch hook', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useFetch());
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it('should set the load state to true before the fetch, then false, ', async () => {
    const mockSetFetchState = vi.fn();
    globalThis.fetch = () =>
      Promise.resolve(
        new Response(
          JSON.stringify({ message: 'Invalid username or password' }),
          { status: 403 }
        )
      );
    await fetchRequest('/api/user/login', mockSetFetchState);
    expect(mockSetFetchState).toHaveBeenCalledWith({
      loading: true,
      error: null,
      data: null,
    });
    expect(mockSetFetchState).toHaveBeenCalledWith({
      loading: false,
      error: 'Invalid username or password',
      data: null,
    });
  });

  it('should put the fetch response inside the data state', async () => {
    const mockData = 'vitosdeveloper';
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(mockData)));
    const { result } = renderHook(() => useFetch<string>());
    await result.current.request('/api/data', { method: 'POST' });
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBe(mockData);
  });
});
