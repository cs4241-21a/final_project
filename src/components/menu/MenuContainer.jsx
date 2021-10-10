import React, { Component } from "react";
import MenuButton from "./MenuButton";
import Menu from "./Menu";

class MenuContainer extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: false 
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    handleMouseDown(e) {
        this.toggleMenu();

        e.stopPropagation();
    }

    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        return (
            <div><MenuButton handleMouseDown={this.handleMouseDown} />
                <Menu handleMouseDown={this.handleMouseDown}
                    menuVisibility={this.state.visible} 
                    characters={this.props.characters} 
                    charPrefs={this.props.charPrefs} 
                    charSetter={this.props.charSetter}
                    weapons={this.props.weapons} 
                    weaponPrefs={this.props.weaponPrefs} 
                    weaponSetter={this.props.weaponSetter}
                    artifacts={this.props.artifacts} 
                    artifactPrefs={this.props.artifactPrefs} 
                    artifactSetter={this.props.artifactSetter}
                    />
            </div>
        );
    }
}

export default MenuContainer;