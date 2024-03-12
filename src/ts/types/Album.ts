import { Artist } from "./Artist";

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  id: string;
  images: {
    height: number;
    width: number;
    url: string;
  }[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
}

album_type: "album";
artists: available_markets: copyrights: external_ids: external_urls: genres: href: "https://api.spotify.com/v1/albums/3IBcauSj5M2A6lTeffJzdv";
id: "3IBcauSj5M2A6lTeffJzdv";
images: label: "M.O.B. Entertainment";
name: "Kan";
popularity: 73;
release_date: "2021-03-19";
release_date_precision: "day";
total_tracks: 10;
tracks: type: "album";
uri: "spotify:album:3IBcauSj5M2A6lTeffJzdv";
