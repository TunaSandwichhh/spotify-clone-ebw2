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

// uri:"spotify:user:nocopyrightsounds"
// name:"NCS"
// image_url:"https://i.scdn.co/image/ab6775700000ee857b70ef84af66d93faf460fb1"
// followers_count:560272
// public_playlists:
// total_public_playlists_count:44
// is_verified:true
// report_abuse_disabled:true
// has_spotify_name:true
// has_spotify_image:true
// color:16085920
// allow_follows:true
// show_follows:true
