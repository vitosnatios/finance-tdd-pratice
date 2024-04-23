import React from 'react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import LoginForm from './../src/components/form/login/LoginForm';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getCookie } from '../src/utils/cookie';

describe('login form', () => {
  let usernameInput, passwordInput, submitButton;

  beforeAll(() => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
  });

  it('should be have a form with a login title', () => {
    screen.getByRole('form', { name: 'form' });
    const title = screen.getByRole('heading', { name: 'form-title' });
    expect(title.textContent).toBe('Login');
  });

  it('should render username and password inputs and both inputs should have a label', () => {
    usernameInput = screen.getByLabelText('Username');
    passwordInput = screen.getByLabelText('Password');
    expect(usernameInput).toHaveProperty('type', 'text');
    expect(passwordInput).toHaveProperty('type', 'password');
  });

  it('should have a "New here? Create a new account!" link to /create-account', () => {
    const createAccountLink = screen.getByRole('link', {
      name: 'form-link',
    });
    expect(createAccountLink.textContent).toBe(
      'New here? Create a new account!'
    );
    expect((createAccountLink as HTMLAnchorElement).href).toContain(
      '/create-account'
    );
  });

  it('should find a "Login" submit button and a error, and then set its error text to "Please, fill all the fields" on click', async () => {
    submitButton = screen.getByRole('button', { name: 'submit-button' });
    expect(submitButton).toHaveProperty('type', 'submit');
    fireEvent.click(submitButton);
    screen.getByText('Please, fill all the fields');
  });

  it('should simulate form submission, send credentials to fetch, and store JWT in cookie', async () => {
    const jwt = 'jwt-test';
    const fetchMock = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ jwt }), {
          status: 200,
        })
      )
    );
    globalThis.fetch = fetchMock;

    fireEvent.change(usernameInput, { target: { value: 'asd' } });
    fireEvent.change(passwordInput, { target: { value: 'asd' } });
    fireEvent.click(submitButton);

    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(fetchMock).toHaveBeenCalled();

    const jwtCookie = getCookie('jwt');
    expect(jwtCookie).toBe(jwt);
  });
});
