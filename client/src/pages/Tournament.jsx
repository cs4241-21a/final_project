import React from "react";
import Match from "../components/Match";
class TournamentPage extends React.Component {

  constructor(props) {
    super(props)
    console.log(this.props.match.params)
    this.state = { matches: [] }
  }

  componentDidMount() {
    console.log(this.props.match.params.tournamentId)
    console.log(this.props.match.params.tournamentId)

    const json = {
      tournamentId: this.props.match.params.tournamentId
    }

    const body = JSON.stringify(json);
    console.log(body)

    fetch("/tournament/loadMatches", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      credentials: "include"
    }).then(async (response) => {
      const json = await response.json();
      console.log(json);
      this.setState({ matches: json });
    })
  }

  render() {
    return (
      <div className="container">
        <h1 className='display-1'>Matches</h1>
        <div className="row">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Teams</th>
                <th>Team 1 Champions</th>
                <th>Team 2 Champions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.matches.map((match, i) => (
                <Match
                  key={i}
                  teamName1={match.team1}
                  teamName2={match.team2}
                  teamChamps1={match.champions1}
                  teamChamps2={match.champions2}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


export default TournamentPage;