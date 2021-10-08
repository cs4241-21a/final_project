
import React from "react";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Navbar from "./Navbar";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.toggleForm = this.toggleForm.bind(this)
    this.state = {
      form: false
    }
  }

  toggleForm() { this.setState({ form: !this.state.form }) }

  render() {
    const { form } = this.state;
    const formClass = `card ${ form ? 'opened' : 'closed' }`
    return (
    <>
      <Navbar />
      <div id="addSongForm" className={formClass}>
        <form class="form-signin card-body" action="/addSong" method="POST">
          <label for="songName">Name of the song</label><br />
          <input class="form-control" id="songName" name="songName" type="text" required></input>
          <button class="btn btn-lg btn-success btn-block" type="submit">Add Song</button>
        </form>
      </div>
      <div class="card" style={{ width: "100%", left: "20px", fontSize: "20px" }}>
        <div class="card-body" style={{ paddingLeft: "20px" }}>
            <table class="table table-striped">
                <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Coverart</th>
                    <th width="50">
                      <button onClick={this.toggleForm}>
                        <span class="fas fa-plus-circle fa-lg" aria-hiddne="true"></span>
                      </button>
                    </th>
                </tr>
            </table>
        </div>
    </div>
    </>
    );
  }
}

export default App;
