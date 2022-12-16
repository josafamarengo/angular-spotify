import {ITrack} from "../interfaces/ITrack";

export function newArtist() {
  return {
    id: '',
    name: '',
    genres: [],
    images: [],
    topTracks: [],
  };
}

export function newTrack() {
  return {
    id: '',
    name: '',
    album: newAlbum(),
    artists: [
      newArtist(),
    ],
    duration_ms: "",
    time: 0,
    explicit: false,
    preview_url: '',
    uri: '',
  };
}

export function newAlbum() {
  return {
    id: '',
    name: '',
    image: '',
    tracks: [],
    type: '',
    uri: '',
  };
}

export function newPlaylist() {
  return {
    id: '',
    name: '',
    image: '',
    tracks: [],
  };
}
