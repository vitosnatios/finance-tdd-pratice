import { Document, Schema, model } from 'mongoose';

export interface Expense extends Document {
  userId: string;
  category: string;
  price: Number;
  date: string;
}

export class ExpenseSchema extends Schema<Expense> {
  constructor() {
    super({
      userId: { type: String, required: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
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
