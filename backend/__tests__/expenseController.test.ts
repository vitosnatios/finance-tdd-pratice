import MockDbConnection from '../__mocks__/MockDbConnection';
import MockServerRequest from '../__mocks__/MockServerRequest';
import ExpenseController from './../src/controllers/ExpenseController';

describe('ExpenseController', () => {
  const mockedExpense = {
    category: 'Food',
    quantity: 1,
    date: new Date(),
  };

  beforeAll(async () => {
    await MockDbConnection.connect();
  });

  afterAll(async () => {
    await MockDbConnection.disconnect();
  });

  it('should give the error "Some internal error."', async () => {
    const { message, status } = await MockServerRequest.post(
      ExpenseController.create,
      {}
    );
    expect(status).toBe(500);
    expect(message).toBe('Some internal error.');
  });

  it('should test the create method', async () => {
    const { expense, status } = await MockServerRequest.post(
      ExpenseController.create,
      { expense: mockedExpense }
    );
    expect(status).toBe(200);
    expect(expense.category).toBe(mockedExpense.category);
    expect(expense.quantity).toBe(mockedExpense.quantity);
    expect(expense.date).toBe(String(mockedExpense.date));
  });
});
