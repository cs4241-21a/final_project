import Song from "../../components/Song/Song";
import Script from 'react-load-script';
import React from "react";
import SpotifyWebPlayerService, { PlayerState } from "../../services/SpotifyWebPlayerService";

export default class PlaylistPage extends React.Component {
    spotifyWebPlayerService = new SpotifyWebPlayerService();
    playlist;
    props;

    constructor(props) {
      super(props);
      this.props = props;
      this.state = { songs: null, songCount: 0, playlistDuration: 0 };
      const id = window.sessionStorage.getItem(`${props.genre} playlist id`);
      this.retrievePlaylist(id).then();
    }

    render() {
      return (
        <div className="playlist-page">
          <Script
            url="https://sdk.scdn.co/spotify-player.js"
          />

          <div className="playlist-page__details">
            <div className="details__left">
              <div className="details__title">Hip Hop Party Playlist</div>
              <div className="details__subtitle">{this.state.songCount} songs • { getDuration(this.state.playlistDuration) }</div>
            </div>
            <button>Add to Spotify</button>
          </div>

          <div className="playlist-page__song-fields">
            <div className="song-fields__left">
              <div>#</div><div>TITLE</div>
            </div>
            <div className="song-fields__middle">
              DURATION
            </div>
            <div className="song-fields__right">
              POPULARITY
            </div>
          </div>

          <div className="playlist-page__songs">
            { this.state.songs }
          </div>
        </div>
      );
    }

    togglePlay = async (uri) => {
      await this.spotifyWebPlayerService.togglePlay(uri);
      this.setState({ songs: this.getPlaylistHTML() });
    }

    generatePlaylist = async (genre) => {
      const response = await fetch(`/api/playlist/generate?genre=${genre}`);
      return await response.json();
    }

    getPlaylist = async (id) => {
      const response = await fetch(`/api/playlist/${id}`);
      return await response.json();
    }

    retrievePlaylist = async (id) => {
      if (id) {
        this.playlist = await this.getPlaylist(id);
      } else {
        this.playlist = await this.generatePlaylist(this.props.genre);
        window.sessionStorage.setItem(`${this.props.genre} playlist id`, this.playlist.id);
      }
      this.setState({
        songs: this.getPlaylistHTML(),
        songCount: this.playlist.songs.length,
        playlistDuration: this.playlist.songs.reduce((duration, song) => duration + song.duration_ms, 0)
      });
    }

    getPlaylistHTML = () => {
      return this.playlist.songs.map((song, i) =>
        <Song
          key={ song.id }
          index={ i }
          song={ song }
          playing={ this.spotifyWebPlayerService.currentTrackURI === song.uri && this.spotifyWebPlayerService.playerState === PlayerState.PLAYING }
          playSongHandler={ this.togglePlay } />);
    }
}

const getDuration = (ms) => {
  const seconds = ms / 1000;
  const minutes = Math.round(seconds / 60 % 60);
  const hours = Math.floor(minutes / 60);
  return hours > 0 ? `${hours} hours, ` : '' + `${minutes} minutes`
}
