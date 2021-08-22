import React, { useState } from "react";
import { useRouter } from "next/router";

import { Form, Formik, FormikConfig, FormikValues } from "formik";
import { Button, CircularProgress, Grid } from "@material-ui/core";

interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

const FormikStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];

  const currentChild = childrenArray[step];

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting, errors, values }) => {
        return (
          <Form autoComplete="off">
            <h1>{values.questions[step].question}</h1>
            <p>Category: {values.questions[step].category}</p>
            <p>Difficulty: {values.questions[step].difficulty}</p>
            {currentChild}

            <Grid container spacing={2}>
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  onClick={() => router.push("/")}
                >
                  Cancel
                </Button>
              </Grid>
              {step > 0 ? (
                <Grid item>
                  <Button
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    onClick={() => setStep((s) => s - 1)}
                  >
                    Back
                  </Button>
                </Grid>
              ) : null}
              <Grid item>
                <Button
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {isSubmitting
                    ? "Submitting"
                    : isLastStep()
                    ? "Submit"
                    : "Next"}
                </Button>
              </Grid>
            </Grid>
            {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikStepper;
