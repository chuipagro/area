import 'package:flutter/material.dart';
import 'package:mobile/LoginPage.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;

class SignUpPage extends StatefulWidget {
    const SignUpPage({Key? key, required this.title}) : super(key: key);

    final String title;

    @override
    _SignUpPageState createState() => _SignUpPageState();
}

class Step1 extends StatefulWidget {
    final Function nextPage;
    final Function updateEmail;

    Step1({required this.nextPage, required this.updateEmail});

    @override
    _Step1State createState() => _Step1State();
}

class _Step1State extends State<Step1> {
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
    String email = '';

    @override
    Widget build(BuildContext context) {
        return Container(
            padding: const EdgeInsets.all(16.0),
            child: Form(
                key: _formKey,
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                        TextFormField(
                            decoration: const InputDecoration(labelText: 'Entrez votre email'),
                            onChanged: (value) {
                                setState(() {
                                    email = value;
                                });
                            },
                            validator: (value) {
                                if (value == null || value.isEmpty) {
                                    return 'Veuillez entrer votre email';
                                }
                                return null;
                            },
                        ),
                        const SizedBox(height: 16.0),
                        ElevatedButton(
                            onPressed: () {
                                if (_formKey.currentState!.validate()) {
                                    widget.updateEmail(email);
                                    widget.nextPage();
                                }
                            },
                            child: const Text('Suivant'),
                        ),
                    ],
                ),
            ),
        );
    }
}

class Step2 extends StatefulWidget {
    final Function nextPage;
    final Function previousPage;
    final Function updatePassword;

    Step2({required this.nextPage, required this.previousPage, required this.updatePassword});

    @override
    _Step2State createState() => _Step2State();
}

class _Step2State extends State<Step2> {
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
    String password = '';

    @override
    Widget build(BuildContext context) {
        return Container(
            padding: const EdgeInsets.all(16.0),
            child: Form(
                key: _formKey,
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                        TextFormField(
                            obscureText: true,
                            decoration: const InputDecoration(labelText: 'Entrez votre mot de passe'),
                            onChanged: (value) {
                                setState(() {
                                    password = value;
                                });
                            },
                            validator: (value) {
                                if (value == null || value.isEmpty) {
                                    return 'Veuillez entrer votre mot de passe';
                                }
                                return null;
                            },
                        ),
                        const SizedBox(height: 16.0),
                        Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                                ElevatedButton(
                                    onPressed: () {
                                        widget.previousPage();
                                    },
                                    child: const Text('Précédent'),
                                ),
                                ElevatedButton(
                                    onPressed: () {
                                        if (_formKey.currentState!.validate()) {
                                            widget.updatePassword(password);
                                            widget.nextPage();
                                        }
                                    },
                                    child: const Text('Suivant'),
                                ),
                            ],
                        ),
                    ],
                ),
            ),
        );
    }
}

class Step3 extends StatefulWidget {
    final Function previousPage;
    final String email;
    final String password;

    Step3({required this.previousPage, required this.email, required this.password});

    @override
    _Step3State createState() => _Step3State();
}

class _Step3State extends State<Step3> {
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
    String username = '';

    Future<void> registerUser() async {
        print("good");
        print(username);
        final response = await http.post(
            Uri.parse('http://10.68.246.206:3000/auth/signup'),
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: {
                'mail': 'lilfchvgjbkni',
                'username': 'cfvhgbjkn',
                'password': '1cytvghbj2356',
            },
        );

        print(response.statusCode);
        if (response.statusCode == 200) {
            print("GOOODDDDDDDD");
            Fluttertoast.showToast(
                msg: "Enregistrement réussi !",
                toastLength: Toast.LENGTH_SHORT,
                gravity: ToastGravity.BOTTOM,
                backgroundColor: Colors.green,
                textColor: Colors.white,
            );
            Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => LoginPage(title: 'LoginPage')),
            );
        } else {
            print("MERDE");
            ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                    content: Text('Echec'),
                ),
            );
        }
    }

    @override
    Widget build(BuildContext context) {
        return Container(
            padding: const EdgeInsets.all(16.0),
            child: Form(
                key: _formKey,
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                        TextFormField(
                            decoration: const InputDecoration(labelText: 'Entrez votre username'),
                            onChanged: (value) {
                                setState(() {
                                    username = value;
                                });
                            },
                            validator: (value) {
                                if (value == null || value.isEmpty) {
                                    return 'Veuillez entrer votre username';
                                }
                                return null;
                            },
                        ),
                        const SizedBox(height: 16.0),
                        ElevatedButton(
                            onPressed: () {
                                registerUser();
                            },
                            child: const Text('Inscription'),
                        ),
                        const SizedBox(height: 16.0),
                        ElevatedButton(
                            onPressed: () {
                                widget.previousPage();
                            },
                            child: const Text('Précédent'),
                        ),
                    ],
                ),
            ),
        );
    }
}

class _SignUpPageState extends State<SignUpPage> {
    final PageController _pageController = PageController(initialPage: 0);
    
    String email = '';
    String password = '';
    
    int _currentPage = 0;

    void nextPage() {
        if (_currentPage < 2) {
            _pageController.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.ease);
            setState(() {
                _currentPage += 1;
            });
        }
    }

    void previousPage() {
        if (_currentPage < 2) {
            _pageController.previousPage(duration: const Duration(milliseconds: 300), curve: Curves.ease);
            setState(() {
                _currentPage -= 1;
            });
        }
    }

    @override
    Widget build(BuildContext context) {
        return Scaffold(
            appBar: AppBar(
                title: const Text("Inscription en plusieurs étapes"),
            ),
            body: PageView(
                controller: _pageController,
                physics: const NeverScrollableScrollPhysics(),
                children: [
                    Step1(
                        nextPage: nextPage,
                        updateEmail: (String newEmail) {
                            setState(() {
                                email: newEmail;
                            });
                        },
                    ),
                    Step2(
                        nextPage: nextPage,
                        previousPage: previousPage,
                        updatePassword: (String newPaswword) {
                            setState(() {
                                password: newPaswword;
                            });
                        },
                    ),
                    Step3(
                        previousPage: previousPage,
                        email: email,
                        password: password,
                    ),
                ],
            ),
        );
    }
}
