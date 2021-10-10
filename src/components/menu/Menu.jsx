import React, { Component } from "react";
import MenuButton from "./MenuButton";
import Tabs from "./Tabs"
import CharacterSelect from "../selects/CharacterSelect";
import WeaponSelect from "../selects/WeaponSelect";
import ArtifactSelect from "../selects/ArtifactSelect";

class Menu extends Component {
    render() {
        var visibility = "hide";
        //document.body.style.backgroundColor = "rgba(73, 133, 158, 1)";
        if (this.props.menuVisibility) {
            visibility = "show";
            //document.body.style.backgroundColor = "rgba(10, 43, 68, 0.8)";
        }

        return (
            <div id="flyoutMenu"
                className={visibility}>
                <h3><MenuButton handleMouseDown={this.props.handleMouseDown} /></h3>
                <div>
                    <Tabs>
                        <div label="Characters">
                        <CharacterSelect 
                            characters={this.props.characters} 
                            preferences={this.props.charPrefs} 
                            charSetter={this.props.charSetter}
                        />
                        </div>
                        <div label="Weapons">
                        <WeaponSelect
                            weapons={this.props.weapons} 
                            weaponPrefs={this.props.weaponPrefs} 
                            weaponSetter={this.props.weaponSetter}
                        />
                        </div>
                        <div label="Artifacts">
                        <ArtifactSelect
                            artifacts={this.props.artifacts} 
                            artifactPrefs={this.props.artifactPrefs} 
                            artifactSetter={this.props.artifactSetter}
                        />
                        </div>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Menu;