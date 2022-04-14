"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const stock_model_1 = require("./stock.model");
class StockService {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return stock_model_1.Stock.findById(id);
        });
    }
    create(stock) {
        return __awaiter(this, void 0, void 0, function* () {
            return new stock_model_1.Stock(stock).save();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return stock_model_1.Stock.findByIdAndRemove(id);
        });
    }
    update(id, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            return stock_model_1.Stock.findByIdAndUpdate(id, stock);
        });
    }
}
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map