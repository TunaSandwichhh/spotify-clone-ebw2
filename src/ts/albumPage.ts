import { Track } from "./types/Track";

const url =
  "https://spotify81.p.rapidapi.com/albums?ids=3IBcauSj5M2A6lTeffJzdv";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5eba36709fmsh46db4e8e33040c1p10a999jsnc724d1df5f73",
    "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
  },
};

/**
 * Funzione asincrona che esegue una fetch all'endpoint /albums/:id e ne ritorna l'array di brani (oggetti Track) associati
 */
const getTracks = async (): Promise<Track[]> => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data.albums[0].tracks.items as Track[];
  } catch (e) {
    console.log(e);
    return [];
  }
};

/**
 * Funzione che riceve un oggetto Track come parametro e lo renderizza a schermo dinamicamente
 * @param track
 */
const renderTrack = (track: Track): void => {
  const container = document.getElementById("container") as HTMLElement | null;

  if (container) {
    const trackTitle = document.createElement("div");

    const artistLinks = track.artists.map(
      (artist) =>
        `<a href="../../artists.html?id=${artist.id}">${artist.name}</a>`
    );

    trackTitle.innerHTML = `
    <h1>${track.name}</h1>
    <h2>${artistLinks}</h2>
    `;
    container.appendChild(trackTitle);
  }
};

/**
 * Callback per gestire l'evento di load della pagina
 */
const handleLoad = async () => {
  const tracks = await getTracks();
  tracks.forEach((track) => {
    renderTrack(track);
  });
};

document.addEventListener("DOMContentLoaded", handleLoad);
