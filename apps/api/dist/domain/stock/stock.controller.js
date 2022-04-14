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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const stock_service_1 = require("./stock.service");
const domain_middleware_1 = require("../domain.middleware");
const stock_validation_1 = require("./stock.validation");
const router = express_1.default.Router();
exports.stockRouter = router;
const stockService = new stock_service_1.StockService();
router.get('/:id', domain_middleware_1.validateParamsProps, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const objectId = new mongoose_1.Types.ObjectId(id);
    try {
        const targetStock = yield stockService.findById(objectId);
        if (targetStock === null) {
            return res.status(404).send("Stock with id not found");
        }
        return res.status(200).send(targetStock);
    }
    catch (err) {
        return res.status(500).send({ ok: 'false', message: "Server is unavailable" });
    }
}));
router.post('/', stock_validation_1.validateStock, domain_middleware_1.validateBodyProps, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = req.body;
    try {
        const newStock = yield stockService.create(newData);
        return res.status(201).send(newStock);
    }
    catch (err) {
        return res.status(403).send("Stock validation failed");
    }
}));
router.delete('/:id', domain_middleware_1.validateParamsProps, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const objectId = new mongoose_1.Types.ObjectId(id);
    try {
        const oldStock = yield stockService.delete(objectId);
        if (oldStock === null) {
            return res.status(404).send("Stock with id not found");
        }
        return res.status(204).send();
    }
    catch (err) {
        return res.status(500).send({ ok: 'false', message: "Server is unavailable" });
    }
}));
router.put('/:id', domain_middleware_1.validateParamsProps, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const objectId = new mongoose_1.Types.ObjectId(id);
    const newStock = req.body;
    try {
        const oldStock = yield stockService.update(objectId, newStock);
        if (oldStock === null) {
            return res.status(404).send({ ok: false, message: "Stock with id not found" });
        }
        return res.status(204).send();
    }
    catch (err) {
        return res.status(500).send({ ok: 'false', message: "Server is unavailable" });
    }
}));
//# sourceMappingURL=stock.controller.js.map