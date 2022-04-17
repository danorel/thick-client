import express, { Request, Response } from "express";

import { GraphService } from "./graph.service";
import { validateBodyProps, validateParamsProps } from "../domain.middleware";
import { validateStocks } from "./graph.validation";

const router = express.Router();
const graphService = new GraphService();

router.get("/", validateParamsProps, async (req, res) => {
  try {
    const graph = await graphService.find();
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

router.get("/frequency", async (_, res) => {
  try {
    const frequency = await graphService.frequency();
    return res.status(200).send(frequency);
  } catch (err) {
    return res.status(500).send();
  }
});

router.post(
  "/predict",
  validateStocks,
  validateBodyProps,
  async (req: Request, res: Response) => {
    const { graph } = req.body;
    try {
      const nextStock = await graphService.predict(graph);
      return res.status(201).send(nextStock);
    } catch (err) {
      return res.status(400).send("Stock prediction failed");
    }
  }
);

export { router as graphRouter };
