import 'package:flutter/material.dart';
import 'HomeElementList.dart';

  PageState currentPageState = PageState.Areas;
  int indexOfServicesToPrint = 0;
  List<int> indexForCreationPage = [-1, -1, -1, -1];
  bool areaNameIsNotEmpty = false;
  List<Service> elements = [];
  List<CreatedArea> createdAreas = [];
  bool loadData = true;

  TextEditingController nameInput = TextEditingController();
  TextEditingController searchController = TextEditingController();
  TextEditingController searchControllerReaction = TextEditingController();