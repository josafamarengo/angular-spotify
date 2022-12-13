import {IUser} from "../interfaces/IUser";

export function SpotifyUserToUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
  return {
    id: user.id,
    name: user.display_name,
    img: user.images[0].url,
  }
}
