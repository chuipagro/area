import 'package:flutter/material.dart';
import 'package:mobile/LoginPage.dart';
import 'package:mobile/Globals.dart' as globals;

void main() {
  globals.IPpc = '10.0.2.1';
  runApp(MaterialApp(
    home: LoginPage(title: 'LoginPage'),
  ));
}