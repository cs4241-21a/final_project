import * as React from "react";

const ResetButton = (props: { handleReset: () => void }): JSX.Element => {

  return (
    <button style={{float: "right", marginRight: "3px"}} onClick={props.handleReset}>
      Reset Data
    </button>
  );
};

export default ResetButton;
