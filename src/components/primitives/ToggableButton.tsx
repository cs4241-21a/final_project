import * as React from 'react';

interface ToggableButtonProps {
  onClickOn: () => void,
  onClickOff: () => void,
  active: boolean,
  children: React.ReactNode
}

const BTN_CLASS_OFF: string = "tgl-but-off";
const BTN_CLASS_ON: string = "tgl-but-on";

const DebugButton = ({
  onClickOn,
  onClickOff,
  children,
  active
}: ToggableButtonProps) : JSX.Element => {  
  const [btnClass, setBtnClass] = React.useState<string>(
    active ? BTN_CLASS_ON : BTN_CLASS_OFF
  );

  const onClick = () => {
    if (active) {
      onClickOff();
      setBtnClass(BTN_CLASS_OFF);
    } else {
      onClickOn();
      setBtnClass(BTN_CLASS_ON);
    }
  }

  return (
    <button 
      className={btnClass} 
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}

export default DebugButton;
