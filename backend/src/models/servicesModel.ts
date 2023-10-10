import { model, Schema } from 'mongoose';

interface riot {
  logo: "assets/images/riotLogo.png";
  color: {
    red: 255;
    green: 66;
    blue: 0;
  };
  actions: {
    getSummonerByName: "get player info by name";
    getSummonerByPuuid: "get player info by puuid";
    getSummonerBySummonerId: "get player info by summoner id";
    getMatchListByPuuid: "get match list by puuid";
    getMatchByMatchId: "get match by match id";
  };
  reactions: {};
}

interface spotify {
  logo: "assets/images/spotifyLogo.png";
  color: {
    red: 136;
    green: 238;
    blue: 81;
  };
  actions: {
    postToken: "post token";
    getAudioFeaturesTrack: "get audio features track";
    getNewReleases: "get new releases";
  };
  reactions: {};
}

export interface allServices {
  riot: riot;
  spotify: spotify;
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
        default: "get player info by name"
      },
      getSummonerByPuuid: {
        type: String,
        required: true,
        default: "get player info by puuid"
      },
      getSummonerBySummonerId: {
        type: String,
        required: true,
        default: "get player info by summoner id"
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
});

export const ServicesModel = model<allServices>('services', ServicesSchema);

