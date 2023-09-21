import React, { memo } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div>
      <ClipLoader
        loading={isLoading}
        size={100}
        cssOverride={{
          display: "block",
          position: "absolute",
          top: "50%",
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
