import React, { memo } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({
  isLoading,
  color = "black",
  size = 40,
}: {
  isLoading: boolean;
  color?: string;
  size?: number;
}) => {
  return (
    <ClipLoader
      loading={isLoading}
      color={color}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default memo(Spinner);
