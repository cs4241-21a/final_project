import React from "react";
import { useHistory, useParams } from "react-router";
import Team from "../components/Team";

class TournamentCreationPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = { teams: [], userId: this.props.match.params.userId };
  }

  componentDidMount() {
    fetch("http://localhost:3001/tournament/loadTeams", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }).then(async (response) => {
      const json = await response.json();
      console.log(json);
      this.setState({ ...this.state, teams: json });
    });
  }

  submit(e) {
    e.preventDefault();
    console.log('submit called')

    const teamName = document.querySelector("#teamName"),
      sum1 = document.querySelector("#summoner1"),
      sum2 = document.querySelector("#summoner2"),
      sum3 = document.querySelector("#summoner3"),
      sum4 = document.querySelector("#summoner4"),
      sum5 = document.querySelector("#summoner5"),
      json = {
        userId: this.props.match.params.userId,
        teamName: teamName.value,
        summoners: [sum1.value, sum2.value, sum3.value, sum4.value, sum5.value],
      },
      body = JSON.stringify(json);

    fetch("http://localhost:3001/tournament/insertTeam", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      credentials: 'include'
    }).then(async (response) => {
      const json = await response.json();

      if (json.error) {
        alert(json.error);
        return;
      }

      this.setState({ teams: json });
    });
  }

  update(e, i, id) {
    const teamName = document.querySelector("#teamName" + i),
      sum1 = document.querySelector("#sum1" + i),
      sum2 = document.querySelector("#sum2" + i),
      sum3 = document.querySelector("#sum3" + i),
      sum4 = document.querySelector("#sum4" + i),
      sum5 = document.querySelector("#sum5" + i),
      json = {
        _id: id,
        teamName: teamName.value,
        summoners: [sum1.value, sum2.value, sum3.value, sum4.value, sum5.value],
      },
      body = JSON.stringify(json);
    fetch("http://localhost:3001/tournament/updateTeam", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      credentials: 'include'
    }).then(async (response) => {
      const json = await response.json();
      this.setState({ teams: json });
    });
  }

  delete = (e, id) => {
    const json = { _id: id },
      body = JSON.stringify(json);

    fetch("http://localhost:3001/tournament/deleteTeam", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      credentials: 'include'
    }).then(async (response) => {
      const json = await response.json();
      this.setState({ teams: json });
    });
  }

  generateTournament(e) {
// TODO: disable button after click
// also add a spinny loading icon
    fetch("http://localhost:3001/tournament/generateTournament", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }).then(async (response) => {
      const json = await response.json();
      this.props.history.push(`/tournament/${json._id}`);
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Tournament Creation</h1>

        <div className="d-flex my-5">
          <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={(e) => this.submit(e)}>
            <div className="col-12">
              <label htmlFor="teamName">Team Name</label>
              <input type="text" className="form-control" id="teamName" required />
            </div>
            <div className="col-12">
              <label htmlFor="summoner1">Summoner #1</label>
              <input type="text" className="form-control" id="summoner1" required />
            </div>
            <div className="col-12">
              <label htmlFor="summoner2">Summoner #2</label>
              <input type="text" className="form-control" id="summoner2" required />
            </div>
            <div className="col-12">
              <label htmlFor="summoner3">Summoner #3</label>
              <input type="text" className="form-control" id="summoner3" required />
            </div>
            <div className="col-12">
              <label htmlFor="summoner4">Summoner #4</label>
              <input type="text" className="form-control" id="summoner4" required />
            </div>
            <div className="col-12">
              <label htmlFor="summoner5">Summoner #5</label>
              <input type="text" className="form-control" id="summoner5" required />
            </div>
            <div className="col-12">
              <button
                id="submit-button"
                type="submit"
                className="btn btn-primary mt-4"
                onSubmit={(e) => this.submit(e)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="text-center d-flex justify-content-center mt-5">
          <table id="teamsTable" className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Team Name</th>
                <th scope="col">Summoner #1</th>
                <th scope="col">Summoner #2</th>
                <th scope="col">Summoner #3</th>
                <th scope="col">Summoner #4</th>
                <th scope="col">Summoner #5</th>
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {this.state.teams.map((team, i) => (
                <Team
                  key={team._id}
                  i={i}
                  _id={team._id}
                  teamName={team.teamName}
                  summoners={team.summoners}
                  update={this.update}
                  delete={this.delete}
                />
              ))}
            </tbody>
          </table>
        </div>
        <button className='btn btn-primary' onClick={(e) => this.generateTournament(e)}>Generate Tournament</button>
      </div>

    );
  }
}

export default TournamentCreationPage;
