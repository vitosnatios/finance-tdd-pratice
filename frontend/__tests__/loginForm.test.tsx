import React from 'react';
import { beforeAll, describe, expect, it } from 'vitest';
import LoginForm from './../src/components/form/login/LoginForm';
import { fireEvent, render, screen } from '@testing-library/react';

describe('login form', () => {
  beforeAll(() => {
    render(<LoginForm />);
  });
  it('should be have a form', () => {
    screen.getByRole('form', { name: 'login-form' });
  });
  it('should render username and password inputs and both inputs should have a label', () => {
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    expect(usernameInput).toHaveProperty('type', 'text');
    expect(passwordInput).toHaveProperty('type', 'password');
  });
  it('should have a "New here? Create a new account!" link to /create-account', () => {
    const createAccountLink = screen.getByRole('link', {
      name: 'create-account-link',
    });
    expect(createAccountLink.textContent).toBe(
      'New here? Create a new account!'
    );
    expect((createAccountLink as HTMLAnchorElement).href).toBe(
      '/create-account'
    );
  });
  it('should render a "Login" submit button and set its text to load on click', () => {
    const submitButton = screen.getByRole('button', { name: 'submit-login' });
    expect(submitButton).toHaveProperty('type', 'submit');
    fireEvent.click(submitButton);
    expect(submitButton.textContent).toBe('Loading');
  });
});
