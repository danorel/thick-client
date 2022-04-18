import { VoidFunctionComponent } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";

import { IntegerStepField } from "ui";
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
    const response = await fetch(`http://localhost:8080/graph/${id}`, {
      method: "PUT",
      body: JSON.stringify(frequency)
    });
    const status = await response.json();
    return status;
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
  graphConfig: { frequency, _id: id }
}) => {
  const { control, handleSubmit: validateBeforeSubmit } = useForm<AdminInput>({
    defaultValues: {
      frequency
    }
  });

  const onSubmit = ({ frequency }: AdminInput) => {
    putGraphConfig(id, frequency)
      .then((status) => {
        console.log(status);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div>
      <Head>
        <title>Admin page</title>
      </Head>
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
    </div>
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
