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
const artistId = urlParams.get("id");
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "5eba36709fmsh46db4e8e33040c1p10a999jsnc724d1df5f73",
        "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
    },
};
const getArtistOverview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://spotify81.p.rapidapi.com/artist_overview?id=${id}`, options);
        console.log(response.ok);
        const data = yield response.json();
        console.log(data);
        return data.data.artist;
    }
    catch (e) {
        console.log(e);
        return null;
    }
});
const getTrackDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://spotify81.p.rapidapi.com/tracks?ids=${id}`, options);
        const trackDetails = yield response.json();
        return trackDetails.tracks[0];
    }
    catch (e) {
        console.log(e);
        return null;
    }
});
const renderHeader = (artistOvw) => {
    const headerDiv = document.getElementById("header");
    if (headerDiv) {
        headerDiv.innerHTML = `
    <img src="${artistOvw.visuals.headerImage.sources[0].url}"/>
    <h1>${artistOvw.profile.name}</h1>
    <p>Ascoltatori mensili: ${artistOvw.stats.monthlyListeners}</p>
    `;
    }
};
const renderPopularTracks = (artistOvw) => {
    const popularTracksDiv = document.getElementById("popularTracks");
    const audioElement = document.getElementById("audioElement");
    const currentTrackImage = document.getElementById("currentTrackImage");
    if (popularTracksDiv) {
        artistOvw.discography.topTracks.items.slice(0, 5).forEach((trackItem) => {
            const trackDiv = document.createElement("div");
            trackDiv.innerHTML = `
        <img src="${trackItem.track.album.coverArt.sources[0].url}"/>
        <p>${trackItem.track.name}</p>
      `;
            trackDiv.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
                if (audioElement && currentTrackImage) {
                    currentTrackImage.src = trackItem.track.album.coverArt.sources[0].url;
                    const trackDetails = yield getTrackDetails(trackItem.track.id);
                    if (trackDetails) {
                        audioElement.src = trackDetails.preview_url;
                        audioElement.play();
                    }
                }
            }));
            popularTracksDiv.appendChild(trackDiv);
        });
    }
};
const renderDiscography = (artistOvw) => { };
const renderRelatedArtists = (artistOvw) => { };
const handleLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    if (artistId) {
        console.log(artistId);
        const artistOvw = yield getArtistOverview(artistId);
        if (artistOvw) {
            renderHeader(artistOvw);
            renderPopularTracks(artistOvw);
        }
    }
});
document.addEventListener("DOMContentLoaded", handleLoad);
export {};
