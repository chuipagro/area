import 'package:flutter/material.dart';
import 'HomeGlobale.dart';
import 'HomeAllButton.dart';

Widget buildAskAllNeeds(setState, context) {
  final screenWidth = MediaQuery.of(context).size.width;
  final screenHeight = MediaQuery.of(context).size.height;
  String needInput = needsInput.text;


  void validateForm() {
    setState(() {});
  }

  return Scaffold(
    body: Center(
      child: Stack(
        children: [
          Positioned(
            left: screenWidth * 0.07,
            top: screenHeight * 0.07,
            child: Text(
              needsList[needsIterate],
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
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
                  border: Border.all(
                    color: Colors.black,
                    width: 2.0,
                  ),
                ),
                child: TextFormField(
                  controller: needsInput,
                  decoration: InputDecoration(
                    hintText: needsList[needsIterate],
                    border: InputBorder.none,
                    labelStyle: TextStyle(
                        fontWeight: FontWeight.bold,
                    ),
                    contentPadding: EdgeInsets.symmetric(vertical: 10.0),
                  ),
                  onChanged: (value) {
                      needInput = value;
                      validateForm();
                  },
                ),
              ),
            ),
          ),
          Positioned(
            left: needsIterate > 0 ? screenWidth * 0.53 : screenWidth * 0.33,
            top: screenHeight * 0.8,
            child: GestureDetector(
              onTap: () {
                setAllNeeds(needsList[needsIterate], needInput);
                needsIterate >= needsList.length - 1 ? returnToAddArea(setState) : getAllNeeds(setState);
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
                    needsIterate >= needsList.length - 1 ? 'Valider' : 'Continuer',
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
          if (needsIterate > 0)
            Positioned(
              left: screenWidth * 0.18,
              top: screenHeight * 0.8,
              child: GestureDetector(
                onTap: () {
                  getAllNeeds(setState);
                  needsIterate -= 2;
                },
                child: Container(
                  height: screenHeight * 0.07,
                  width: screenWidth * 0.3,
                  decoration: BoxDecoration(
                    color: Color.fromARGB(255, 126, 136, 126),
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                  child: Center(
                    child: Text(
                      'Precedent',
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