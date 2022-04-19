import { VoidFunctionComponent } from "react";
import { useForm } from "react-hook-form";

import { Page, IntegerStepField } from "ui";
import { Graph } from "types";

const fetchGraphConfig = async (): Promise<Graph> => {
  try {
    const response = await fetch("http://localhost:8080/graph");
    const graphConfig = await response.json();
    return graphConfig;
  } catch (err) {
    throw err;
  }
};

const putGraphConfig = async (id: string, frequency: number) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frequency })
    };
    const response = await fetch(
      `http://localhost:8080/graph/${id}`,
      requestOptions
    );
    const graphConfig = await response.json();
    return graphConfig;
  } catch (err) {
    throw err;
  }
};

type AdminInput = {
  frequency: number;
};

interface AdminProps {
  graphConfig: Graph;
}

const Admin: VoidFunctionComponent<AdminProps> = ({
  graphConfig: { _id: id, frequency }
}) => {
  const {
    control,
    handleSubmit: validateBeforeSubmit,
    reset
  } = useForm<AdminInput>({
    defaultValues: {
      frequency
    }
  });

  const onSubmit = ({ frequency }: AdminInput) => {
    putGraphConfig(id, frequency)
      .then((graphConfig) => {
        reset({
          ...graphConfig
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <Page title="Admin page">
      <form onSubmit={validateBeforeSubmit(onSubmit)}>
        <IntegerStepField
          label={"Frequency of the stock simulation (in ms.)"}
          name="frequency"
          control={control}
          min={500}
          max={10000}
          step={1000}
        />

        <input type="submit" />
      </form>
    </Page>
  );
};

export const getServerSideProps = async () => {
  const graphConfig = await fetchGraphConfig();

  return {
    props: {
      graphConfig
    }
  };
};

export default Admin;
