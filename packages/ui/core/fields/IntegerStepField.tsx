import { UseControllerProps, useController } from "react-hook-form";
import { Col, Form, InputNumber, Row, Slider } from "antd";

type IntegerStepFieldProps<InputType> = UseControllerProps<InputType> & {
  min?: number;
  max?: number;
  step?: number;
  label: string;
};

export const IntegerStepField = <InputType,>({
  control,
  name,
  rules,
  label,
  min = 1,
  max = 20,
  step = 1
}: IntegerStepFieldProps<InputType>) => {
  const {
    field: { value, ...fieldProps },
    fieldState: { error }
  } = useController<InputType>({
    name,
    control,
    rules
  });

  return (
    <Form.Item name={name} label={label} help={error && error.message}>
      <Row>
        <Col span={12}>
          <Slider
            {...fieldProps}
            value={value as number}
            min={min}
            max={max}
            step={step}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            {...fieldProps}
            value={value as number}
            step={step}
            style={{ margin: "0 16px" }}
          />
        </Col>
      </Row>
    </Form.Item>
  );
};
