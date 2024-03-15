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

const formatMilliseconds = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = minutes.toString();
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

  return `${formattedMinutes}:${formattedSeconds}`;
};

/**
 * Funzione che riceve un oggetto Track come parametro e lo renderizza a schermo dinamicamente
 * @param track
 */
const renderAlbumTrack = (track: Track, album: Album, index: number): void => {
  const bodyRightDiv = document.getElementById(
    "body-right"
  ) as HTMLElement | null;
  const audioElement = document.getElementById(
    "audioElement"
  ) as HTMLAudioElement | null;
  const currentTrackImage = document.getElementById(
    "currentTrackImage"
  ) as HTMLImageElement | null;
  const playerTrackName = document.getElementById(
    "playerTrackName"
  ) as HTMLElement | null;
  const playerArtistName = document.getElementById(
    "playerArtistName"
  ) as HTMLElement | null;

  if (bodyRightDiv) {
    const trackDiv = document.createElement("div");

    trackDiv.classList.add(
      "row",
      "row-single-tracks",
      "d-flex",
      "align-items-center",
      "mb-4"
    );

    const artistLinks = track.artists.map(
      (artist) =>
        `<a href="../../artists.html?id=${artist.id}" class="text-decoration-none text-secondary">${artist.name}</a>`
    );

    trackDiv.innerHTML = `
    <div class="col">${index + 1}</div>
    <div class="col-5 d-flex">
      <div>
        <img id="trackImg-${index + 1}"
          src="${album.images[0].url}"
          class="img-fluid " />
      </div>
      <div class="d-flex flex-column justify-content-center">
        <p class="mb-0">
          <a href="../../album.html?id=${
            album.id
          }" class="text-decoration-none text-white">${track.name}</a>
        </p>
        <p class="my-0">
          ${artistLinks}
        </p>
      </div>
    </div>
    <div class="col-5"><a href="../../album.html?id=${
      album.id
    }" class="text-white text-decoration-none">${album.name}</a></div>
    <div class="col">${formatMilliseconds(track.duration_ms)}</div>
    `;

    bodyRightDiv.appendChild(trackDiv);

    const trackImg = document.getElementById(
      `trackImg-${index + 1}`
    ) as HTMLImageElement;

    trackImg?.addEventListener("click", () => {
      if (
        audioElement &&
        currentTrackImage &&
        playerArtistName &&
        playerTrackName
      ) {
        currentTrackImage.src = album.images[0].url;
        playerTrackName.innerText = track.name;
        playerArtistName.innerText = `${track.artists.map(
          (artist) => artist.name
        )}`;
        audioElement.src = track.preview_url;
        audioElement.play();
      }
    });
  }
};

const renderAlbumDesc = (album: Album) => {
  const albumImg = document.getElementById(
    "img-playlist-hero"
  ) as HTMLAnchorElement | null;

  const albumName = document.getElementById("albumName") as HTMLElement | null;

  const albumDetails = document.getElementById(
    "album-details"
  ) as HTMLElement | null;

  if (albumImg && albumName && albumDetails) {
    albumImg.innerHTML = `
      <img src="${album.images[0].url}" class="img-fluid">
    `;
    albumName.innerText = album.name;

    albumDetails.innerHTML = `
    <span>${album.artists[0].name}</span>
    <span>&middot;</span>
    <span>${album.release_date.split("-").shift()}</span>
    <span>&middot;</span>
    <span>${album.tracks.items.length} brani</span>
    <span>&middot;</span>
    <span>${formatMilliseconds(
      album.tracks.items
        .map((item) => item.duration_ms)
        .reduce((acc, curr) => acc + curr)
    )}</span>
    `;
  }
};

const removeSkeletonClass = () => {
  const skeletonElements = document.querySelectorAll(".skeleton");
  skeletonElements.forEach((element) => {
    element.classList.remove("skeleton");
  });
};

/**
 * Callback per gestire l'evento di load della pagina
 */
const handleLoad = async () => {
  if (albumId) {
    const album = await getAlbum(albumId);

    if (album) renderAlbumDesc(album);

    album?.tracks.items.forEach((track, index) => {
      renderAlbumTrack(track, album, index);
    });

    removeSkeletonClass();
  }
};

const searchBtn = document.getElementById("searchBtn") as HTMLElement | null;

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const searchInput = (document.getElementById("search") as HTMLInputElement)
      .value;
    if (searchInput)
      window.location.href = `../../searchPage.html?q=${searchInput}`;
  });
}

document.addEventListener("DOMContentLoaded", handleLoad);
