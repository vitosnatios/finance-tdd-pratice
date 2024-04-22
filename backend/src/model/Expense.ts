import { Document, Schema, model } from 'mongoose';

export interface Expense extends Document {
  category: string;
  quantity: Number;
  date: Date;
}

export class ExpenseSchema extends Schema<Expense> {
  constructor() {
    super({
      category: { type: String, required: true },
      quantity: { type: Number, required: true },
      date: { type: Date, required: true },
    });
  }
}

export default model<Expense>('Expense', new ExpenseSchema());
