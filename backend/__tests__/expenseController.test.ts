import MockDbConnection from '../__mocks__/MockDbConnection';
import MockServerRequest from '../__mocks__/MockServerRequest';
import AuthService from '../src/services/AuthService';
import ExpenseController from './../src/controllers/ExpenseController';

describe('ExpenseController', () => {
  const mockedExpense = {
    userId: '123abc',
    category: 'Food',
    description: 'burgão do mau',
    price: 1,
  };

  beforeAll(async () => {
    await MockDbConnection.connect();
  });

  it('should give the error "You need to log in."', async () => {
    const { message, status } = await MockServerRequest.post(
      ExpenseController.create,
      {}
    );
    expect(status).toBe(500);
    expect(message).toBe('You need to log in.');
  });

  it('should test the create method', async () => {
    const { expense, status } = await MockServerRequest.post(
      ExpenseController.create,
      {
        expense: mockedExpense,
        jwt: await AuthService.generateToken('valid-jwt'),
      }
    );
    expect(status).toBe(200);
    expect(expense.userId).toBe(mockedExpense.userId);
    expect(expense.description).toBe(mockedExpense.description);
    expect(expense.category).toBe(mockedExpense.category);
    expect(expense.price).toBe(mockedExpense.price);
  });
});
