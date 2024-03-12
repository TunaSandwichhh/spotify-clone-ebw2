/**
 * 1) Eseguire una fetch all'endpoint delle playlist
 * 1.extra) Estrapolare ID da URL
 *
 *
 * 2) convertire risultato della fetch in un array di Track (usando l'apposita interfaccia)
 *
 *
 * 3) renderizzare con una funzione tutti i brani a schermo coi seguenti attributi:
 * -nome brano
 * -nome artista (extra: con link)
 */

import { Playlist } from "./types/Playlist";
import { Track } from "./types/Track";

const url = `https://spotify81.p.rapidapi.com/playlist?id=37i9dQZF1DX4Wsb4d7NKfP`
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "5eba36709fmsh46db4e8e33040c1p10a999jsnc724d1df5f73",
        "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
    },
};

const getPlaylistTracks = async (): Promise<Track[]> => {
    try {
        const response = await fetch(url, options)
        const data = await response.json() as Playlist
        return data.tracks.items
    } catch (e) {
        console.log(e)
        return []
    }
}

const renderPlaylistTrack = (track: Track) => {
    const playlistTracks = document.getElementById('playlistTracks') as HTMLElement | null
    if (playlistTracks) {
        const trackDiv = document.createElement('div')
        const artistLinks = track.artists.map(
            (artist) =>
                `<a href="../html/artists.html?id=${artist.id}">${artist.name}</a>`
        );
        trackDiv.innerHTML = `
 <h1>${track.name}</h1>
 <h2>${artistLinks}</h2>
 `
        playlistTracks.appendChild(trackDiv)
    }
}

const handleLoad = async () => {
    const tracks = await getPlaylistTracks()
    for (let track of tracks) {
        renderPlaylistTrack(track)
    }
}

document.addEventListener('DOMContentLoaded', handleLoad)