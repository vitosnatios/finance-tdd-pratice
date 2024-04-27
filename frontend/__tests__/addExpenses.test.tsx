import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import AddExpenses from './../src/pages/AddExpenses';
import AuthContextProvider from '../src/context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

describe('add-expenses page test', () => {
  let submitButton, categoryInput, priceInput, descriptionInput;
  beforeAll(() => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <AddExpenses />
        </AuthContextProvider>
      </BrowserRouter>
    );
  });

  it('should have a "Add a new expense" title', () => {
    const title = screen.getByRole('heading', { name: 'form-title' });
    expect(title.textContent).toBe('Add a new Expense');
  });

  it('should have a form', () => {
    screen.getByRole('form', { name: 'form' });
    submitButton = screen.getByRole('button', { name: 'submit-button' });
  });

  it('should have a submit button and check for every input to be filled', () => {
    expect(submitButton).toHaveProperty('type', 'submit');
    fireEvent.click(submitButton);
    screen.getByText('Please, fill all the fields');
  });

  it('should have a Category and Quantity inputs', () => {
    categoryInput = screen.getByLabelText('Category');
    priceInput = screen.getByLabelText('Price');
    descriptionInput = screen.getByLabelText('Description');
    expect(categoryInput).toHaveProperty('type', 'text');
    expect(priceInput).toHaveProperty('type', 'number');
    expect(descriptionInput).toHaveProperty('type', 'text');
  });
});
