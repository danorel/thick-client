import { Document, Schema, model } from "mongoose";

export interface Stock extends Document {
  open: number;
  close: number;
  low: number;
  high: number;
}

const StockSchema = new Schema(
  {
    open: {
      type: Schema.Types.Number,
      required: true
    },
    close: {
      type: Schema.Types.Number,
      required: true
    },
    low: {
      type: Schema.Types.Number,
      required: true
    },
    high: {
      type: Schema.Types.Number,
      required: true
    }
  },
  { timestamps: true }
);

export const Stock = model<Stock>("Stock", StockSchema);
