export default new (class SpotifyWebPlayerService {
  player;
  deviceID;

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
    });

    this.player.addListener('not_ready', () => {
      console.log('Spotify Web Player: Offline.');
    });

    this.player.addListener('player_state_changed', () => {
      console.log('Spotify Web Player: State changed.');
    });

    this.player.addListener('initialization_error', ({ message }) => console.error(message));
    this.player.addListener('authentication_error', ({ message }) => console.error(message));
    this.player.addListener('account_error', ({ message }) => console.error(message));

    this.player.connect();
  }

  togglePlay = async () => {
    await this.playSong(this.deviceID, 'spotify:track:1Gr90fhZQ6j9KlhVpxhoxX');
  };

  async getAccessToken() {
    const response = await fetch('/api/token');
    return await response.json();
  }

  async playSong(id, uri) {
    await fetch(`/api/player/${id}/play?uri=${uri}`, { method: 'PUT' }).then();
  }
})();
