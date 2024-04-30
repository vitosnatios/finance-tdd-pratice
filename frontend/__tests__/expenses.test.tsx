import React from 'react';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from './../src/test-utils/testing-library-utils';
import ViewExpensesComponent from '../src/components/ViewExpenses/ViewExpensesComponent';

describe('expense page', () => {
  const expenses = [
    {
      _id: '66271e27672d4a3f7cb4b626',
      userId: '66259e0d1fc173b1a72854e3',
      category: 'Food',
      description: 'miojo da turma da mônica',
      price: 1,
      date: 'Mon Apr 22 2024 23:34:15 GMT-0300 (Horário Padrão de Brasília)',
    },
    {
      _id: '6627220cebc60c5d40483d99',
      userId: '66259e0d1fc173b1a72854e3',
      category: 'Food',
      description: 'ovo com alho e tal',
      price: 1,
      date: 'Mon Apr 22 2024 23:50:52 GMT-0300 (Horário Padrão de Brasília)',
    },
  ];

  beforeAll(() => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  beforeEach(cleanup);

  it('should render its "Your expenses" title', () => {
    render(<ViewExpensesComponent expenses={null} />);
    const title = screen.getByRole('heading', { name: 'your-expenses-title' });
    expect(title.textContent).toBe('Your expenses');
  });

  it(`should render "You haven't added any expenses yet."`, async () => {
    render(<ViewExpensesComponent expenses={null} />);
    screen.getByText("You haven't added any expenses yet.");
  });

  it('should have a "Add some expenses to view them" link and it should have a "/add-expenses" href', () => {
    render(<ViewExpensesComponent expenses={null} />);
    const link = screen.getByRole('link', { name: 'add-expenses-link' });
    expect(link.textContent).toBe('Add some expenses to view them');
  });

  it('should have a "Food" button, after clicking it, it should print their expenses and a select element used to sort them', () => {
    render(<ViewExpensesComponent expenses={expenses} />);
    const button = screen.getByRole('button', {
      name: 'category-button',
    });
    expect(button.textContent).toBe('Food');
    fireEvent.click(button);
    screen.getByLabelText('By');
    expenses.forEach((expense) => {
      screen.getByText(expense.date);
    });
    const el = screen.getAllByText('$1.00');
    expect(el.length).toBe(2);
    screen.getByText('miojo da turma da mônica');
    screen.getByText('ovo com alho e tal');
  });

  it('should filter by newer', () => {
    render(<ViewExpensesComponent expenses={expenses} />);
    const button = screen.getByRole('button', {
      name: 'category-button',
    });
    fireEvent.click(button);
    const select = screen.getByLabelText('By');
    const categoriesDates = screen.getAllByLabelText('category-date');
    expect(categoriesDates[0].textContent).toBe(expenses[0].date);
    expect(categoriesDates[1].textContent).toBe(expenses[1].date);
    fireEvent.change(select, { target: { value: 'newer' } });
    const categoriesDatesByNewer = screen.getAllByLabelText('category-date');
    expect(categoriesDatesByNewer[1].textContent).toBe(expenses[0].date);
    expect(categoriesDatesByNewer[0].textContent).toBe(expenses[1].date);
  });
});
