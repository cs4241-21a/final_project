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
                <div class="card" style={{ width: "100%", left: "20px", fontSize: "20px" }}>
                    <div class="card-body" style={{ paddingLeft: "20px" }}>
                        <table class="table table-striped">
                            <tr>
                                <th>Title</th>
                                <th>Artist</th>
                                <th>Coverart</th>
                            </tr>
                            {trackList.map(track => (
                                <tr>
                                    <td id={`title_${track._id}`}>{track.title} </td>
                                    <td id={`Artist_${track._id}`}>{track.subtitle} </td>
                                    <td><img src={track.images.coverarthq} style={{ wdith: "10vw", height: "10vw" }}></img></td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>

            )
        }
    }
}

export default Dashboard;