import * as React from "react";

import EnablablePrefs from "../types/prefs/EnablablePrefs";
import CharacterPrefs from "../types/prefs/CharacterPrefs";

import CharacterProps from "../types/props/FarmingSpotProps";
import WeaponProps from "../types/props/WeaponProps";
import ArtifactProps from "../types/props/ArtifactProps";
import MaterialProps from "../types/props/MaterialProps";
import FarmableProps from "../types/props/FarmableProps";
import FarmingSpotProps from "../types/props/FarmingSpotProps";

import MenuContainer from "../components/menu/MenuContainer";
import CharacterSelect from "../components/selects/CharacterSelect";
import WeaponSelect from "../components/selects/WeaponSelect";
import ArtifactSelect from "../components/selects/ArtifactSelect";
import FarmingDisplay from "../components/FarmingDisplay";
import LoginButton from "../components/LoginButton";
import ResetButton from "../components/ResetButton";

import { artifact_data } from "../data/artifacts";
import { character_data } from "../data/characters";
import { material_data } from "../data/materials";
import { farming_spot } from "../data/materials";
import { weapon_data } from "../data/weapon";

const MainRoute = (): JSX.Element => {
  // These static variables record all characters, weapons, and artifacts
  const characters: CharacterProps[] = [];
  const weapons: WeaponProps[] = [];
  const artifacts: ArtifactProps[] = [];
  const materials: MaterialProps[] = [];
  const locations: FarmingSpotProps[] = [];

  // !!! TODO (Michael): Write fetch requests to API (or load JSON) to initialize static data
  function loadData() {
    if (dataInit === false) {
      characters.push(character_data);
      weapons.push(weapon_data);
      artifacts.push(artifact_data);
      materials.push(material_data);
      locations.push(farming_spot);
      setData(true);
    }
    console.log(materials);
  }

  // These preference states record the data associated with an account
  const [charPrefs, setCharPrefs] = React.useState<CharacterPrefs[]>([]);
  const [weaponPrefs, setWeaponsPrefs] = React.useState<EnablablePrefs[]>([]);
  const [artifactPrefs, setArtifactPrefs] = React.useState<EnablablePrefs[]>(
    []
  );
  const [loading, setLoading] = React.useState<Boolean>(true);
  const [dataInit, setData] = React.useState<Boolean>(false);

  /**
   * initPrefs() fetches the user preferences from the database
   */
  function initPrefs() {
    setLoading(true);
    fetch("/prefs", {
      method: "GET",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.length > 0) {
          setCharPrefs(data[0].characters);
          setWeaponsPrefs(data[0].weapons);
          setArtifactPrefs(data[0].artifacts);
        }
      })
      .then(() => setLoading(false));
  }

  /**
   * updateDB() updates the user preferences to the database
   */
  function updateDB() {
    const json = {
      characters: charPrefs,
      weapons: weaponPrefs,
      artifacts: artifactPrefs,
    };
    const body = JSON.stringify(json);

    fetch("/submit", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (res) {
      if (res.status === 500) {
        // handle notifying users that they need to be logged in to save
        console.log("user not logged in");
      } else if (res.status === 200) {
        console.log("update successfull");
      }
    });
  }

  const handleReset = () => {
    setCharPrefs([]);
    setWeaponsPrefs([]);
    setArtifactPrefs([]);
  };

  // This calculates the farmable items to be displayed and their related locations
  const [activeFarmables, setActiveFarmables] = React.useState<FarmableProps[]>(
    []
  );
  const [activeLocations, setActiveLocations] = React.useState<
    FarmingSpotProps[]
  >([]);

  const filterFarmablesLocations = () => {
    setActiveFarmables([]);
    setActiveLocations([]);
    charPrefs.forEach((c) => {
      if (c.enabled) {
        let character = characters.find((res) => {
          return res.name == c.name;
        });
        if (c.ascension == true && character !== undefined) {
          character.ascension.forEach((a) => {
            let mat = materials.find((res) => {
              return res.name == a;
            });
            if (mat !== undefined) {
              if (!activeFarmables.includes(mat)) {
                activeFarmables.push(mat);
              }
            }
          });
        }
        if (c.talent == true && character !== undefined) {
          character.talent.forEach((a) => {
            let mat = materials.find((res) => {
              return res.name == a;
            });
            if (mat !== undefined) {
              if (!activeFarmables.includes(mat)) {
                activeFarmables.push(mat);
              }
            }
          });
        }
      }
    });
    weaponPrefs.forEach((w) => {
      if (w.enabled) {
        let weapon = weapons.find((res) => {
          return res.name == w.name;
        });
        //add all ascension to active farmables
        if (weapon !== undefined) {
          weapon.ascension.forEach((a) => {
            let mat = materials.find((res) => {
              return res.name == a;
            });
            if (mat !== undefined) {
              if (!activeFarmables.includes(mat)) {
                activeFarmables.push(mat);
              }
            }
          });
        }
      }
    });
    artifactPrefs.forEach((a) => {
      if (a.enabled) {
        let artifact = materials.find((res) => {
          return res.name == a.name;
        });
        if (artifact !== undefined) {
          if (!activeFarmables.includes(artifact)) {
            activeFarmables.push(artifact);
          }
        }
      }
    });

    activeFarmables.forEach((f) => {
      let location = locations.find((res) => {
        return res.name == f.farm_at;
      });
      if (location !== undefined) {
        if (!activeLocations.includes(location)) {
          activeLocations.push(location);
        }
      }
    });
  };

  React.useEffect(() => {
    // !!! TODO (Micheal): Write useEffect function to refilter based off of the selected prefs changing
    // "activeFarmables" should be the artifacts selected by artifactPrefs and materials associated with selected characters
    // "activeLocations" should be the locations listed per each activeFarmable's farm_at string
    loadData();
    filterFarmablesLocations();
    if (!loading) {
      updateDB();
    }
  }, [charPrefs, weaponPrefs, artifactPrefs]);

  return (
    <>
      <MenuContainer />
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
      <FarmingDisplay farmables={activeFarmables} locations={activeLocations} />
      <LoginButton initPrefs={initPrefs} />
      <ResetButton handleReset={handleReset} />
    </>
  );
};

export default MainRoute;
