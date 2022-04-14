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
exports.GraphService = void 0;
const stock_model_1 = require("../stock/stock.model");
const domain_utils_1 = require("../domain.utils");
class GraphService {
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return stock_model_1.Stock.find({});
        });
    }
    predict(graph) {
        return __awaiter(this, void 0, void 0, function* () {
            const lowMedian = (0, domain_utils_1.median)(graph.map(stock => stock.low));
            const highMedian = (0, domain_utils_1.median)(graph.map(stock => stock.high));
            const openMedian = (0, domain_utils_1.median)(graph.map(stock => stock.open));
            const closeMedian = (0, domain_utils_1.median)(graph.map(stock => stock.close));
            let low = 0;
            let high = 0;
            let open = 0;
            let close = 0;
            while (low <= 0)
                low = lowMedian + (0, domain_utils_1.random)();
            while (high <= 0)
                high = highMedian + (0, domain_utils_1.random)();
            while (open <= 0)
                open = openMedian + (0, domain_utils_1.random)();
            while (close <= 0)
                close = closeMedian + (0, domain_utils_1.random)();
            return new stock_model_1.Stock({
                low,
                high,
                open,
                close
            }).save();
        });
    }
}
exports.GraphService = GraphService;
//# sourceMappingURL=graph.service.js.map