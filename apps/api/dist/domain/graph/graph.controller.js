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
exports.graphRouter = void 0;
const express_1 = __importDefault(require("express"));
const graph_service_1 = require("./graph.service");
const domain_middleware_1 = require("../domain.middleware");
const graph_validation_1 = require("./graph.validation");
const router = express_1.default.Router();
exports.graphRouter = router;
const graphService = new graph_service_1.GraphService();
router.get('/', domain_middleware_1.validateParamsProps, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const graph = yield graphService.find();
        if (graph === null) {
            return res.status(404).send("Graph is not found");
        }
        return res.status(200).send(graph);
    }
    catch (err) {
        return res.status(500).send({ ok: 'false', message: "Server is unavailable" });
    }
}));
router.post('/predict', graph_validation_1.validateStocks, domain_middleware_1.validateBodyProps, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { graph } = req.body;
    try {
        const nextStock = yield graphService.predict(graph);
        return res.status(201).send(nextStock);
    }
    catch (err) {
        return res.status(400).send("Stock prediction failed");
    }
}));
//# sourceMappingURL=graph.controller.js.map