import { render, screen } from '@testing-library/react';
import Home from './../src/pages/Home';
import { beforeAll, describe, expect, it } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

describe('Home component', () => {
  beforeAll(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  it('should render the component with basic elements', () => {
    screen.getByText('Track Your Finances with Ease');
  });

  it('should render the heading with the correct text', () => {
    const heading = screen.getByText('Track Your Finances with Ease');
    expect(heading).toHaveProperty('className', 'text-3xl font-bold mb-8');
  });

  it('should render the image with a border and alt text', () => {
    const image = screen.getByAltText('Image description');
    expect(image).toHaveProperty(
      'className',
      'border border-gray-700 rounded-md mb-10'
    );
  });

  it('should render two Link components with appropriate text and classes', () => {
    const addExpensesLink = screen.getByText('Add Expenses');
    expect(addExpensesLink).toHaveProperty(
      'href',
      window.location.origin + '/login'
    );
    expect(addExpensesLink).toHaveProperty(
      'className',
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md text-center'
    );

    const viewExpensesLink = screen.getByText('View Expense Charts');
    expect(viewExpensesLink).toHaveProperty(
      'href',
      window.location.origin + '/login'
    );
    expect(viewExpensesLink).toHaveProperty(
      'className',
      'text-blue-500 hover:underline'
    );
  });
});
