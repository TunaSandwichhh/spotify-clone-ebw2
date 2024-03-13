import { ArtistOverview } from "./types/ArtistOverview";
import { Track } from "./types/Track";

const urlParams = new URLSearchParams(window.location.search);
const artistId = urlParams.get("id");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "1c97dd9171mshce60f6ca494e49ep1675cbjsn61e55e9dd7f6",
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

const getTrackDetails = async (id: string): Promise<Track | null> => {
  try {
    const response = await fetch(
      `https://spotify81.p.rapidapi.com/tracks?ids=${id}`,
      options
    );

    const trackDetails = await response.json();

    return trackDetails.tracks[0] as Track;
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

const renderPopularTracks = (artistOvw: ArtistOverview) => {
  const popularTracksDiv = document.getElementById(
    "popularTracks"
  ) as HTMLElement | null;
  const audioElement = document.getElementById(
    "audioElement"
  ) as HTMLAudioElement | null;
  const currentTrackImage = document.getElementById(
    "currentTrackImage"
  ) as HTMLImageElement | null;

  if (popularTracksDiv) {
    artistOvw.discography.topTracks.items.slice(0, 5).forEach((trackItem) => {
      const trackDiv = document.createElement("div");

      trackDiv.innerHTML = `
        <img src="${trackItem.track.album.coverArt.sources[0].url}"/>
        <p>${trackItem.track.name}</p>
      `;

      trackDiv.addEventListener("click", async () => {
        if (audioElement && currentTrackImage) {
          currentTrackImage.src = trackItem.track.album.coverArt.sources[0].url;

          const trackDetails = await getTrackDetails(trackItem.track.id);
          if (trackDetails) {
            audioElement.src = trackDetails.preview_url;
            audioElement.play();
          }
        }
      });

      popularTracksDiv.appendChild(trackDiv);
    });
  }
};

const renderDiscography = (artistOvw: ArtistOverview, index: number) => {
  const discographyDiv = document.getElementById(
    "discography"
  ) as HTMLElement | null;

  if (discographyDiv) {
    const albumDiv = document.createElement("div");
    albumDiv.innerHTML = `

      <a href="../../album.html?id=${artistOvw.discography.albums.items[index].releases.items[0].id}">
      <img src="${artistOvw.discography.albums.items[index].releases.items[0].coverArt.sources[0].url}"/>
      <p>${artistOvw.discography.albums.items[index].releases.items[0].name}</p>
      </a>
    `;

    discographyDiv.appendChild(albumDiv);
  }
};

const renderRelatedArtists = (artistOvw: ArtistOverview, index: number) => {
  const relatedArtistsDiv = document.getElementById(
    "relatedArtists"
  ) as HTMLElement | null;

  if (relatedArtistsDiv) {
    const artistDiv = document.createElement("div");

    artistDiv.innerHTML = `

    <a href="../../artists.html?id=${artistOvw.relatedContent.relatedArtists.items[index].id}">
      <img src="${artistOvw.relatedContent.relatedArtists.items[index].visuals.avatarImage.sources[0].url}"/>
      <p>${artistOvw.relatedContent.relatedArtists.items[index].profile.name}</p>
    </a>
    `;

    relatedArtistsDiv.appendChild(artistDiv);
  }
};

const handleLoad = async () => {
  if (artistId) {
    console.log(artistId);
    const artistOvw = await getArtistOverview(artistId);
    if (artistOvw) {
      renderHeader(artistOvw);
      renderPopularTracks(artistOvw);

      const artistAlbums = artistOvw.discography.albums.items;

      artistAlbums.forEach((album, index) => {
        if (index < 5) {
          renderDiscography(artistOvw, index);
        }
      });

      const relatedArtists = artistOvw.relatedContent.relatedArtists.items;

      relatedArtists.forEach((artist, index) => {
        if (index < 5) {
          renderRelatedArtists(artistOvw, index);
        }
      });
    }
  }
};

document.addEventListener("DOMContentLoaded", handleLoad);
