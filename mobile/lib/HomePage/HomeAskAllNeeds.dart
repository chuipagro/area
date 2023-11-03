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
                  controller: needsInput,
                  decoration: InputDecoration(
                    hintText: 'Area name',
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
        ],
      ),
    ),
  );
}