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

            <div className='league-button-border'>
                <button className="main" onClick={ // TODO: set link to single generation page
                    () => history.push('/single')}>
                    Generate Single Game
                </button>
            </div>
        </div>
    );
}

export default LandingPage;