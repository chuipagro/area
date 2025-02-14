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
      description: "check player  tft",
      id: 7,
      need: {
        summonerName: "summonerName",
      }
    },
    {
      name: "tftCheckSummonerNewGame",
      description: "check if a player started a new game tft",
      id: 8,
      need: {
        summonerName: "summonerName",
      }
    },
    {
      name: "tftCheckSummonerNewWin",
      description: "check if a player won tft",
      id: 9,
      need: {
        summonerName: "summonerName",
      }
    },
    {
      name: "tftCheckSummonerNewLose",
      description: "check if a player lost tft",
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
      name: "getNewReleases",
      description: "check if new releases",
      id: 1,
      need: {
        country: "country",
        limit: "limit",
        offset: "offset",
      }
    },
    {
      name: "getAudioFeaturesTrack",
      description: "get audio features track",
      id: 2,
      need: {
        track_id: "track_id",
      }
    }
  ],
  reactions: [
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
  ],
}

const Microsoft = {
  id: 3,
  name: "microsoft",
  logo: "assets/images/microsoftLogo.png",
  color: {
    red: 150,
    green: 223,
    blue: 91,
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

const github = {
  id: 4,
  name: "github",
  logo: "assets/images/githubLogo.png",
  color: {
    red: 169,
    green: 183,
    blue: 184,
  },
  actions: [],
  reactions: [
    {
      name: "createRepo",
      description: "create repo",
      id: 1,
      need: {
        name: "repoName",
        description: "repoDescription",
        homepage: "homepage",
        private: "private",
      }
    },
    {
      name: "modify repo name",
      description: "modify repo name",
      id: 2,
      need: {
        name: "repoName",
        newName: "newRepoName",
      }
    },
    {
      name: "modify repo description",
      description: "modify repo description",
      id: 3,
      need: {
        name: "repoName",
        description: "newRepoDescription",
      }
    },
    {
      name: "modify repo status",
      description: "modify repo status",
      id: 4,
      need: {
        name: "repoName",
        private: "boolean",
      }
    },
    {
      name: "delete repo",
      description: "delete repo",
      id: 5,
      need: {
        name: "repoName",
      }
    },
    {
      name: "star repo",
      description: "star repo",
      id: 6,
      need: {
        name: "repoName",
      }
    },
    {
      name: "unstar repo",
      description: "unstar repo",
      id: 7,
      need: {
        name: "repoName",
      }
    },
    {
      name: "fork repo",
      description: "fork repo",
      id: 8,
      need: {
        name: "repoName",
      }
    },
    {
      name: "create issue",
      description: "create issue",
      id: 9,
      need: {
        name: "repoName",
        title: "issueTitle",
        body: "issueBody",
      }
    },
    {
      name: "modify issue title",
      description: "modify issue title",
      id: 10,
      need: {
        name: "repoName",
        issueNumber: "issueNumber",
        title: "newIssueTitle",
      }
    },
    {
      name: "modify issue body",
      description: "modify issue body",
      id: 11,
      need: {
        name: "repoName",
        issueNumber: "issueNumber",
        body: "newIssueBody",
      }
    },
    {
      name: "close issue",
      description: "close issue",
      id: 12,
      need: {
        name: "repoName",
        issueNumber: "issueNumber",
      }
    },
    {
      name: "create pull request",
      description: "create pull request",
      id: 13,
      need: {
        name: "repoName",
        title: "pullRequestTitle",
        body: "pullRequestBody",
        head: "head",
        base: "base",
      }
    },
    {
      name: "merge pull request",
      description: "merge pull request",
      id: 14,
      need: {
        name: "repoName",
        pullNumber: "pullNumber",
      }
    },
    {
      name: "close pull request",
      description: "close pull request",
      id: 15,
      need: {
        name: "repoName",
        pullNumber: "pullNumber",
      }
    },
    {
      name: "create branch",
      description: "create branch",
      id: 16,
      need: {
        name: "repoName",
        branchName: "branchName",
        sha: "sha",
      }
    },
    {
      name: "delete branch",
      description: "delete branch",
      id: 17,
      need: {
        name: "repoName",
        branchName: "branchName",
      }
    },
    {
      name: "create gist",
      description: "create gist",
      id: 18,
      need: {
        description: "gistDescription",
        files: "gistFiles",
      }
    },
    {
      name: "modify gist description",
      description: "modify gist description",
      id: 19,
      need: {
        gistId: "gist id",
        newDescription: "description",
      }
    },
    {
      name: "modify gist name",
      description: "modify gist name",
      id: 20,
      need: {
        gistId: "gist id",
        newName: "name",
      }
    },
    {
      name: "modify gist content",
      description: "modify gist content",
      id: 21,
      need: {
        gistId: "gist id",
        files: "files",
      }
    },
    {
      name: "create organization",
      description: "create organization",
      id: 22,
      need: {
        orgName: "orgName",
        billingEmail: "billingEmail",
      }
    },
    {
      name: "modify organization",
      description: "modify organization",
      id: 23,
      need: {
        orgName: "orgName",
        billingEmail: "billingEmail",
      }
    },
    {
      name: "delete organization",
      description: "delete organization",
      id: 24,
      need: {
        orgName: "orgName",
      }
    },
    {
      name:"modify user name",
      description: "modify user name",
      id: 25,
      need: {
        newName: "newName",
      }
    }
  ],
}

const discord = {
  id: 5,
  name: "discord",
  logo: "assets/images/discordLogo.png",
  color: {
    red: 122,
    green: 116,
    blue: 195,
  },
  actions: [],
  reactions: [
    {
      name: "sendMessage",
      description: "send message",
      id: 1,
      need: {
        channel_id: "channel_id",
        message: "message",
      }
    }
  ],
}

const google = {
  id: 6,
  name: "google",
  logo: "assets/images/googleLogo.png",
  color: {
    red: 197,
    green: 209,
    blue: 31,
  },
  actions: [
    {
      name: "checkNewMail",
      description: "check if new mail",
      id: 1,
      need: {}
    }
  ],
  reactions: [
    {
      name: "sendMail",
      description: "send mail",
      id: 1,
      need: {
        from: "from if null send from user mail",
        subject: "subject if null send default subject",
        text: "text if null send actionData text",
      }
    },
    {
      name: "createForm",
      description: "create form",
      id: 2,
      need: {
        name: "name",
        description: "description",
      }
    },
    {
      name: "createQuestion",
      description: "create question",
      id: 3,
      need: {
        id: "formId",
        question: "question",
        type: "questionType",
      }
    },
    {
      name: "deleteForm",
      description: "delete form",
      id: 4,
      need: {
        id: "formId",
      }
    },
    {
      name: "create Sheet",
      description: "create sheet",
      id: 5,
      need: {
        name: "name",
      }
    },
    {
      name: "delete Sheet",
      description: "delete sheet",
      id: 6,
      need: {
        id: "sheetId",
      }
    },
    {
      name: "create Doc",
      description: "create doc",
      id: 7,
      need: {
        name: "name",
      }
    },
    {
      name: "delete Doc",
      description: "delete doc",
      id: 8,
      need: {
        id: "docId",
      }
    },
    {
      name: "modify Doc",
      description: "modify doc",
      id: 9,
      need: {
        id: "docId",
        content: "content",
      }
    },
    {
      name: "create Slide",
      description: "create slide",
      id: 10,
      need: {
        name: "name",
      }
    },
    {
      name: "delete Slide",
      description: "delete slide",
      id: 11,
      need: {
        id: "slideId",
      }
    },
    {
      name: "modify Slide",
      description: "modify slide",
      id: 12,
      need: {
        id: "slideId",
        content: "content",
      }
    },
    {
      name: "create Calendar",
      description: "create calendar",
      id: 13,
      need: {
        name: "name",
      }
    },
    {
      name: "delete Calendar",
      description: "delete calendar",
      id: 14,
      need: {
        id: "calendarId",
      }
    },
    {
      name: "modify Calendar",
      description: "modify calendar",
      id: 15,
      need: {
        id: "calendarId",
        name: "name",
      }
    },
    {
      name: "create site",
      description: "create site",
      id: 16,
      need: {
        name: "name",
      }
    },
    {
      name: "delete site",
      description: "delete site",
      id: 17,
      need: {
        id: "siteId",
      }
    },
    {
      name: "modify site",
      description: "modify site",
      id: 18,
      need: {
        id: "siteId",
        name: "name",
      }
    },
    {
      name: "create drawing",
      description: "create drawing",
      id: 19,
      need: {
        name: "name",
      }
    },
    {
      name: "delete drawing",
      description: "delete drawing",
      id: 20,
      need: {
        id: "drawingId",
      }
    }
  ],
}

const clock = {
  id: 7,
  name: "clock",
  logo: "assets/images/clockLogo.png",
  color: {
    red: 137,
    green: 63,
    blue: 48,
  },
  actions: [
    {
      name: "launch at chosen time",
      description: "launch at chosen time",
      id: 1,
      need: {
        time: "time in format hh:mm",
      }
    },
    {
      name: "launch every x",
      description: "launch every x",
      id: 2,
      need: {
        time: "time in format S10 for every 10 seconds there is S M H D M Y and value must be 1 - 59",
      }
    },
    {
      name: "launch at precise date",
      description: "launch at precise date",
      id: 3,
      need: {
        date: "date in format dd/mm/yyyy",
      }
    },
  ],
  reactions: [],
}

const steam = {
id: 8,
  name: "steam",
  logo: "assets/images/steamLogo.png",
  color: {
    red: 49,
    green: 82,
    blue: 107,
  },
  actions: [
    {
      name: "wait for new friend",
      description: "wait for new friend",
      id: 1,
      need: {
        steamID: "steamID",
      }
    },
    {
      name: "wait for new game",
      description: "wait for new game",
      id: 2,
      need: {
        steamID: "steamID",
      }
    },
    {
      name: "get news",
      description: "get news",
      id: 3,
      need: {
        gameID: "gameID",
      }
    },
  ],
  reactions: [],
}

const weather = {
  id: 9,
  name: "weather",
  logo: "assets/images/weatherLogo.png",
  color: {
    red: 245,
    green: 141,
    blue: 0,
  },
  actions: [
    {
      name: "wait for new weather",
      description: "wait for new weather",
      id: 1,
      need: {
        city: "city",
      }
    }
  ],
  reactions: [],
}

const nasa = {
  id: 10,
  name: "nasa",
  logo: "assets/images/nasaLogo.png",
  color: {
    red: 0,
    green: 129,
    blue: 223,
  },
  actions: [
    {
      name: "wait for new mars weather",
      description: "wait for new mars weather",
      id: 1,
      need: {}
    },
    {
      name: "wait for new astronomy picture of the day",
      description: "wait for new astronomy picture of the day",
      id: 2,
      need: {}
    },
  ],
  reactions: [],
}

const minecraft = {
  id: 11,
  name: "minecraft",
  logo: "assets/images/minecraftLogo.png",
  color: {
    red: 157,
    green: 226,
    blue: 177,
  },
  actions: [
    {
      name: "wait for new minecraft connection",
      description: "wait for new minecraft connection",
      id: 1,
      need: {
        serverIP: "serverIP",
      }
    },
    {
      name: "wait for new minecraft disconnection",
      description: "wait for new minecraft disconnection",
      id: 2,
      need: {
        serverIP: "serverIP",
      }
    },
    {
      name: "wait for new version",
      description: "wait for new version",
      id: 3,
      need: {
        serverIP: "serverIP",
      }
    }
  ],
  reactions: [],
}

export const allServices = [riot, spotify, Microsoft, github, discord, google, clock, steam, weather, nasa, minecraft];

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
