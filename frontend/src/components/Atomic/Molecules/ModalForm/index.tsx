import { memo } from "react";
import Form from "../../Atoms/Form/Index";
import Button from "../../Atoms/Button";
import { ModalFromProps } from "./ModalForm.type";

const ModalForm = ({
  onSubmit,
  buttonLabel,
  children,
  schema,
  defaultValues,
  setUseFormReturnMethod,
}: ModalFromProps) => {
  return (
    <div>
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
    </div>
  );
};

export default memo(ModalForm);
