import React from "react";
import PartySilhouetteIcon from "../../components/icons/PartySilhouetteIcon";

export default function HomePage() {
    return (
        <div className="home-page">
            <PartySilhouetteIcon />
            <div className="home-page__title">Create your next party playlist!</div>
            <div className="home-page__subtitle">Choose a genre</div>
        </div>
    );
}
