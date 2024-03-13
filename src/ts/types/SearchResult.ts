export interface SearchResult {
  artists: {
    items: {
      data: {
        uri: string;
        profile: {
          name: string;
        };
        visuals: {
          avatarImage: {
            sources: {
              url: string;
              width: number;
              height: number;
            }[];
          };
        };
      };
    }[];
  };
  playlists: {
    items: {
      data: {
        uri: string;
        name: string;
        description: string;
        images: {
          items: {
            sources: {
              url: string;
              width: number;
              height: number;
            }[];
          }[];
        };
        owner: {
          name: string;
        };
      };
    }[];
  };
  topResults: {
    items: {
      data: {
        uri: string;
        profile: {
          name: string;
        };
        visuals: {
          avatarImage: {
            sources: {
              url: string;
              width: number;
              height: number;
            }[];
          };
        };
      };
    }[];
  };
  tracks: {
    data: {
      uri: string;
      id: string;
      name: string;
      albumOfTrack: {
        uri: string;
        name: string;
        coverArt: {
          sources: {
            url: string;
            width: number;
            height: number;
          }[];
        };
        id: string;
      };
      artists: {
        items: {
          uri: string;
          profile: {
            name: string;
          };
        }[];
      };
      duration: {
        totalMilliseconds: number;
      };
    };
  }[];
}
