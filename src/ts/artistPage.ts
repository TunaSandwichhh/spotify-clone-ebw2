import { ArtistOverview } from "./types/ArtistOverview";

const urlParams = new URLSearchParams(window.location.search);
const artistId = urlParams.get("id");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5eba36709fmsh46db4e8e33040c1p10a999jsnc724d1df5f73",
    "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
  },
};

const getArtistOverview = async (
  id: string
): Promise<ArtistOverview | null> => {
  try {
    const response = await fetch(
      `https://spotify81.p.rapidapi.com/artist_overview?id=${id}`,
      options
    );
    console.log(response.ok);

    const data = await response.json();
    console.log(data);

    return data.data.artist as ArtistOverview;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const renderHeader = (artistOvw: ArtistOverview) => {
  const headerDiv = document.getElementById("header") as HTMLElement | null;
  if (headerDiv) {
    headerDiv.innerHTML = `
    <img src="${artistOvw.visuals.headerImage.sources[0].url}"/>
    <h1>${artistOvw.profile.name}</h1>
    <p>Ascoltatori mensili: ${artistOvw.stats.monthlyListeners}</p>
    `;
  }
};

const renderArtistTracks = (artistOvw: ArtistOverview) => {};

const handleLoad = async () => {
  if (artistId) {
    console.log(artistId);
    const artistOvw = await getArtistOverview(artistId);
    if (artistOvw) {
      renderHeader(artistOvw);
    }
  }
};

document.addEventListener("DOMContentLoaded", handleLoad);
