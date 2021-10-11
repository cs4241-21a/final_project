import React, { Component } from "react";

class MenuButton extends Component {
    render() {
        return (
            <button id="menuButton"
                onMouseDown={this.props.handleMouseDown}>Menu</button>
        );
    }
}

export default MenuButton;