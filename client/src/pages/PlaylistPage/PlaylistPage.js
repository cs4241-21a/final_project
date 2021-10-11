import Song from "../../components/Song/Song";
import Script from 'react-load-script';
import React from "react";
import SpotifyWebPlayerService, { PlayerState } from "../../services/SpotifyWebPlayerService";
import { Genres } from "../../globals";

export default class PlaylistPage extends React.Component {
  playlist;
  props;

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      songs: this.getPlaylistHTML(true),
      songCount: 0,
      playlistDuration: 0,
      loading: true
    };
  }

  componentDidMount() {
    const id = window.sessionStorage.getItem(`${this.props.genre} playlist id`);
    this.retrievePlaylist(id).then();
  }

  render() {
    return (
      <div className="playlist-page">
        <Script
          url="https://sdk.scdn.co/spotify-player.js"
        />

        <div className="playlist-page__details">
          {
            !this.state.loading ?
              <div className="details__left">
                <div className="details__title">{ Genres[this.props.genre].label } Party Playlist</div>
                <div className="details__subtitle">{this.state.songCount} songs • { getDuration(this.state.playlistDuration) }</div>
              </div> :
              <div className="details__left">
                <div className="details__title skeleton">{ Genres[this.props.genre].label } Party Playlist<div/></div>
                <div className="details__subtitle skeleton">0 songs • 0 hours, 0 minutes<div/></div>
              </div>
          }
          <div className="details__right">
            <button onClick={ () => window.open(this.playlist.href, '_blank') } disabled={ this.state.loading }>View on Spotify</button>
            <button onClick={ this.shufflePlaylist } disabled={ this.state.loading }>Reroll Playlist</button>
          </div>
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

  retrievePlaylist = async (id) => {
    if (id) {
      this.playlist = await this.getPlaylist(id);
    } else {
      this.playlist = await this.generatePlaylist(this.props.genre);
      window.sessionStorage.setItem(`${this.props.genre} playlist id`, this.playlist.id);
    }
    this.updateState();
  }

  generatePlaylist = async (genre) => {
    const response = await fetch(`/api/playlist/generate?genre=${genre}`);
    return await response.json();
  }

  getPlaylist = async (id) => {
    const response = await fetch(`/api/playlist/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      return this.generatePlaylist(this.props.genre);
    }
  }

  shufflePlaylist = async () => {
    this.nullifyState();
    const response = await fetch(`/api/playlist/${this.playlist.id}/shuffle?genre=${this.props.genre}`, { method: 'PUT' });
    this.playlist = await response.json();
    this.updateState();
  }

  togglePlay = async (uri) => {
    await SpotifyWebPlayerService.togglePlay(uri);
    this.setState({ songs: this.getPlaylistHTML(false) });
  }

  deleteSong = async (id, uri) => {
    const response = await fetch(`/api/playlist/${id}?uri=${uri}`, { method: 'DELETE' });
    this.playlist = await response.json();
    this.updateState();
  }

  getPlaylistHTML = (loading) => {
    if (!loading) {
      return this.playlist.songs.map((song, i) =>
        <Song
          key={ song.id }
          index={ i }
          song={ song }
          playing={ SpotifyWebPlayerService.currentTrackURI === song.uri && SpotifyWebPlayerService.playerState === PlayerState.PLAYING }
          loading={ false }
          playSongHandler={ this.togglePlay }
          deleteSongHandler={ (uri) => this.deleteSong(this.playlist.id, uri) } />);
    } else {
      return dummyPlaylist.songs.map((song, i) =>
        <Song
          key={ song.id }
          index={ i }
          song={ song }
          playing={ false }
          loading={ true } />);
    }
  }

  updateState = () => {
    this.setState({
      songs: this.getPlaylistHTML(false),
      songCount: this.playlist.songs.length,
      playlistDuration: this.playlist.songs.reduce((duration, song) => duration + song.duration_ms, 0),
      loading: false
    });
  }

  nullifyState = () => {
    this.setState({
      songs: this.getPlaylistHTML(true),
      songCount: 0,
      playlistDuration: 0,
      loading: true
    });
  }
}

const getDuration = (ms) => {
  const seconds = ms / 1000;
  const minutes = seconds / 60;
  const hours = Math.floor(minutes / 60);
  return (hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}, ` : '') + `${ Math.round(minutes % 60) } minutes`
}

const getRandomString = (size) => {
  let string = '';
  for (let i = 0; i < Math.round(Math.random() * size) + size; i++) {
    string += 'a';
  }
  return string;
}

const getDummySong = (id) => {
  return {
    id: id,
    album_image_url: null,
    name: `${getRandomString(8)} (feat. ${getRandomString(7)})`,
    artists: [getRandomString(7), getRandomString(7)],
    duration_ms: 99999,
    popularity: 75
  }
}

const dummyPlaylist = {
  songs: Array.from({ length: 20 }, (v, i) => getDummySong(i))
}
