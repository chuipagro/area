import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:mobile/HomePage/HomePage.dart';
import 'package:mobile/SignUpPage.dart';
import 'package:mobile/GetStartedPage.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/Globals.dart' as globals;

class LoginPage extends StatefulWidget {
    final String title;

    LoginPage({Key? key, required this.title}) : super(key: key);

    @override
    _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
    TextEditingController emailController = TextEditingController();
    TextEditingController passwordController = TextEditingController();

    bool isPasswordForgotten = false;
    bool isEmailForgotten = false;

    Future<void> loginUser() async {
        final response = await http.post(
            Uri.parse('http://'+globals.IPpc+':8080/auth/signin'),
            body: {
                'mail': emailController.text,
                'password': passwordController.text,
            },
        );

        if (response.statusCode == 200) {
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
                                'Log in',
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
                            SizedBox(height: 10.0),
    
                            TextButton(
                                onPressed: () {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(builder: (context) => SignUpPage(title: 'SignUpPage')),
                                    );
                                    setState(() {
                                      isPasswordForgotten = false;
                                      isEmailForgotten = false;
                                    });
                                },
                                style: TextButton.styleFrom(
                                    padding: EdgeInsets.zero,
                                ),
                                child: Align(
                                    alignment: Alignment.centerRight,
                                    child: Padding(
                                        padding: const EdgeInsets.only(right: 20.0),
                                        child: Text(
                                            'S\'enregistrer',
                                            style: TextStyle(
                                                fontSize: 20.0,
                                                fontWeight: FontWeight.bold,
                                                color: Colors.black,
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            //SizedBox(height: 30.0),

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
                                decoration: InputDecoration(
                                    hintText: 'IP',
                                    border: InputBorder.none,
                                    labelStyle: TextStyle(
                                        fontWeight: FontWeight.bold,
                                    ),
                                    contentPadding: EdgeInsets.symmetric(vertical: 10.0),
                                ),
                                onChanged: (value) {
                                    setState(() {
                                        globals.IPpc = value;
                                    });
                                },
                            ),
                            ),
                            SizedBox(height: 20.0),
    
                            ElevatedButton(
                                onPressed: () {
                                  if (_formKey.currentState!.validate()) {
                                    loginUser();
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
                                    'Se connecter',
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 20.0,
                                    ),
                                ),
                            ),
                            SizedBox(height: 60.0),
    
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
                                            text: 'Google',
                                            style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                            ),
                                            recognizer: TapGestureRecognizer()
                                                ..onTap = () {
                                                    Navigator.push(
                                                        context,
                                                        MaterialPageRoute(builder: (context) => GetStartedPage(title: 'GetStartedPage')),
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
                                            text: 'Facebook',
                                            style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                            ),
                                            recognizer: TapGestureRecognizer()
                                                ..onTap = () {
                                                    Navigator.push(
                                                        context,
                                                        MaterialPageRoute(builder: (context) => GetStartedPage(title: 'GetStartedPage')),
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