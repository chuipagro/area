import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:mobile/SignUpPage.dart';
import 'package:mobile/LoginPage.dart';
import 'package:mobile/config.dart';
import 'package:flutter_web_auth_2/flutter_web_auth_2.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:mobile/HomePage/HomePage.dart';
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

  Future<void> _authenticateWithGitHub() async {
    final authUrl = 'https://github.com/login/oauth/authorize?'
        'client_id=${Config.clientIdGithubLogin}&'
        'scope=user';

    final result = await FlutterWebAuth2.authenticate(
      url: authUrl,
      callbackUrlScheme: 'area',
    );


    String? codeParam = Uri.parse(result).queryParameters['code'];

    final response = await http.post(
        Uri.parse('https://github.com/login/oauth/access_token'),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'client_id': Config.clientIdGithubLogin,
          'client_secret': Config.clientSecretGithubLogin,
          'code': codeParam,
        }),
    );

    if (response.statusCode == 200) { 
      List<String> parts = response.body.split('&');
      String accessToken = parts[0].split('=')[1];
      final res = await http.post(
        Uri.parse('http://'+globals.IPpc+':8080/auth/signOAuthGithub'),
        body: {
            'token': accessToken,
            'oauth': 'github',
        },
      );
      if (res.statusCode == 200) {
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
      print('Erreur lors de l\'obtention du jeton d\'accès : ${response.reasonPhrase}');
    }
  }

    Future<void> _authenticateWithSpotify() async {
      final authUrl = "https://accounts.spotify.com/authorize?response_type=token&client_id=${Config.clientIdSpotifyLogin}&redirect_uri=area://github&scope=user-read-private user-read-email playlist-read-private playlist-read-collaborative user-library-read user-read-recently-played user-top-read";

      final result = await FlutterWebAuth2.authenticate(
        url: authUrl,
        callbackUrlScheme: 'area',
      );

      String? accessToken = Uri.splitQueryString(Uri.parse(result).fragment)['access_token'];
      final res = await http.post(
        Uri.parse('http://'+globals.IPpc+':8080/auth/postSpotify'),
        body: {
            'token': accessToken,
        },
      );
      if (res.statusCode == 200) {
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
                            const SizedBox(height: 50.0),

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
                                        _authenticateWithGitHub();
                                    },
                                    style: TextButton.styleFrom(
                                        padding: EdgeInsets.zero,
                                    ),
                                    child: Row(
                                        children: <Widget>[
                                            const SizedBox(width: 20.0),
                                            Image.asset(
                                                'assets/images/githubLogo.png',
                                                width: 35.0,
                                                height: 35.0,
                                            ),
                                            const SizedBox(width: 20.0),
                                            const Text(
                                                'Continue avec Github',
                                                style: TextStyle(
                                                    fontSize: 20.0,
                                                    color: Colors.black,
                                                ),
                                            ),
                                        ],
                                    ),
                                ),
                            ),
                            const SizedBox(height: 25.0),

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
                                        _authenticateWithSpotify();
                                    },
                                    style: TextButton.styleFrom(
                                        padding: EdgeInsets.zero,
                                    ),
                                    child: Row(
                                        children: <Widget>[
                                            const SizedBox(width: 20.0),
                                            Image.asset(
                                                'assets/images/spotifyLogo.png',
                                                width: 35.0,
                                                height: 35.0,
                                            ),
                                            const SizedBox(width: 20.0),
                                            const Text(
                                                'Continue avec Github',
                                                style: TextStyle(
                                                    fontSize: 20.0,
                                                    color: Colors.black,
                                                ),
                                            ),
                                        ],
                                    ),
                                ),
                            ),
                            const SizedBox(height: 25.0),
    
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