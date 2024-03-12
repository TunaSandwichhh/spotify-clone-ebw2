import { Artist } from "./Artist";
import { Track } from "./Track";

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
  release_date_precision: string;
  total_tracks: number;
  tracks: {
    href: string;
    items: Track[];
  };
  type: string;
  uri: string;
}
