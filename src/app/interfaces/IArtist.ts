import {ITrack} from "./ITrack";

export interface IArtist {
  id: string;
  name: string;
  image: string;
  genres: string[];
  topTracks: ITrack[];
}
