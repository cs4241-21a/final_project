import React from "react";

class Team extends React.Component {
  render() {
    return (
      <>
        <tr>
          <td>{this.props.teamName1 + " VS " + this.props.teamName2}</td>
        </tr>
      </>
    );
  }
}

export default Team;
