import { UserProfile } from "./types/UserProfile";

const url =
  "https://spotify81.p.rapidapi.com/user_profile?id=nocopyrightsounds&playlistLimit=1&artistLimit=10";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5eba36709fmsh46db4e8e33040c1p10a999jsnc724d1df5f73",
    "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
  },
};

const playlistIds: string[] = [];

const getPlaylistIds = async (): Promise<void> => {
  try {
    const response = await fetch(url, options);
    const data = (await response.json()) as UserProfile;

    for (let playlist of data.public_playlists) {
      let uri = playlist.uri;
      const uriKeys = uri.split(":");
      playlistIds.push(uriKeys[uriKeys.length - 1]);
    }
  } catch (e) {
    console.log(e);
  }
};

const getPlaylist = async (): Promise<any[]> => {
  try {
    const playlists = [];

    for (let id of playlistIds) {
      const response = await fetch(
        `https://spotify81.p.rapidapi.com/playlist?id=${id}`
      );
      const data = await response.json();
      playlists.push(data);
    }

    return playlists;
  } catch (e) {
    console.log(e);
    return [];
  }
};
