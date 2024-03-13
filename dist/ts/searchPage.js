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
        "X-RapidAPI-Key": "1c97dd9171mshce60f6ca494e49ep1675cbjsn61e55e9dd7f6",
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
const renderTopResult = (result) => {
    const topResultDiv = document.getElementById("topResult");
    if (topResultDiv) {
        topResultDiv.innerHTML = `
        <img src="${result.topResults.items[0].data.visuals.avatarImage.sources[0].url}"/>
        <h2>${result.topResults.items[0].data.profile.name}</h2>
    `;
    }
};
const renderTrackResults = (result, index) => {
    const trackResults = document.getElementById("topResult");
    const artistLinks = result.tracks[index].data.artists.items.map((artist) => {
        const artistId = artist.uri.split(":").pop();
        return `<a href="../../artists.html?id=${artistId}">${artist.profile.name}</a>`;
    });
    if (trackResults) {
        const trackDiv = document.createElement("div");
        trackDiv.innerHTML = `
        <a href="../../album.html?id=${result.tracks[index].data.albumOfTrack.id}">
        <img src="${result.tracks[index].data.albumOfTrack.coverArt.sources[0].url}"/>
        <p>${artistLinks}</p>
        <p>${result.tracks[index].data.name}</p>
        <p>${result.tracks[index].data.duration.totalMilliseconds}</p>
        </a>

    `;
        trackResults.appendChild(trackDiv);
    }
};
const renderPlaylistResult = (result, index) => {
    const playlistResultsDiv = document.getElementById("playlistResults");
    if (playlistResultsDiv) {
        const playlistDiv = document.createElement("div");
        const playlistId = result.playlists.items[index].data.uri.split(":").pop();
        playlistDiv.innerHTML = `
    <a href="../../playlist.html?id=${playlistId}">
        <img src="${result.playlists.items[index].data.images.items[0].sources[0].url}"/>
        <h4>${result.playlists.items[index].data.name}</h4>
        <p>di ${result.playlists.items[index].data.owner.name}</p>
    </a>    
    `;
        playlistResultsDiv.appendChild(playlistDiv);
    }
};
const renderArtistResults = (result, index) => {
    const artistResultsDiv = document.getElementById("artistResults");
    if (artistResultsDiv) {
        const artistDiv = document.createElement("div");
        const artistId = result.artists.items[index].data.uri.split(":").pop();
        artistDiv.innerHTML = `
        <a href="../../artists.html?id=${artistId}">
            <img src="${result.artists.items[index].data.visuals.avatarImage.sources[0].url}"/>
            <h4>${result.artists.items[index].data.profile.name}</h4>
            <p>Artista</p>
        </a>
    `;
        artistResultsDiv.appendChild(artistDiv);
    }
};
const handleLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    if (searchQuery) {
        const searchResult = yield getSearchResult(searchQuery);
        if (searchResult) {
            renderTopResult(searchResult);
            searchResult.tracks.forEach((track, index) => {
                if (index < 5)
                    renderTrackResults(searchResult, index);
            });
            searchResult.playlists.items.forEach((playlist, index) => {
                if (index < 3) {
                    renderPlaylistResult(searchResult, index);
                }
            });
            searchResult.artists.items.forEach((artist, index) => {
                if (index < 5) {
                    renderArtistResults(searchResult, index);
                }
            });
        }
    }
});
document.addEventListener("DOMContentLoaded", handleLoad);
export {};
