import 'package:flutter/material.dart';
import 'HomeElementList.dart';
import 'HomeGlobale.dart';
import 'package:http/http.dart' as http;
import '../Globals.dart' as globals;
import 'package:mobile/LoginPage.dart';
import 'dart:convert';

void homeButtonPress(Function setState) {
  setState(() {
    needToReload = true;
    currentPageState = PageState.Areas;
  });
}

void mesServicesButtonPress(Function setState) {
  setState(() {
    currentPageState = PageState.MesServices;
  });
}

void compteButtonPress(Function setState) {
  setState(() {
    currentPageState = PageState.Compte;
  });
}

void changeArea(setState, CreatedArea area) {
  setState(() {
    indexForCreationPage[0] = area.areaIdOne;
    indexForCreationPage[2] = area.areaIdTwo;
    indexForCreationPage[1] = area.areaOneActionId;
    indexForCreationPage[3] = area.areaTwoActionId;
    nameInput.text = area.name;
    currentPageState = PageState.ChangeArea;
  });
}

void getAllNeeds() {
  
}

void deleteArea(setState, areaName) async {
  final reponse = await http.post(
    Uri.parse('http://' + globals.IPpc + ':8080/area/deleteArea'),
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      "title": areaName,
    }),
  );

  if (reponse.statusCode == 200) {
    setState(() {});
  } else {
    print('Échec de la suppression de la zone : ${reponse.statusCode}');
  }
}

void addAreaPress(Function setState) {
  setState(() {
    indexForCreationPage = [-1, -1, -1, -1];
    nameInput.text = '';
    currentPageState = PageState.AddArea;
  });
}

void profilButtonPress(Function setState) {
  setState(() {
    currentPageState = PageState.Profil;
  });
}

void onElementTap(Function setState) {
  setState(() {
    currentPageState = PageState.AreasStatus;
  });
}

void onActionTap(Function setState) {
  setState(() {
    currentPageState = PageState.ServicesActions;
  });
}

void onReactionTap(Function setState) {
  setState(() {
    currentPageState = PageState.ServicesReactions;
  });
}

void onActionList(Function setState, int index) {
  setState(() {
    indexOfServicesToPrint = index;
    currentPageState = PageState.ActionsList;
  });
}

void onReactionList(Function setState, int index) {
  setState(() {
    indexOfServicesToPrint = index;
    currentPageState = PageState.ReactionList;
  });
}

void setActionInCreationAreaPage(Function setState, int actionIndex, int serviceIndex) {
  setState(() {
    indexForCreationPage[0] = serviceIndex + 1;
    indexForCreationPage[1] = actionIndex + 1;
    needsList = elements[indexForCreationPage[0]].actions[indexForCreationPage[1]].needs;
    currentPageState = PageState.GetAllNeeds;
  });
}

void setReactionInCreationAreaPage(Function setState, int reactionIndex, int serviceIndex) {
  setState(() {
    indexForCreationPage[2] = serviceIndex + 1;
    indexForCreationPage[3] = reactionIndex + 1;
    needsList = elements[indexForCreationPage[2]].reactions[indexForCreationPage[3]].needs;
    currentPageState = PageState.GetAllNeeds;
  });
}

void setAllNeeds(String need, String input)
{
  switch (need) {
    case "summonerName":
      allNeedsList.riot_summonerName = input;
      break;
    case "puuid":
      allNeedsList.riot_puuid = input;
      break;
    case "summonerId":
      allNeedsList.riot_summonerId = input;
      break;
    case "matchId":
      allNeedsList.riot_matchId = input;
      break;
    case "playlistId":
      allNeedsList.spotify_playlistId = input;
      break;
    case "playlistName":
      allNeedsList.spotify_playlistName = input;
      break;
    case "playlistDescription":
      allNeedsList.spotify_playlistDescription = input;
      break;
    case "playlistPublic":
      allNeedsList.spotify_playlistPublic = true;
      break;
    case "playlistCollaborative":
      allNeedsList.spotify_playlistCollaborative = true;
      break;
    case "playlistTracksPosition":
      allNeedsList.spotify_playlistTracksPosition = int.parse(input);
      break;
    case "playlistTracksUrisPosition":
      allNeedsList.spotify_playlistTracksUrisPosition = int.parse(input);
      break;
    case "to":
      allNeedsList.mail_to = input;
      break;
    case "from":
      allNeedsList.mail_from = input;
      break;
    case "subject":
      allNeedsList.mail_subject = input;
      break;
    case "text":
      allNeedsList.mail_text = input;
      break;
    default:
      break;
  }
}

///
/// [@var		object	async]
///
Future<void> addArea(String name, setState) async {

  final reponse = await http.post(
    Uri.parse('http://' + globals.IPpc + ':8080//area//createArea'),
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      "title": name,
      "active": true,
      "createdBy": "Moi",
      "action": {
        "type": indexForCreationPage[2],
        "service": indexForCreationPage[0],
      },
      "reaction": {
        "type": indexForCreationPage[3],
        "service": indexForCreationPage[1],
      },
      "data": {
        "riot": {
          "summonerName": allNeedsList.riot_summonerName,
          "puuid": allNeedsList.riot_puuid,
          "summonerId": allNeedsList.riot_summonerId,
          "matchId": allNeedsList.riot_matchId,
        },
        "spotify": {
          "playlistId": allNeedsList.spotify_playlistId,
          "playlistName": allNeedsList.spotify_playlistName,
          "playlistDescription": allNeedsList.spotify_playlistDescription,
          "playlistPublic": allNeedsList.spotify_playlistPublic,
          "playlistCollaborative": allNeedsList.spotify_playlistCollaborative,
          "playlistTracksPosition": allNeedsList.spotify_playlistTracksPosition,
          "playlistTracksUrisPosition": allNeedsList.spotify_playlistTracksUrisPosition,
        },
        "mail": {
          "to": allNeedsList.mail_to,
          "from": allNeedsList.mail_from,
          "subject": allNeedsList.mail_subject,
          "text": allNeedsList.mail_text,
        }
      }
    }),
    
  );

  if (reponse.statusCode == 200) {
    setState(() {
      nameInput.text = '';
      indexForCreationPage = [-1, -1, -1, -1];
      currentPageState = PageState.Areas;
    });
  } else {
    print('Échec de la création de la zone : ${reponse.statusCode}');
  }
}

Future<void> onDeconectionTap(context) async {
  final response = await http.post(
    Uri.parse('http://' + globals.IPpc + ':8080/user/disconnect'),
  );

  if (response.statusCode == 200) {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => LoginPage(title: 'LoginPage')),
    );
  } else {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Échec de la déconnexion'),
      ),
    );
  }
}

Future<Map<String, dynamic>> callForAllServices() async {
  final reponse = await http.get(
    Uri.parse('http://' + globals.IPpc + ':8080/services/getAllServices'),
  );

  if (reponse.statusCode == 200) {
    final Map<String, dynamic> jsonReponse = json.decode(reponse.body);
    // print("================================================================");
    // print("================================================================");
    // print(jsonReponse);
    // print("================================================================");
    // print("================================================================");
    return jsonReponse;
  } else {
    throw Exception('Échec de la requête pour les zones : ${reponse.statusCode}');
  }
}

///
/// [@var		object	async]
///
Future<Map<String, dynamic>> callForAllAreas() async {
  final reponse = await http.get(
    Uri.parse('http://' + globals.IPpc + ':8080/area/getAllAreas'),
  );

  if (reponse.statusCode == 200) {
    final Map<String, dynamic> jsonResponse = json.decode(reponse.body);
    // print("================================================================");
    // print("================================================================");
    // print(jsonResponse);
    // print("================================================================");
    // print("================================================================");
    return jsonResponse;
  } else {
    throw Exception('Échec de la requête pour les zones : ${reponse.statusCode}');
  }
}

void createServiceList(Map<String, dynamic> json) {
  final List<dynamic> servicesList = json["services"];
  servicesList.forEach((serviceData) {
    print("================================================================");
    print("================================================================");
    print(serviceData);
    print("================================================================");
    print("================================================================");
    final String titre = serviceData["name"];
    final String iconPath = serviceData["logo"];
    final int red = serviceData["color"]["red"];
    final int green = serviceData["color"]["green"];
    final int blue = serviceData["color"]["blue"];
    final List<actionServices> actions = [];
    final List<actionServices> reactions = [];

    if (serviceData["actions"] != null) {
      serviceData["actions"].forEach((actionData) {
        final String actionName = actionData["description"];
        final List<String> needs = (actionData["need"] != null)
            ? List<String>.from(actionData["need"].values)
            : [];

        final actionServices action = actionServices(
          name: actionName,
          description: actionName,
          needs: needs,
        );

        actions.add(action);
      });
    }
    if (serviceData["reactions"] != null) {
      serviceData["reactions"].forEach((reactionData) {
        final String reactionName = reactionData["description"];
        final List<String> needs = (reactionData["need"] != null)
            ? List<String>.from(reactionData["need"].values)
            : [];

        final actionServices reaction = actionServices(
          name: reactionName,
          description: reactionName,
          needs: needs,
        );

        reactions.add(reaction);
      });
    }

    Service service = Service(
      titre: titre,
      iconPath: iconPath,
      red: red,
      green: green,
      blue: blue,
      actions: actions,
      reactions: reactions,
    );

    elements.add(service);
  });
}

void createAreaList(Map<String, dynamic> json)
{
  if (json.containsKey("areas")) {
    final List<dynamic> areas = json["areas"];
    for (var areaData in areas) {
      // print("================================================================");
      // print("================================================================");
      // print(areaData.toString());
      // print("================================================================");
      // print("================================================================");
      final String titre = areaData["title"];
      final bool isActive = areaData["active"];
      final String createdBy = areaData["createdBy"];
      final int serviceIndexOne = areaData["action"]["service"];
      final int serviceIndexTwo = areaData["reaction"]["service"];
      final int actionIndexServiceOne = areaData["action"]["type"];
      final int actionIndexServiceTwo = areaData["reaction"]["type"];

      CreatedArea area = CreatedArea(
        name: titre,
        isActive: isActive,
        createdBy: createdBy,
        areaIdOne: serviceIndexOne,
        areaIdTwo: serviceIndexTwo,
        areaOneActionId: actionIndexServiceOne,
        areaTwoActionId: actionIndexServiceTwo,
      );
      createdAreas.add(area);
    }
  }
}

///
/// [@var		mixed	async]
///
Future<void> loadAll(setState) async
{
  createdAreas.clear();
  elements.clear();
  final Map<String, dynamic> jsonResultServices = await callForAllServices();
  final Map<String, dynamic> jsonResultArea = await callForAllAreas();
  setState(() {
    createServiceList(jsonResultServices);
    createAreaList(jsonResultArea);
  });
}

///
/// [@var		mixed	areaIndex]
//////
/// [@var		object	async]
///
Future<bool> changeStatusOfArea(setState, int areaIndex, bool newValue) async {
  final reponse = await http.post(
    Uri.parse('http://${globals.IPpc}:8080/user/areas/desactivate'),
    body: {
      'name': createdAreas[areaIndex].name,
      'isActive': newValue.toString(),
    },
  );

  if (reponse.statusCode == 200) {
    setState(() {
      currentPageState = PageState.Areas;
    });
    return true;
  } else {
    print('Échec de la désactivation de la zone : ${reponse.statusCode}');
    return false;
  }
}
