enum PageState {
  Areas,
  AddArea,
  Profil,
  AreasStatus,
  ServicesActions,
  ServicesReactions,
  ActionsList,
  ReactionList,
  Compte,
  MesServices,
  ChangeArea,
  GetAllNeeds,
}

class allNeeds {
  String riot_summonerName;
  String riot_puuid;
  String riot_summonerId;
  String riot_matchId;
  String spotify_playlistId;
  String spotify_playlistTracks;
  String spotify_playlistName;
  String spotify_playlistDescription;
  bool spotify_playlistPublic;
  bool spotify_playlistCollaborative;
  int spotify_playlistTracksPosition;
  int spotify_playlistTracksUrisPosition;
  String mail_to;
  String mail_from;
  String mail_subject;
  String mail_text;

  allNeeds({
    required this.riot_summonerName,
    required this.riot_puuid,
    required this.riot_summonerId,
    required this.riot_matchId,
    required this.spotify_playlistId,
    required this.spotify_playlistTracks,
    required this.spotify_playlistName,
    required this.spotify_playlistDescription,
    required this.spotify_playlistPublic,
    required this.spotify_playlistCollaborative,
    required this.spotify_playlistTracksPosition,
    required this.spotify_playlistTracksUrisPosition,
    required this.mail_to,
    required this.mail_from,
    required this.mail_subject,
    required this.mail_text,
  });
}

class profil {
  final String name;
  final String email;
  final String password;

  profil({
    required this.name,
    required this.email,
    required this.password,
  });

}

class actionServices {
  final String name;
  final String description;
  List<String> needs = [];

  actionServices({
    required this.name,
    required this.description,
    required this.needs,
  });
}

class Service {
  final String titre;
  final String iconPath;
  final int red;
  final int green;
  final int blue;
  final List<actionServices> actions;
  final List<actionServices> reactions;

  Service({
    required this.titre,
    required this.iconPath,
    required this.red,
    required this.green,
    required this.blue,
    required this.actions,
    required this.reactions,
  });
}

class CreatedArea {
  final String name;
  bool isActive;
  final int areaIdOne;
  final int areaIdTwo;
  final int areaOneActionId;
  final int areaTwoActionId;
  final String createdBy;

  CreatedArea({
    required this.name,
    required this.isActive,
    required this.areaIdOne,
    required this.areaIdTwo,
    required this.areaOneActionId,
    required this.areaTwoActionId,
    required this.createdBy,
  });
}

class ProfilInfo {
  final String name;
  final String email;
  final String password;

  ProfilInfo({
    required this.name,
    required this.email,
    required this.password,
  });
}