import 'package:flutter/material.dart';
import 'HomeGlobale.dart';
import 'HomeAllButton.dart';

Widget buildActionsListContent(setState, context) {
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
                onTap: () {
                  onActionTap(setState);
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
                      image: AssetImage(elements[indexOfServicesToPrint].iconPath),
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
                                setActionInCreationAreaPage(setState ,index, indexOfServicesToPrint);
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
                              element.actions[index].name,
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