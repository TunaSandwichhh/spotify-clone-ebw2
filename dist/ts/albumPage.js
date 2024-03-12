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
const albumId = urlParams.get("id");
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "5eba36709fmsh46db4e8e33040c1p10a999jsnc724d1df5f73",
        "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
    },
};
const getTracks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://spotify81.p.rapidapi.com/albums?ids=${id}`, options);
        const data = yield response.json();
        return data.albums[0].tracks.items;
    }
    catch (e) {
        console.log(e);
        return [];
    }
});
const renderTrack = (track) => {
    const container = document.getElementById("container");
    if (container) {
        const trackTitle = document.createElement("div");
        const artistLinks = track.artists.map((artist) => `<a href="../../artists.html?id=${artist.id}">${artist.name}</a>`);
        trackTitle.innerHTML = `
    <h1>${track.name}</h1>
    <h2>${artistLinks}</h2>
    `;
        container.appendChild(trackTitle);
    }
};
const handleLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    if (albumId) {
        const tracks = yield getTracks(albumId);
        tracks.forEach((track) => {
            renderTrack(track);
        });
    }
});
document.addEventListener("DOMContentLoaded", handleLoad);
export {};
