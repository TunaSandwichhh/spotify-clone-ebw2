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
  discography: {
    latest: {
      id: string;
      uri: string;
      name: string;
      type: string;
      copyright: {
        items: {
          type: string;
          text: string;
        }[];
      };
      date: {
        year: number;
      };
      coverArt: {
        sources: {
          url: string;
          width: number;
          height: number;
        }[];
      };
      tracks: {
        totalCount: number;
      };
      label: string;
      playability: {
        playable: boolean;
        reason: string;
      };
    };
    popularReleases: {
      totalCount: number;
      items: {
        releases: {
          items: {
            id: string;
            uri: string;
            name: string;
            type: string;
            copyright: {
              items: {
                type: string;
                text: string;
              }[];
            };
            date: {
              year: number;
              month: number;
              day: number;
              precision: string;
            };
            coverArt: {
              sources: {
                url: string;
                width: number;
                height: number;
              }[];
            };
            tracks: {
              totalCount: number;
            };
            label: string;
            playability: {
              playable: boolean;
              reason: string;
            };
            sharingInfo: {
              shareId: string;
              shareUrl: string;
            };
          }[];
        };
      }[];
    };
    singles: {
      totalCount: number;
      items: {
        releases: {
          items: {
            id: string;
            uri: string;
            name: string;
            type: string;
            copyright: {
              items: {
                type: string;
                text: string;
              }[];
            };
            date: {
              year: number;
              month: number;
              day: number;
              precision: string;
            };
            coverArt: {
              sources: {
                url: string;
                width: number;
                height: number;
              }[];
            };
            tracks: {
              totalCount: number;
            };
            label: string;
            playability: {
              playable: boolean;
              reason: string;
            };
            sharingInfo: {
              shareId: string;
              shareUrl: string;
            };
          }[];
        };
      }[];
    };
    albums: {
      totalCount: number;
      items: {
        releases: {
          items: {
            id: string;
            uri: string;
            name: string;
            type: string;
            copyright: {
              items: {
                type: string;
                text: string;
              }[];
            };
            date: {
              year: number;
              month: number;
              day: number;
              precision: string;
            };
            coverArt: {
              sources: {
                url: string;
                width: number;
                height: number;
              }[];
            };
            tracks: {
              totalCount: number;
            };
            label: string;
            playability: {
              playable: boolean;
              reason: string;
            };
            sharingInfo: {
              shareId: string;
              shareUrl: string;
            };
          }[];
        };
      }[];
    };
    compilations: {
      totalCount: number;
      items: {
        releases: {
          items: {
            id: string;
            uri: string;
            name: string;
            type: string;
            copyright: {
              items: {
                type: string;
                text: string;
              }[];
            };
            date: {
              year: number;
              month: number;
              day: number;
              precision: string;
            };
            coverArt: {
              sources: {
                url: string;
                width: number;
                height: number;
              }[];
            };
            tracks: {
              totalCount: number;
            };
            label: string;
            playability: {
              playable: boolean;
              reason: string;
            };
            sharingInfo: {
              shareId: string;
              shareUrl: string;
            };
          }[];
        };
      }[];
    };
    topTracks: {
      items: {
        uid: string;
        track: {
          id: string;
          uri: string;
          name: string;
          playcount: string;
          discNumber: number;
          duration: {
            totalMilliseconds: number;
          };
          playability: {
            playable: boolean;
            reason: string;
          };
          contentRating: {
            label: string;
          };
          artists: {
            items: {
              uri: string;
              profile: {
                name: string;
              };
            }[];
          };
          album: {
            uri: string;
            coverArt: {
              sources: {
                url: string;
              }[];
            };
          };
        };
      }[];
    };
  };
  stats: {
    followers: number;
    monthlyListeners: number;
    worldRank: number;
    topCities: {
      items: {
        numberOfListeners: number;
        city: string;
        country: string;
        region: string;
      }[];
    };
  };
  relatedContent: {
    appearsOn: {
      totalCount: number;
      items: {
        releases: {
          totalCount: number;
          items: {
            uri: string;
            id: string;
            name: string;
            artists: {
              items: {
                uri: string;
                profile: {
                  name: string;
                };
              }[];
            };
            coverArt: {
              sources: {
                url: string;
                width: number;
                height: number;
              }[];
            };
            date: {
              year: number;
            };
            sharingInfo: {
              shareId: string;
              shareUrl: string;
            };
          }[];
        };
      }[];
    };
    featuring: {
      totalCount: number;
      items: {
        uri: string;
        id: string;
        owner: {
          name: string;
        };
        name: string;
        description: string;
        images: {
          totalCount: number;
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
    discoveredOn: {
      totalCount: number;
      items: {
        uri: string;
        id: string;
        owner: {
          name: string;
        };
        name: string;
        description: string;
        images: {
          totalCount: number;
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
    relatedArtists: {
      totalCount: number;
      items: {
        id: string;
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
      }[];
    };
  };
  goods: {
    events: {
      userLocation: {
        name: string;
      };
      concerts: {
        totalCount: number;
        items: {
          uri: string;
          id: string;
          title: string;
          category: string;
          festival: boolean;
          nearUser: boolean;
          venue: {
            name: string;
            location: {
              name: string;
            };
            coordinates: {
              latitude: number;
              longitude: number;
            };
          };
          artists: {
            items: {
              uri: string;
              id: string;
              profile: {
                name: string;
              };
            }[];
          };
          partnerLinks: {
            items: {
              partnerName: string;
              url: string;
            }[];
          };
          date: {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
            second: number;
            isoString: string;
            precision: string;
          };
        }[];
        pagingInfo: {
          limit: number;
        };
      };
    };
    merch: {
      items: {
        uri: string;
        description: string;
        imageUri: string;
        name: string;
        url: string;
      }[];
    };
  };
}
