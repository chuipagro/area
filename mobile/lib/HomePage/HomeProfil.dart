import 'package:flutter/material.dart';
import 'HomeGlobale.dart';
import 'HomeElementList.dart';
import 'HomeAllButton.dart';

Widget buildProfilPageContent(setState, context) {
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
          ],
        ),
      ),
    );
  }