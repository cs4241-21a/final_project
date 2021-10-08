import React from "react";

class Match extends React.Component {
  render() {
    return (
      <tr>
        <td>{` ${this.props.teamName1} VS ${this.props.teamName2}`}</td>
        <td>{this.props.teamChamps1.map((e) => (
          e + " "
        ))}</td>
        <td>{this.props.teamChamps2.map((e) => (
          e + " "
        ))}</td>
      </tr>
    );
  }
}

export default Match