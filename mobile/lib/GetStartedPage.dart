import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:mobile/SignUpPage.dart';
import 'package:mobile/LoginPage.dart';
import 'package:mobile/GetStartedEditorPage.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:flutter_web_auth_2/flutter_web_auth_2.dart';
import 'package:mobile/HomePage.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/Globals.dart' as globals;
import 'dart:convert';

class GetStartedPage extends StatefulWidget {
    final String title;

    const GetStartedPage({Key? key, required this.title}) : super(key: key);

    @override
    _GetStartedPageState createState() => _GetStartedPageState();
}

class _GetStartedPageState extends State<GetStartedPage> {
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final clientIdGithub = 'ecd75a418bce2c16c3f5';

  Future<void> _authenticateWithGitHub() async {
    final authUrl = 'https://github.com/login/oauth/authorize?'
        'client_id=$clientIdGithub&'
        'scope=user';

      final result = await FlutterWebAuth2.authenticate(
        url: authUrl,
        callbackUrlScheme: 'area',
      );

      print('Authentification réussie : $result');

      String? codeParam = Uri.parse(result).queryParameters['code'];

      final response = await http.post(
          Uri.parse('https://github.com/login/oauth/access_token'),
          headers: <String, String>{
            'Content-Type': 'application/json',
          },
          body: jsonEncode({
            'client_id': clientIdGithub,
            'client_secret': 'c25bb753d702882f8634068356cabf8ce4c4ef8a',
            'code': codeParam,
          }),
      );

        if (response.statusCode == 200) { 
        print('Dorian fils de papa');
          List<String> parts = response.body.split('&');
          String accessToken = parts[0].split('=')[1];

          final userResponse = await http.get(
              Uri.parse('https://api.github.com/user'),
              headers: <String, String>{
                  'Authorization': 'Bearer $accessToken',
              },
          );

          if (userResponse.statusCode == 200) {
              print('Dorian fils de maman');
              final userData = jsonDecode(userResponse.body);
              final username = userData['login'];
              final email = userData['email'];

              final response = await http.post(
                  Uri.parse('http://'+globals.IPpc+':3000/auth/signup'),
                  headers: {
                      "Access-Control-Allow-Origin": "*",
                  },
                  body: {
                      'mail': "789465132@epitech.eu",
                      'username': username,
                      'password': "password",
                  },
                );
                print(response.statusCode);
                if (response.statusCode == 200) {
                    print('Dorian fils de PABLO');
                    Fluttertoast.showToast(
                        msg: "Enregistrement réussi !",
                        toastLength: Toast.LENGTH_SHORT,
                        gravity: ToastGravity.BOTTOM,
                        backgroundColor: Colors.green,
                        textColor: Colors.white,
                    );
                } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                            content: Text('Echec'),
                        ),
                    );
                }
                final responseLogin = await http.post(
                    Uri.parse('http://'+globals.IPpc+':3000/auth/signin'),
                    body: {
                        'mail': "789465132@epitech.eu",
                        'password': "password",
                    },
                );
                if (responseLogin.statusCode == 200) {
                    print('Dorian fils de TOM');
                    Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const HomePage()),
                    );
                } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                            content: Text('Echec'),
                        ),
                    );
                }
            } else {
                print('Erreur lors de la récupération des données de l\'utilisateur : ${userResponse.reasonPhrase}');
            }
        } else {
          print('Erreur lors de l\'obtention du jeton d\'accès : ${response.reasonPhrase}');
        }
  }

    @override
    Widget build(BuildContext context) {
        return Scaffold(
            body: SingleChildScrollView(
                child: Form(
                    key: _formKey,
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                            const SizedBox(height: 100.0),
                            const Align(
                                alignment: Alignment.center,
                                child: Text(
                                'LPPLL',
                                style: TextStyle(
                                    fontSize: 100.0,
                                    fontWeight: FontWeight.bold,
                                    ),
                                ),
                            ),
                            const SizedBox(height: 20.0),

                            const Align(
                                alignment: Alignment.center,
                                child: Text(
                                'Get Started',
                                style: TextStyle(
                                    fontSize: 30.0,
                                    fontWeight: FontWeight.normal,
                                    ),
                                ),
                            ),
                            const SizedBox(height: 80.0),

                            Container(
                                height: 65,
                                width: 360,
                                decoration: BoxDecoration(
                                    color: const Color.fromARGB(255, 255, 255, 255),
                                    borderRadius: BorderRadius.circular(40.0),
                                    border: Border.all(color: Colors.black),
                                ),
                                child: TextButton(
                                    onPressed: () {
                                        Navigator.push(
                                            context,
                                            MaterialPageRoute(builder: (context) => GetStartedEditorPage(title: 'GetStartedEditorPage')),
                                        );
                                    },
                                    style: TextButton.styleFrom(
                                        padding: EdgeInsets.zero,
                                    ),
                                    child: Row(
                                        children: <Widget>[
                                            const SizedBox(width: 20.0),
                                            Image.asset(
                                                'assets/images/GoogleLogo.png',
                                                width: 35.0,
                                                height: 35.0,
                                            ),
                                            const SizedBox(width: 20.0),
                                            const Text(
                                                'Continue avec Google',
                                                style: TextStyle(
                                                    fontSize: 20.0,
                                                    color: Colors.black,
                                                ),
                                            ),
                                        ],
                                    ),
                                ),
                            ),
                            const SizedBox(height: 30.0),

                            Container(
                                height: 65,
                                width: 360,
                                decoration: BoxDecoration(
                                    color: Color.fromARGB(255, 77, 92, 146),
                                    borderRadius: BorderRadius.circular(40.0),
                                    border: Border.all(color: Colors.black),
                                ),
                                child: TextButton(
                                    onPressed: () {
                                        _authenticateWithGitHub();
                                    },
                                    style: TextButton.styleFrom(
                                        padding: EdgeInsets.zero,
                                    ),
                                    child: Row(
                                        children: <Widget>[
                                            const SizedBox(width: 20.0),
                                            Image.asset(
                                                'assets/images/DiscordLogo.png',
                                                width: 35.0,
                                                height: 35.0,
                                            ),
                                            const SizedBox(width: 20.0),
                                            const Text(
                                                'Continue avec Github',
                                                style: TextStyle(
                                                    fontSize: 20.0,
                                                    color: Colors.white,
                                                ),
                                            ),
                                        ],
                                    ),
                                ),
                            ),
                            const SizedBox(height: 60.0),
    
                            RichText(
                                text: TextSpan(
                                    text: 'Continuer avec ',
                                    style: const TextStyle(
                                        fontSize: 19.0,
                                        color: Colors.black,
                                        fontWeight: FontWeight.normal,
                                    ),
                                    children: <TextSpan>[
                                        TextSpan(
                                            text: 'Log in',
                                            style: const TextStyle(
                                                fontWeight: FontWeight.bold,
                                            ),
                                            recognizer: TapGestureRecognizer()
                                                ..onTap = () {
                                                    Navigator.push(
                                                        context,
                                                        MaterialPageRoute(builder: (context) => LoginPage(title: 'LoginPage')),
                                                    );
                                                },
                                        ),
                                        const TextSpan(
                                            text: ' or ',
                                        ),
                                        TextSpan(
                                            text: 'Sign up',
                                            style: const TextStyle(
                                                fontWeight: FontWeight.bold,
                                            ),
                                            recognizer: TapGestureRecognizer()
                                                ..onTap = () {
                                                    Navigator.push(
                                                        context,
                                                        MaterialPageRoute(builder: (context) => const SignUpPage(title: 'SignUpPage')),
                                                    );
                                                },
                                        ),
                                    ],
                                ),
                            ),
                        ],
                    ),
                ),
            ),
        );
    }
}