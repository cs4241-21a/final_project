import React, { Component } from "react";
import MenuButton from "./MenuButton";
import Menu from "./Menu";

class MenuContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false,
    };

    if(this.props.visibility === "hide") {
      this.state = {
        visible: false,
      };
    } else if(this.props.visibility === "show") {
      this.state = {
        visible: true,
      };
    }

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleMouseDown(e) {
    this.toggleMenu();

    e.stopPropagation();
  }

  toggleMenu() {
    this.setState({
      visible: !this.state.visible,
    });
    if(this.props.visibility === "hide") {
      this.props.visibilityToggle("show");
    } else if(this.props.visibility === "show") {
      this.props.visibilityToggle("hide");
    }
  }

  render() {
    return (
      <div>
        <MenuButton handleMouseDown={this.handleMouseDown} />
        <Menu
          handleMouseDown={this.handleMouseDown}
          menuVisibility={this.state.visible}
          characterSelect={this.props.characterSelect}
          weaponSelect={this.props.weaponSelect}
          artifactSelect={this.props.artifactSelect}
        />
      </div>
    );
  }
}

export default MenuContainer;
