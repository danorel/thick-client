import { Controller, useForm } from "react-hook-form";
import Head from "next/head";

import { IntegerStepField } from "ui";

type Inputs = {
  frequency: number;
};

export default function Admin() {
  const {
    formState: { errors },
    control,
    handleSubmit
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => console.log(data);

  console.log(errors);

  return (
    <div>
      <Head>
        <title>Admin page</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="frequency"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <IntegerStepField
              name="frequency"
              label="Control stock frequency"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              error={error}
            />
          )}
          rules={{ required: true, min: 1, max: 15 }}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
