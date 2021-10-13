import React from "react";

const ColorTile = props => {

    return (
        <div className={`colorTile ${props.color} ${props.flash ? "flash" : ""} ${props.cursor ? "clickable" : ""}`}  onClick={props.onClick}></div>
    )
}
export default ColorTile