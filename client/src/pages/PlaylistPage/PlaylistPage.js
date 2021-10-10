import Song from "../../components/Song/Song";
import Script from 'react-load-script';
import React from "react";
import SpotifyWebPlayerService, { PlayerState } from "../../services/SpotifyWebPlayerService";

export default class PlaylistPage extends React.Component {
    spotifyWebPlayerService = new SpotifyWebPlayerService();
    state;

    constructor(props) {
      super(props);
      this.state = {
        currentTrackURI: this.spotifyWebPlayerService.currentTrackURI,
        playerState: this.spotifyWebPlayerService.playerState,
      }
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
              <div className="details__subtitle">10 songs • 2 hours, 14 minutes</div>
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
            <Song
              index={ 1 }
              song={ { title: 'BOP', 'author': 'DaBaby', 'duration_ms': 207959, popularity: 51, uri: 'spotify:track:6Ozh9Ok6h4Oi1wUSLtBseN' } }
              playing={ this.spotifyWebPlayerService.currentTrackURI === 'spotify:track:6Ozh9Ok6h4Oi1wUSLtBseN' && this.spotifyWebPlayerService.playerState === PlayerState.PLAYING }
              playSongHandler={ this.togglePlay } />
            <Song
              index={ 2 }
              song={ { title: 'Shivers', 'author': 'Ed Sheeran', 'duration_ms': 258384, popularity: 42, uri: 'spotify:track:75MNhvTCCKsST3YqqUiU9r' } }
              playing={ this.spotifyWebPlayerService.currentTrackURI === 'spotify:track:75MNhvTCCKsST3YqqUiU9r' && this.spotifyWebPlayerService.playerState === PlayerState.PLAYING }
              playSongHandler={ this.togglePlay } />
          </div>
        </div>
      );
    }

    togglePlay = async (uri) => {
      await this.spotifyWebPlayerService.togglePlay(uri);
      this.setState({
        currentTrackURI: this.spotifyWebPlayerService.currentTrackURI,
        playerState: this.spotifyWebPlayerService.playerState,
      });
    }
}

