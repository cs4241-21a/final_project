import * as React from 'react';

interface ComponentProps {
  bool: boolean
}

// This is an example component to exemplify the component/route structure
const Component = ({
  bool
}: ComponentProps) : JSX.Element => { 
  return (
    <input type="checkbox" checked={bool} />
  );
}

export default Component;