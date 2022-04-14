"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
const mongoose_1 = require("mongoose");
const StockSchema = new mongoose_1.Schema({
    open: {
        type: mongoose_1.Schema.Types.Number,
        required: true
    },
    close: {
        type: mongoose_1.Schema.Types.Number,
        required: true
    },
    low: {
        type: mongoose_1.Schema.Types.Number,
        required: true
    },
    high: {
        type: mongoose_1.Schema.Types.Number,
        required: true
    }
});
exports.Stock = (0, mongoose_1.model)('Stock', StockSchema);
//# sourceMappingURL=stock.model.js.map