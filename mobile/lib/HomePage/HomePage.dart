import 'package:flutter/material.dart';
import 'HomeReactionList.dart';
import 'HomeGlobale.dart';
import 'HomeElementList.dart';
import 'HomeActionList.dart';
import 'HomeAreaContent.dart';
import 'HomeProfil.dart';
import 'HomeServicesActionList.dart';
import 'HomeServicesReactionList.dart';
import 'HomeAddArea.dart';
import 'HomeAreaList.dart';
import 'HomeAllButton.dart';
import 'HomeCompte.dart';
import 'HomeMesServices.dart';
import 'HomeChangeArea.dart';
import 'HomeAskAllNeeds.dart';

// {
//   message: success, 
//   areas: [
//     {
//       action: {
//         type: 5, 
//         service: 1
//       }, 
//       reaction: {
//         type: 1, 
//         service: 3
//       }, 
//       data: {
//         riot: {
//           summonerName: pablo0675
//         }, 
//         spotify: {
//           playlistTracks: [], 
//           playlistTracksUris: []
//         }
//       }, 
//       _id: 6531544f7f87a611203cc2c2, 
//       title: poupoule, 
//       active: true, 
//       createdBy: pupute, 
//       timeAtCreation: 18:07:43, 
//       dateAtCreation: 19/10/2023, 
//       __v: 0
//     }, 
//     {
//       action: {
//         type: 1, 
//         service: 1
//       }, 
//       reaction: {
//         type: 1, 
//         service: 3
//       }, 
//       data: {
//         riot: {
//           summonerName: pablo0675
//         }, 
//         spotify: {
//           playlistTracks: [], 
//           playlistTracksUris: []
//         }
//       }, 
//       _id: 6531544f7f87a611203cc2c4, 
//       title: poupoule, 
//       active: true, 
//       createdBy: poupoule, 
//       timeAtCreation: 18:07:43, 
//       dateAtCreation: 19/10/2023, 
//       __v: 0
//     },
//     {
//       action: {
//         type: 1, 
//         service: 1
//       }, 
//       reaction: {
//         type: 1, 
//         service: 3
//       }, 
//       data: {
//         riot: {
//           summonerName: pablo0675
//         }, 
//         spotify: {
//           playlistTracks: [], 
//           playlistTracksUris: []
//         }
//       }, 
//       _id: 653154507f87a611203cc2c6, 
//       title: poupoule, 
//       active: true, 
//       createdBy: poupoule, 
//       timeAtCreation: 18:07:44, 
//       dateAtCreation: 19/10/2023, 
//       __v: 0
//     }, 
//     {
//       action: {
//         type: 6, 
//         service: 1
//       }, 
//       reaction: {
//         type: 1, 
//         service: 3
//       }, 
//       data: {
//         riot:

// {
//   message: success,
//   services: {
//     riot: {
//       color: {
//         red: 255,
//         green: 66,
//         blue: 0
//       },
//       actions: {
//         getNewWin: {
//           description: check if a player won, 
//           id: 1
//         },
//         getNewLose: {
//           description: check if a player lost, 
//           id: 2
//         }, 
//         getLevelUp: {
//           description: check if a player leveled up, 
//           id: 3
//         }, 
//         get10LastGames: {
//           description: get 10 last games, 
//           id: 4
//         }, 
//         getNewGame: {
//           description: check if there is a new game, 
//           id: 5
//         }, 
//         getPlayerStartNewGame: {
//           description: check if a player start a new game, 
//           id: 6
//         }
//       }, 
//       logo: assets/images/riotLogo.png
//     },
//     spotify: {
//       color: {
//         red: 136, 
//         green: 238, 
//         blue: 81
//       }, 
//       actions: {
//         postToken: post token, 
//         getAudioFeaturesTrack: get audio features track, 
//         getNewReleases: get new releases
//       }, 
//       logo: assets/images/spotifyLogo.png
//     }, 
//     microsoft: {
//       color: {
//         red: 255, 
//         green: 255, 
//         blue: 255
//       }, 
//       reactions: {
//         sendMail: {
//           need: {
//             to: null, from: null, subject: null, text: null
//           }, 
//           description: send mail, 
//           id: 1
//         }
//       }, 
//       logo: assets/images/microsoftLogo.png
//     }, 
//     _id: 653fc39547719d476723c416
//   }
// }

///
/// [HomePage.]
///
/// [@author	Unknown]
/// [ @since	v0.0.1 ]
/// [@version	v1.0.0	Monday, October 30th, 2023]
/// [@see		StatefulWidget]
/// [@global]
///
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}


///
/// [_HomePageState.]
///
/// [@author	Unknown]
/// [ @since	v0.0.1 ]
/// [@version	v1.0.0	Monday, October 30th, 2023]
/// [@see		State]
/// [@global]
///
class _HomePageState extends State<HomePage> {

  @override
  void initState() {
    super.initState();
    loadAll(setState);
  }

  @override
  Widget build(BuildContext context) {
    Widget pageContent;
    switch (currentPageState) {
      case PageState.Areas:
        pageContent = buildHomePageContent(setState, context);
        break;
      case PageState.AddArea:
        searchController = TextEditingController();
        searchControllerReaction = TextEditingController();
        pageContent = buildAddAreaPageContent(nameInput, setState, context);
        break;
      case PageState.Profil:
        pageContent = buildProfilPageContent(setState, context); 
        break;
      case PageState.AreasStatus:
        pageContent = buildAreasStatusContent(setState, context); 
        break;
      case PageState.ServicesActions:
        pageContent = buildServicesActionsContent(searchController, setState, context);
        break;
      case PageState.ServicesReactions:
        pageContent = buildServicesReactionsContent(searchControllerReaction, setState, context);
        break;
      case PageState.ActionsList:
        pageContent = buildActionsListContent(setState, context);
        break;
      case PageState.ReactionList:
        pageContent = buildReactionListContent(setState, context);
        break;
      case PageState.Compte:
        pageContent = buildCompte(setState, context);
        break;
      case PageState.MesServices:
        pageContent = buildMesServices(setState, context);
      case PageState.ChangeArea:
        searchController = TextEditingController();
        searchControllerReaction = TextEditingController();
        pageContent = buildChangeAreaPageContent(nameInput, setState, context);
        break;
      case PageState.GetAllNeeds:
        pageContent = buildAskAllNeeds(setState, context);
        break;
    }

    return Scaffold(
      body: Center(
        child: pageContent,
      ),
    );
  }

  Widget buildReactionList(BuildContext context) {
    return Scaffold(
      body: buildReactionListContent(setState, context),
    );
  }

  Widget buildActionList(BuildContext context) {
    return Scaffold(
      body: buildActionsListContent(setState, context),
    );
  }

  Widget buildAreaContent(BuildContext context) {
    return Scaffold(
      body: buildAreasStatusContent(setState, context),
    );
  }
  
  Widget buildHomeProfil(BuildContext context) {
    return Scaffold(
      body: buildProfilPageContent(setState, context),
    );
  }

  Widget buildServicesActions(BuildContext context) {
    return Scaffold(
      body: buildServicesActionsContent(searchController, setState, context),
    );
  }

  Widget buildServicesReactions(BuildContext context) {
    return Scaffold(
      body: buildServicesReactionsContent(searchControllerReaction, setState, context),
    );
  }

  Widget buildAddArea(BuildContext context) {
    return Scaffold(
      body: buildAddAreaPageContent(nameInput, setState, context),
    );
  }

  Widget buildAreaList(BuildContext context) {
    return Scaffold(
      body: buildHomePageContent(setState, context),
    );
  }

  Widget buildCompteSetting(BuildContext context) {
    return Scaffold(
      body: buildCompte(setState, context),
    );
  }
  
  Widget buildMesServicesSetting(BuildContext context) {
    return Scaffold(
      body: buildMesServices(setState, context),
    );
  }
}
