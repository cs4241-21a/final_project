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
        fetch(`/getAllSongs`, { method: 'get', 'no-cors': true })
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
        const trackList = songsJson
        if (!trackList.length) {
            return <p></p>
        } else {
            console.log(trackList.length)
            return (
                <div class="card" style={{ width: "95%", left: "2.5%", fontSize: "20px" }}>
                    <div class="card-body" style={{ paddingLeft: "20px" }}>
                        <table class="table table-striped">
                            <tr>
                                <th>Title</th>
                                <th>Artist</th>
                                <th>Coverart</th>
                                <th>Comments</th>
                            </tr>
                            {
                                trackList.map(track => (
                                    <tr id={track._id}>
                                        <td id={`title_${track._id}`}>{track.title} </td>
                                        <td id={`Artist_${track._id}`}>{track.artist} </td>
                                        <td><img src={track.coverart} style={{ wdith: "10vh", height: "10vh" }}></img></td>
                                        <td><a href={`/song?songID=${track._id}`}><i class="far fa-comment"></i></a> {track.comments.length}</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>

            )
        }
    }
}

export default Dashboard;