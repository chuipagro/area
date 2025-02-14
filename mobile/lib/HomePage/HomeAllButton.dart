import 'package:flutter/material.dart';
import 'HomeElementList.dart';
import 'HomeGlobale.dart';
import 'package:http/http.dart' as http;
import '../Globals.dart' as globals;
import 'package:mobile/LoginPage.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_web_auth_2/flutter_web_auth_2.dart';
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

void returnToAddArea(Function setState) {
  setState(() {
    needsIterate = -1;
    currentPageState = PageState.AddArea;
  });
}

void changeArea(setState, CreatedArea area) {
  print(area.areaIdOne);
  print(area.areaIdTwo);
  print(area.areaOneActionId);
  print(area.areaTwoActionId);

  setState(() {
    indexForCreationPage[0] = area.areaIdOne + 1;
    indexForCreationPage[2] = area.areaIdTwo + 1;
    indexForCreationPage[1] = area.areaOneActionId + 1;
    indexForCreationPage[3] = area.areaTwoActionId + 1;
    nameInput.text = area.name;
    currentPageState = PageState.ChangeArea;
  });
}

Future<void> _authenticateWithGitHub() async {
  final clientIdGithub = 'ecd75a418bce2c16c3f5';

  final authUrl = 'https://github.com/login/oauth/authorize?'
      'client_id=$clientIdGithub&'
      'scope=user';

  final result = await FlutterWebAuth2.authenticate(
    url: authUrl,
    callbackUrlScheme: 'area',
  );

  String? codeParam = Uri.parse(result).queryParameters['code'];

  final response = await http.post(
    Uri.parse('https://github.com/login/oauth/access_token'),
    headers: <String, String>{
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      'client_id': clientIdGithub,
      'client_secret': 'c25bb753d702882f8634068356cabf8ce4c4ef8a',
      'code': codeParam,
    }),
  );

  if (response.statusCode == 200) {
    List<String> parts = response.body.split('&');
    String accessToken = parts[0].split('=')[1];
    final res = await http.post(
      Uri.parse('http://' + globals.IPpc + ':8080/auth/OAuth2Area'),
      body: {
        'token': accessToken,
        'oauth': 'github',
        'tokenUser': globals.Token,
      },
    );
    if (res.statusCode == 200) {
      print('Connexion good Github!');
    } else {
      print('Connexion failed Github!');
    }
  } else {
    print(
        'Erreur lors de l\'obtention du jeton d\'accès : ${response.reasonPhrase}');
  }
}

Future<void> _authenticateWithGoogle() async {
  final _googleSignIn = GoogleSignIn(scopes: ['email', 'profile']);

  try {
    final googleUser = await _googleSignIn.signIn();
    if (googleUser != null) {
      final googleAuth = await googleUser.authentication;
      final accessToken = googleAuth.accessToken;

      final res = await http.post(
          Uri.parse('http://' + globals.IPpc + ':8080/auth/postGoogleArea'),
          headers: <String, String>{
            'Content-Type': 'application/json',
          },
          body: jsonEncode({
            'token': accessToken,
            'oauth': 'google',
            'tokenUser': globals.Token,
          }));
      if (res.statusCode == 200) {
        print('Connexion good Google!');
      } else {
        print('Connexion failed Google!');
      }
    }
  } catch (error) {
    print("Erreur lors de la connexion: $error");
  }
}

void setUpOAuth2(String serviceName) {
  switch (serviceName) {
    case ("spotify"):
      break;
    case ("google"):
      _authenticateWithGoogle();
      break;
    case ("github"):
      _authenticateWithGitHub();
      break;
  }
}

void getAllNeeds(setState) {
  needsIterate++;
  needsInput.text = '';
  setState(() {
    currentPageState = PageState.GetAllNeeds;
  });
}

void deleteArea(setState, areaName) async {
  final reponse = await http.post(
    Uri.parse('http://' + globals.IPpc + ':8080/area/deleteArea'),
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      "title": areaName,
      "token": globals.Token,
    }),
  );

  if (reponse.statusCode == 200) {
    setState(() {
      currentPageState = PageState.Areas;
      needToReload = true;
    });
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

void setActionInCreationAreaPage(
    Function setState, int actionIndex, int serviceIndex) {
  setState(() {
    indexForCreationPage[0] = serviceIndex + 1;
    indexForCreationPage[1] = actionIndex + 1;
    needsList = elements[indexForCreationPage[0] - 1]
        .actions[indexForCreationPage[1] - 1]
        .needs;
    getAllNeeds(setState);
  });
}

void setReactionInCreationAreaPage(
    Function setState, int reactionIndex, int serviceIndex) {
  setState(() {
    indexForCreationPage[2] = serviceIndex + 1;
    indexForCreationPage[3] = reactionIndex + 1;
    needsList = elements[indexForCreationPage[2] - 1]
        .reactions[indexForCreationPage[3] - 1]
        .needs;
    getAllNeeds(setState);
  });
}

void setAllNeeds(String need, String input) {
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
    case "playlistTracks":
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
      print("Error in setAllNeeds: ${need} does not exist");
      break;
  }
}

Future<void> addArea(String name, setState) async {
  print("==========================================");
  print("==========================================");
  print(
      "1: ${indexForCreationPage[0]}, 2: ${indexForCreationPage[1]}, 3: ${indexForCreationPage[2]}, 4: ${indexForCreationPage[3]}");
  print("==========================================");
  print("==========================================");
  final reponse = await http.post(
    Uri.parse('http://' + globals.IPpc + ':8080/area/createArea'),
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      "title": name,
      "active": true,
      "createdBy": globals.Token,
      "action": {
        "type": indexForCreationPage[1] - 1,
        "service": indexForCreationPage[0] - 1,
      },
      "reaction": {
        "type": indexForCreationPage[3] - 1,
        "service": indexForCreationPage[2] - 1,
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
          "playlistTracksUrisPosition":
              allNeedsList.spotify_playlistTracksUrisPosition,
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
      needToReload = true;
      currentPageState = PageState.Areas;
    });
  } else {
    print('Échec de la création de la zone : ${reponse.statusCode}');
  }
}

Future<void> onDeconectionTap(setState, context) async {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text("Confirmation"),
        content: Text("Êtes-vous sûr de vouloir vous déconnecter?"),
        actions: <Widget>[
          TextButton(
            child: Text("Annuler"),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
          TextButton(
            child: Text("Déconnexion"),
            onPressed: () async {
              Navigator.of(context).pop();
              final response = await http.post(
                Uri.parse('http://' + globals.IPpc + ':8080/user/disconnect'),
              );

              if (response.statusCode == 200) {
                currentPageState = PageState.Areas;
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                      builder: (context) => LoginPage(title: 'LoginPage')),
                );
              } else {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Échec de la déconnexion'),
                  ),
                );
              }
            },
          ),
        ],
      );
    },
  );
}

Future<Map<String, dynamic>> callForAllServices() async {
  final reponse = await http.get(
    Uri.parse('http://' + globals.IPpc + ':8080/services/getAllServices'),
  );

  if (reponse.statusCode == 200) {
    final Map<String, dynamic> jsonReponse = json.decode(reponse.body);
    return jsonReponse;
  } else {
    throw Exception(
        'Échec de la requête pour les zones : ${reponse.statusCode}');
  }
}

Future<Map<String, dynamic>> callForAllAreas() async {
  final reponse = await http.post(
    Uri.parse('http://' + globals.IPpc + ':8080/area/getUserAreas'),
    body: {
      'token': globals.Token,
    },
  );

  if (reponse.statusCode == 200) {
    print("area body : " + reponse.body);
    final Map<String, dynamic> jsonResponse = json.decode(reponse.body);
    return jsonResponse;
  } else {
    throw Exception(
        'Échec de la requête pour les zones : ${reponse.statusCode}');
  }
}

void createServiceList(Map<String, dynamic> json) {
  elements.clear();
  final List<dynamic> servicesList = json["services"];
  servicesList.forEach((serviceData) {
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

void createAreaList(Map<String, dynamic> json) {
  createdAreas.clear();
  if (json.containsKey("areas")) {
    final List<dynamic> areas = json["areas"];
    for (var areaData in areas) {
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

Future<void> loadAll(setState) async {
  final Map<String, dynamic> jsonResultServices = await callForAllServices();
  final Map<String, dynamic> jsonResultArea = await callForAllAreas();
  setState(() {
    createServiceList(jsonResultServices);
    createAreaList(jsonResultArea);
  });
}

Future<bool> changeStatusOfArea(setState, int index, bool newValue) async {
  final reponse = await http.post(
    Uri.parse('http://${globals.IPpc}:8080/area/changeAreaStatus'),
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      'title': createdAreas[index].name,
      'token': globals.Token,
      'active': newValue,
    }),
  );

  if (reponse.statusCode == 200) {
    setState(() {
      currentPageState = PageState.Areas;
      needToReload = true;
    });
    return true;
  } else {
    print(
        'Échec de la désactivation de la zone : ${reponse.statusCode}  ==  ${reponse.body}');
    return false;
  }
}

// void setProfilInfo(setState, final Map<String, dynamic> jsonReponse) {
//   setState(() {});
// }

Future<void> getUserInfo(setState) async {
  final reponse = await http.post(
    Uri.parse('http://${globals.IPpc}:8080/user/getUserInfo'),
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonEncode({
      'token': globals.Token,
    }),
  );

  final Map<String, dynamic> jsonReponse = json.decode(reponse.body);
  profilUser.name = jsonReponse['user']['username'];
  profilUser.email = jsonReponse['user']['mail'];
  profilUser.password = jsonReponse['user']['password'];

  if (reponse.statusCode == 200) {
    setState(() {
      profilButtonPress(setState);
    });
  } else {
    print(
        'Échec de la désactivation de la zone : ${reponse.statusCode}  ==  ${reponse.body}');
  }
}
