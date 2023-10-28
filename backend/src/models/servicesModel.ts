import { model, Schema } from 'mongoose';

const riot = {
  id: 1,
  logo: "assets/images/riotLogo.png",
  color: {
    red: 255,
    green: 66,
    blue: 0,
  },
  actions: {
    getNewWin: {
      description: "check if a player won",
      id: 1,
      need: {
        summonerName: "summonerName",
      }
    },
    getNewLose: {
      description: "check if a player lost",
      id: 2,
      need: {
        summonerName: "summonerName",
      }
    },
    getLevelUp: {
      description: "check if a player leveled up",
      id: 3,
      need: {
        summonerName: "summonerName",
      }
    },
    get10LastGames: {
      description: "get 10 last games",
      id: 4,
      need: {
        summonerName: "summonerName",
      }
    },
    getNewGame: {
      description: "check if there is a new game",
      id: 5,
      need: {
        summonerName: "summonerName",
      }
    },
    getPlayerStartNewGame: {
      description: "check if a player start a new game",
      id: 6,
      need: {
        summonerName: "summonerName",
      }
    }
  },
  reactions: {},
}

const spotify ={
  id: 2,
  logo: "assets/images/spotifyLogo.png",
  color: {
    red: 136,
    green: 238,
    blue: 81,
  },
  actions: {
    postToken: {
      description: "post token",
      id: 1,
    },
    getAudioFeaturesTrack: {
      description: "get audio features track",
      id: 2,
    },
    getNewReleases: {
      description: "get new releases",
      id: 3,
    },
  },
  reactions: {},
}

const Microsoft = {
  id: 3,
  logo: "assets/images/microsoftLogo.png",
  color: {
    red: 255,
    green: 255,
    blue: 255,
  },
  actions: {},
  reactions: {
    sendMail: {
      description: "send mail",
      id: 1,
      need: {
        to: "dest if null send to user mail",
        from: "from if null send from user mail",
        subject: "subject if null send default subject",
        text: "text if null send actionData text",
      }
    },
  },
}

export const allServices = {
  riot: riot,
  spotify: spotify,
  microsoft: Microsoft,
}

export const ServicesSchema = new Schema<typeof allServices>({
  riot: {
    logo: {
      type: String,
      required: true,
      default: "assets/images/riotLogo.png"
    },
    color: {
      red: {
        type: Number,
        required: true,
        default: 255
      },
      green: {
        type: Number,
        required: true,
        default: 66
      },
      blue: {
        type: Number,
        required: true,
        default: 0
      }
    },
    actions: {
      getNewWin: {
        description: {
          type: String,
          required: true,
          default: "check if a player won"
        },
        id: {
          type: Number,
          required: true,
          default: 1
        },
        need: {
          summonerName: {
            type: String,
            required: true
          }
        }
      },
      getNewLose: {
        description: {
          type: String,
          required: true,
          default: "check if a player lost"
        },
        id: {
          type: Number,
          required: true,
          default: 2
        },
        need: {
          summonerName: {
            type: String,
            required: true
          }
          }
      },
      getLevelUp: {
        description: {
          type: String,
          required: true,
          default: "check if a player leveled up"
        },
        id: {
          type: Number,
          required: true,
          default: 3
        },
        need: {
          summonerName: {
            type: String,
            required: true
          }
          }
      },
      get10LastGames: {
        description: {
          type: String,
          required: true,
          default: "get 10 last games"
        },
        id: {
          type: Number,
          required: true,
          default: 4
        },
        need: {
          summonerName: {
            type: String,
            required: true
          }
          }
      },
      getNewGame: {
        description: {
          type: String,
          required: true,
          default: "check if there is a new game"
        },
        id: {
          type: Number,
          required: true,
          default: 5
        },
        need: {
          summonerName: {
            type: String,
            required: true
          }
        }
      },
      getPlayerStartNewGame: {
        description: {
          type: String,
          required: true,
          default: "check if a player start a new game"
        },
        id: {
          type: Number,
          required: true,
          default: 6
        },
        need: {
          summonerName: {
            type: String,
            required: true
          }
        }
      }
    },
    reactions: {}
  },
  spotify: {
    logo: {
      type: String,
      required: true,
      default: "assets/images/spotifyLogo.png"
    },
    color: {
      red: {
        type: Number,
        required: true,
        default: 136
      },
      green: {
        type: Number,
        required: true,
        default: 238
      },
      blue: {
        type: Number,
        required: true,
        default: 81
      },
    },
    actions: {
      postToken: {
        description: {
          type: String,
          required: true,
          default: "post token"
        },
        id: {
          type: Number,
          required: true,
          default: 1
        }
      },
      getAudioFeaturesTrack: {
        description: {
          type: String,
          required: true,
          default: "get audio features track"
        },
        id: {
          type: Number,
          required: true,
          default: 2
        }
      },
      getNewReleases: {
        description: {
          type: String,
          required: true,
          default: "get new releases"
        },
        id: {
          type: Number,
          required: true,
          default: 3
        }
      }
    },
    reactions: {}
  },
  microsoft: {
    logo: {
      type: String,
      required: true,
      default: "assets/images/microsoftLogo.png"
    },
    color: {
      red: {
        type: Number,
        required: true,
        default: 255
      },
      green: {
        type: Number,
        required: true,
        default: 255
      },
      blue: {
        type: Number,
        required: true,
        default: 255
      },
    },
    actions: {},
    reactions: {
      sendMail: {
        description: {
          type: String,
          required: true,
          default: "send mail"
        },
        id: {
          type: Number,
          required: true,
          default: 1
        },
        need: {
          to: {
            type: String,
            required: false,
            default: null
          },
          from: {
            type: String,
            required: false,
            default: null
          },
          subject: {
            type: String,
            required: false,
            default: null
          },
          text: {
            type: String,
            required: false,
            default: null
          }
        }
      }
    }
  }
});

export const ServicesModel = model<typeof allServices>('services', ServicesSchema);
