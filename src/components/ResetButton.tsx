import * as React from "react";

const ResetButton = (props: { handleReset: () => void }): JSX.Element => {

  return (
    <button onClick={props.handleReset}>
      Reset Data
    </button>
  );
};

export default ResetButton;
