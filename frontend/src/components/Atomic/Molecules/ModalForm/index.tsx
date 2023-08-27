import React from "react";
import { Form } from "../../Atoms/Form/Index";
import { ModalFromProps } from "./ModalForm.type";
import { Button } from "../../Atoms/Button";

const ModalForm = ({
  onSubmit,
  buttonLabel,
  children,
  schema,
  defaultValues,
  setUseFormReturnMethod,
}: ModalFromProps) => {
  return (
    <Form
      onSubmit={onSubmit}
      schema={schema}
      defaultValues={defaultValues}
      setUseFormReturnMethod={setUseFormReturnMethod}
    >
      <div>{children}</div>
      <div>
        <Button label={buttonLabel} size="large" variant="primary" />
      </div>
    </Form>
  );
};

export { ModalForm };
