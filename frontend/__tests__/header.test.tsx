import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import NavLinks from '../src/components/partials/header/NavLinks';
import Logo from '../src/components/partials/header/Logo';
import { BrowserRouter } from 'react-router-dom';

describe('header', () => {
  const testNavLinks = (expectedLinks: { [key: string]: string }) => {
    screen.getByRole('navigation', { name: 'header-navbar' });
    screen.getByRole('list', { name: 'header-links-list' });
    const liElements = screen.getAllByRole('link', { name: 'header-link' });
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
        <NavLinks />
      </BrowserRouter>
    );
    const expectedLinks = {
      'Create Account': '/create-account',
      'Log In': '/login',
      Settings: '/settings',
    };

    testNavLinks(expectedLinks);
  });

  // it('should show only "Add Expenses", "View Expenses", "Settings" and "Logout"', async () => {
  //   const { baseElement } = render(
  //     <BrowserRouter>
  //       <NavLinks />
  //     </BrowserRouter>
  //   );

  //   logDOM(baseElement);

  //   const expectedLinks = {
  //     'Add Expenses': '/add-expenses',
  //     'View Expenses': '/view-expenses',
  //     Settings: '/settings',
  //     Logout: '/logout',
  //   };

  //   testNavLinks(expectedLinks);
  // });
});
