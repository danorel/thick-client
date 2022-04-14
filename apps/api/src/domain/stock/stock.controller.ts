import express, {Request, Response} from "express";
import {Types} from "mongoose";

import {StockService} from "./stock.service";
import {validateBodyProps, validateParamsProps} from "../domain.middleware";
import {validateStock} from "./stock.validation";

const router = express.Router();
const stockService = new StockService();

router.get('/:id', validateParamsProps, async (req, res) => {
    const {id} = req.params;
    const objectId = new Types.ObjectId(id);
    try {
        const targetStock = await stockService.findById(objectId);
        if (targetStock === null) {
            return res.status(404).send("Stock with id not found");
        }
        return res.status(200).send(targetStock);
    } catch (err) {
        return res.status(500).send({ok: 'false', message: "Server is unavailable"});
    }
});

router.post(
    '/',
    validateStock,
    validateBodyProps,
    async (req: Request, res: Response) => {
        const newData = req.body;
        try {
            const newStock = await stockService.create(newData);
            return res.status(201).send(newStock);
        } catch (err) {
            return res.status(403).send("Stock validation failed");
        }
    }
);

router.delete('/:id', validateParamsProps, async (req, res) => {
    const {id} = req.params;
    const objectId = new Types.ObjectId(id);
    try {
        const oldStock = await stockService.delete(objectId);
        if (oldStock === null) {
            return res.status(404).send("Stock with id not found");
        }
        return res.status(204).send();
    } catch (err) {
        return res.status(500).send({ok: 'false', message: "Server is unavailable"});
    }
});

router.put('/:id', validateParamsProps, async (req, res) => {
    const {id} = req.params;
    const objectId = new Types.ObjectId(id);
    const newStock = req.body;
    try {
        const oldStock = await stockService.update(objectId, newStock);
        if (oldStock === null) {
            return res.status(404).send({ok: false, message: "Stock with id not found"});
        }
        return res.status(204).send();
    } catch (err) {
        return res.status(500).send({ok: 'false', message: "Server is unavailable"});
    }
});

export {router as stockRouter};