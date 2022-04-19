import { VoidFunctionComponent, useEffect, useState } from "react";

import { Graph, GraphStocks } from "types";
import { Loader, Page, WideTable } from "ui";

import { fetchGraph, fetchGraphStocks } from "../api";

const INITIAL_STATE = {
  GRAPH_CONFIG: {
    _id: "",
    frequency: 1000
  },
  GRAPH_STOCKS: []
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

interface StocksProps {
  graphConfig: Graph;
}

const Stocks: VoidFunctionComponent<StocksProps> = ({
  graphConfig: initialGraphConfig
}) => {
  const [graphConfig, setGraphConfig] = useState<Graph>(initialGraphConfig);

  const [graphStocks, setGraphStocks] = useState<GraphStocks>(
    INITIAL_STATE.GRAPH_STOCKS
  );
  const [shouldGraphUpdate, setGraphUpdate] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGraphUpdate(true);
      fetchGraph()
        .then((graphConfig) => {
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
          graphStocks.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setGraphStocks(
            graphStocks.map((graphStock) => ({
              ...graphStock,
              key: graphStock._id
            }))
          );
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [shouldGraphUpdate]);

  return (
    <Page title="Stocks page">
      {shouldGraphUpdate ? (
        <Loader />
      ) : (
        <WideTable columns={columns} dataSource={graphStocks} />
      )}
    </Page>
  );
};

export async function getServerSideProps() {
  const graphConfig = await fetchGraph();

  return {
    props: {
      graphConfig
    }
  };
}

export default Stocks;
