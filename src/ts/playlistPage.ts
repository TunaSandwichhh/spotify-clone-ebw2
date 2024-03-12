import { Playlist } from "./types/Playlist";
import { Track } from "./types/Track";

const urlParams = new URLSearchParams(window.location.search);
const playlistId = urlParams.get("id");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5eba36709fmsh46db4e8e33040c1p10a999jsnc724d1df5f73",
    "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
  },
};

const getPlaylistTracks = async (id: string): Promise<Track[]> => {
  const playlistTracks: Track[] = [];
  try {
    const response = await fetch(
      `https://spotify81.p.rapidapi.com/playlist?id=${id}`,
      options
    );
    const data = (await response.json()) as Playlist;

    for (let trackData of data.tracks.items) {
      playlistTracks.push(trackData.track);
    }

    return playlistTracks;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const renderPlaylistTrack = (track: Track) => {
  const playlistTracks = document.getElementById(
    "playlistTracks"
  ) as HTMLElement | null;
  if (playlistTracks) {
    const trackDiv = document.createElement("div");
    const artistLinks = track.artists.map(
      (artist) =>
        `<a href="../html/artists.html?id=${artist.id}">${artist.name}</a>`
    );
    trackDiv.innerHTML = `
 <h1>${track.name}</h1>
 <h2>${artistLinks}</h2>
 `;
    playlistTracks.appendChild(trackDiv);
  }
};

const handleLoad = async () => {
  if (playlistId) {
    const tracks = await getPlaylistTracks(playlistId);
    for (let track of tracks) {
      renderPlaylistTrack(track);
    }
  }
};

document.addEventListener("DOMContentLoaded", handleLoad);
