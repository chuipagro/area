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

class Service {
  final String titre;
  final String iconPath;
  final int red;
  final int green;
  final int blue;
  final List<String> actions;
  final List<String> reactions;

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