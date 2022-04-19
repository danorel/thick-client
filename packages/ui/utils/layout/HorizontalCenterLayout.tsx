import { FunctionComponent } from "react";
import { Col, Row } from "antd";

export const HorizontalCenterLayout: FunctionComponent = ({ children }) => {
  return (
    <Row justify="space-around" align="middle">
      <Col>{children}</Col>
    </Row>
  );
};
