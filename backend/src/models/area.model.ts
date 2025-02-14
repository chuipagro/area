import { Schema, model } from 'mongoose';

export interface IData {
  riot: {
    summonerName: string | null;
    puuid: string | null;
    summonerId: string | null;
    matchId: string | null;
  } | null;

  spotify: {
    playlistId: string | null;
    playlistName: string | null;
    playlistDescription: string | null;
    playlistPublic: boolean | null;
    playlistCollaborative: boolean | null;
    playlistTracksPosition: number | null;
    playlistTracksUrisPosition: number | null;
    country: string | null;
    limit: number | null;
    offset: number | null;
    username: string | null;
    name: string | null;
    description: string | null;
    trackId: string | null;
  } | null;

  microsoft: {
    to: string | null;
    from: string | null;
    subject: string | null;
    text: string | null;
  } | null;
  
  github: {
    repoName: string | null;
    repoDescription: string | null;
    private: boolean | null;
    gistId: string | null;
    description: string | null;
    newDescription: string | null;
    branchName: string | null;
    sha: string | null;
    pullNumber: number | null;
    title: string | null;
    body: string | null;
    head: string | null;
    base: string | null;
    issueNumber: number | null;
    newBody: string | null;
    newTitle: string | null;
    newStatus: string | null;
    newName: string | null;
    homepage: string | null;
    newContent: string | null;
    fileName: string | null;
    name: string | null;
    billingEmail: string | null;
  } | null;

  cron: {
    time: string | "s50";
  } | null;
  
  google: {
    message: string | null;
    name: string | null;
    description: string | null;
    id: string | null;
    question: string | null;
    type: string | null;
    content: string | null;
  }
  
  clock: {
    time: string | null;
    date: string | null;
  } | null;
  
  discord: {
    channel_id: string | null;
    message: string | null;
  } | null;
  steam: {
    steamID: string | null;
    gameID: string | null;
  } | null;
  
  weather: {
    city: string | null;
  } | null;
  
  nasa: {
  } | null;
  
  minecraft: {
    serverIP: string | null;
  } | null;
}

export interface IArea {
  title: string;
  active: boolean;
  createdBy: string;
  action: {
    type: number;
    service: number;
  }
  reaction: {
    type: number;
    service: number;
  }
  data: IData;
  timeAtCreation: string;
  dateAtCreation: string;
}

export const AreaSchema = new Schema<IArea>({
  title: { type: String, required: true},
  active: { type: Boolean},
  createdBy: { type: String, required: true},
  action: {
    type: { type: Number, required: true},
    service: { type: Number, required: true},
  },
  reaction: {
    type: { type: Number, required: true},
    service: { type: Number, required: true},
  },
  data: {
    riot: {
      summonerName: { type: String},
      puuid: { type: String},
      summonerId: { type: String},
      matchId: { type: String},
    },
    spotify: {
      playlistId: { type: String},
      playlistName: { type: String},
      playlistDescription: { type: String},
      playlistPublic: { type: Boolean},
      playlistCollaborative: { type: Boolean},
      playlistTracks: { type: Array},
      playlistTracksPosition: { type: Number},
      playlistTracksUris: { type: Array},
      playlistTracksUrisPosition: { type: Number},
    },
    microsoft: {
      to: { type: String},
      from: { type: String},
      subject: { type: String},
      text: { type: String},
    },
    github: {
      repoName: { type: String},
      repoDescription: { type: String},
      private: { type: Boolean},
      gistId: { type: String},
      description: { type: String},
      newDescription: { type: String},
      branchName: { type: String},
      sha: { type: String},
      pullNumber: { type: Number},
      title: { type: String},
      body: { type: String},
      head: { type: String},
      base: { type: String},
      issueNumber: { type: Number},
      newBody: { type: String},
      newTitle: { type: String},
      newStatus: { type: String},
      newName: { type: String},
      homepage: { type: String},
      newContent: { type: String},
      fileName: { type: String},
      name: { type: String},
      billingEmail: { type: String},
    },
    cron: {
      time: { type: String},
    },
    google: {
      message: { type: String},
      name: { type: String},
      description: { type: String},
      id: { type: String},
      question: { type: String},
      type: { type: String},
      content: { type: String},
    },
    clock: {
      time: { type: String},
      date: { type: String},
    },
    discord: {
      channel_id: { type: String},
      message: { type: String},
    },
    steam: {
      steamID: { type: String},
      gameID: { type: String},
    },
    weather: {
      city: { type: String},
    },
    
    nasa: {},
    
    minecraft: {
      serverIP: { type: String},
    },
  },
  timeAtCreation: { type: String, required: true},
  dateAtCreation: { type: String, required: true},
});

export const AreaModel = model<IArea>('Area', AreaSchema);
