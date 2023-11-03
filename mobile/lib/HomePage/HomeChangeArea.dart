import 'package:flutter/material.dart';
import 'HomeGlobale.dart';
import 'HomeAllButton.dart';

Widget buildChangeAreaPageContent(TextEditingController nameInput, setState, context) {
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
                onTap: () {
                  homeButtonPress(setState);
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
                        elements[indexForCreationPage[0] - 1].iconPath,
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
                      onTap: () {
                        onActionTap(setState);
                      },
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
                      elements[indexForCreationPage[2] - 1].iconPath,
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
                      onTap: () {
                        onReactionTap(setState);
                      },
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
            Positioned(
              left: screenWidth * 0.35,
              top: screenHeight * 0.8,
              child: GestureDetector(
                onTap: () {
                  deleteArea(setState, nameOfArea);
                  addArea(nameOfArea, setState);
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
                      'Modifier',
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