import React from "react";

import "./css/login_style.css"

const Login = (props) => {
  return ( 
    <div id = 'loginPage'>
    <div id = 'logoDiv'>
      <img id = 'logo' src = "./components/resources/logo.jpg" alt = 'App Logo' width="300px" height="300px" title="App Logo"/>
    </div>

    <form id = 'form' action='/login' method='POST'>
      <label for='username'> Username: </label><br/>  
      <input type='text' id = 'username' name = 'username' required='required' pattern='[A-Za-z0-9]{1,20}'/> <br/>  

      <label for='password'>Password:</label><br/>  
      <input type='password' id='password' name='password' required='required' pattern='[A-Za-z0-9]{1,20}'/><br/>  
      <div class="buttonHolder">
        <input type='submit' class='staticButtons' id='primaryButton' value = 'Login'/>
        <input type='submit' formaction='/register' class='staticButtons' id='secondaryButton' value = 'Register'/>
      </div>
    </form>
  </div> 
  )
};

export default Login;
