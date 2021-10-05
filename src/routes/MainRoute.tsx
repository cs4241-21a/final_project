import * as React from 'react';

import Component from "../components/Component";

interface MainRouteProps {
   name: string
}

const MainRoute = ({
  name
}: MainRouteProps) : JSX.Element => { 
  return (
    <>
      <h1>
        Hello {name}
      </h1>
      <Component bool={false} />
    </>
  );
}

export default MainRoute;