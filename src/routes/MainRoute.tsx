import * as React from 'react';

import EnablablePrefProps from '../props/prefs/EnablablePrefProps';
import CharacterPrefProps from '../props/prefs/CharacterPrefProps';
import CharacterProps from '../props/api/FarmingSpotProps';
import WeaponProps from '../props/api/WeaponProps';
import ArtifactProps from '../props/api/ArtifactProps';
import MaterialProps from '../props/api/MaterialProps';
import FarmableProps from '../props/api/FarmableProps';
import FarmingSpotProps from '../props/api/FarmingSpotProps';

import CharacterSelect from "../components/CharacterSelect";
import WeaponSelect from "../components/WeaponSelect";
import ArtifactSelect from "../components/ArtifactSelect";
import FarmingDisplay from "../components/FarmingDisplay";
import LoginButton from '../components/LoginButton';


const MainRoute = () : JSX.Element => { 
    // These static variables record all characters, weapons, and artifacts
  const characters : CharacterProps[] = [];
  const weapons : WeaponProps[]  = [];
  const artifacts : ArtifactProps[] = [];
  const materials : MaterialProps[] = [];
  const locations : FarmingSpotProps[] = [];

  // !!! TODO (Michael): Write fetch requests to API (or load JSON) to initialize static data

  
    // These preference states record the data associated with an account
  const [charPrefs, setCharPrefs] = React.useState<CharacterPrefProps[]>([]);
  const [weaponPrefs, setWeaponsPrefs] = React.useState<EnablablePrefProps[]>([]);
  const [artifactPrefs, setArtifactPrefs] = React.useState<EnablablePrefProps[]>([]);

  // !!! TODO (Andrew): Write fetch requests to DB to initialize preferences
  /**
   * initPrefs() fetches the user preferences from the database
   */
  function initPrefs() {
    fetch("/prefs",{
      method: "GET"
    }).then(function(res) {
      return res.json();
    }).then(function (data) {
      if(data.length > 0) {
        setCharPrefs(data[0].characters);
        setWeaponsPrefs(data[0].weapons);
        setArtifactPrefs(data[0].artifacts);
      }
    })
  }

  /**
   * updatePrefs() updates the user preferences to the database
   */
  function updatePrefs() {
    const json = {
      characters: charPrefs,
      weapons: weaponPrefs,
      artifacts: artifactPrefs
    }
    const body = JSON.stringify(json);

    fetch("/submit", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }


    // This calculates the farmable items to be displayed and their related locations
  const [activeFarmables, setActiveFarmables] = React.useState<FarmableProps[]>([]);
  const [activeLocations, setActiveLocations] = React.useState<FarmingSpotProps[]>([]);
  
  React.useEffect(() => {
    // !!! TODO (Micheal): Write useEffect function to refilter based off of the selected prefs changing
    // "activeFarmables" should be the artifacts selected by artifactPrefs and materials associated with selected characters 
    // "activeLocations" should be the locations listed per each activeFarmable's farm_at string
  }, [charPrefs, weaponPrefs, artifactPrefs]);

  return (
    <>
    {/* !!! TODO (UI): Organize these components for displaying the page */}
      <LoginButton />
      <CharacterSelect 
        characters={characters} 
        preferences={charPrefs} 
        setter={setCharPrefs}
      />
      <WeaponSelect 
        weapons={weapons} 
        preferences={weaponPrefs} 
        setter={setWeaponsPrefs}
      />
      <ArtifactSelect 
        artifacts={artifacts} 
        preferences={artifactPrefs} 
        setter={setArtifactPrefs}
      />
      <FarmingDisplay
        farmables={activeFarmables}
        locations={activeLocations}
      />
    </>
  );
}

export default MainRoute;