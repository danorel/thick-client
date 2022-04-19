import { VoidFunctionComponent } from "react";
import { Table } from "antd";

interface WideTableProps {
  dataSource: any[];
  columns: any[];
}

export const WideTable: VoidFunctionComponent<WideTableProps> = ({
  dataSource,
  columns
}) => {
  return <Table dataSource={dataSource} columns={columns} />;
};
