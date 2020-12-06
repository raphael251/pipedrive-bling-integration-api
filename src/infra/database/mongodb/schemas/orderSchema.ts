import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderSchema extends Document {
  orderId: number;
  orgName: string;
  clientName: string;
  value: number;
  currency: string;
}

const schema: Schema = new Schema({
  orderId: { type: Number, required: true },
  orgName: { type: String, required: true },
  clientName: { type: String, required: true },
  value: { type: Number, required: true },
  currency: { type: String, required: true },
});

export const OrderSchema = mongoose.model<IOrderSchema>('order', schema);
