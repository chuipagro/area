import 'package:flutter/material.dart';
import 'HomeElementList.dart';

  PageState currentPageState = PageState.Areas;
  int indexOfServicesToPrint = 0;
  List<int> indexForCreationPage = [-1, -1, -1, -1];
  bool areaNameIsNotEmpty = false;
  List<Service> elements = [];
  List<CreatedArea> createdAreas = [];
  bool loadData = true;
  bool needToReload = true;
  profil profilUser = profil(name: 'name', email: 'email', password: 'mdp');
  allNeeds allNeedsList = allNeeds(
    riot_matchId: "", 
    riot_puuid: "", 
    riot_summonerId: "", 
    riot_summonerName: "", 
    spotify_playlistCollaborative: false, 
    spotify_playlistDescription: "", 
    spotify_playlistId: "", 
    spotify_playlistName: "", 
    spotify_playlistPublic: false, 
    spotify_playlistTracksPosition: 0, 
    spotify_playlistTracksUrisPosition: 0, 
    mail_from: "", 
    mail_subject: "", 
    mail_text: "", 
    mail_to: ""
  );
  List<String> needsList = [];

  TextEditingController nameInput = TextEditingController();
  TextEditingController searchController = TextEditingController();
  TextEditingController searchControllerReaction = TextEditingController();
  TextEditingController needsInput = TextEditingController();
