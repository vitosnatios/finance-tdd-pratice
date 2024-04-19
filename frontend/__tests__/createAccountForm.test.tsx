import React from 'react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import CreateAccountForm from '../src/components/form/createAccount/CreateAccountForm';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getCookie } from '../src/utils/cookie';

describe('Create Account form', () => {
  let usernameInput,
    emailInput,
    passwordInput,
    firstNameInput,
    lastNameInput,
    submitButton;

  beforeAll(() => {
    render(
      <BrowserRouter>
        <CreateAccountForm />
      </BrowserRouter>
    );
  });

  it('should be have a form with a Create Your Account title', () => {
    screen.getByRole('form', { name: 'login-form' });
    const title = screen.getByRole('heading', { name: 'create-account-title' });
    expect(title.textContent).toBe('Create Your Account');
  });

  it('should render username and password inputs and both inputs should have a label', () => {
    usernameInput = screen.getByLabelText('Username');
    emailInput = screen.getByLabelText('Email');
    passwordInput = screen.getByLabelText('Password');
    firstNameInput = screen.getByLabelText('First Name');
    lastNameInput = screen.getByLabelText('Last Name');

    expect(usernameInput).toHaveProperty('type', 'text');
    expect(emailInput).toHaveProperty('type', 'email');
    expect(passwordInput).toHaveProperty('type', 'password');
    expect(firstNameInput).toHaveProperty('type', 'text');
    expect(lastNameInput).toHaveProperty('type', 'text');
  });

  it('should have a "Already Registered? Make Login!" link to /create-account', () => {
    const createAccountLink = screen.getByRole('link', {
      name: 'make-login-link',
    });
    expect(createAccountLink.textContent).toBe(
      'Already Registered? Make Login!'
    );
    expect((createAccountLink as HTMLAnchorElement).href).toContain('/login');
  });

  it('should find a "Create" submit button and a error, and then set its error text to "Please, fill all the fields" on click', async () => {
    submitButton = screen.getByRole('button', { name: 'submit-create' });
    expect(submitButton).toHaveProperty('type', 'submit');
    fireEvent.click(submitButton);
    screen.getByText('Please, fill all the fields');
  });

  it('should simulate form submission and store the response JWT in cookie', async () => {
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
    fireEvent.change(emailInput, { target: { value: 'asd@asd' } });
    fireEvent.change(firstNameInput, { target: { value: 'asd' } });
    fireEvent.change(lastNameInput, { target: { value: 'asd' } });
    fireEvent.change(passwordInput, { target: { value: 'asd' } });
    fireEvent.click(submitButton);

    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(fetchMock).toHaveBeenCalled();

    const jwtCookie = getCookie('jwt');
    expect(jwtCookie).toBe(jwt);
  });
});
