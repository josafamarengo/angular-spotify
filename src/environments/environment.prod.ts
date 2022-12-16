export const environment = {
  production: true,
}

export const SpotifyConfig = {
  clientId: '36af13d996d64f54bb674161f729f4bc',
  redirectUrl: 'https://radinho.netlify.app/login/',
  authEndPoint: 'https://accounts.spotify.com/authorize',
  scopes: [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-recently-played",
    "user-top-read",
    "user-read-playback-position",
    "user-library-read",
    "user-library-modify",
    "playlist-read-private",
    "playlist-read-collaborative",
  ]
}
