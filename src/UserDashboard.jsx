
import React from "react";
import Navbar from "./Navbar";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.toggleForm = this.toggleForm.bind(this)
    this.addSong = this.addSong.bind(this)
    this.state = {
      form: false,
      songsJson: undefined,
      addMessage: undefined
    }
    this.load()
  }

  toggleForm() { this.setState({ form: !this.state.form }) }

  addSong(event) {
    console.log(event)
    event.preventDefault()
    const json = {
      songName: document.querySelector("#songName").value,
      artistName: document.querySelector("#artistName").value
    }

    fetch("/addSong", {
      method: "POST",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json())
      .then(json => {
        console.log(json)
        if (json.message === "Song added") {
          window.location.replace('/profile')
        } else {
          this.setState({ addMessage: json.message })
        }
      })
  }

  removeSong(event) {
    console.log(event)
    event.preventDefault()
    const json = {
      _id: event.currentTarget.parentElement.parentElement.id
    }
    fetch(`/removeSong`, {
      method: "POST",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json())
      .then(json => {
        console.log(json)
        this.load()
      })
  }

  load() {
    fetch(`/getUserSongs`, { method: 'get', 'no-cors': true })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          songsJson: json
        })
      })
  }

  render() {
    const { form, songsJson, addMessage } = this.state;
    const formClass = `card ${form ? 'opened' : 'closed'}`
    return (
      <>
        <Navbar />
        <div id="addSongForm" className={formClass}>
          <form class=" form form-signin card-body">
            {addMessage ? <div class="alert alert-danger">{addMessage}</div> : <></>}
            <label class='' for="songName">Title of the song</label><br />
            <input class="form-control" id="songName" name="songName" type="text" placeholder="Song Title" required></input>
            <label class='' for="artistName">Name of the Artist</label><br />
            <input class="form-control" id="artistName" name="artistName" type="text" placeholder="Artist Name" required></input>
            <button class="btn btn-lg btn-success btn-block" type="submit" onClick={(e) => this.addSong(e)}>Add Song</button>
          </form>
        </div>
        <div class="card" style={{ width: "95%", left: "2.5%", fontSize: "20px" }}>
          <div class="card-body" style={{ paddingLeft: "20px" }}>
            <table class="table table-striped">
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Coverart</th>
                <th width="50">
                  <button class="btn btn-lg btn-primary" onClick={this.toggleForm}>
                    <span class="fas fa-plus-circle fa-lg" aria-hiddne="true"></span>
                  </button>
                </th>
              </tr>
              {songsJson ?
                songsJson.map(track => (
                  <tr id={track._id}>
                    <td id={`title_${track._id}`}>{track.title} </td>
                    <td id={`Artist_${track._id}`}>{track.artist} </td>
                    <td><img src={track.coverart} style={{ wdith: "10vh", height: "10vh" }}></img></td>
                    <td>
                      <button class="btn btn-lg btn-danger" onClick={(e) => this.removeSong(e)}>
                        <span class="fas fa-times-circle fa-lg" aria-hiddne="true"></span>
                      </button>
                    </td>
                  </tr>
                ))
                :
                <p>No songs to display</p>
              }
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default App;
