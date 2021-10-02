This is what I used to log in using react, i updated the clientid to match the new one I made for this assignment

```javascript
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  const [redirect, setRedirect] = useState("");

  const userlogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=66f056183e981d1a11b2`;
  };

  useEffect(() => {
    fetch("/id", {
      method: "GET",
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (res) {
        if (res !== "") {
          setRedirect(true);
        }
      });
  });

  if (redirect) {
    return <Redirect to="/[urltouse]" />;
  }

  return (
    <div>
      <div>
        <header>
          <h1> Connect Using: </h1>
        </header>
        <main>
          <p onClick={userlogin}>
            <FontAwesomeIcon icon={faGithub} /> Github
          </p>
        </main>
      </div>
    </div>
  );
};

export default Login;
```
