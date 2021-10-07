import React from "react";
import Team from "../components/Team";

class TournamentCreationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { teams: [] };
  }

  load() {
    fetch("http://localhost:3001/loadTeams", {
      method: "GET",
      credentials: 'include'
    }).then(async (response) => {
      const json = await response.json();
      console.log(json);
      // this.setState({ teams: json });
    });
  }

  submit(e) {
    const teamName = document.querySelector("#teamName"),
      sum1 = document.querySelector("#summoner1"),
      sum2 = document.querySelector("#summoner2"),
      sum3 = document.querySelector("#summoner3"),
      sum4 = document.querySelector("#summoner4"),
      sum5 = document.querySelector("#summoner5"),
      json = {
        teamName: teamName.value,
        summoners: [sum1.value, sum2.value, sum3.value, sum4.value, sum5.value],
      },
      body = JSON.stringify(json);

    fetch("http://localhost:3001/insertTeam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      credentials: 'include'
    }).then(async (response) => {
      const json = await response.json();
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
        teamName: teamName.value,
        summoners: [sum1.value, sum2.value, sum3.value, sum4.value, sum5.value],
      },
      body = JSON.stringify(json);
    fetch("http://localhost:3001/updateTeam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

    fetch("http://localhost:3001/deleteTeam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      credentials: 'include'
    }).then(async (response) => {
      const data = await response.json();
      this.setState({ locations: data });
      // window.location.reload();


    });
  }

  generateTournament(e) {
    fetch("/generateTournament", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
  }
  render() {
    return (
      <>
        <h1 class="text-center">Tournament Creation</h1>

        <div class="d-flex justify-content-center my-5">
          <form class="row row-cols-lg-auto g-3 align-items-center">
            <div class="col-12">
              <label for="teamName">Team Name</label>
              <input type="text" class="form-control" id="teamName" required />
            </div>
            <div class="col-12">
              <label for="summoner1">Summoner #1</label>
              <input type="text" class="form-control" id="summoner1" required />
            </div>
            <div class="col-12">
              <label for="summoner2">Summoner #2</label>
              <input type="text" class="form-control" id="summoner2" required />
            </div>
            <div class="col-12">
              <label for="summoner3">Summoner #3</label>
              <input type="text" class="form-control" id="summoner3" required />
            </div>
            <div class="col-12">
              <label for="summoner4">Summoner #4</label>
              <input type="text" class="form-control" id="summoner4" required />
            </div>
            <div class="col-12">
              <label for="summoner5">Summoner #5</label>
              <input type="text" class="form-control" id="summoner5" required />
            </div>
            <div class="col-12">
              <button
                id="submit-button"
                type="submit"
                class="btn btn-primary mt-4"
                onClick={(e) => this.submit(e)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div class="text-center d-flex justify-content-center mt-5">
          <table id="teamsTable" class="table table-striped  w-50">
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
        <button onClick={(e) => this.generateTournament(e)}>Generate Tournament</button>
      </>
    );
  }
}

export default TournamentCreationPage;
