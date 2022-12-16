import {IAlbum} from "./IAlbum";

export interface ITrack {
  id: string;
  name: string;
  album: IAlbum;
  artists: {
    name: string;
    id: string;
  }[];
  duration_ms: number | string;
  time: number;
  explicit: boolean;
  preview_url: string;
  uri: string;
}
