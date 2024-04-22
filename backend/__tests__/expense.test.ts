import Expense from './../src/model/Expense';
import MockDbConnection from './../__mocks__/MockDbConnection';

describe('expense model tests', () => {
  const expectedProperties = [
    { key: 'category', type: 'string' },
    { key: 'quantity', type: 'number' },
    { key: 'date', type: 'Date' },
  ];

  const mockedExpense = {
    category: 'Food',
    quantity: 1,
    date: new Date().getDate(),
  };

  beforeAll(async () => {
    await MockDbConnection.connect();
  });

  afterAll(async () => {
    await MockDbConnection.disconnect();
  });

  it('should create, have all the properties and their correct types', async () => {
    const expense = await Expense.create(mockedExpense);
    expectedProperties.forEach(({ key, type }, i) => {
      expect(expense[key]).toBeDefined();
      if (i < 2) expect(typeof expense[key]).toBe(type);
      else expect(expense[key] instanceof Date);
    });
  });
});
