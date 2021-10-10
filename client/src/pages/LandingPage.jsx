import React from "react";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
    const history = useHistory();

    return (
        <div className="container">
            <h1 className='display-1'>Welcome to ARAM Generator</h1>
            <p className='lead'>Sign in to be able to generate random ARAM tournaments
                or generate single games from the link below.
            </p>
            <button className="btn btn-primary test" onClick={ // TODO: set link to single generation page
                () => history.push('/single')}>
                Generate Single Game
            </button>
        </div>
    );
}

export default LandingPage;