import React from "react";
import { FormButtonProps } from "./FormButton.type";
import { useFormContext } from "react-hook-form";
import { Button } from "../Button";

const FormButton = ({ label, variant }: FormButtonProps) => {
  const { formState } = useFormContext();
  const { isValid, isSubmitting, isDirty } = formState;

  return (
    <Button
      disabled={!isValid || !isDirty || isSubmitting}
      type="submit"
      label={label}
      variant={variant}
    />
  );
};

export default FormButton;
