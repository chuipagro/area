import 'package:flutter/material.dart';
import 'HomeGlobale.dart';
import 'HomeAllButton.dart';

Widget buildHomePageContent(setState, context) {
  final screenWidth = MediaQuery.of(context).size.width;
  final screenHeight = MediaQuery.of(context).size.height;
  if (needToReload) {
    loadAll(setState);
    needToReload = false;
  }

  return Scaffold(
    body: Center(
      child: Stack(
        children: [
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
          Positioned(
            left: screenWidth * 0.85,
            top: screenHeight * 0.9,
            child: GestureDetector(
              onTap: () {
                getUserInfo(setState);
              },
              child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage('assets/images/profilButton.png'),
                    fit: BoxFit.cover,
                  ),
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
            ),
          ),
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
                  if (createdAreas.isNotEmpty) {
                    if (index < createdAreas.length) {
                      final element = createdAreas[index];
                      return Container(
                        height: screenHeight * 0.4,
                        width: screenWidth * 0.8,
                        child: Stack(
                          children: [
                            Container(
                              decoration: BoxDecoration(
                                color: Color.fromARGB(255, 180, 165, 165),
                                borderRadius: BorderRadius.circular(10.0),
                              ),
                            ),
                            Positioned(
                              top: 10.0,
                              right: 10.0,
                              child: GestureDetector(
                                onTap: () {
                                  changeArea(setState, element);
                                },
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
                                elements[element.areaIdOne].iconPath,
                              ),
                            ),
                            Positioned(
                              top: 0,
                              left: 50.0,
                              width: screenWidth * 0.08,
                              height: screenHeight * 0.08,
                              child: Image.asset(
                                elements[element.areaIdTwo].iconPath,
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
                                  color: Color.fromARGB(255, 0, 0, 0),
                                ),
                              ),
                            ),
                            Positioned(
                              top: 50.0,
                              left: 10.0,
                              child: Text(
                                elements[element.areaIdOne]
                                    .actions[element.areaOneActionId]
                                    .name,
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: Color.fromARGB(
                                      255,
                                      elements[element.areaIdOne].red,
                                      elements[element.areaIdOne].green,
                                      elements[element.areaIdOne].blue),
                                ),
                              ),
                            ),
                            Positioned(
                              top: 80.0,
                              left: 10.0,
                              child: Text(
                                elements[element.areaIdTwo]
                                    .reactions[element.areaTwoActionId]
                                    .name,
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: Color.fromARGB(
                                      255,
                                      elements[element.areaIdTwo].red,
                                      elements[element.areaIdTwo].green,
                                      elements[element.areaIdTwo].blue),
                                ),
                              ),
                            ),
                            Positioned(
                              bottom: 15.0,
                              right: 10.0,
                              child: GestureDetector(
                                onTap: () {
                                  deleteArea(setState, element.name);
                                },
                                child: Image.asset(
                                  'assets/images/trash-can.png',
                                  width: 24.0,
                                  height: 24.0,
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
                                      changeStatusOfArea(
                                          setState, index, newValue);
                                    },
                                  ),
                                  Text('ON'),
                                ],
                              ),
                            ),
                          ],
                        ),
                      );
                    }
                  } else {
                    return Container(
                      height: screenHeight * 0.4,
                      width: screenWidth * 0.8,
                    );
                  }
                },
              ),
            ),
          ),
        ],
      ),
    ),
  );
}
