export const PlayerState = {
  PAUSED: 0,
  PLAYING: 1
}

export default class SpotifyWebPlayerService {
  player;
  deviceID;
  currentTrackURI;
  playerState = PlayerState.PAUSED;
  waitingToPlay;

  constructor() {
    window.onSpotifyWebPlaybackSDKReady = this.initializePlayer;
  }

  initializePlayer = () => {
    console.log('Spotify Web Player: Initializing...');
    this.player = new window.Spotify.Player({
      name: 'Bopify Web Playback',
      getOAuthToken: async cb => {
        cb(await this.getAccessToken());
      },
      volume: 0.2
    });

    this.player.addListener('ready', ({ device_id }) => {
      console.log('Spotify Web Player: Online.');
      this.deviceID = device_id;
      this.playSong(device_id, this.waitingToPlay).then(() => {
        this.waitingToPlay = null;
      });
    });

    this.player.addListener('not_ready', () => {
      console.log('Spotify Web Player: Offline.');
    });

    this.player.addListener('initialization_error', ({ message }) => console.error(message));
    this.player.addListener('authentication_error', ({ message }) => console.error(message));
    this.player.addListener('account_error', ({ message }) => console.error(message));

    this.player.connect();
  }

  togglePlay = async (uri) => {
    if (uri !== this.currentTrackURI) {
      this.currentTrackURI = uri;
      await this.playSong(this.deviceID, uri);
      this.playerState = PlayerState.PLAYING;
    } else if (this.playerState === PlayerState.PLAYING) {
      this.player.pause();
      this.playerState = PlayerState.PAUSED;
    } else {
      this.player.resume();
      this.playerState = PlayerState.PLAYING;
    }
  };

  async getAccessToken() {
    const response = await fetch('/api/token');
    return await response.json();
  }

  async playSong(id, uri) {
    if (id) {
      await fetch(`/api/player/${id}/play?uri=${uri}`, { method: 'PUT' }).then();
    } else {
      this.waitingToPlay = uri;
    }
  }
};
