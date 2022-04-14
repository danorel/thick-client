import { FunctionComponent } from "react";
import Head from "next/head";

import { Graph } from "types";
import { WideTable } from "ui";

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
  graph: Graph;
}

const Stocks: FunctionComponent<StocksProps> = ({ graph }) => {
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

export async function getServerSideProps() {
  const response = await fetch("http://localhost:8080/graph");
  const graph = await response.json();

  return {
    props: {
      graph
    }
  };
}
