import 'package:flutter/material.dart';
import 'HomeGlobale.dart';
import 'HomeElementList.dart';
import 'HomeAllButton.dart';

Widget buildHomePageContent(setState, context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;
    loadAll();

    return Scaffold(
      body: Center(
        child: Stack(
          children: [
            Positioned(
              top: screenHeight * 0.05,
              right: screenWidth * 0.05,
              child: TextButton(
                onPressed: () {
                  onDeconectionTap(setState);
                },
                style: TextButton.styleFrom(
                  backgroundColor: Colors.transparent,
                ),
                child: Text(
                  'Déconnexion',
                  style: TextStyle(
                    color: Color.fromARGB(255, 110, 110, 110),
                    decoration: TextDecoration.underline,
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
                onTap: () {
                  addAreaPress(setState);
                },
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
                onTap: () {
                  setState(() {
                    profilButtonPress(setState);
                  });
                },
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
                          // Positioned(
                          //   top: 10.0,
                          //   right: 10.0,
                          //   child: GestureDetector(
                          //     onTap: onElementTap,
                          //     child: Image.asset(
                          //       'assets/images/parameter.png',
                          //       width: 24.0,
                          //       height: 24.0,
                          //     ),
                          //   ),
                          // ),
                          Positioned(
                            top: 0,
                            left: 10.0,
                            width: screenWidth * 0.08,
                            height: screenHeight * 0.08,
                            child: Image.asset(
                              elements[element.areaIdOne - 1].iconPath,
                            ),
                          ),
                          Positioned(
                            top: 0,
                            left: 50.0,
                            width: screenWidth * 0.08,
                            height: screenHeight * 0.08,
                            child: Image.asset(
                              elements[element.areaIdTwo - 1].iconPath,
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
                                    changeStatusOfArea(setState, index, newValue);
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