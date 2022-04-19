import { VoidFunctionComponent } from "react";
import { Spin } from "antd";

export const Loader: VoidFunctionComponent = () => {
  return <Spin tip="Loading..." />;
};
