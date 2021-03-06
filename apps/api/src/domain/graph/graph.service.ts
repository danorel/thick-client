import { Types } from "mongoose";

import { median, random } from "../domain.utils";
import { Stock } from "../stock/stock.model";
import { Graph } from "./graph.model";

export class GraphService {
  async findStocks(): Promise<Stock[]> {
    return Stock.find({});
  }

  async findOne(): Promise<Graph> {
    return Graph.findOne({});
  }

  async create(graph: Graph): Promise<Graph> {
    return Graph.create(graph);
  }

  async update(id: Types.ObjectId, graph: Graph): Promise<Graph> {
    return Graph.findByIdAndUpdate(id, graph, {
      new: true
    });
  }

  async delete(id: Types.ObjectId): Promise<Graph> {
    return Graph.findByIdAndDelete(id);
  }

  async predict(graph: Stock[]): Promise<Stock> {
    const lowMedian = median(graph.map((stock) => stock.low));
    const highMedian = median(graph.map((stock) => stock.high));
    const openMedian = median(graph.map((stock) => stock.open));
    const closeMedian = median(graph.map((stock) => stock.close));

    let low = 0;
    let high = 0;
    let open = 0;
    let close = 0;

    while (low <= 0) low = lowMedian + random();
    while (high <= 0) high = highMedian + random();
    while (open <= 0) open = openMedian + random();
    while (close <= 0) close = closeMedian + random();

    return new Stock({
      low,
      high,
      open,
      close
    }).save();
  }
}
