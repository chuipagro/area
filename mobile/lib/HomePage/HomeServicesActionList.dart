import 'package:flutter/material.dart';
import 'HomeGlobale.dart';
import 'HomeAllButton.dart';

Widget buildServicesActionsContent(TextEditingController searchController, setState, context) {
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
                addAreaPress(setState);
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
            left: screenWidth * 0.35,
            top: screenHeight * 0.06,
            child: Text(
              'Services',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Positioned(
            left: screenWidth * 0.33,
            top: screenHeight * 0.11,
            child: GestureDetector(
              onTap: () {
                profilButtonPress(setState);
              },
              child: Container(
                width: 110,
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
          ),
          Positioned(
            left: screenWidth * 0.05,
            top: screenHeight * 0.15,
            child: Container(
              width: screenWidth * 0.9,
              height: screenHeight * 0.07,
              decoration: BoxDecoration(
                color: Color.fromARGB(255, 168, 163, 163),
                borderRadius: BorderRadius.circular(10.0),
              ),
              child: Row(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Icon(Icons.search),
                  ),
                  Expanded(
                    child: TextField(
                      controller: searchController,
                      onChanged: (value) {
                        setState(() {});
                      },
                      decoration: InputDecoration(
                        hintText: 'Rechercher...',
                        border: InputBorder.none,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            left: screenWidth * 0.05,
            top: screenHeight * 0.20,
            child: Container(
              width: screenWidth * 0.9,
              height: screenHeight * 0.71,
              child: ListView.separated(
                itemCount: (elements.length / 2).ceil(),
                separatorBuilder: (context, index) => SizedBox(height: screenHeight * 0.02),
                itemBuilder: (context, index) {
                  final startIndex = index * 2;
                  final endIndex = startIndex + 1;

                  if (startIndex >= elements.length) {
                    return SizedBox.shrink(); 
                  }

                  final element1 = elements[startIndex];
                  final element2 = endIndex < elements.length ? elements[endIndex] : null;

                  bool showElement1 = element1.titre.contains(searchController.text) && element1.actions.isNotEmpty;
                  bool showElement2 = element2 == null ? false : element2.actions.isNotEmpty && element2.titre.contains(searchController.text);

                  return Row(
                    children: [
                      if (showElement1)
                        Expanded(
                          child: Container(
                            height: screenHeight * 0.25,
                            child: Stack(
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                    color: Color.fromARGB(255, element1.red, element1.green, element1.blue),
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                ),
                                // Positioned(
                                //   top: 10.0,
                                //   right: 10.0,
                                //   child: GestureDetector(
                                //     onTap: () {
                                //         onActionList(startIndex);
                                //       },
                                //     child: Image.asset(
                                //       'assets/images/parameter.png',
                                //       width: 24.0,
                                //       height: 24.0,
                                //     ),
                                //   ),
                                // ),
                                Positioned(
                                  top: screenHeight * 0.07,
                                  left: !showElement2 ? screenWidth * 0.25 : screenWidth * 0.05,
                                  child: GestureDetector(
                                    onTap: () {
                                        onActionList(setState, startIndex);
                                      },
                                    child: Image.asset(
                                      element1.iconPath,
                                      width: screenHeight * 0.2,
                                      height: screenWidth * 0.2,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        SizedBox(width: screenWidth * 0.03),
                      if (showElement2)
                        Expanded(
                          child: Container(
                            height: screenHeight * 0.25,
                            child: Stack(
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                    color: Color.fromARGB(255, element2.red, element2.green, element2.blue),
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                ),
                                // Positioned(
                                //   top: 10.0,
                                //   right: 10.0,
                                //   child: GestureDetector(
                                //     onTap: onElementTap,
                                //     child: Image.asset(
                                //       'assets/images/parameter.png',
                                //       width: 24.0,
                                //       height: 24.0,
                                //     ),
                                //   ),
                                // ),
                                Positioned(
                                  top: screenHeight * 0.07,
                                  left: !showElement1 ? screenWidth * 0.25 : screenWidth * 0.05,
                                  child: GestureDetector(
                                    onTap: () {
                                        onActionList(setState, endIndex);
                                      },
                                    child: Image.asset(
                                      element2.iconPath,
                                      width: screenHeight * 0.2,
                                      height: screenWidth * 0.2,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                    ],
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