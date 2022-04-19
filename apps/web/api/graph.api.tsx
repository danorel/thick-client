import { Graph, GraphStocks } from "types";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchGraph = async (): Promise<Graph> => {
  try {
    await wait(1000);
    const response = await fetch("http://localhost:8080/graph");
    const graph = await response.json();
    return graph;
  } catch (err) {
    throw err;
  }
};

export const fetchGraphStocks = async (): Promise<GraphStocks> => {
  try {
    await wait(1000);
    const response = await fetch("http://localhost:8080/graph/stocks");
    const graphStocks = await response.json();
    return graphStocks;
  } catch (err) {
    throw err;
  }
};
