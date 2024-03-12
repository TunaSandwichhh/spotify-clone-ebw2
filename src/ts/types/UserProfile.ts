export interface UserProfile {
  uri: string;
  name: string;
  image_url: string;
  followers_count: number;
  public_playlists: any[];
  total_public_playlists_count: number;
  is_verified: boolean;
  report_abuse_disabled: boolean;
  has_spotify_name: boolean;
  has_spotify_image: boolean;
  color: number;
  allow_follows: boolean;
  show_follows: boolean;
}
