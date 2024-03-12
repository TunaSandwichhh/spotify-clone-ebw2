var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "https://spotify81.p.rapidapi.com/user_profile?id=nocopyrightsounds&playlistLimit=15&artistLimit=10";
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "5eba36709fmsh46db4e8e33040c1p10a999jsnc724d1df5f73",
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
const renderPlaylist = (playlist, divId) => {
    const playlistDiv = document.getElementById(divId);
    if (playlistDiv) {
        const playlistCard = document.createElement("div");
        playlistCard.innerHTML = `
        <a href="../../playlist.html?id=${playlist.id}">
            <img src="${playlist.images[0].url}"/>
        </a>
        <h1>${playlist.name}</h1>
    `;
        playlistDiv.appendChild(playlistCard);
    }
};
const handleLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    yield getPlaylistIds();
    const playlists = yield getPlaylist();
    playlists.forEach((playlist, index) => {
        if (index < 5) {
            renderPlaylist(playlist, "playlistDiv");
        }
        else if (index < 10) {
            renderPlaylist(playlist, "playlist2");
        }
        else {
            renderPlaylist(playlist, "playlist3");
        }
    });
});
document.addEventListener("DOMContentLoaded", handleLoad);
export {};
