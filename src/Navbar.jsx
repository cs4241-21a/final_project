import React from "react";

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.toggleMenu = this.toggleMenu.bind(this)
        this.state = {
          user: undefined,
          menu: false
        }
        this.load()
    }


  toggleMenu() { this.setState({ menu: !this.state.menu }) }

  load() {
    fetch('/getUser', { method: 'get', 'no-cors': true })
      .then(res => res.json())
      .then(json => {
        this.setState({
          user: json.user
        })
      })
  }

    render() {
        const { user } = this.state
        const menuClass = `dropdown-menu dropdown-menu-right${this.state.menu ? " show" : ""}`;
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">Music Library</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
        )
    }
}

export default Navbar;