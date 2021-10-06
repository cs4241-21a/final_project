import NavBar from "./NavBar";
import calsses from "./Layout.module.css";

import * as React from "react";

function Layout(props) {
  return (
    <div>
      <div>
        <NavBar
          handleRegister={props.handleRegister}
          handleLogin={props.handleLogin}
        />
      </div>
      <main className={calsses.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
