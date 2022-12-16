import {IUser} from "../interfaces/IUser";
import {IPlaylist} from "../interfaces/IPlaylist";
import {IArtist} from "../interfaces/IArtist";
import {ITrack} from "../interfaces/ITrack";
import {IAlbum} from "../interfaces/IAlbum";
import {newPlaylist} from "./factories";

export function SpotifyUserToUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
  return {
    id: user.id,
    name: user.display_name,
    img: user.images[0].url,
  }
}

export function SpotifyPlaylistToPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
  return {
    id: playlist.id,
    name: playlist.name,
    image: playlist.images[0].url,
  }
}

export function SpotifySinglePlaylistToPlaylist(playlist: SpotifyApi.PlaylistObjectFull): IPlaylist {
  if(!playlist)
    return newPlaylist();

  return {
    id: playlist.id,
    name: playlist.name,
    image: playlist.images[0].url,
    tracks: [],
  }
}

export function SpotifyArtistToArtist(artist: SpotifyApi.ArtistObjectFull): IArtist {
  return {
    id: artist.id,
    name: artist.name,
    image: artist.images[0].url,
    genres: artist.genres,
    topTracks: [],
  }
}

export function SpotifyTrackToTrack(track: SpotifyApi.TrackObjectFull): ITrack {

  const msToMinutesAndSeconds = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  }

  return {
    id: track.id,
    name: track.name,
    album: SpotifyAlbumToAlbum(track.album),
    artists: track.artists,
    duration_ms: msToMinutesAndSeconds(track.duration_ms),
    time: track.duration_ms,
    explicit: track.explicit,
    preview_url: track.preview_url,
    uri: track.uri,
  }
}

export function SpotifyAlbumToAlbum(album: SpotifyApi.AlbumObjectSimplified): IAlbum {
  return {
    id: album.id,
    name: album.name,
    image: album.images[0].url,
    tracks: [],
    type: album.type,
    uri: album.uri,
  }
}
