import { renderHook } from '@testing-library/react';
import { useFetch } from './../src/custom-hooks/useFetch';
import { describe, expect, it, vitest } from 'vitest';

describe('useFetch hook', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useFetch());
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it('should put the fetch response inside the data state', async () => {
    const mockData = 'vitosdeveloper';
    globalThis.fetch = vitest
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(mockData)));
    const { result } = renderHook(() => useFetch<string>());
    const { request } = result.current;
    await request('/api/data');
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBe(mockData);
  });
});
