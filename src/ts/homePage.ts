import { Playlist } from "./types/Playlist";
import { UserProfile } from "./types/UserProfile";

const url =
  "https://spotify81.p.rapidapi.com/user_profile?id=a96ylqq5z8yrb857orsesj2pp&playlistLimit=9&artistLimit=10";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3332715f74msh602a78a6b6a8068p1c70cbjsnf18409ce7070",
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

const getPlaylist = async (): Promise<Playlist[]> => {
  try {
    const playlists: Playlist[] = [];

    for (let id of playlistIds) {
      const response = await fetch(
        `https://spotify81.p.rapidapi.com/playlist?id=${id}`,
        options
      );
      const data = (await response.json()) as Playlist;
      playlists.push(data);
    }

    return playlists;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const removeSkeletonClass = () => {
  const skeletonElements = document.querySelectorAll(".skeleton");
  skeletonElements.forEach((element) => {
    element.classList.remove("skeleton");
  });
};

const renderPlaylistTitle = (playlist: Playlist) => {
  const playBtn = document.getElementById(
    "playBtn"
  ) as HTMLButtonElement | null;

  playBtn?.addEventListener("click", () => {
    window.location.href = `../../playlist.html?id=${playlist.id}`;
  });

  const playlistImg = document.getElementById(
    "img-playlist-hero"
  ) as HTMLAnchorElement | null;

  const playlistName = document.getElementById(
    "playlistName"
  ) as HTMLElement | null;

  const playlistDesc = document.getElementById(
    "playlistDesc"
  ) as HTMLElement | null;

  if (playlistImg && playlistName && playlistDesc) {
    playlistImg.href = `../../playlist.html?id=${playlist.id}`;
    playlistImg.innerHTML = `
        <img src="${playlist.images[0].url}" class="img-fluid"/>
      `;

    playlistName.innerText = playlist.name;

    playlistDesc.innerHTML = playlist.description;
  }
};

const renderPlaylist = (playlist: Playlist, divId: string) => {
  const playlistDiv = document.getElementById(divId) as HTMLElement | null;

  if (playlistDiv) {
    const playlistCard = document.createElement("div");

    playlistCard.classList.add("col-lg-3", "col-md-4", "col-6");

    playlistCard.innerHTML = `
      <div class="big-playlist-single-container">
        <a
          href="../../playlist.html?id=${playlist.id}"
          class="img-playlist-medium d-block dynamic-content text-decoration-none"
          ><img src="${playlist.images[0].url}" class="img-fluid"/>
        </a>

        <p class="mb-0">${playlist.name}</p>
      </div>

    `;
    playlistDiv.appendChild(playlistCard);
  }
};

const handleLoad = async () => {
  await getPlaylistIds();
  const playlists = await getPlaylist();

  renderPlaylistTitle(playlists[0]);

  playlists.forEach((playlist, index) => {
    if (index < 3) {
      renderPlaylist(playlist, "playlistDiv");
    } else if (index < 6) {
      renderPlaylist(playlist, "playlist2");
    } else {
      renderPlaylist(playlist, "playlist3");
    }
  });

  removeSkeletonClass();
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
