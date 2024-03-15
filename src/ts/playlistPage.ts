import { Playlist } from "./types/Playlist";
import { Track } from "./types/Track";

const urlParams = new URLSearchParams(window.location.search);
const playlistId = urlParams.get("id");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3332715f74msh602a78a6b6a8068p1c70cbjsnf18409ce7070",
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

const getPlaylist = async (id: string): Promise<Playlist | null> => {
  try {
    const response = await fetch(
      `https://spotify81.p.rapidapi.com/playlist?id=${id}`,
      options
    );
    return (await response.json()) as Playlist;
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

const renderPlaylistTrack = (track: Track, index: number) => {
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
          src="${track.album.images[0].url}"
          class="img-fluid " />
      </div>
      <div class="d-flex flex-column justify-content-center">
        <p class="mb-0">
          <a href="../../album.html?id=${
            track.album.id
          }" class="text-decoration-none text-white">${track.name}</a>
        </p>
        <p class="my-0">
          ${artistLinks}
        </p>
      </div>
    </div>
    <div class="col-5"><a href="../../album.html?id=${
      track.album.id
    }" class="text-white text-decoration-none">${track.album.name}</a></div>
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
        currentTrackImage.src = track.album.images[0].url;
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

const renderPlaylistDesc = (playlist: Playlist) => {
  const imageLink = document.getElementById(
    "img-playlist-hero"
  ) as HTMLAnchorElement | null;

  const playlistName = document.getElementById(
    "playlistName"
  ) as HTMLElement | null;

  const playlistDesc = document.getElementById(
    "playlistDesc"
  ) as HTMLElement | null;

  const totalTracks = document.getElementById(
    "totalTracks"
  ) as HTMLElement | null;

  if (imageLink && playlistName && playlistDesc && totalTracks) {
    imageLink.innerHTML = `
      <img src="${playlist.images[0].url}" class="img-fluid"/>
    `;
    playlistName.innerText = playlist.name;
    playlistDesc.innerHTML = playlist.description;
    totalTracks.innerText = `${playlist.tracks.items.length} brani`;
  }
};

const removeSkeletonClass = () => {
  const skeletonElements = document.querySelectorAll(".skeleton");
  skeletonElements.forEach((element) => {
    element.classList.remove("skeleton");
  });
};

const handleLoad = async () => {
  if (playlistId) {
    const tracks = await getPlaylistTracks(playlistId);
    const playlist = await getPlaylist(playlistId);

    if (playlist) renderPlaylistDesc(playlist);

    tracks.forEach((track, index) => {
      renderPlaylistTrack(track, index);
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
