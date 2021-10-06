import React from "react";
import {Link} from "react-router-dom";
import "./css/navigation_style.css";


const user = useUser();

const NavigationBar = (props) => {
    return <div class = "topNav">
        <Link to="/">Home</Link>
        if(user) return <Link to ="/me" >Logged in as {user.username}</Link>       
        return <Link to = "/Login">Not logged in</Link>
        </div>
};

export default NavigationBar;