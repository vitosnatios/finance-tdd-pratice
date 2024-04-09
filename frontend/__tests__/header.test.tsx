import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import NavLinks from '../src/components/partials/header/NavLinks';
import Logo from '../src/components/partials/header/Logo';

describe('header', () => {
  const testNavLinks = (expectedLinks: { [key: string]: string }) => {
    screen.getByRole('navigation', { name: 'header-navbar' });
    screen.getByRole('list', { name: 'header-links-list' });
    const liElements = screen.getAllByRole('link', { name: 'header-link' });
    expect(liElements.length).toBeLessThan(0);
    liElements.forEach((link) => {
      const { innerText } = link;
      expect(expectedLinks).toHaveProperty(innerText);
      expect((link as HTMLAnchorElement).href).toBe(expectedLinks[innerText]);
    });
  };

  afterEach(cleanup);

  it('should have the app name', () => {
    render(<Logo />);
    const logo = screen.getByRole('heading', { name: 'header-logo' });
    expect(logo.innerText).toBe('Finance App (TDD Pratice)');
  });

  it('should show only "Create Account", "Log In" and "Settings" links when logged out', () => {
    render(<NavLinks authenticated={false} />);
    const expectedLinks = {
      'Create Account': '/create-account',
      'Log In': '/login',
      Settings: '/settings',
    };
    testNavLinks(expectedLinks);
  });

  it('should show only "Add Expenses", "View Expenses", "Settings" and "Logout"', () => {
    render(<NavLinks authenticated={true} />);
    const expectedLinks = {
      'Add Expenses': '/add-expenses',
      'View Expenses': '/view-expenses',
      Settings: '/settings',
      Logout: '/logout',
    };
    testNavLinks(expectedLinks);
  });
});
