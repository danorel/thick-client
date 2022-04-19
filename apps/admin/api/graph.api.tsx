import { Graph } from "types";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchGraphConfig = async (): Promise<Graph> => {
  try {
    await wait(1000);
    const response = await fetch("http://localhost:8080/graph");
    const graphConfig = await response.json();
    return graphConfig;
  } catch (err) {
    throw err;
  }
};

export const postGraphStocks = async () => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    };
    const response = await fetch(
      `http://localhost:8080/graph/predict`,
      requestOptions
    );
    const graphConfig = await response.json();
    return graphConfig;
  } catch (err) {
    throw err;
  }
};

export const putGraphConfig = async (id: string, frequency: number) => {
  try {
    await wait(1000);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frequency })
    };
    const response = await fetch(
      `http://localhost:8080/graph/${id}`,
      requestOptions
    );
    const graphConfig = await response.json();
    return graphConfig;
  } catch (err) {
    throw err;
  }
};
