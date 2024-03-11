import { Track } from "./types/Track";

console.log("ciao da album page");

const url =
  "https://spotify81.p.rapidapi.com/albums?ids=3IBcauSj5M2A6lTeffJzdv";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5eba36709fmsh46db4e8e33040c1p10a999jsnc724d1df5f73",
    "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
  },
};

const fetchCall = async (): Promise<void> => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const tracks = data.albums[0].tracks.items;

    for (let track of tracks) {
      //console.log(track.name);
      renderTrack(track);
    }
  } catch (e) {
    console.log(e);
  }
};

const renderTrack = (track: Track): void => {
  const container = document.getElementById("container") as HTMLElement | null;
  if (container) {
    const trackTitle = document.createElement("div");
    trackTitle.innerHTML = `
    <h1>${track.name}</h1>`;
    container.appendChild(trackTitle);
  }
};

const handleLoad = () => {
  fetchCall();
};

document.addEventListener("DOMContentLoaded", handleLoad);
