import { VoidFunctionComponent } from "react";
import { FieldErrors } from "react-hook-form";
import { Form } from "antd";

import {
  IntegerStepInput,
  IntegerStepInputProps
} from "../inputs/IntegerStepInput";

interface IntegerStepFieldProps extends IntegerStepInputProps {
  name: string;
  label: string;
  error: FieldErrors | undefined;
}

export const IntegerStepField: VoidFunctionComponent<IntegerStepFieldProps> = ({
  name,
  error,
  value,
  label,
  onChange,
  onBlur
}) => {
  return (
    <Form.Item name={name} label={label} help={error && error.message}>
      <IntegerStepInput value={value} onChange={onChange} onBlur={onBlur} />
    </Form.Item>
  );
};
