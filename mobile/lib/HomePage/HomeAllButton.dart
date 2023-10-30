import 'package:flutter/material.dart';
import 'HomeElementList.dart';
import 'HomeGlobale.dart';
import 'package:http/http.dart' as http;
import '../Globals.dart' as globals;
import 'package:mobile/LoginPage.dart';
import 'dart:convert';

void homeButtonPress(Function setState) {
  setState(() {
    currentPageState = PageState.Areas;
  });
}

void addAreaPress(Function setState) {
  setState(() {
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
    currentPageState = PageState.AddArea;
  });
}

void setReactionInCreationAreaPage(Function setState, int reactionIndex, int serviceIndex) {
  setState(() {
    indexForCreationPage[2] = serviceIndex + 1;
    indexForCreationPage[3] = reactionIndex + 1;
    currentPageState = PageState.AddArea;
  });
}

///
/// [@var		object	async]
///
Future<void> addArea(String name, setState) async {

  final reponse = await http.post(
    Uri.parse('http://' + globals.IPpc + ':3000//services/createArea'),
    body: {
      'title': name,
      'active': true,
      'createdBy': "Moi",
      'action': {
        'service': indexForCreationPage[0],
        'type': indexForCreationPage[2],
      },
      'reaction': {
        'service': indexForCreationPage[1],
        'type': indexForCreationPage[3]
      },
      'data': {},
    },
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

Future<void> onDeconectionTap(BuildContext context) async {
  final response = await http.post(
    Uri.parse('http://' + globals.IPpc + ':3000/user/disconnect'),
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
    Uri.parse('http://' + globals.IPpc + ':3000/services/getAllServices'),
  );

  if (reponse.statusCode == 200) {
    final Map<String, dynamic> jsonReponse = json.decode(reponse.body);
    print("================================================================");
    print("================================================================");
    print(jsonReponse);
    print("================================================================");
    print("================================================================");
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
    Uri.parse('http://' + globals.IPpc + ':3000/area/getAllAreas'),
  );

  if (reponse.statusCode == 200) {
    final Map<String, dynamic> jsonResponse = json.decode(reponse.body);
    print("================================================================");
    print("================================================================");
    print(jsonResponse);
    print("================================================================");
    print("================================================================");
    return jsonResponse;
  } else {
    throw Exception('Échec de la requête pour les zones : ${reponse.statusCode}');
  }
}

void createServiceList(Map<String, dynamic> json)
{
  final Map<String, dynamic> servicesData = json["services"];
  servicesData.forEach((serviceName, serviceData) {
    if (serviceName != "_id") {
      final String titre = serviceName;
      final String iconPath = serviceData["logo"];
      final int red = serviceData["color"]["red"];
      final int green = serviceData["color"]["green"];
      final int blue = serviceData["color"]["blue"];
      final List<String> actions = (serviceData["actions"] != null) ? List<String>.from(serviceData["actions"].values) : [];
      final List<String> reactions = (serviceData["reactions"] != null) ? List<String>.from(serviceData["reactions"].values) : [];

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
    }
  });
}

void createAreaList(Map<String, dynamic> json)
{
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

///
/// [@var		mixed	async]
///
Future<void> loadAll() async
{
  createdAreas.clear();
  elements.clear();
  final Map<String, dynamic> jsonResultServices = await callForAllServices();
  createServiceList(jsonResultServices);
  final Map<String, dynamic> jsonResultArea = await callForAllAreas();
  createAreaList(jsonResultArea);
}

///
/// [@var		mixed	areaIndex]
//////
/// [@var		object	async]
///
Future<bool> changeStatusOfArea(setState, int areaIndex, bool newValue) async {
  final reponse = await http.post(
    Uri.parse('http://${globals.IPpc}:3000/user/areas/desactivate'),
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
