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
const getAlbum = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://spotify81.p.rapidapi.com/albums?ids=${id}`, options);
        const data = yield response.json();
        return data.albums[0];
    }
    catch (e) {
        console.log(e);
        return null;
    }
});
const renderTrack = (track, albumImgUrl) => {
    const container = document.getElementById("container");
    const audioElement = document.getElementById("audioElement");
    const currentTrackImage = document.getElementById("currentTrackImage");
    if (container) {
        const trackDiv = document.createElement("div");
        const artistLinks = track.artists.map((artist) => `<a href="../../artists.html?id=${artist.id}">${artist.name}</a>`);
        trackDiv.innerHTML = `
    <img src="${albumImgUrl}" />
    <h1>${track.name}</h1>
    <h2>${artistLinks}</h2>
    `;
        trackDiv.addEventListener("click", () => {
            if (audioElement && currentTrackImage) {
                currentTrackImage.src = albumImgUrl;
                audioElement.src = track.preview_url;
                audioElement.play();
            }
        });
        container.appendChild(trackDiv);
    }
};
const handleLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    if (albumId) {
        const album = yield getAlbum(albumId);
        album === null || album === void 0 ? void 0 : album.tracks.items.forEach((track) => {
            renderTrack(track, album.images[0].url);
        });
    }
});
document.addEventListener("DOMContentLoaded", handleLoad);
export {};
