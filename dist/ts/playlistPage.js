var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlParams = new URLSearchParams(window.location.search);
const playlistId = urlParams.get("id");
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "3332715f74msh602a78a6b6a8068p1c70cbjsnf18409ce7070",
        "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
    },
};
const getPlaylistTracks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const playlistTracks = [];
    try {
        const response = yield fetch(`https://spotify81.p.rapidapi.com/playlist?id=${id}`, options);
        const data = (yield response.json());
        for (let trackData of data.tracks.items) {
            playlistTracks.push(trackData.track);
        }
        return playlistTracks;
    }
    catch (e) {
        console.log(e);
        return [];
    }
});
const getPlaylist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://spotify81.p.rapidapi.com/playlist?id=${id}`, options);
        return (yield response.json());
    }
    catch (e) {
        console.log(e);
        return null;
    }
});
const formatMilliseconds = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${formattedMinutes}:${formattedSeconds}`;
};
const renderPlaylistTrack = (track, index) => {
    const bodyRightDiv = document.getElementById("body-right");
    const audioElement = document.getElementById("audioElement");
    const currentTrackImage = document.getElementById("currentTrackImage");
    const playerTrackName = document.getElementById("playerTrackName");
    const playerArtistName = document.getElementById("playerArtistName");
    if (bodyRightDiv) {
        const trackDiv = document.createElement("div");
        trackDiv.classList.add("row", "row-single-tracks", "d-flex", "align-items-center", "mb-4");
        const artistLinks = track.artists.map((artist) => `<a href="../../artists.html?id=${artist.id}" class="text-decoration-none text-secondary">${artist.name}</a>`);
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
          <a href="../../album.html?id=${track.album.id}" class="text-decoration-none text-white">${track.name}</a>
        </p>
        <p class="my-0">
          ${artistLinks}
        </p>
      </div>
    </div>
    <div class="col-5"><a href="../../album.html?id=${track.album.id}" class="text-white text-decoration-none">${track.album.name}</a></div>
    <div class="col">${formatMilliseconds(track.duration_ms)}</div>
    `;
        bodyRightDiv.appendChild(trackDiv);
        const trackImg = document.getElementById(`trackImg-${index + 1}`);
        trackImg === null || trackImg === void 0 ? void 0 : trackImg.addEventListener("click", () => {
            if (audioElement &&
                currentTrackImage &&
                playerArtistName &&
                playerTrackName) {
                currentTrackImage.src = track.album.images[0].url;
                playerTrackName.innerText = track.name;
                playerArtistName.innerText = `${track.artists.map((artist) => artist.name)}`;
                audioElement.src = track.preview_url;
                audioElement.play();
            }
        });
    }
};
const renderPlaylistDesc = (playlist) => {
    const imageLink = document.getElementById("img-playlist-hero");
    const playlistName = document.getElementById("playlistName");
    const playlistDesc = document.getElementById("playlistDesc");
    const totalTracks = document.getElementById("totalTracks");
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
const handleLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    if (playlistId) {
        const tracks = yield getPlaylistTracks(playlistId);
        const playlist = yield getPlaylist(playlistId);
        if (playlist)
            renderPlaylistDesc(playlist);
        tracks.forEach((track, index) => {
            renderPlaylistTrack(track, index);
        });
        removeSkeletonClass();
    }
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
