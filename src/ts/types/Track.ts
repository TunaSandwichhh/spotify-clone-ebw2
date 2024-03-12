import { Album } from "./Album";
import { Artist } from "./Artist";

/**
 * Interfaccia per definire il tipo Track, rappresentante le tracce di un album
 */
export interface Track {
  artists: Artist[];
  available_markets?: [];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls?: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number?: number;
  type: string;
  uri: string;
  episode?: boolean;
  track?: boolean;
  popularity?: number;
  album: Album;
  external_ids?: {
    isrc: string;
  };
}
