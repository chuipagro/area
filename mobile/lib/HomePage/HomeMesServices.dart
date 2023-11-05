import 'package:flutter/material.dart';
import 'HomeAllButton.dart';
import 'HomeGlobale.dart';

Widget buildMesServices(setState, context) {
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
              onTap: () {
                profilButtonPress(setState);
              },
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
            top: screenHeight * 0.07,
            left: screenWidth * 0.13,
            child: Center(
              child: Text(
                'Mes Services',
                style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                  color: Color.fromARGB(255, 0, 0, 0),
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
                itemCount: elements.length,
                separatorBuilder: (context, index) => SizedBox(height: 16.0),
                itemBuilder: (context, index) {
                  if (elements.isNotEmpty) {
                    if (index < elements.length) {
                      final element = elements[index];
                      if (element.titre == "spotify" ||
                          element.titre == "github" ||
                          element.titre == "google") {
                        return GestureDetector(
                          onTap: () {
                            setUpOAuth2(element.titre);
                          },
                          child: Container(
                            height: screenHeight * 0.15,
                            width: screenWidth * 0.8,
                            child: Stack(
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                    color: Color.fromARGB(255, 150, 97, 97),
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                ),
                                Positioned(
                                  top: 10,
                                  left: 10.0,
                                  width: screenWidth * 0.12,
                                  height: screenHeight * 0.12,
                                  child: Image.asset(
                                    element.iconPath,
                                  ),
                                ),
                                Positioned(
                                  top: 35,
                                  left: 150.0,
                                  child: Text(
                                    element.titre,
                                    style: TextStyle(
                                      fontSize: 30,
                                      fontWeight: FontWeight.bold,
                                      color: Color.fromARGB(255, 0, 0, 0),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      }
                    }
                  }
                  return SizedBox.shrink();
                },
              ),
            ),
          )
        ],
      ),
    ),
  );
}
