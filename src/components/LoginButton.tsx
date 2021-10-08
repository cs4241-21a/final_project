import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const LoginButton = (): JSX.Element => {
  const [loggedin, setLoggedIn] = React.useState<Boolean>(false);
  const [text, setText] = React.useState<String>("");

  const fetchlogin = () => {
    fetch("/id", {
      method: "GET",
    })
      .then(function (res) {
        return res.text();
      })
      .then(function (id) {
        if (id !== "") {
          setLoggedIn(true);
          setText("Logout");
        } else {
          setLoggedIn(false);
          setText("Log In With Github");
        }
      });
    console.log("fetching login");
  };

  const handleUser = () => {
    if (loggedin) {
      logout();
    } else {
      userlogin();
    }
  };

  const logout = () => {
    fetch("/logout", {
      method: "GET",
    }).then(() => {
        setLoggedIn(false);
    })
  };

  const userlogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=66f056183e981d1a11b2`;
  };

  React.useEffect(() => {
    fetchlogin();
  }, [loggedin]);

  return (
    <button onClick={handleUser}>
      <FontAwesomeIcon icon={faGithub} />
      {text}
    </button>
  );
};

export default LoginButton;
