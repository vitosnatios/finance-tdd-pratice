import React from 'react';
import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('MainPage', () => {
  test('Should render the Title', () => {
    render(<App />);
    screen.getByRole('heading', { name: 'app-title' });
    screen.getByText('Finance App (TDD Pratice)');
  });
});
