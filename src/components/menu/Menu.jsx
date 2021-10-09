import React, { Component } from "react";

class Menu extends Component {
    render() {
        var visibility = "hide";

        if (this.props.menuVisibility) {
            visibility = "show";
        }

        return (
            <div id="flyoutMenu"
                onMouseDown={this.props.handleMouseDown}
                className={visibility}>
                <h2><a href="#">Characters</a></h2>
                <h2><a href="#">Weapons</a></h2>
                <h2><a href="#">Artifacts</a></h2>
            </div>
        );
    }
}

export default Menu;