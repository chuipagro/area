import { model, Schema } from 'mongoose';

const riot = {
  id: 1,
  name: "riot",
  logo: "assets/images/riotLogo.png",
  color: {
    red: 255,
    green: 66,
    blue: 0,
  },
  actions: [
    {
      name: "getNewWin",
      description: "check if a player won",
      id: 1,
      need: {
        summonerName: "summonerName",
      }
    },
    {
      name: "getNewLose",
      description: "check if a player lost",
      id: 2,
      need: {
        summonerName: "summonerName",
      }
    },
    {
      name: "checkPlayerLevel",
      description: "check player level",
      id: 3,
      need: {
        summonerName: "summonerName",
      }
    },
    {
      name: "getBasicMatchsInfo",
      description: "get basic matchs info",
      id: 4,
      need: {
        summonerName: "summonerName",
      }
    },
    {
      name: "getNewMatch",
      description: "check if a player played a new match",
      id: 5,
      need: {
        summonerName: "summonerName",
      }
    },
    {
      name: "getActiveGameBySummonerName",
      description: "get active game by summoner name",
        id: 6,
        need: {
          summonerName: "summonerName",
        }
    },
    {
      name: "tftCheckPlayerLevel",
      description: "check player level",
      id: 7,
      need: {
        summonerName: "summonerName",
      }
    },
    {
      name: "tftCheckSummonerNewGame",
      description: "check if a player started a new game",
      id: 8,
      need: {
        summonerName: "summonerName",
      }
    },
    {
      name: "tftCheckSummonerNewWin",
      description: "check if a player won",
      id: 9,
      need: {
        summonerName: "summonerName",
      }
    },
    {
      name: "tftCheckSummonerNewLose",
      description: "check if a player lost",
      id: 10,
      need: {
        summonerName: "summonerName",
      }
    }
  ],
  reactions: [],
}

const spotify ={
  id: 2,
  name: "spotify",
  logo: "assets/images/spotifyLogo.png",
  color: {
    red: 136,
    green: 238,
    blue: 81,
  },
  actions: [
    {
      name: "createPlaylist",
      description: "create playlist",
      id: 1,
      need: {
        playlistName: "playlistName",
        playlistDescription: "playlistDescription",
        playlistPublic: "playlistPublic",
        playlistCollaborative: "playlistCollaborative",
      }
    },
    {
      name: "addTrackToPlaylist",
      description: "add track to playlist",
      id: 2,
      need: {
        playlistId: "playlistId",
        playlistTracks: "playlistTracks",
        playlistTracksPosition: "playlistTracksPosition",
      }
    },
    {
      name: "addTrackUriToPlaylist",
      description: "add track uri to playlist",
      id: 3,
      need: {
        playlistId: "playlistId",
        playlistTracksUris: "playlistTracksUris",
        playlistTracksUrisPosition: "playlistTracksUrisPosition",
      }
    },
  ],
  reactions: [],
}

const Microsoft = {
  id: 3,
  name: "microsoft",
  logo: "assets/images/microsoftLogo.png",
  color: {
    red: 255,
    green: 255,
    blue: 255,
  },
  actions: [],
  reactions: [
    {
      name: "sendMail",
      description: "send mail",
      id: 1,
      need: {
        to: "dest if null send to user mail",
        from: "from if null send from user mail",
        subject: "subject if null send default subject",
        text: "text if null send actionData text",
      }
    },
  ],
}

export const allServices = [riot, spotify, Microsoft];

const ActionSchema = new Schema({
    description: { type: String, required: true},
    id: { type: Number, required: true},
    need: Schema.Types.Mixed,
});

const ReactionSchema = new Schema({
    description: { type: String, required: true},
    id: { type: Number, required: true},
    need: Schema.Types.Mixed,
});

export const ServiceSchema = new Schema(
    {
        id: { type: Number, required: true},
        name: { type: String, required: true},
        logo: { type: String, required: true},
        color: {
          red: { type: Number, required: true},
          green: { type: Number, required: true},
          blue: { type: Number, required: true},
        },
        actions: { type: [ActionSchema], required: true},
        reactions: { type: [ReactionSchema], required: true},
});

export const ServicesModel = model('Service', ServiceSchema);
