export interface ArtistOverview {
  id: string;
  uri: string;
  following: boolean;
  sharingInfo: {
    shareUrl: string;
    shareId: string;
  };
  profile: {
    name: string;
    verified: boolean;
    pinnedItem: {
      comment: string;
      type: string;
      item: {
        uri: string;
        name: string;
        coverArt: {
          sources: {
            url: string;
            width: number;
            height: number;
          }[];
        };
        type: string;
      };
    };
    biography: {
      text: string;
    };
    externalLinks: {
      items: {
        name: string;
        url: string;
      }[];
    };
    playlists: {
      totalCount: number;
      items: {
        uri: string;
        name: string;
        description: string;
        owner: {
          name: string;
        };
        images: {
          items: {
            sources: {
              url: string;
              width: number;
              height: number;
            }[];
          }[];
        };
      }[];
    };
  };
  visuals: {
    gallery: {
      items: {
        sources: {
          url: string;
          height: number;
          width: number;
        }[];
      }[];
    };
    avatarImage: {
      sources: {
        url: string;
        height: number;
        width: number;
      }[];
      extracedColors: {
        colorRaw: {
          hex: string;
        };
      };
    };
    headerImage: {
      sources: {
        url: string;
        height: number;
        width: number;
      }[];
      extracedColors: {
        colorRaw: {
          hex: string;
        };
      };
    };
  };
  //todo
  discography: {};
  stats: {};
  relatedContent: {};
  goods: {};
}
