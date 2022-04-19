import { FunctionComponent } from "react";

export const VerticalCenterLayout: FunctionComponent = ({ children }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      {children}
    </div>
  );
};
