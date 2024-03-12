import { Track } from "./Track";

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    height: number;
    width: number;
    url: string;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    items: {
      added_at: string;
      added_by: any;
      is_local: boolean;
      primary_color: any;
      track: Track;
      video_thumbnail: {
        url: string;
      };
    }[];
    limit: number;
    next: any;
    offset: number;
    previous: any;
    total: number;
  };
  type: string;
  uri: string;
}
