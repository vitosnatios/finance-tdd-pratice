import { Request, Response } from 'express';
import Expense from '../model/Expense';

class ExpenseController {
  static async create(req: Request, res: Response) {
    try {
      const { expense } = req.body;
      if (!expense) throw new Error('Some internal error.');
      const newExpense = await Expense.create(expense);
      if (!newExpense) throw new Error('Some internal error.');
      const { category, quantity, date } = newExpense;
      const expenseResponse = { category, quantity, date };
      return res
        .status(200)
        .json({ expense: expenseResponse, _id: String(newExpense._id) });
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : 'UserController Error',
      });
    }
  }
}

export default ExpenseController;
