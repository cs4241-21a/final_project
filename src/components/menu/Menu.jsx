import React, { Component } from "react";
import MenuButton from "./MenuButton";

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
                <h2><a href="#">Characters</a></h2>
                <h2><a href="#">Weapons</a></h2>
                <h2><a href="#">Artifacts</a></h2>
            </div>
        );
    }
}

export default Menu;