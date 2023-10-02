import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:mobile/LoginPage.dart';

class SignUpPage extends StatefulWidget {
    const SignUpPage({Key? key, required this.title}) : super(key: key);

    final String title;

    @override
    _SignUpPageState createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
    TextEditingController emailController = TextEditingController();
    TextEditingController passwordController = TextEditingController();
    TextEditingController confirmPasswordController = TextEditingController();

    bool isPasswordForgotten = false;
    bool isEmailForgotten = false;

    Future<void> signUpUser() async {
      // Ajoutez ici la logique d'inscription de l'utilisateur
      // Vous pouvez envoyer les données au serveur, par exemple
    }

    @override
    void initState() {
        super.initState();
        isPasswordForgotten = false;
        isEmailForgotten = false;
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
                      'Sign Up',
                      style: TextStyle(
                        fontSize: 30.0,
                        fontWeight: FontWeight.normal,
                      ),
                    ),
                  ),
                  SizedBox(height: 100.0),
                  Container(
                    width: 350,
                    height: 50,
                    padding: EdgeInsets.all(8.0),
                    decoration: BoxDecoration(
                      border: Border.all(
                       color: Colors.black54,
                       width: 2.0,
                     ),
                     borderRadius: BorderRadius.circular(30.0),
                   ),
                   child: TextFormField(
                     controller: emailController,
                     obscureText: false,
                     decoration: InputDecoration(
                       hintText: 'Email',
                       border: InputBorder.none,
                       labelStyle: TextStyle(
                         fontWeight: FontWeight.bold,
                       ),
                       contentPadding: EdgeInsets.symmetric(vertical: 10.0),
                     ),
                     validator: (value) {
                       if (value?.isEmpty ?? true) {
                         setState(() {
                           isEmailForgotten = true;
                         });
                         return null;
                       }
                       setState(() {
                         isEmailForgotten = false;
                       });
                       return null;
                     },
                    ),
                  ),
                  if (isEmailForgotten)
                    Text(
                      'Email manquant',
                      style: TextStyle(
                        color: Colors.red,
                        fontSize: 16.0,
                      ),
                    ),
                  SizedBox(height: 20.0),
                  Container(
                    width: 350,
                    height: 50,
                    padding: EdgeInsets.all(8.0),
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: Colors.black54,
                        width: 2.0,
                      ),
                      borderRadius: BorderRadius.circular(30.0),
                    ),
                    child: TextFormField(
                      controller: passwordController,
                      obscureText: true,
                      decoration: InputDecoration(
                        hintText: 'Mot de passe',
                        border: InputBorder.none,
                        labelStyle: TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                        contentPadding: EdgeInsets.symmetric(vertical: 10.0),
                      ),
                      validator: (value) {
                        if (value?.isEmpty ?? true) {
                          setState(() {
                            isPasswordForgotten = true;
                          });
                          return null;
                        }
                        setState(() {
                          isPasswordForgotten = false;
                        });
                        return null;
                      },
                    ),
                  ),
                  if (isPasswordForgotten)
                    Text(
                      'Mot de passe manquant',
                      style: TextStyle(
                        color: Colors.red,
                        fontSize: 16.0,
                      ),
                    ),
                  SizedBox(height: 20.0),
                  Container(
                    width: 350,
                    height: 50,
                    padding: EdgeInsets.all(8.0),
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: Colors.black54,
                        width: 2.0,
                      ),
                      borderRadius: BorderRadius.circular(30.0),
                    ),
                    child: TextFormField(
                      controller: confirmPasswordController,
                      obscureText: true,
                      decoration: InputDecoration(
                        hintText: 'Confirmez le mot de passe',
                        border: InputBorder.none,
                        labelStyle: TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                        contentPadding: EdgeInsets.symmetric(vertical: 10.0),
                      ),
                      validator: (value) {
                        if (value != passwordController.text) {
                          return 'Les mots de passe ne correspondent pas';
                        }
                        return null;
                      },
                    ),
                  ),
                  SizedBox(height: 10.0),
                  ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        signUpUser();
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      primary: Colors.black,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(40.0),
                      ),
                      minimumSize: Size(350, 55),
                    ),
                    child: Text(
                      'S\'inscrire',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20.0,
                      ),
                    ),
                  ),
                  SizedBox(height: 60.0),
                  RichText(
                    text: TextSpan(
                      text: 'Déjà un compte ? ',
                      style: TextStyle(
                        fontSize: 19.0,
                        color: Colors.black,
                        fontWeight: FontWeight.normal,
                      ),
                      children: <TextSpan>[
                        TextSpan(
                          text: 'Connectez-vous',
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
    }
