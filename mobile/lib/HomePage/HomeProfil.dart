import 'package:flutter/material.dart';
import 'HomeAllButton.dart';
import 'HomeGlobale.dart';

Widget buildProfilPageContent(setState, context) {
  final screenWidth = MediaQuery.of(context).size.width;
  final screenHeight = MediaQuery.of(context).size.height;

  return Scaffold(
    body: Center(
      child: Stack(
        children: [
          Positioned(
            left: screenWidth * 0.3,
            top: screenHeight * 0.15,
            child: Container(
              width: screenHeight * 0.2,
              height: screenHeight * 0.2,
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage('assets/images/YoutubeLogo.png'),
                  fit: BoxFit.cover,
                ),
                borderRadius: BorderRadius.circular(50.0),
              ),
            ),
          ),
          Positioned(
            left: screenWidth * 0.35,
            top: screenHeight * 0.38,
            child: Text(
              profilUser.name,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Positioned(
            top: screenHeight * 0.45,
            child: Container(
              width: 500,
              height: 4,
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
            left: screenWidth * 0.1,
            top: screenHeight * 0.5,
            child: GestureDetector(
              onTap: () {
                setState(() {
                  compteButtonPress(setState);
                });
              },
              child: Container(
                width: screenWidth * 0.8,
                height: screenHeight * 0.05,
                decoration: BoxDecoration(
                  color: Color.fromARGB(255, 255, 255, 255),
                  borderRadius: BorderRadius.circular(10.0),
                ),
                child: Center(
                  child: Text(
                    'Compte',
                    style: TextStyle(
                      color: Color.fromARGB(255, 0, 0, 0),
                    ),
                  ),
                ),
              ),
            ),
          ),
          Positioned(
            left: screenWidth * 0.1,
            top: screenHeight * 0.57,
            child: GestureDetector(
              onTap: () {
                setState(() {
                  mesServicesButtonPress(setState);
                });
              },
              child: Container(
                width: screenWidth * 0.8,
                height: screenHeight * 0.05,
                decoration: BoxDecoration(
                  color: Color.fromARGB(255, 255, 255, 255),
                  borderRadius: BorderRadius.circular(10.0),
                ),
                child: Center(
                  child: Text(
                    'Mes services',
                    style: TextStyle(
                      color: Color.fromARGB(255, 0, 0, 0),
                    ),
                  ),
                ),
              ),
            ),
          ),
          Positioned(
            left: screenWidth * 0.1,
            top: screenHeight * 0.64,
            child: GestureDetector(
              onTap: () {
                setState(() {
                  onDeconectionTap(setState, context);
                });
              },
              child: Container(
                width: screenWidth * 0.8,
                height: screenHeight * 0.05,
                decoration: BoxDecoration(
                  color: Color.fromARGB(255, 255, 255, 255),
                  borderRadius: BorderRadius.circular(10.0),
                ),
                child: Center(
                  child: Text(
                    'Se deconnercter',
                    style: TextStyle(
                      color: Color.fromARGB(255, 0, 0, 0),
                    ),
                  ),
                ),
              ),
            ),
          ),
          Positioned(
            left: screenWidth * 0.45,
            top: screenHeight * 0.9,
            child: GestureDetector(
              onTap: () {
                setState(() {
                  homeButtonPress(setState);
                });
              },
              child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage('assets/images/homeButton.png'),
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
