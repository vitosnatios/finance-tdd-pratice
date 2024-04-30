import Expense from './../src/model/Expense';
import MockDbConnection from './../__mocks__/MockDbConnection';

describe('expense model tests', () => {
  const expectedProperties = [
    { key: 'userId', type: 'string' },
    { key: 'category', type: 'string' },
    { key: 'description', type: 'string' },
    { key: 'price', type: 'number' },
    { key: 'date', type: 'string' },
  ];

  const mockedExpense = {
    userId: '123abc',
    category: 'Food',
    description: 'burgão do mau',
    price: 1,
    date: String(new Date()),
  };

  beforeAll(async () => {
    await MockDbConnection.connect();
  });

  it('should create, have all the properties and their correct types', async () => {
    const expense = await Expense.create(mockedExpense);
    expectedProperties.forEach(({ key, type }, i) => {
      expect(expense[key]).toBeDefined();
      expect(typeof expense[key]).toBe(type);
    });
  });
});
