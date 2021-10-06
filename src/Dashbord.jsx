import React from "react";

class Dashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            songsJson: {}
        }
        this.load()
    }
    load() {
        fetch(`/getSongs`, { method: 'get', 'no-cors': true })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    songsJson: json
                })
            })
    }
    render() {
        <div>{this.state.songsJson}</div>
    }
}

export default Dashboard