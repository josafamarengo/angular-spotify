import {ITrack} from "./ITrack";

export interface IPlaylist {
  id: string;
  name: string;
  image: string;
  tracks?: ITrack[];
}
