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
    needToReload = true;
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
