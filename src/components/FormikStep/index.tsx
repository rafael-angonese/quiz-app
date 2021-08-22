import { FormikConfig, FormikValues } from "formik";

interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

const FormikStep = ({ children }: FormikStepProps) => {
  return <>{children}</>;
};

export default FormikStep;
