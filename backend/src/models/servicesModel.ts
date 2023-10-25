import { model, Schema } from 'mongoose';

interface riot {
  id: 1;
  logo: "assets/images/riotLogo.png";
  color: {
    red: 255;
    green: 66;
    blue: 0;
  };
  actions: {
    getNewWin: {
      description: "check if a player won";
      id: 1;
    };
    getNewLose: {
      description: "check if a player lost";
      id: 2;
    };
    getLevelUp: {
      description: "check if a player leveled up";
      id: 3;
    };
    get10LastGames: {
      description: "get 10 last games";
      id: 4;
    };
    getNewGame: {
      description: "check if there is a new game"
      id: 5;
    }
  };
  reactions: {};
}

interface spotify {
  id: 2;
  logo: "assets/images/spotifyLogo.png";
  color: {
    red: 136;
    green: 238;
    blue: 81;
  };
  actions: {
    postToken: {
      description: "post token";
      id: 1;
    };
    getAudioFeaturesTrack: {
      description: "get audio features track";
      id: 2;
    };
    getNewReleases: {
      description: "get new releases";
      id: 3;
    };
  };
  reactions: {};
}

interface Mail {
  id: 3;
  logo: "assets/images/mailLogo.png";
  color: {
    red: 255;
    green: 255;
    blue: 255;
  };
  actions: {};
  reactions: {
    sendMail: {
      description: "send microsoft";
      id: 1;
    };
  };
}

export interface allServices {
  riot: riot;
  spotify: spotify;
  mail: Mail;
}

export const ServicesSchema = new Schema<allServices>({
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
      getSummonerByName: {
        type: String,
        required: true,
        default: "get summoner by name"
      },
      getSummonerByPuuid: {
        type: String,
        required: true,
        default: "get player info by puuid"
      },
      getSummonerBySummonerId: {
        type: String,
        required: true,
        default: "get summoner by summoner id"
      },
      getMatchListByPuuid: {
        type: String,
        required: true,
        default: "get match list by puuid"
      },
      getMatchByMatchId: {
        type: String,
        required: true,
        default: "get match by match id"
      },
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
        type: String,
        required: true,
        default: "post token"
      },
      getAudioFeaturesTrack: {
        type: String,
        required: true,
        default: "get audio features track"
      },
      getNewReleases: {
        type: String,
        required: true,
        default: "get new releases"
      },
    },
    reactions: {}
  },
  mail: {
    logo: {
      type: String,
      required: true,
      default: "assets/images/mailLogo.png"
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
        type: String,
        required: true,
        default: "send microsoft"
      },
    }
  }
});

export const ServicesModel = model<allServices>('services', ServicesSchema);
