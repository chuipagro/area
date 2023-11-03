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
    playlistTracks: string[] | null;
    playlistTracksPosition: number | null;
    playlistTracksUris: string[] | null;
    playlistTracksUrisPosition: number | null;
  } | null;

  mail: {
    to: string | null;
    from: string | null;
    subject: string | null;
    text: string | null;
  } | null;
  
  github: {
    repoName: string | null;
    repoDescription: string | null;
    privateRepo: boolean | null;
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
    mail: {
      to: { type: String},
      from: { type: String},
      subject: { type: String},
      text: { type: String},
    },
  },
  timeAtCreation: { type: String, required: true},
  dateAtCreation: { type: String, required: true},
});

export const AreaModel = model<IArea>('Area', AreaSchema);
