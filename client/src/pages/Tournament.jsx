import React from "react";
import Match from "../components/Match";
class TournamentPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = { matches: [] }
    this.load()
  }

  load() {
    fetch("htpp://localhost:3001/tournament/loadMatches", {
      method: "GET",
      credentials: "include"
    }).then(async (response) => {
      const json = await response.json();
      this.setState({ matches: json })
    })
  }
  render() {
    return (
      <>
        <table class="table table-striped  w-50">

          <tbody>
            {this.state.matches.map((match, i) => (
              <Match
                key={i}
                teamName1={match.teamName1}
                teamName2={match.teamName2}
              />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}


export default TournamentPage;