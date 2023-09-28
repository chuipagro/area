/*import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:mobile/HomePage.dart';
import 'package:mobile/SignUpPage.dart';
import 'package:mobile/LoginPage.dart';
import 'package:http/http.dart' as http;

class GetStartedPage extends StatefulWidget {
    final String title;

    GetStartedPage({Key? key, required this.title}) : super(key: key);

    @override
    _GetStartedPageState createState() => _GetStartedPageState();
}

class _GetStartedPageState extends State<GetStartedPage> {
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
    TextEditingController emailController = TextEditingController();
    TextEditingController passwordController = TextEditingController();

    bool isPasswordForgotten = false;
    bool isEmailForgotten = false;

    Future<void> signInWithGoogle() async {
        final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

        if (googleUser == null) {
            return;
        }
        
        final GoogleSignInAuthentication googleAuth = await googleUser.authentication;
        final AuthCredential credentialGoogle = GoogleAuthProvider.credential(
            accessToken: googleAuth.accessToken,
            idToken: googleAuth.idToken,
        );
    }

    Future<void> signInWithFacebook() async {
        try {
            final LoginResult result = await FacebookAuth.instance.login();

            if (result.status == LoginStatus.success) {
                final AccessToken accessToken = result.accessToken!;
                final AuthCredential credentialFacebook = FacebookAuthProvider.credential(accessToken.token);
            }
        } catch (e) {
            print('Erreur lors de la connexion avec Facebook : $e');
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
                            SizedBox(height: 60.0),
                            Align(
                                alignment: Alignment.center,
                                child: Text(
                                'LPPLL',
                                style: TextStyle(
                                    fontSize: 100.0,
                                    fontWeight: FontWeight.bold,
                                    ),
                                ),
                            ),
                            SizedBox(height: 20.0),

                            Align(
                                alignment: Alignment.center,
                                child: Text(
                                'Get started',
                                style: TextStyle(
                                    fontSize: 30.0,
                                    fontWeight: FontWeight.normal,
                                    ),
                                ),
                            ),
                            SizedBox(height: 100.0),

                            ElevatedButton(
                                onPressed: () {
                                    signInWithFacebook();
                                },
                                style: ElevatedButton.styleFrom(
                                    primary: Colors.blue,
                                    shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(40.0),
                                    ),
                                    minimumSize: Size(350, 55),
                                ),
                                child: Text(
                                    'Continuer avec Facebook',
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 20.0,
                                    ),
                                ),
                            ),
                            SizedBox(height: 20.0),

                           ElevatedButton(
                                onPressed: () {
                                    signInWithGoogle();
                                },
                                style: ElevatedButton.styleFrom(
                                    primary: Colors.white,
                                    shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(40.0),
                                    ),
                                    minimumSize: Size(350, 55),
                                ),
                                child: Text(
                                    'Continuer avec Google',
                                    style: TextStyle(
                                        color: Colors.black,
                                        fontSize: 20.0,
                                    ),
                                ),
                            ),
                            SizedBox(height: 20.0),

                            RichText(
                                text: TextSpan(
                                    text: 'Continuer avec ',
                                    style: TextStyle(
                                        fontSize: 19.0,
                                        color: Colors.black,
                                        fontWeight: FontWeight.normal,
                                    ),
                                    children: <TextSpan>[
                                        TextSpan(
                                            text: 'Log ib',
                                            style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                            ),
                                            recognizer: TapGestureRecognizer()
                                                ..onTap = () {
                                                    Navigator.push(
                                                        context,
                                                        MaterialPageRoute(builder: (context) => LoginPage(title: 'LoginPage')),
                                                    );
                                                    setState(() {
                                                        isPasswordForgotten = false;
                                                        isEmailForgotten = false;
                                                    });
                                                },
                                        ),
                                        TextSpan(
                                            text: ' or ',
                                        ),
                                        TextSpan(
                                            text: 'Sign up',
                                            style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                            ),
                                            recognizer: TapGestureRecognizer()
                                                ..onTap = () {
                                                    Navigator.push(
                                                        context,
                                                        MaterialPageRoute(builder: (context) => LoginPage(title: 'LoginPage')),
                                                    );
                                                    setState(() {
                                                        isPasswordForgotten = false;
                                                        isEmailForgotten = false;
                                                    });
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
}*/