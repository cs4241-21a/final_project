import React from "react";
import Match from "../components/Match";
class TournamentPage extends React.Component {

  constructor(props) {
    super(props)
    console.log(this.props.match.params)
    this.state = { matches: [] }
    this.load()
  }

  load() {
    console.log(this.props.match.params.tournamentId)
    console.log(this.props.match.params.tournamentId)

    const json = { 
                  tournamentId:this.props.match.params.tournamentId },
    body = JSON.stringify(json);
    console.log(body)
    fetch("http://localhost:3001/tournament/loadMatches", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
    },
      body,
      credentials: "include"
    }).then(async (response) => {
      const json = await response.json();
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