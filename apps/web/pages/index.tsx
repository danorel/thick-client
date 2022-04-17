import { VoidFunctionComponent, useEffect, useState } from "react";
import Head from "next/head";

import { Graph } from "types";
import { WideTable } from "ui";

const fetchFrequency = async () => {
  try {
    const response = await fetch("http://localhost:8080/graph/frequency");
    const frequency = await response.json();
    return frequency;
  } catch (err) {
    throw err;
  }
};

const fetchGraph = async () => {
  try {
    const response = await fetch("http://localhost:8080/graph");
    const graph = await response.json();
    return graph;
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
  const [frequency, setFrequency] = useState<number>(1);
  const [graph, setGraph] = useState<Graph | null>(null);
  const [shouldGraphUpdate, setGraphUpdate] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchFrequency()
        .then((frequency) => {
          setGraphUpdate(true);
          setFrequency(frequency);
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          setGraphUpdate(false);
        });
    }, frequency);
    return () => {
      clearInterval(intervalId);
    };
  }, [frequency]);

  useEffect(() => {
    if (shouldGraphUpdate) {
      fetchGraph()
        .then((graph) => {
          setGraph(graph);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [shouldGraphUpdate]);

  if (shouldGraphUpdate || graph === null) {
    return <>Loading...</>;
  }

  return (
    <div>
      <Head>
        <title>Stocks page</title>
      </Head>
      <WideTable columns={columns} dataSource={graph} />
    </div>
  );
};

export default Stocks;
