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
const searchQuery = urlParams.get("q");
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "3332715f74msh602a78a6b6a8068p1c70cbjsnf18409ce7070",
        "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
    },
};
const getSearchResult = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://spotify81.p.rapidapi.com/search?q=${query}&type=multi&offset=0&limit=10&numberOfTopResults=5`, options);
        const data = (yield response.json());
        return data;
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
const renderTopResult = (result) => {
    const topResultDiv = document.getElementById("topResult");
    if (topResultDiv) {
        topResultDiv.innerHTML = `
        <img src="${result.topResults.items[0].data.visuals.avatarImage.sources[0].url}" class="img-fluid rounded-circle"/>
        <p class="mb-1 mt-1 fs-2 lh-1">${result.topResults.items[0].data.profile.name}</p>
        <p class="text-secondary mb-0">Artista</p>
    `;
    }
};
const renderTrackResults = (result, index) => {
    const resultTracksDiv = document.getElementById("resultTracks");
    console.log("Nel render tracks", resultTracksDiv);
    const artistLinks = result.tracks[index].data.artists.items.map((artist) => {
        const artistId = artist.uri.split(":").pop();
        return `<a href="../../artists.html?id=${artistId}" class="text-decoration-none text-secondary">${artist.profile.name}</a>`;
    });
    if (resultTracksDiv) {
        const trackDiv = document.createElement("div");
        trackDiv.classList.add("single-track-search-page", "d-flex", "justify-content-between");
        trackDiv.innerHTML = `
    <div class="d-flex">
        <a href="../../album.html?id=${result.tracks[index].data.albumOfTrack.id}">
          <img src="${result.tracks[index].data.albumOfTrack.coverArt.sources[0].url}" class="fluid"/>
        </a>
      <div class="single-track-search-page-details ms-2">
        <p class="mb-0"><a href="#" class="text-white text-decoration-none">${result.tracks[index].data.name}</a></p>
        <p class="mt-0">${artistLinks}</p>
      </div>
    </div>
    <div class="single-track-length">
      <p class="mb-0">${formatMilliseconds(result.tracks[index].data.duration.totalMilliseconds)}</p>
    </div>


    `;
        resultTracksDiv.appendChild(trackDiv);
    }
};
const renderPlaylistResult = (result, index) => {
    const featuringDiv = document.getElementById("featuring");
    if (featuringDiv) {
        const playlistDiv = document.createElement("div");
        playlistDiv.classList.add("col-lg-3", "col-md-4", "col-6");
        const playlistId = result.playlists.items[index].data.uri.split(":").pop();
        playlistDiv.innerHTML = `
    <div class="big-playlist-single-container">
      <a class="img-playlist-medium d-block dynamic-content text-decoration-none" href="../../playlist.html?id=${playlistId}">
        <img class="img-fluid" src="${result.playlists.items[index].data.images.items[0].sources[0].url}" />
      </a>
      <p class="mb-0 mt-2">
        <a href="../../playlist.html?id=${playlistId}" class="text-decoration-none text-white">${result.playlists.items[index].data.name}</a>
      </p>
      <p class="mt-0 text-secondary">${result.playlists.items[index].data.owner.name}</p>
    </div> 
    `;
        featuringDiv.appendChild(playlistDiv);
    }
};
const renderArtistResults = (result, index) => {
    const artistResultsDiv = document.getElementById("artists-preview-row");
    if (artistResultsDiv) {
        const artistDiv = document.createElement("div");
        artistDiv.classList.add("col-lg-3", "col-md-4", "col-6");
        const artistId = result.artists.items[index].data.uri.split(":").pop();
        artistDiv.innerHTML = `
      <div class="big-playlist-single-container">
        <a class="img-playlist-medium d-block dynamic-content text-decoration-none" href="../../artists.html?id=${artistId}">
          <img class="img-fluid rounded-circle" src="${result.artists.items[index].data.visuals.avatarImage.sources[0].url}" />
        </a>
        <p class="mb-0 mt-2">
          <a href="../../artists.html?id=${artistId}" class="text-decoration-none text-white">${result.artists.items[index].data.profile.name}</a>
        </p>
        <p class="mt-0 text-secondary">Artista</p>
      </div>
    `;
        artistResultsDiv.appendChild(artistDiv);
    }
};
const removeSkeletonClass = () => {
    const skeletonElements = document.querySelectorAll(".skeleton");
    skeletonElements.forEach((element) => {
        element.classList.remove("skeleton");
    });
};
const handleLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    if (searchQuery) {
        const searchResult = yield getSearchResult(searchQuery);
        if (searchResult) {
            renderTopResult(searchResult);
            searchResult.tracks.forEach((track, index) => {
                if (index < 3)
                    renderTrackResults(searchResult, index);
            });
            searchResult.playlists.items.forEach((playlist, index) => {
                if (index < 4) {
                    renderPlaylistResult(searchResult, index);
                }
            });
            searchResult.artists.items.forEach((artist, index) => {
                if (index < 4) {
                    renderArtistResults(searchResult, index);
                }
            });
            removeSkeletonClass();
        }
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
