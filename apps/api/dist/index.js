"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const stock_controller_1 = require("./domain/stock/stock.controller");
const graph_controller_1 = require("./domain/graph/graph.controller");
dotenv_1.default.config();
const port = process.env.PORT; // default port to listen
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/stock", stock_controller_1.stockRouter);
app.use("/graph", graph_controller_1.graphRouter);
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
mongoose_1.default.connect('mongodb://localhost:27017/stock', () => {
    console.log(`Server connected to database`);
});
// start the Express server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map