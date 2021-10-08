import React from "react";

class Team extends React.Component {
  render() {
    return (
      <>
        <tr>
        <td>
            <input
              id={"teamName" + this.props.i}
              defaultValue={this.props.teamName}
            />
          </td>
          <td>
            <input
              id={"sum1" + this.props.i}
              defaultValue={this.props.summoners[0]}
            />
          </td>
          <td>
            <input
              id={"sum2" + this.props.i}
              defaultValue={this.props.summoners[1]}
            />
          </td>
          <td>
            <input
              id={"sum3" + this.props.i}
              defaultValue={this.props.summoners[2]}
            />
          </td>
          <td>
            <input
              id={"sum4" + this.props.i}
              defaultValue={this.props.summoners[3]}
            />
          </td>
          <td>
          <input  id= {"sum5"+ this.props.i} defaultValue={this.props.summoners[4]} />
          </td>
          <td>
            <button
              class="update-button"
              onClick={(e) => this.props.update(e, this.props.i, this.props._id)}
            >
              Update
            </button>
          </td>
          <td>
            <button
              class="delete-button"
              onClick={(e) => this.props.delete(e, this.props._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      </>
    );
  }
}

export default Team;
