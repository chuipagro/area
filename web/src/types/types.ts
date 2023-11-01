import React from 'react';

export type data = {
    riot: {
        summonerName: string,
        puuid: string,
        summonerId: string,
        matchId: string
    },
    spotify: {
        playlistId: string,
        playlistName: string,
        playlistDescription: string,
        playlistPublic: true,
        playlistCollaborative: true,
        playlistTracksPosition: number,
        playlistTracksUrisPosition: number
    },
    mail: {
        to: string,
        from: string,
        subject: string,
        text: string
    }
}