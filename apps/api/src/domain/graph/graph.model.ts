import { Document, Schema, model } from "mongoose";

export const GraphName = "Graph";

export interface Graph extends Document {
  frequency: number;
}

const GraphSchema = new Schema({
  frequency: {
    type: Schema.Types.Number,
    required: true,
    default: 1
  }
});

export const Graph = model<Graph>(GraphName, GraphSchema);
