import * as React from 'react';

interface ToggableButtonProps {
  onClickOn: () => void,
  onClickOff: () => void,
  active: boolean,
  children: React.ReactNode
}

const BTN_CLASS_OFF: string = "tgl-but-off";
const BTN_CLASS_ON: string = "tgl-but-on";

const ToggableButton = ({
  onClickOn,
  onClickOff,
  children,
  active
}: ToggableButtonProps) : JSX.Element => {  
  const onClick = () => {
    if (active) {
      onClickOff();
    } else {
      onClickOn();
    }
  }

  return (
    <button 
      className={active ? BTN_CLASS_ON : BTN_CLASS_OFF} 
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}

export default ToggableButton;
