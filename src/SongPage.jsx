import React from "react";
import Navbar from "./Navbar";

class SongPage extends React.Component {
    constructor(props) {
        super(props)
        const queryString = new URLSearchParams(window.location.search);
        const songID = queryString.get('songID');

        this.state = {
            songID: songID,
            song: undefined
        }
        this.load()
    }

    load() {
        const { songID } = this.state;
        fetch(`/getSongById?songID=${songID}`, { method: 'get', 'no-cors': true })
            .then(res => res.json())
            .then(json => {
              console.log(json)
              this.setState({
                  song: json
              })
          })
    }

    addComment(e) {
        const { songID } = this.state;
        e.preventDefault()
        const json = {
            text: document.querySelector("#comment").value,
            songID: songID
        }

        fetch("/addComment", {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json",
        }
        }).then(res => res.json())
          .then(json => {
              console.log(json)
            window.location.reload()
        })
    }

    render() {
        const { song } = this.state
        return(
            <>
                <Navbar />
                {
                    song ? (
                        <div className="container">
                    <div className="row">
                        <div className="col-sm-4">{song.title}</div>
                        <div className="col-sm-4">{song.artist}</div>
                        <div className="col-sm-4"><img src={song.coverart} style={{ wdith: "20vh", height: "20vh" }}></img></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            {
                                song.comments.map(comment => {
                                    return (
                                        <div className="row">
                                            <p><strong>{comment.username}</strong>: {comment.text}</p>
                                        </div>
                                    )
                                })
                            }
                            <div className="row">
                                <form>
                                    <label for="comment">Add your comment:</label><br />
                                    <input type="textarea" name="comment" id="comment"></input><br />
                                    <button onClick={ e => this.addComment(e) }>Comment</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                    ) : 
                    (<p>LOADING...</p>)
                }
            </>
        )
    }
}

export default SongPage;