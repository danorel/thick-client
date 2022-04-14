import { FunctionComponent } from "react";
import Head from "next/head";

import { Graph } from "types";

interface StocksProps {
  graph: Graph;
}

const Stocks: FunctionComponent<StocksProps> = ({ graph }) => {
  return (
    <div>
      <Head>
        <title>Stocks page</title>
      </Head>
      <table>
        <thead>
          <tr>
            <th colSpan="6">Graph of stocks</th>
          </tr>
        </thead>
        <tbody>
          {graph.map((stock) => (
            <tr>
              <td>{stock._id}</td>
              <td>{stock.createdAt}</td>
              <td>{stock.open.toFixed(3)}</td>
              <td>{stock.close.toFixed(3)}</td>
              <td>{stock.high.toFixed(3)}</td>
              <td>{stock.low.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
