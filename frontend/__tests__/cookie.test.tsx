import { afterEach, describe, expect, it } from 'vitest';
import { setCookie, removeCookie, getCookie } from '../src/utils/cookie';

describe('cookies', () => {
  afterEach(() => {});

  it('should add a cookie', () => {
    setCookie('test-cookie', '123');
    expect(document.cookie).toBe('test-cookie=123');
    console.log(document.cookie);
  });

  it('should add and then get the cookie', () => {
    setCookie('test-cookie', '123');
    const cookieValue = getCookie('test-cookie');
    expect(cookieValue).toBe('123');
  });

  it('add, read, remove and try to read to check if it was removed', () => {
    setCookie('test-cookie', '123');
    const cookieValue = getCookie('test-cookie');
    expect(cookieValue).toBe('123');
    removeCookie('test-cookie');
    const emptyValue = getCookie('test-cookie');
    expect(emptyValue).toBeFalsy();
  });
});
