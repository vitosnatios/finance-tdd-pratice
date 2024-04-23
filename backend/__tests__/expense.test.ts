import Expense from './../src/model/Expense';
import MockDbConnection from './../__mocks__/MockDbConnection';

describe('expense model tests', () => {
  const expectedProperties = [
    { key: 'userId', type: 'string' },
    { key: 'category', type: 'string' },
    { key: 'price', type: 'number' },
    { key: 'date', type: 'string' },
  ];

  const mockedExpense = {
    userId: '123abc',
    category: 'Food',
    price: 1,
    date: String(new Date()),
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
