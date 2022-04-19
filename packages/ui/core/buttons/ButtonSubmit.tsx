import { Button } from "antd";
import { FunctionComponent } from "react";

interface ButtonSubmitProps {
  text: string;
  loading: boolean;
}

export const ButtonSubmit: FunctionComponent<ButtonSubmitProps> = ({
  loading,
  text
}) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      loading={loading}
      disabled={loading}
    >
      {text}
    </Button>
  );
};
