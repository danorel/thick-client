import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { stockRouter } from "./domain/stock/stock.controller";
import { graphRouter } from "./domain/graph/graph.controller";

dotenv.config();
const port = process.env.PORT; // default port to listen

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/stock", stockRouter);
app.use("/graph", graphRouter);

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

mongoose.connect('mongodb://localhost:27017/stock', () => {
    console.log(`Server connected to database`);
});

// start the Express server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});