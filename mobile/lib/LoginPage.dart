import 'package:flutter/material.dart';
import 'package:mobile/HomePage.dart';

class LoginPage extends StatefulWidget {
    final String title;

    LoginPage({Key? key, required this.title}) : super(key: key);

    @override
    _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
    @override
    Widget build(BuildContext context) {
        return Scaffold(
            appBar: AppBar(
                title: Text(widget.title),
            ),
            body: Container(
                padding: EdgeInsets.all(16.0),
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                        TextFormField(
                            decoration: InputDecoration(labelText: 'Nom d\'utilisateur'),
                        ),
                        SizedBox(height: 16.0),
                        TextFormField(
                            obscureText: true,
                            decoration: InputDecoration(labelText: 'Mot de passe'),
                        ),
                        SizedBox(height: 16.0),
                        ElevatedButton(
                            onPressed: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(builder: (context) => const HomePage()),
                                );
                            },
                            child: Text('Se connecter'),
                        ),
                    ],
                ),
            ),
        );
    }
}