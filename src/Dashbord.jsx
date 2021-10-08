import React from "react";

class Dashboard extends React.Component {
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
                console.log(json)
                this.setState({
                    songsJson: json
                })
            })
    }
    render() {
        const { songsJson } = this.state
        const trackList = songsJson.tracks
        if (!trackList) {
            return <p></p>
        } else {
            return (
                <>
                    {trackList.map(track => (
                        <p>{track.title}</p>
                    ))}
                </>
            )
        }
    }
}

export default Dashboard;