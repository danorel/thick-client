import { Types } from "mongoose";

import { Stock } from "./stock.model";

export class StockService {
  async findById(id: Types.ObjectId): Promise<Stock> {
    return Stock.findById(id);
  }

  async create(stock: Stock): Promise<Stock> {
    return new Stock(stock).save();
  }

  async delete(id: Types.ObjectId): Promise<Stock> {
    return Stock.findByIdAndRemove(id);
  }

  async update(id: Types.ObjectId, stock: Stock): Promise<Stock> {
    return Stock.findByIdAndUpdate(id, stock, {
      new: true
    });
  }
}
