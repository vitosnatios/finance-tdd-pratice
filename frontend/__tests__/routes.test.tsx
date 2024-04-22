import { describe, expect, it } from 'vitest';
import { routes } from './../src/router';
import React from 'react';

describe('routes', () => {
  const expectedRoutes = [
    '',
    'login',
    'create-account',
    'settings',
    'add-expenses',
    'view-expenses',
  ];

  it('should have all the routes and they should have a valid jsx/tsx element', () => {
    expectedRoutes.forEach((route) => {
      const selectedRoute = routes.find((r) => r.path === route);
      expect(selectedRoute).toBeDefined();
      expect(React.isValidElement(selectedRoute?.element)).toBeTruthy();
    });
  });
});
