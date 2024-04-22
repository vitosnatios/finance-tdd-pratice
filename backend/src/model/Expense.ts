import { Document, Schema, model } from 'mongoose';

export interface Expense extends Document {
  category: string;
  quantity: Number;
  date: string;
}

export class ExpenseSchema extends Schema<Expense> {
  constructor() {
    super({
      category: { type: String, required: true },
      quantity: { type: Number, required: true },
      date: { type: String, required: true },
    });

    this.pre('save', async function (next) {
      try {
        this.date = String(this.date);
        next();
      } catch (error) {
        console.error('Error parsing the:', error);
      }
    });
  }
}

export default model<Expense>('Expense', new ExpenseSchema());
