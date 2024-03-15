var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "https://spotify81.p.rapidapi.com/user_profile?id=a96ylqq5z8yrb857orsesj2pp&playlistLimit=9&artistLimit=10";
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "3332715f74msh602a78a6b6a8068p1c70cbjsnf18409ce7070",
        "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
    },
};
const playlistIds = [];
const getPlaylistIds = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url, options);
        const data = (yield response.json());
        for (let playlist of data.public_playlists) {
            let uri = playlist.uri;
            const uriKeys = uri.split(":");
            playlistIds.push(uriKeys[uriKeys.length - 1]);
        }
    }
    catch (e) {
        console.log(e);
    }
});
const getPlaylist = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlists = [];
        for (let id of playlistIds) {
            const response = yield fetch(`https://spotify81.p.rapidapi.com/playlist?id=${id}`, options);
            const data = (yield response.json());
            playlists.push(data);
        }
        return playlists;
    }
    catch (e) {
        console.log(e);
        return [];
    }
});
const removeSkeletonClass = () => {
    const skeletonElements = document.querySelectorAll(".skeleton");
    skeletonElements.forEach((element) => {
        element.classList.remove("skeleton");
    });
};
const renderPlaylistTitle = (playlist) => {
    const playBtn = document.getElementById("playBtn");
    playBtn === null || playBtn === void 0 ? void 0 : playBtn.addEventListener("click", () => {
        window.location.href = `../../playlist.html?id=${playlist.id}`;
    });
    const playlistImg = document.getElementById("img-playlist-hero");
    const playlistName = document.getElementById("playlistName");
    const playlistDesc = document.getElementById("playlistDesc");
    if (playlistImg && playlistName && playlistDesc) {
        playlistImg.href = `../../playlist.html?id=${playlist.id}`;
        playlistImg.innerHTML = `
        <img src="${playlist.images[0].url}" class="img-fluid"/>
      `;
        playlistName.innerText = playlist.name;
        playlistDesc.innerHTML = playlist.description;
    }
};
const renderPlaylist = (playlist, divId) => {
    const playlistDiv = document.getElementById(divId);
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
const handleLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    yield getPlaylistIds();
    const playlists = yield getPlaylist();
    renderPlaylistTitle(playlists[0]);
    playlists.forEach((playlist, index) => {
        if (index < 3) {
            renderPlaylist(playlist, "playlistDiv");
        }
        else if (index < 6) {
            renderPlaylist(playlist, "playlist2");
        }
        else {
            renderPlaylist(playlist, "playlist3");
        }
    });
    removeSkeletonClass();
});
const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        const searchInput = document.getElementById("search")
            .value;
        if (searchInput)
            window.location.href = `../../searchPage.html?q=${searchInput}`;
    });
}
document.addEventListener("DOMContentLoaded", handleLoad);
export {};
