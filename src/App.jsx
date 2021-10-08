
import React from "react";
import Dashboard from "./Dashbord";
import './styles.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.state = {
      musicJson: {},
      user: undefined,
      menu: false
    }
    this.load()
  }

  toggleMenu() { this.setState({ menu: !this.state.menu }) }

  load(songName) {
    //   fetch(`/getSongByName?term=${songName}`, { method: 'get', 'no-cors': true })
    //     .then(res => res.json())
    //     .then(json => {
    //       this.setState({
    //         musicJson: json
    //       })
    //     })
    fetch('/getUser', { method: 'get', 'no-cors': true })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          user: json.user
        })
      })
  }

  render() {
    const { musicJson } = this.state;
    const user = this.state.user
    const menuClass = `dropdown-menu dropdown-menu-right${this.state.menu ? " show" : ""}`;
    console.log(user)
    return (<>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Music Library</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home </a>
            </li>
          </ul>
          {user ?
            <div class="nav-item dropdown">
              <button class="btn btn-outline-success my-2 my-sm-0 dropdown-toggle" href="#" id="navbarDropdown" role="button"
                data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" onClick={this.toggleMenu}>
                {user.displayName}
              </button>
              <div class={menuClass} aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="/profile">My</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/logout">Log out</a>
              </div>
            </div>
            :
            <button class="btn btn-outline-success my-2 my-sm-0" type="button"
              onClick={() => window.location.href = '/login'} id="loginButton">
              Log In
            </button>
          }
        </div>
      </nav>
      <>
        <Dashboard />
      </>
    </>
    );
  }
}

export default App;
