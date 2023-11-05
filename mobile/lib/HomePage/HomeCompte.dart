import 'package:flutter/material.dart';
import 'HomeAllButton.dart';
import 'HomeGlobale.dart';

Widget buildCompte(setState, context) {
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
                'Compte',
                style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                  color: Color.fromARGB(255, 0,0,0),
                ),
              ),
            ),
          ),
          Positioned(
            top: screenHeight * 0.2,
            left: screenWidth * 0.13,
            child: Center(
              child: Text(
                'UserName',
                style: TextStyle(
                  fontSize: 20,
                  color: Color.fromARGB(255, 0,0,0),
                ),
              ),
            ),
          ),
          Positioned(
            top: screenHeight * 0.3,
            left: screenWidth * 0.1,
            child: Center(
              child: Container(
                width: screenWidth * 0.8,
                height: screenHeight * 0.05,
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Colors.black,
                    width: 2.0,
                  ),
                  borderRadius: BorderRadius.circular(10.0),
                ),
                child: Text(
                  profilUser.name,
                  style: TextStyle(
                    fontSize: 20,
                    color: Color.fromARGB(255, 0, 0, 0),
                  ),
                ),
              ),
            ),
          ),
          Positioned(
            top: screenHeight * 0.4,
            left: screenWidth * 0.13,
            child: Center(
              child: Text(
                'Mot de passe',
                style: TextStyle(
                  fontSize: 20,
                  color: Color.fromARGB(255, 0,0,0),
                ),
              ),
            ),
          ),
          Positioned(
            top: screenHeight * 0.5,
            left: screenWidth * 0.1,
            child: Center(
              child: Container(
                width: screenWidth * 0.8,
                height: screenHeight * 0.05,
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Colors.black,
                    width: 2.0,
                  ),
                  borderRadius: BorderRadius.circular(10.0),
                ),
                child: Text(
                  profilUser.password,
                  style: TextStyle(
                    fontSize: 20,
                    color: Color.fromARGB(255, 0, 0, 0),
                  ),
                ),
              ),
            ),
          ),
          Positioned(
            top: screenHeight * 0.6,
            left: screenWidth * 0.13,
            child: Center(
              child: Text(
                'Adresse mail',
                style: TextStyle(
                  fontSize: 20,
                  color: Color.fromARGB(255, 0,0,0),
                ),
              ),
            ),
          ),
          Positioned(
            top: screenHeight * 0.7,
            left: screenWidth * 0.1,
            child: Center(
              child: Container(
                width: screenWidth * 0.8,
                height: screenHeight * 0.05,
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Colors.black,
                    width: 2.0,
                  ),
                  borderRadius: BorderRadius.circular(10.0),
                ),
                child: Text(
                  profilUser.email,
                  style: TextStyle(
                    fontSize: 20,
                    color: Color.fromARGB(255, 0, 0, 0),
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