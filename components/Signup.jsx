import React, {useState} from "react";

const Signup = (props) => {

  const [state, setState] = setState({errorMsg: ""})


  const signup = ( e ) => {
    // prevent default form action from being carried out*/
    e.preventDefault()

    const userIn = document.querySelector( '#user' )
    const passwordIn = document.querySelector( '#passwordone' )
    const passwordCopy = document.querySelector( '#passwordtwo' )

    console.log(passwordIn.value)
    console.log(passwordCopy.value)

    if(userIn.value === "" || passwordIn.value === "" || passwordCopy.value === ""){
      console.log("Passwordsblank.")
      return false;
    }
    else if(!(passwordIn.value === passwordCopy.value)){
        this.setState({errorMsg: "Passwords do not match."})
        console.log("Passwords do not match.")
        return false
    }

    let json = {
      user: userIn.value, 
      password: passwordIn.value
    }

        body = JSON.stringify(json)
        
      fetch( '/signup', {
      method:'POST',
      body: body, 
      headers: {"Content-Type": "application/json"}
      
      
    }).then(res => {
      
      if(res.status === 201){//return if all good redirect to login?
        
      }
      else if(res.status === 202){//err is user exists
        this.errorMsg = "Username must be unique"
      }
    }).bind(this)
    
    
    return false
  };

  return (<div>
          <h1>SignUp</h1> 
          <div>
          <form>
          
          <p id = "Error message">{state.errorMsg}</p>
            <input type='text' id='user' placeholder="username"/> 
            <input type='password' id='passwordone' placeholder="password"/> 
            <input type='password' id='passwordtwo' placeholder="repeat password"/> 
            <button id = 'signup' onClick={signup}>Sign Up</button>
          </form>
          </div>
          </div>
        
        );

        
};

export default Signup;
