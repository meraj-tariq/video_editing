import React, { ReactNode } from "react";
import { Formik } from "formik";

type Props = {
  initialValues: {};
  onSubmit: (values: any) => void;
  validationSchema: any;
  children: ReactNode;
};

function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: Props) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
