import 'package:flutter/material.dart';
import 'HomeGlobale.dart';
import 'HomeElementList.dart';
import 'HomeAllButton.dart';

Widget buildAreasStatusContent(setState, context) {
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
                  setState(() {
                    homeButtonPress(setState);
                  });
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