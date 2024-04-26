import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import NavLinks from '../src/components/partials/header/NavLinks';
import Logo from '../src/components/partials/header/Logo';
import { BrowserRouter } from 'react-router-dom';

describe('header', () => {
  const testNavLinks = async (expectedLinks: { [key: string]: string }) => {
    await screen.findByRole('navigation', { name: 'header-navbar' });
    await screen.findByRole('list', { name: 'header-links-list' });
    const liElements = await screen.findAllByRole('link', {
      name: 'header-link',
    });
    expect(liElements.length).toBeGreaterThan(0);
    liElements.forEach((link) => {
      const { textContent } = link;
      expect(expectedLinks).toHaveProperty(textContent as string);
      expect((link as HTMLAnchorElement).href).toContain(
        expectedLinks[textContent as string]
      );
    });
  };

  afterEach(cleanup);

  it('should have the app name', () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
    const logo = screen.getByRole('heading', { name: 'header-logo' });
    expect(logo.textContent).toBe('Finance App (TDD Pratice)');
  });

  it('should show only "Create Account", "Log In" and "Settings" links when logged out', async () => {
    render(
      <BrowserRouter>
        <NavLinks setError={() => {}} data={null} loading={false} />
      </BrowserRouter>
    );

    const expectedLinks = {
      'Create Account': '/create-account',
      'Log In': '/login',
      Settings: '/settings',
    };

    await testNavLinks(expectedLinks);
  });

  it('should show only "Add Expenses", "View Expenses", "Settings" and "Logout"', async () => {
    render(
      <BrowserRouter>
        <NavLinks
          setError={() => {}}
          data={{
            user: {
              _id: '66259e0d1fc173b1a72854e3',
              username: 'asd',
              email: 'asd@asd',
              firstName: 'asd',
              lastName: 'asd',
            },
            expenses: [],
          }}
          loading={false}
        />
      </BrowserRouter>
    );

    const expectedLinks = {
      'Add Expenses': '/add-expenses',
      'View Expenses': '/view-expenses',
      Settings: '/settings',
      Logout: '/logout',
    };

    await testNavLinks(expectedLinks);
  });
});
