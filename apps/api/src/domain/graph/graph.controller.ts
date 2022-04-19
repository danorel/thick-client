import express, { Request, Response } from "express";
import { Types } from "mongoose";

import { GraphService } from "./graph.service";
import { validateBodyProps, validateParamsProps } from "../domain.middleware";
import { validateGraph, validateStocks } from "./graph.validation";

const router = express.Router();
const graphService = new GraphService();

router.get("/stocks", async (_, res: Response) => {
  try {
    const graph = await graphService.findStocks();
    if (graph === null) {
      return res.status(404).send("Graph is not found");
    }
    return res.status(200).send(graph);
  } catch (err) {
    return res
      .status(500)
      .send({ ok: "false", message: "Server is unavailable" });
  }
});

router.post(
  "/predict",
  validateStocks,
  validateBodyProps,
  async (_: Request, res: Response) => {
    try {
      const stocks = await graphService.findStocks();
      const nextStock = await graphService.predict(stocks);
      return res.status(201).send(nextStock);
    } catch (err) {
      return res.status(400).send("Stock prediction failed");
    }
  }
);

router.get("/", async (_, res: Response) => {
  try {
    const firstGraph = await graphService.findOne();
    return res.status(200).send(firstGraph);
  } catch (err) {
    return res.status(500).send();
  }
});

router.post("/", validateGraph, async (req: Request, res: Response) => {
  try {
    const { graph } = req.body;
    const newGraph = await graphService.create(graph);
    return res.status(200).send(newGraph);
  } catch (err) {
    return res.status(500).send();
  }
});

router.put(
  "/:id",
  validateParamsProps,
  validateGraph,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const globalId = new Types.ObjectId(id);
      const graph = req.body;
      const olgGraph = await graphService.update(globalId, graph);
      if (olgGraph === null) {
        return res.status(404).send({ ok: false, message: "Graph not found" });
      }
      return res.status(200).send(olgGraph);
    } catch (err) {
      return res.status(500).send();
    }
  }
);

router.delete(
  "/:id",
  validateBodyProps,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const objectId = new Types.ObjectId(id);
      const oldGraph = await graphService.delete(objectId);
      if (oldGraph === null) {
        return res.status(404).send({
          ok: false,
          message: `Graph with ${objectId} id not found`
        });
      }
      return res.status(204).send();
    } catch (err) {
      return res.status(500).send({
        ok: false
      });
    }
  }
);

export { router as graphRouter };
