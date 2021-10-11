import React, { Component } from "react";
import MenuButton from "./MenuButton";
import Tabs from "./Tabs"

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
                        {this.props.characterSelect()}
                        </div>
                        <div label="Weapons">
                        {this.props.weaponSelect()}
                        </div>
                        <div label="Artifacts">
                        {this.props.artifactSelect()}
                        </div>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Menu;