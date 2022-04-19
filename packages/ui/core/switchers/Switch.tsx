import { Form as AntdForm, Switch as AntdSwitch } from "antd";
import { useController, UseControllerProps } from "react-hook-form";

type SwitchProps<InputType> = UseControllerProps<InputType> & {
  label: string;
};

export const Switch = <InputType,>({
  rules,
  name,
  control,
  label
}: SwitchProps<InputType>) => {
  const { field } = useController<InputType>({
    name,
    control,
    rules
  });

  return (
    <AntdForm.Item name={name} label={label}>
      <AntdSwitch defaultChecked {...field} />
    </AntdForm.Item>
  );
};
