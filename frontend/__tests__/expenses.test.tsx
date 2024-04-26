import React from 'react';
import { beforeAll, describe, expect, it } from 'vitest';
import ViewExpenses from './../src/pages/ViewExpenses';
import { render, screen } from '@testing-library/react';

describe('expense page', () => {
  beforeAll(() => {
    render(<ViewExpenses />);
  });

  it('should render its "Your expenses" title', () => {
    const title = screen.getByRole('heading', { name: 'your-expenses-title' });
    expect(title.textContent).toBe('Your expenses');
  });

  it(`should render "You haven't added any expenses yet."`, () => {
    const noExpensesText = screen.getByRole('paragraph', {
      name: 'no-expenses-text',
    });
    expect(noExpensesText.textContent).toBe(
      "You haven't added any expenses yet."
    );
  });

  it('should have a "Add some expenses to view them" link and it should have a "/add-expenses" href', () => {
    const link = screen.getByRole('link', { name: 'add-expenses-link' });
    expect(link.textContent).toBe('Add some expenses to view them');
  });
});
