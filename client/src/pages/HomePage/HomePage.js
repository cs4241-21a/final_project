import React from "react";
import PartySilhouetteIcon from "../../components/icons/PartySilhouetteIcon";
import GenreCard from "../../components/GenreCard/GenreCard";

export default function HomePage() {
    return (
        <div className="home-page">
            <PartySilhouetteIcon />
            <div className="home-page__title">Create your next party playlist!</div>
            <div className="home-page__subtitle">Choose a genre</div>
            <div className="home-page__genres">
                <GenreCard genre="hip-hop" label="Hip Hop" />
                <GenreCard genre="hard-rock" label="Hard Rock" />
                <GenreCard genre="electronica" label="Techno" />
                <GenreCard genre="club" label="Club" />
            </div>
        </div>
    );
}
