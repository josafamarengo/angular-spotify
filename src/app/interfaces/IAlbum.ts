import {ITrack} from "./ITrack";
import {IArtist} from "./IArtist";

export interface IAlbum {
  id: string;
  name: string;
  image: string;
  tracks: ITrack[];
  type: string;
  uri: string;
}
