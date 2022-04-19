import { useEffect, useState, VoidFunctionComponent } from "react";
import { useForm } from "react-hook-form";

import { Page, IntegerStepField, ButtonSubmit } from "ui";
import { Graph } from "types";

import { putGraphConfig, fetchGraphConfig, postGraphStocks } from "../api";

type AdminInput = {
  frequency: number;
};

interface AdminProps {
  graphConfig: Graph;
}

const Admin: VoidFunctionComponent<AdminProps> = ({
  graphConfig: { _id: id, frequency }
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit: validateBeforeSubmit,
    reset
  } = useForm<AdminInput>({
    defaultValues: {
      frequency
    }
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      postGraphStocks()
        .then((r) => {
          console.log("r", r);
        })
        .catch((err) => {
          throw err;
        });
    }, frequency);
    return () => {
      clearInterval(intervalId);
    };
  }, [frequency]);

  const onSubmit = ({ frequency }: AdminInput) => {
    setLoading(true);
    putGraphConfig(id, frequency)
      .then((graphConfig) => {
        reset({
          ...graphConfig
        });
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
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

        <ButtonSubmit text="Submit" loading={loading} />
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
