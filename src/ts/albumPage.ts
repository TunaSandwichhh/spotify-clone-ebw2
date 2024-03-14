import { Album } from "./types/Album";
import { Track } from "./types/Track";

const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get("id");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3332715f74msh602a78a6b6a8068p1c70cbjsnf18409ce7070",
    "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
  },
};

const getAlbum = async (id: string): Promise<Album | null> => {
  try {
    const response = await fetch(
      `https://spotify81.p.rapidapi.com/albums?ids=${id}`,
      options
    );
    const data = await response.json();

    return data.albums[0] as Album;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * Funzione che riceve un oggetto Track come parametro e lo renderizza a schermo dinamicamente
 * @param track
 */
const renderTrack = (track: Track, albumImgUrl: string): void => {
  const container = document.getElementById("container") as HTMLElement | null;
  const audioElement = document.getElementById(
    "audioElement"
  ) as HTMLAudioElement | null;
  const currentTrackImage = document.getElementById(
    "currentTrackImage"
  ) as HTMLImageElement | null;

  if (container) {
    const trackDiv = document.createElement("div");

    const artistLinks = track.artists.map(
      (artist) =>
        `<a href="../../artists.html?id=${artist.id}">${artist.name}</a>`
    );

    trackDiv.innerHTML = `
    <img src="${albumImgUrl}" />
    <h1>${track.name}</h1>
    <h2>${artistLinks}</h2>
    `;

    trackDiv.addEventListener("click", () => {
      if (audioElement && currentTrackImage) {
        currentTrackImage.src = albumImgUrl;
        audioElement.src = track.preview_url;
        audioElement.play();
      }
    });

    container.appendChild(trackDiv);
  }
};

/**
 * Callback per gestire l'evento di load della pagina
 */
const handleLoad = async () => {
  if (albumId) {
    const album = await getAlbum(albumId);
    album?.tracks.items.forEach((track) => {
      renderTrack(track, album.images[0].url);
    });
  }
};

document.addEventListener("DOMContentLoaded", handleLoad);
