import 'package:flutter/material.dart';
import 'package:mobile/LoginPage.dart';

class SignUpPage extends StatelessWidget {
    const SignUpPage({super.key});

    @override
    Widget build(BuildContext context) {
        return Scaffold(
            appBar: AppBar(
                title: const Text('Sign up page'),
            ),
            body: Center(
            child: ElevatedButton(
            onPressed: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => LoginPage(title: 'LoginPage')),
                );
            },
            child: const Text('Go back!'),
            ),
        ),
    );
  }
}