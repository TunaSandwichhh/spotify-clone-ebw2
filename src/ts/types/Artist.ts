export interface Artist {
  external_urls: {
    url: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

// {
//     "artists": [
//       {
//         "external_urls": {
//           "spotify": "https://open.spotify.com/artist/51DevdOxIJin6DB1FXJpD1"
//         },
//         "followers": {
//           "href": null,
//           "total": 4349761
//         },
//         "genres": [
//           "turkish hip hop",
//           "turkish trap"
//         ],
//         "href": "https://api.spotify.com/v1/artists/51DevdOxIJin6DB1FXJpD1",
//         "id": "51DevdOxIJin6DB1FXJpD1",
//         "images": [
//           {
//             "url": "https://i.scdn.co/image/ab6761610000e5ebb048567c21062cef0bcf3621",
//             "height": 640,
//             "width": 640
//           },
//           {
//             "url": "https://i.scdn.co/image/ab67616100005174b048567c21062cef0bcf3621",
//             "height": 320,
//             "width": 320
//           },
//           {
//             "url": "https://i.scdn.co/image/ab6761610000f178b048567c21062cef0bcf3621",
//             "height": 160,
//             "width": 160
//           }
//         ],
//         "name": "UZI",
//         "popularity": 73,
//         "type": "artist",
//         "uri": "spotify:artist:51DevdOxIJin6DB1FXJpD1"
//       }
//     ]
//   }
