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
        "X-RapidAPI-Key": "5eba36709fmsh46db4e8e33040c1p10a999jsnc724d1df5f73",
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
const renderPlaylistTrack = (track) => {
    const playlistTracks = document.getElementById("playlistTracks");
    const audioElement = document.getElementById("audioElement");
    const currentTrackImage = document.getElementById("currentTrackImage");
    if (playlistTracks) {
        console.log("Album: ", track.album);
        const trackDiv = document.createElement("div");
        const artistLinks = track.artists.map((artist) => `<a href="../../artists.html?id=${artist.id}">${artist.name}</a>`);
        trackDiv.innerHTML = `
 <img src="${track.album.images[0].url}"/>  
 <h1>${track.name}</h1>
 <h2>${artistLinks}</h2>
 <a href="../../album.html?id=${track.album.id}">
  <p>${track.album.name}</p>
 </a>
 <p>${track.duration_ms}</p>
 `;
        trackDiv.addEventListener("click", () => {
            if (audioElement && currentTrackImage) {
                currentTrackImage.src = track.album.images[0].url;
                audioElement.src = track.preview_url;
                audioElement.play();
            }
        });
        playlistTracks.appendChild(trackDiv);
    }
};
const renderPlaylistDesc = (playlist) => {
    var _a;
    const playlistDescDiv = document.getElementById("playlistDesc");
    if (playlistDescDiv) {
        playlistDescDiv.innerHTML = `
      <img src="${playlist.images[0].url}">
      <h1>${playlist.name}</h1>
      <p>Realizzata per ${(_a = playlist.owner) === null || _a === void 0 ? void 0 : _a.display_name}</p>
      <p>${playlist.tracks.items.length} brani</p>
    `;
    }
};
const handleLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    if (playlistId) {
        const tracks = yield getPlaylistTracks(playlistId);
        const playlist = yield getPlaylist(playlistId);
        if (playlist)
            renderPlaylistDesc(playlist);
        for (let track of tracks) {
            renderPlaylistTrack(track);
        }
    }
});
document.addEventListener("DOMContentLoaded", handleLoad);
export {};
