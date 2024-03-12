var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = `https://spotify81.p.rapidapi.com/playlist?id=37i9dQZF1DX4Wsb4d7NKfP`;
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "5eba36709fmsh46db4e8e33040c1p10a999jsnc724d1df5f73",
        "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
    },
};
const getPlaylistTracks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url, options);
        const data = yield response.json();
        return data.tracks.items;
    }
    catch (e) {
        console.log(e);
        return [];
    }
});
const renderPlaylistTrack = (track) => {
    const playlistTracks = document.getElementById('playlistTracks');
    if (playlistTracks) {
        const trackDiv = document.createElement('div');
        const artistLinks = track.artists.map((artist) => `<a href="../html/artists.html?id=${artist.id}">${artist.name}</a>`);
        trackDiv.innerHTML = `
 <h1>${track.name}</h1>
 <h2>${artistLinks}</h2>
 `;
        playlistTracks.appendChild(trackDiv);
    }
};
const handleLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    const tracks = yield getPlaylistTracks();
    for (let track of tracks) {
        renderPlaylistTrack(track);
    }
});
document.addEventListener('DOMContentLoaded', handleLoad);
export {};
