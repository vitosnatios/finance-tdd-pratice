import { Request, Response } from 'express';
import Expense from '../model/Expense';
import AuthService from '../services/AuthService';

class ExpenseController {
  static async create(req: Request, res: Response) {
    try {
      const { expense, jwt } = req.body;
      if (!(await AuthService.verifyToken(jwt)))
        throw new Error('You need to log in.');
      if (!expense) throw new Error('Some internal error.');
      delete expense._id;
      const newExpense = await Expense.create({
        ...expense,
        date: new Date(),
      });
      if (!newExpense) throw new Error('Some internal error.');
      const { category, price, date, userId } = newExpense;
      const expenseResponse = { category, price, date, userId };
      return res.status(200).json({
        expense: { ...expenseResponse, _id: String(newExpense._id) },
      });
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : 'UserController Error',
      });
    }
  }
}

export default ExpenseController;
