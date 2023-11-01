enum PageState {
  Areas,
  AddArea,
  Profil,
  AreasStatus,
  ServicesActions,
  ServicesReactions,
  ActionsList,
  ReactionList,
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