import { VoidFunctionComponent, useState } from "react";
import { Slider, InputNumber, Row, Col } from "antd";

export interface IntegerStepInputProps {
  value: number;
  onChange: (nextValue: number) => void;
  onBlur?: (event: HTMLInputElement) => void;
}

export const IntegerStepInput: VoidFunctionComponent<IntegerStepInputProps> = ({
  value = 1,
  onChange,
  onBlur
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = (event: HTMLInputElement) => {
    onBlur?.(event);
  };

  const handleChange = (nextValue: number) => {
    setInputValue(nextValue);
    onChange(nextValue);
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={1}
          max={20}
          onChange={handleChange}
          value={typeof inputValue === "number" ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{ margin: "0 16px" }}
          value={inputValue}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Col>
    </Row>
  );
};
