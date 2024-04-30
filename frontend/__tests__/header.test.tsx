import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  render,
  screen,
} from './../src/test-utils/testing-library-utils';
import NavLinks from '../src/components/partials/header/NavLinks';
import Logo from '../src/components/partials/header/Logo';

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
    render(<Logo />);
    const logo = screen.getByRole('heading', { name: 'header-logo' });
    expect(logo.textContent).toBe('Finance App (TDD Pratice)');
  });

  it('should show only "Create Account", "Log In" and "Settings" links when logged out', async () => {
    render(
      <NavLinks
        authByJWT={vi.fn()}
        setError={() => {}}
        data={null}
        loading={false}
      />
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
      <NavLinks
        authByJWT={vi.fn()}
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
