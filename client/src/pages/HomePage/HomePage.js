import React from "react";
import PartySilhouetteIcon from "../../components/icons/PartySilhouetteIcon";
import GenreCard from "../../components/GenreCard/GenreCard";
import { Genres } from "../../globals";

export default function HomePage() {
  return (
    <div className="home-page">
      <PartySilhouetteIcon />
      <div className="home-page__title">Create your next party playlist!</div>
      <div className="home-page__subtitle">Choose a genre</div>
      <div className="home-page__genres">
        { Object.values(Genres).map(genre => <GenreCard key={ genre.id } genre={ genre.id } label={ genre.label } color={ genre.color } />) }
      </div>
    </div>
  );
}
