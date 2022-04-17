import { VoidFunctionComponent, useEffect, useState } from "react";
import Head from "next/head";

import { Graph, GraphStocks } from "types";
import { WideTable } from "ui";

const INITIAL_STATE = {
  GRAPH_CONFIG: {
    _id: undefined,
    frequency: 1000
  },
  GRAPH_STOCKS: []
};

const fetchGraph = async (): Promise<Graph> => {
  try {
    const response = await fetch("http://localhost:8080/graph", {
      mode: "no-cors"
    });
    if (!response.ok) {
      throw INITIAL_STATE.GRAPH_CONFIG;
    }
    const graph = await response.json();
    return graph;
  } catch (err) {
    throw err;
  }
};

const fetchGraphStocks = async (): Promise<GraphStocks> => {
  try {
    const response = await fetch("http://localhost:8080/graph/stocks", {
      mode: "no-cors"
    });
    if (!response.ok) {
      return INITIAL_STATE.GRAPH_STOCKS;
    }
    const graphStocks = await response.json();
    return graphStocks;
  } catch (err) {
    throw err;
  }
};

const columns = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id"
  },
  {
    title: "Time point",
    dataIndex: "createdAt",
    key: "createdAt"
  },
  {
    title: "Low",
    dataIndex: "low",
    key: "low"
  },
  {
    title: "High",
    dataIndex: "high",
    key: "high"
  },
  {
    title: "Open",
    dataIndex: "open",
    key: "open"
  },
  {
    title: "Close",
    dataIndex: "close",
    key: "close"
  }
];

const Stocks: VoidFunctionComponent = () => {
  const [graphConfig, setGraphConfig] = useState<Graph>(
    INITIAL_STATE.GRAPH_CONFIG
  );
  const [graphStocks, setGraphStocks] = useState<GraphStocks>(
    INITIAL_STATE.GRAPH_STOCKS
  );
  const [shouldGraphUpdate, setGraphUpdate] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchGraph()
        .then((graphConfig) => {
          setGraphUpdate(true);
          setGraphConfig(graphConfig);
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          setGraphUpdate(false);
        });
    }, graphConfig.frequency);
    return () => {
      clearInterval(intervalId);
    };
  }, [graphConfig.frequency]);

  useEffect(() => {
    if (shouldGraphUpdate) {
      fetchGraphStocks()
        .then((graphStocks) => {
          setGraphStocks(graphStocks);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [shouldGraphUpdate]);

  if (shouldGraphUpdate) {
    return <>Loading...</>;
  }

  if (graphStocks.length === 0) {
    return <>Stocks not found</>;
  }

  return (
    <div>
      <Head>
        <title>Stocks page</title>
      </Head>
      <WideTable columns={columns} dataSource={graphStocks} />
    </div>
  );
};

export default Stocks;
