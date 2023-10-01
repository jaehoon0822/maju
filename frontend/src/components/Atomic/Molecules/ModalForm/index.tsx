import { memo, useState } from "react";
import Form from "../../Atoms/Form/Index";
import Button from "../../Atoms/Button";
import { ModalFromProps } from "./ModalForm.type";
import { FieldErrors } from "react-hook-form";
import classNames from "classnames";

const ModalForm = ({
  onSubmit,
  buttonLabel,
  children,
  schema,
  defaultValues,
  setUseFormReturnMethod,
}: ModalFromProps) => {
  const [resError, setResError] = useState<FieldErrors>();
  return (
    <div className="md:w-3/4">
      <Form
        setErrors={setResError}
        onSubmit={onSubmit}
        schema={schema}
        defaultValues={defaultValues}
        setUseFormReturnMethod={setUseFormReturnMethod}
      >
        <div>{children}</div>
        <div>
          <div
            className={classNames(
              "absolute flex justify-end bottom-12 px-5 text-red-500 transition-all duration-500 sm:text-xs sm:bottom-10",
              {
                "opacity-0 invisible": !resError?.root?.message,
                "opacity-100 visible": resError?.root?.message,
              }
            )}
          >
            <span>{resError?.root?.message as string}</span>
          </div>
          <Button label={buttonLabel} size="large" variant="primary" />
        </div>
      </Form>
    </div>
  );
};

export default memo(ModalForm);
