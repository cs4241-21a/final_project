import * as React from 'react';

interface DebugButtonProps {
  onClick: () => void,
  message: string
}

const DebugButton = ({
  onClick,
  message
}: DebugButtonProps) : JSX.Element => {


  return (
    <button onClick={() => onClick()}>
      {message}
    </button>
  );
}

export default DebugButton;
