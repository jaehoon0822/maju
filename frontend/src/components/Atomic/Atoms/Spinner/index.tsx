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
    <div>
      <ClipLoader
        loading={isLoading}
        color={color}
        size={size}
        cssOverride={{
          display: "block",
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default memo(Spinner);
