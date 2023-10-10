import 'package:flutter/material.dart';
import 'package:mobile/LoginPage.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/Globals.dart' as globals;

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
  final String IconPath;
  final int red;
  final int green;
  final int blue;
  final List<String> actions;
  final List<String> reactions;

  Service({
    required this.titre,
    required this.IconPath,
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

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  PageState currentPageState = PageState.Areas;
  int indexOfServicesToPrint = 0;
  List<int> indexForCreationPage = [-1, -1, -1, -1];
  bool areaNameIsNotEmpty = false;

  TextEditingController nameInput = TextEditingController();
  TextEditingController searchController = TextEditingController();
  TextEditingController searchControllerReaction = TextEditingController();

  void homeButtonPress() {
    setState(() {
      currentPageState = PageState.Areas;
    });
  }

  void addAreaPress() {
    setState(() {
      currentPageState = PageState.AddArea;
    });
  }

  void profilButtonPress() {
    setState(() {
      currentPageState = PageState.Profil;
    });
  }

  void onElementTap() {
    setState(() {
      currentPageState = PageState.AreasStatus;
    });
  }

  void onActionTap() {
    setState(() {
      currentPageState = PageState.ServicesActions;
    });
  }

  void onReactionTap() {
    setState(() {
      currentPageState = PageState.ServicesReactions;
    });
  }

  void onActionList(int index) {
    setState(() {
      indexOfServicesToPrint = index;
      currentPageState = PageState.ActionsList;
    });
  }

  void onReactionList(int index) {
    setState(() {
      indexOfServicesToPrint = index;
      currentPageState = PageState.ReactionList;
    });
  }

  void setActionInCreationAreaPage(int actionIndex, int serviceIdex) {
    setState(() {
      indexForCreationPage[0] = serviceIdex + 1 ;
      indexForCreationPage[1] = actionIndex + 1;
      currentPageState = PageState.AddArea;
    });
  }

  void setReactionInCreationAreaPage(int reactionIndex, int serviceIdex) {
    setState(() {
      indexForCreationPage[2] = serviceIdex + 1;
      indexForCreationPage[3] = reactionIndex + 1;
      currentPageState = PageState.AddArea;
    });
  }

  void addArea(String name) {
    setState(() {
      nameInput.text = '';
      createdAreas.add(CreatedArea(name: name, isActive: true, areaIdOne: indexForCreationPage[0], areaIdTwo: indexForCreationPage[2], areaOneActionId: indexForCreationPage[1], areaTwoActionId: indexForCreationPage[3], createdBy: 'Moi'));
      indexForCreationPage = [-1, -1, -1, -1];
      currentPageState = PageState.Areas;
    });
  }

  Future<void> onDeconectionTap() async {
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

    final List<Service> elements = [
    Service(titre: 'discord', IconPath: 'assets/images/DiscordLogo.png', red: 89, green: 78, blue: 229, actions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer'], reactions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer']),
    Service(titre: 'facebook', IconPath: 'assets/images/FacebookLogo.png', red: 0, green: 0, blue: 255, actions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer'], reactions: []),
    Service(titre: 'google', IconPath: 'assets/images/GoogleLogo.png', red: 160, green: 239, blue: 236, actions: [], reactions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer']),
    Service(titre: 'youtube', IconPath: 'assets/images/YoutubeLogo.png', red: 255, green: 0, blue: 0, actions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer'], reactions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer']),
    Service(titre: 'discord', IconPath: 'assets/images/DiscordLogo.png', red: 89, green: 78, blue: 229, actions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer'], reactions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer']),
    Service(titre: 'facebook', IconPath: 'assets/images/FacebookLogo.png', red: 0, green: 0, blue: 255, actions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer'], reactions: []),
    Service(titre: 'google', IconPath: 'assets/images/GoogleLogo.png', red: 160, green: 239, blue: 236, actions: [], reactions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer']),
    Service(titre: 'youtube', IconPath: 'assets/images/YoutubeLogo.png', red: 255, green: 0, blue: 0, actions: ['Allumer', 'Éteindre', 'Modifier'], reactions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer']),
    Service(titre: 'discord', IconPath: 'assets/images/DiscordLogo.png', red: 89, green: 78, blue: 229, actions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer'], reactions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer']),
    Service(titre: 'facebook', IconPath: 'assets/images/FacebookLogo.png', red: 0, green: 0, blue: 255, actions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer'], reactions: []),
    Service(titre: 'google', IconPath: 'assets/images/GoogleLogo.png', red: 160, green: 239, blue: 236, actions: [], reactions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer']),
    Service(titre: 'youtube', IconPath: 'assets/images/YoutubeLogo.png', red: 255, green: 0, blue: 0, actions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer'], reactions: ['Allumer', 'Éteindre', 'Modifier', 'Supprimer']),
  ];

  final List<CreatedArea> createdAreas = [
    CreatedArea(name:"area1", isActive: true, areaIdOne: 1, areaIdTwo: 1, areaOneActionId: 4, areaTwoActionId: 2, createdBy: 'Moi'),
    CreatedArea(name:"area2", isActive: true, areaIdOne: 4, areaIdTwo: 4, areaOneActionId: 2, areaTwoActionId: 3, createdBy: 'Moi'),
    CreatedArea(name:"area3", isActive: false, areaIdOne: 1, areaIdTwo: 4, areaOneActionId: 1, areaTwoActionId: 4, createdBy: 'Moi'),
    CreatedArea(name:"area4", isActive: true, areaIdOne: 2, areaIdTwo: 3, areaOneActionId: 3, areaTwoActionId: 1, createdBy: 'Moi'),
  ];

  @override
  Widget build(BuildContext context) {
    Widget pageContent;
    switch (currentPageState) {
      case PageState.Areas:
        pageContent = buildHomePageContent();
        break;
      case PageState.AddArea:
        searchController = TextEditingController();
        searchControllerReaction = TextEditingController();
        pageContent = buildAddAreaPageContent(nameInput);
        break;
      case PageState.Profil:
        pageContent = buildProfilPageContent(); 
        break;
      case PageState.AreasStatus:
        pageContent = buildAreasStatusContent(); 
        break;
      case PageState.ServicesActions:
        pageContent = buildServicesActionsContent(searchController);
        break;
      case PageState.ServicesReactions:
        pageContent = buildServicesReactionsContent(searchControllerReaction);
        break;
      case PageState.ActionsList:
        pageContent = buildActionsListContent();
        break;
      case PageState.ReactionList:
        pageContent = buildReactionListContent();
        break;
  }

  return Scaffold(
    body: Center(
      child: pageContent,
    ),
  );
}

  Widget buildReactionListContent() {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      body: Center(
        child: Stack(
          children: [
            Positioned(
              top: -30,
              left: 0,
              child: Container(
                width: screenWidth,
                height: screenHeight * 0.4,
                decoration: BoxDecoration(
                  color: Color.fromARGB(255, elements[indexOfServicesToPrint].red, elements[indexOfServicesToPrint].green, elements[indexOfServicesToPrint].blue),
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
            ),
            Positioned(
              left: screenWidth * 0.05,
              top: screenHeight * 0.08,
              child: GestureDetector(
                onTap: onActionTap,
                child: Container(
                  width: 22,
                  height: 22,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/images/goBackButton.png'),
                      fit: BoxFit.cover,
                    ),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
              ),
            ),
            Positioned(
              top: screenHeight * 0.25,
              left: screenWidth * 0.35,
              child: Center(
                child: Text(
                  elements[indexOfServicesToPrint].titre,
                  style: TextStyle(
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                    color: Color.fromARGB(255, 0,0,0),
                  ),
                ),
              ),
            ),
            Positioned(
              left: screenWidth * 0.35,
              top: screenHeight * 0.1,
                child: Container(
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage(elements[indexOfServicesToPrint].IconPath),
                      fit: BoxFit.cover,
                    ),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
              ),
            Positioned(
              left: screenWidth * 0.05,
              top: screenHeight * 0.358,
              child: Container(
                width: screenWidth * 0.9,
                height: screenHeight * 0.64,
                child: ListView.separated(
                  itemCount: elements[indexOfServicesToPrint].reactions.length,
                  separatorBuilder: (context, index) => SizedBox(height: 30.0),
                  itemBuilder: (context, index) {
                    final element = elements[indexOfServicesToPrint];
                    return Container(
                      height: screenHeight * 0.1,
                      width: screenWidth * 0.8,
                      child: Stack(
                        children: [
                          Positioned(
                            child: GestureDetector(
                              onTap: () {
                                setReactionInCreationAreaPage(index, indexOfServicesToPrint);
                              },
                              child :Container(
                                decoration: BoxDecoration(
                                  color: Color.fromARGB(255, element.red, element.green, element.blue),
                                  borderRadius: BorderRadius.circular(30.0),
                                ),
                              ),
                            ),
                          ),
                          Positioned(
                            left: screenWidth * 0.05,
                            top: screenHeight * 0.03,
                            child: Text(
                              element.reactions[index],
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Color.fromARGB(255, 0,0,0),
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildActionsListContent() {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      body: Center(
        child: Stack(
          children: [
            Positioned(
              top: -30,
              left: 0,
              child: Container(
                width: screenWidth,
                height: screenHeight * 0.4,
                decoration: BoxDecoration(
                  color: Color.fromARGB(255, elements[indexOfServicesToPrint].red, elements[indexOfServicesToPrint].green, elements[indexOfServicesToPrint].blue),
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
            ),
            Positioned(
              left: screenWidth * 0.05,
              top: screenHeight * 0.08,
              child: GestureDetector(
                onTap: onActionTap,
                child: Container(
                  width: 22,
                  height: 22,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/images/goBackButton.png'),
                      fit: BoxFit.cover,
                    ),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
              ),
            ),
            Positioned(
              top: screenHeight * 0.25,
              left: screenWidth * 0.35,
              child: Center(
                child: Text(
                  elements[indexOfServicesToPrint].titre,
                  style: TextStyle(
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                    color: Color.fromARGB(255, 0,0,0),
                  ),
                ),
              ),
            ),
            Positioned(
              left: screenWidth * 0.35,
              top: screenHeight * 0.1,
                child: Container(
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage(elements[indexOfServicesToPrint].IconPath),
                      fit: BoxFit.cover,
                    ),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
              ),
            Positioned(
              left: screenWidth * 0.05,
              top: screenHeight * 0.358,
              child: Container(
                width: screenWidth * 0.9,
                height: screenHeight * 0.64,
                child: ListView.separated(
                  itemCount: elements[indexOfServicesToPrint].actions.length,
                  separatorBuilder: (context, index) => SizedBox(height: 30.0),
                  itemBuilder: (context, index) {
                    final element = elements[indexOfServicesToPrint];
                    return Container(
                      height: screenHeight * 0.1,
                      width: screenWidth * 0.8,
                      child: Stack(
                        children: [
                          Positioned(
                            child: GestureDetector(
                              onTap: () {
                                setActionInCreationAreaPage(index, indexOfServicesToPrint);
                              },
                              child :Container(
                                decoration: BoxDecoration(
                                  color: Color.fromARGB(255, element.red, element.green, element.blue),
                                  borderRadius: BorderRadius.circular(30.0),
                                ),
                              ),
                            ),
                          ),
                          Positioned(
                            left: screenWidth * 0.05,
                            top: screenHeight * 0.03,
                            child: Text(
                              element.actions[index],
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Color.fromARGB(255, 0,0,0),
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildAreasStatusContent() {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      body: Center(
        child: Stack(
          children: [
            Positioned(
              left: screenWidth * 0.05,
              top: screenHeight * 0.08,
              child: GestureDetector(
                onTap: homeButtonPress,
                child: Container(
                  width: 22,
                  height: 22,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/images/goBackButton.png'),
                      fit: BoxFit.cover,
                    ),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
              ),
            ),
            Positioned(
              top: 17.0,
              left: 20.0,
              child: Center(
                child: Text(
                  'areaSettings',
                  style: TextStyle(
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                    color: Color.fromARGB(255, 0,0,0),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildProfilPageContent() {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      body: Center(
        child: Stack(
          children: [
            Positioned(
              left: screenWidth * 0.05,
              top: screenHeight * 0.08,
              child: GestureDetector(
                onTap: homeButtonPress,
                child: Container(
                  width: 22,
                  height: 22,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/images/goBackButton.png'),
                      fit: BoxFit.cover,
                    ),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildServicesReactionsContent(TextEditingController searchControllerReaction) {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      body: Center(
        child: Stack(
          children: [
            Positioned(
              left: screenWidth * 0.05,
              top: screenHeight * 0.08,
              child: GestureDetector(
                onTap: addAreaPress,
                child: Container(
                  width: 22,
                  height: 22,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/images/goBackButton.png'),
                      fit: BoxFit.cover,
                    ),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
              ),
            ),
            Positioned(
              left: screenWidth * 0.35,
              top: screenHeight * 0.06,
              child: Text(
                'Services',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Positioned(
              left: screenWidth * 0.33,
              top: screenHeight * 0.11,
              child: GestureDetector(
                onTap: profilButtonPress,
                child: Container(
                  width: 110,
                  height: 3,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/images/barreHorizontale.png'),
                      fit: BoxFit.cover,
                    ),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
              ),
            ),
            Positioned(
              left: screenWidth * 0.05,
              top: screenHeight * 0.15,
              child: Container(
                width: screenWidth * 0.9,
                height: screenHeight * 0.07,
                decoration: BoxDecoration(
                  color: Color.fromARGB(255, 168, 163, 163),
                  borderRadius: BorderRadius.circular(10.0),
                ),
                child: Row(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Icon(Icons.search),
                    ),
                    Expanded(
                      child: TextField(
                        controller: searchControllerReaction,
                        onChanged: (value) {
                          setState(() {});
                        },
                        decoration: InputDecoration(
                          hintText: 'Rechercher...',
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Positioned(
              left: screenWidth * 0.05,
              top: screenHeight * 0.20,
              child: Container(
                width: screenWidth * 0.9,
                height: screenHeight * 0.71,
                child: ListView.separated(
                  itemCount: (elements.length / 2).ceil(),
                  separatorBuilder: (context, index) => SizedBox(height: screenHeight * 0.02),
                  itemBuilder: (context, index) {
                    final startIndex = index * 2;
                    final endIndex = startIndex + 1;

                    if (startIndex >= elements.length) {
                      return SizedBox.shrink(); 
                    }

                    final element1 = elements[startIndex];
                    final element2 = endIndex < elements.length ? elements[endIndex] : null;

                    bool showElement1 = element1.titre.contains(searchControllerReaction.text) && element1.reactions.isNotEmpty;
                    bool showElement2 = element2 == null ? false : element2.reactions.isNotEmpty && element2.titre.contains(searchControllerReaction.text);

                    return Row(
                      children: [
                        if (showElement1)
                          Expanded(
                            child: Container(
                              height: screenHeight * 0.25,
                              child: Stack(
                                children: [
                                  Container(
                                    decoration: BoxDecoration(
                                      color: Color.fromARGB(255, element1.red, element1.green, element1.blue),
                                      borderRadius: BorderRadius.circular(10.0),
                                    ),
                                  ),
                                  Positioned(
                                    top: 10.0,
                                    right: 10.0,
                                    child: GestureDetector(
                                      onTap: onElementTap,
                                      child: Image.asset(
                                        'assets/images/parameter.png',
                                        width: 24.0,
                                        height: 24.0,
                                      ),
                                    ),
                                  ),
                                  Positioned(
                                    top: screenHeight * 0.07,
                                    left: !showElement2 ? screenWidth * 0.25 : screenWidth * 0.05,
                                    child: GestureDetector(
                                      onTap: () {
                                        onReactionList(startIndex);
                                      },
                                      child: Image.asset(
                                        element1.IconPath,
                                        width: screenHeight * 0.2,
                                        height: screenWidth * 0.2,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          SizedBox(width: screenWidth * 0.03),
                        if (showElement2)
                          Expanded(
                            child: Container(
                              height: screenHeight * 0.25,
                              child: Stack(
                                children: [
                                  Container(
                                    decoration: BoxDecoration(
                                      color: Color.fromARGB(255, element2.red, element2.green, element2.blue),
                                      borderRadius: BorderRadius.circular(10.0),
                                    ),
                                  ),
                                  Positioned(
                                    top: 10.0,
                                    right: 10.0,
                                    child: GestureDetector(
                                      onTap: onElementTap,
                                      child: Image.asset(
                                        'assets/images/parameter.png',
                                        width: 24.0,
                                        height: 24.0,
                                      ),
                                    ),
                                  ),
                                  Positioned(
                                    top: screenHeight * 0.07,
                                    left: !showElement1 ? screenWidth * 0.25 : screenWidth * 0.05,
                                    child: GestureDetector(
                                      onTap: () {
                                        onReactionList(endIndex);
                                      },
                                      child: Image.asset(
                                        element2.IconPath,
                                        width: screenHeight * 0.2,
                                        height: screenWidth * 0.2,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                      ],
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildServicesActionsContent(TextEditingController searchController) {
  final screenWidth = MediaQuery.of(context).size.width;
  final screenHeight = MediaQuery.of(context).size.height;

  return Scaffold(
    body: Center(
      child: Stack(
        children: [
          Positioned(
            left: screenWidth * 0.05,
            top: screenHeight * 0.08,
            child: GestureDetector(
              onTap: addAreaPress,
              child: Container(
                width: 22,
                height: 22,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage('assets/images/goBackButton.png'),
                    fit: BoxFit.cover,
                  ),
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
            ),
          ),
          Positioned(
            left: screenWidth * 0.35,
            top: screenHeight * 0.06,
            child: Text(
              'Services',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Positioned(
            left: screenWidth * 0.33,
            top: screenHeight * 0.11,
            child: GestureDetector(
              onTap: profilButtonPress,
              child: Container(
                width: 110,
                height: 3,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage('assets/images/barreHorizontale.png'),
                    fit: BoxFit.cover,
                  ),
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
            ),
          ),
          Positioned(
            left: screenWidth * 0.05,
            top: screenHeight * 0.15,
            child: Container(
              width: screenWidth * 0.9,
              height: screenHeight * 0.07,
              decoration: BoxDecoration(
                color: Color.fromARGB(255, 168, 163, 163),
                borderRadius: BorderRadius.circular(10.0),
              ),
              child: Row(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Icon(Icons.search),
                  ),
                  Expanded(
                    child: TextField(
                      controller: searchController,
                      onChanged: (value) {
                        setState(() {});
                      },
                      decoration: InputDecoration(
                        hintText: 'Rechercher...',
                        border: InputBorder.none,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            left: screenWidth * 0.05,
            top: screenHeight * 0.20,
            child: Container(
              width: screenWidth * 0.9,
              height: screenHeight * 0.71,
              child: ListView.separated(
                itemCount: (elements.length / 2).ceil(),
                separatorBuilder: (context, index) => SizedBox(height: screenHeight * 0.02),
                itemBuilder: (context, index) {
                  final startIndex = index * 2;
                  final endIndex = startIndex + 1;

                  if (startIndex >= elements.length) {
                    return SizedBox.shrink(); 
                  }

                  final element1 = elements[startIndex];
                  final element2 = endIndex < elements.length ? elements[endIndex] : null;

                  bool showElement1 = element1.titre.contains(searchController.text) && element1.actions.isNotEmpty;
                  bool showElement2 = element2 == null ? false : element2.actions.isNotEmpty && element2.titre.contains(searchController.text);

                  return Row(
                    children: [
                      if (showElement1)
                        Expanded(
                          child: Container(
                            height: screenHeight * 0.25,
                            child: Stack(
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                    color: Color.fromARGB(255, element1.red, element1.green, element1.blue),
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                ),
                                Positioned(
                                  top: 10.0,
                                  right: 10.0,
                                  child: GestureDetector(
                                    onTap: () {
                                        onActionList(startIndex);
                                      },
                                    child: Image.asset(
                                      'assets/images/parameter.png',
                                      width: 24.0,
                                      height: 24.0,
                                    ),
                                  ),
                                ),
                                Positioned(
                                  top: screenHeight * 0.07,
                                  left: !showElement2 ? screenWidth * 0.25 : screenWidth * 0.05,
                                  child: GestureDetector(
                                    onTap: () {
                                        onActionList(startIndex);
                                      },
                                    child: Image.asset(
                                      element1.IconPath,
                                      width: screenHeight * 0.2,
                                      height: screenWidth * 0.2,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        SizedBox(width: screenWidth * 0.03),
                      if (showElement2)
                        Expanded(
                          child: Container(
                            height: screenHeight * 0.25,
                            child: Stack(
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                    color: Color.fromARGB(255, element2.red, element2.green, element2.blue),
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                ),
                                Positioned(
                                  top: 10.0,
                                  right: 10.0,
                                  child: GestureDetector(
                                    onTap: onElementTap,
                                    child: Image.asset(
                                      'assets/images/parameter.png',
                                      width: 24.0,
                                      height: 24.0,
                                    ),
                                  ),
                                ),
                                Positioned(
                                  top: screenHeight * 0.07,
                                  left: !showElement1 ? screenWidth * 0.25 : screenWidth * 0.05,
                                  child: GestureDetector(
                                    onTap: () {
                                        onActionList(endIndex);
                                      },
                                    child: Image.asset(
                                      element2.IconPath,
                                      width: screenHeight * 0.2,
                                      height: screenWidth * 0.2,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                    ],
                  );
                },
              ),
            ),
          ),
        ],
      ),
    ),
  );
}

  Widget buildAddAreaPageContent(TextEditingController nameInput) {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;
    final bool designedElementForAction = indexForCreationPage[0] >= 0;
    final bool designedElementForReaction = indexForCreationPage[2] >= 0;
    String nameOfArea = nameInput.text;

    void validateForm() {
      setState(() {
        areaNameIsNotEmpty = nameOfArea.isNotEmpty;
      });
    }

    return Scaffold(
      body: Center(
        child: Stack(
          children: [
            Form(
              child: Positioned(
                top: screenHeight * 0.14,
                left: screenWidth * 0.05,
                child: Container(
                  width: 350,
                  height: 50,
                  padding: EdgeInsets.all(8.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30.0),
                  ),
                  child: TextFormField(
                    controller: nameInput,
                    decoration: InputDecoration(
                      hintText: 'Area name',
                      border: InputBorder.none,
                      labelStyle: TextStyle(
                          fontWeight: FontWeight.bold,
                      ),
                      contentPadding: EdgeInsets.symmetric(vertical: 10.0),
                    ),
                    onChanged: (value) {
                        nameOfArea = value;
                        validateForm();
                    },
                  ),
                ),
              ),
            ),
            Positioned(
              top: screenHeight * 0.35,
              left: screenWidth * 0.5,
              child :Container(
                height: screenHeight * 0.11,
                width: screenWidth * 0.01,
                decoration: BoxDecoration(
                  color: Color.fromARGB(255, 168, 163, 163),
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
            ),
            Positioned(
              left: screenWidth * 0.05,
              top: screenHeight * 0.08,
              child: GestureDetector(
                onTap: homeButtonPress,
                child: Container(
                  width: 22,
                  height: 22,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/images/goBackButton.png'),
                      fit: BoxFit.cover,
                    ),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
              ),
            ),
            Positioned(
              left: screenWidth * 0.05,
              top: screenHeight * 0.25,
              child: Stack(
                children: [
                  Container(
                    height: screenHeight * 0.1,
                    width: screenWidth * 0.9,
                    decoration: BoxDecoration(
                      color: designedElementForAction ? Color.fromARGB(255, elements[indexForCreationPage[0] - 1].red, elements[indexForCreationPage[0] - 1].green, elements[indexForCreationPage[0] - 1].blue) : Color.fromARGB(255, 0, 0, 0),
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  if (designedElementForAction)
                    Positioned(
                      top: screenHeight * 0.025, 
                      left: screenWidth * 0.36,
                      child: Image.asset(
                        elements[indexForCreationPage[0] - 1].IconPath,
                        width: screenWidth * 0.2,
                        height: screenHeight * 0.05,
                      ),
                    ),
                  Positioned(
                    top: 17.0,
                    left: 20.0,
                    child: Center(
                      child: Text(
                        'Action',
                        style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.bold,
                          color: Color.fromARGB(255, 255, 255, 255),
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    right: screenWidth * 0.05,
                    top: screenHeight * 0.015,
                    child: GestureDetector(
                      onTap: onActionTap,
                      child: Container(
                        height: screenHeight * 0.07,
                        width: screenWidth * 0.3,
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 255, 255, 255),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        child: Center(
                          child: Text(
                            designedElementForAction ? 'Modifier' : 'Ajouter',
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Color.fromARGB(255, 0, 0, 0),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Positioned(
              left: screenWidth * 0.05,
              top: screenHeight * 0.45,
              child: Stack(
                children: [
                  Container(
                    height: screenHeight * 0.1,
                    width: screenWidth * 0.9,
                    decoration: BoxDecoration(
                      color: designedElementForReaction ? Color.fromARGB(255, elements[indexForCreationPage[2] - 1].red, elements[indexForCreationPage[2] - 1].green, elements[indexForCreationPage[2] - 1].blue) : Color.fromARGB(255, 168, 163, 163),
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  if (designedElementForReaction)
                    Positioned(
                      top: screenHeight * 0.025, 
                      left: screenWidth * 0.36,
                      child: Image.asset(
                        elements[indexForCreationPage[2] - 1].IconPath,
                        width: screenWidth * 0.2,
                        height: screenHeight * 0.05,
                      ),
                    ),
                  Positioned(
                    top: 17.0,
                    left: 20.0,
                    child: Center(
                      child: Text(
                        'Réaction',
                        style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.bold,
                          color: Color.fromARGB(255, 0, 0, 0),
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    right: screenWidth * 0.05,
                    top: screenHeight * 0.015,
                    child: GestureDetector(
                      onTap: onReactionTap,
                      child: Container(
                        height: screenHeight * 0.07,
                        width: screenWidth * 0.3,
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 255, 255, 255),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        child: Center(
                          child: Text(
                            designedElementForReaction ? 'Modifier' : 'Ajouter',
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Color.fromARGB(255, 0, 0, 0),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            if (designedElementForReaction && designedElementForAction && areaNameIsNotEmpty)
              Positioned(
                left: screenWidth * 0.35,
                top: screenHeight * 0.8,
                child: GestureDetector(
                  onTap: () {
                    addArea(nameOfArea);
                  },
                  child: Container(
                    height: screenHeight * 0.07,
                    width: screenWidth * 0.3,
                    decoration: BoxDecoration(
                      color: Color.fromARGB(255, 146, 247, 154),
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    child: Center(
                      child: Text(
                        'Valider',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Color.fromARGB(255, 0, 0, 0),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget buildHomePageContent() {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      body: Center(
        child: Stack(
          children: [
            Positioned(
              top: screenHeight * 0.05,
              right: screenWidth * 0.05,
              child: TextButton(
                onPressed: () {
                  onDeconectionTap();
                },
                style: TextButton.styleFrom(
                  backgroundColor: Colors.transparent, // Fond transparent
                ),
                child: Text(
                  'Déconnexion',
                  style: TextStyle(
                    color: Color.fromARGB(255, 110, 110, 110), // Texte en blanc
                    decoration: TextDecoration.underline, // Souligner le texte (optionnel)
                  ),
                ),
              ),
            ),
            // Positioned(
            //   left: screenWidth * 0.1,
            //   top: screenHeight * 0.9,
            //   child: GestureDetector(
            //     onTap: homeButtonPress,
            //     child: Container(
            //       width: 40,
            //       height: 40,
            //       decoration: BoxDecoration(
            //         image: DecorationImage(
            //           image: AssetImage('assets/images/homeButton.png'),
            //           fit: BoxFit.cover,
            //         ),
            //         borderRadius: BorderRadius.circular(10.0),
            //       ),
            //     ),
            //   ),
            // ),
            Positioned(
              left: screenWidth * 0.45,
              top: screenHeight * 0.9,
              child: GestureDetector(
                onTap: addAreaPress,
                child: Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/images/addArea.png'),
                      fit: BoxFit.cover,
                    ),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
              ),
            ),
            // Positioned(
            //   left: screenWidth * 0.85,
            //   top: screenHeight * 0.9,
            //   child: GestureDetector(
            //     onTap: profilButtonPress,
            //     child: Container(
            //       width: 40,
            //       height: 40,
            //       decoration: BoxDecoration(
            //         image: DecorationImage(
            //           image: AssetImage('assets/images/profilButton.png'),
            //           fit: BoxFit.cover,
            //         ),
            //         borderRadius: BorderRadius.circular(10.0),
            //       ),
            //     ),
            //   ),
            // ),
            Positioned(
              left: screenWidth * 0.07,
              top: screenHeight * 0.07,
              child: Text(
                'Affichage des Areas',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Positioned(
              left: screenWidth * 0.07,
              top: screenHeight * 0.12,
              child: GestureDetector(
                onTap: profilButtonPress,
                child: Container(
                  width: 100,
                  height: 3,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/images/barreHorizontale.png'),
                      fit: BoxFit.cover,
                    ),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                ),
              ),
            ),
            Positioned(
              left: screenWidth * 0.05,
              top: screenHeight * 0.15,
              child: Container(
                width: screenWidth * 0.9,
                height: screenHeight * 0.71,
                child: ListView.separated(
                  itemCount: createdAreas.length,
                  separatorBuilder: (context, index) => SizedBox(height: 16.0),
                  itemBuilder: (context, index) {
                    final element = createdAreas[index];
                    return Container(
                      height: screenHeight * 0.4,
                      width: screenWidth * 0.8,
                      child: Stack(
                        children: [
                          Container(
                            decoration: BoxDecoration(
                              color: Color.fromARGB(255, 125, 140, 140),
                              borderRadius: BorderRadius.circular(10.0),
                            ),
                          ),
                          Positioned(
                            top: 10.0,
                            right: 10.0,
                            child: GestureDetector(
                              onTap: onElementTap,
                              child: Image.asset(
                                'assets/images/parameter.png',
                                width: 24.0,
                                height: 24.0,
                              ),
                            ),
                          ),
                          Positioned(
                            top: 0,
                            left: 10.0,
                            width: screenWidth * 0.08,
                            height: screenHeight * 0.08,
                            child: Image.asset(
                              elements[element.areaIdOne - 1].IconPath,
                            ),
                          ),
                          Positioned(
                            top: 0,
                            left: 50.0,
                            width: screenWidth * 0.08,
                            height: screenHeight * 0.08,
                            child: Image.asset(
                              elements[element.areaIdTwo - 1].IconPath,
                            ),
                          ),
                          Positioned(
                            top: 10,
                            left: 150.0,
                            child: Text(
                              createdAreas[index].name,
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Color.fromARGB(255,0 ,0 ,0),
                              ),
                            ),
                          ),
                          Positioned(
                            top: 50.0,
                            left: 10.0,
                            child: Text(
                              elements[element.areaIdOne - 1].actions[element.areaOneActionId - 1],
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Color.fromARGB(255, elements[element.areaIdOne - 1].red, elements[element.areaIdOne - 1].green, elements[element.areaIdOne - 1].blue),
                              ),
                            ),
                          ),
                          Positioned(
                            top: 80.0,
                            left: 10.0,
                            child: Text(
                              elements[element.areaIdTwo - 1].reactions[element.areaTwoActionId - 1],
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Color.fromARGB(255, elements[element.areaIdTwo - 1].red, elements[element.areaIdTwo - 1].green, elements[element.areaIdTwo - 1].blue),
                              ),
                            ),
                          ),
                          Positioned(
                            top: 180.0,
                            left: 10.0,
                            child: Text(
                              'Créé par ${element.createdBy}',
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Color.fromARGB(255, 255, 255, 255),
                              ),
                            ),
                          ),
                          Positioned(
                            top: screenWidth * 0.53,
                            left: 20.0,
                            child: Row(
                              children: [
                                Text('OFF'),
                                Switch(
                                  value: element.isActive,
                                  onChanged: (newValue) {
                                    element.isActive = newValue;
                                    setState(() {});
                                  },
                                ),
                                Text('ON'),
                              ],
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
