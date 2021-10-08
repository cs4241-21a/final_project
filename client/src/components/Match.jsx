import React from "react";

class Match extends React.Component {
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

export default Match