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
    return Form(
      key: _formKey,
      child: ListView(
        children: [
          const SizedBox(height: 30.0),
          const Padding(
            padding: const EdgeInsets.all(16.0),
            child: Center(
              child: Text(
                'Entrez votre adresse mail',
                style: TextStyle(
                  fontSize: 20.0,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Container(
              margin: const EdgeInsets.all(16.0),
              padding: const EdgeInsets.symmetric(horizontal: 12.0),
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                ),
                borderRadius: BorderRadius.circular(8.0),
              ),
              child: TextFormField(
                decoration: InputDecoration(
                  border: InputBorder.none,
                  hintText: 'Adresse email',
                  isDense: true,
                ),
                style: TextStyle(
                  fontSize: 20.0,
                ),
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
            ),
          ),
          SizedBox(height: 300.0),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: ElevatedButton(
              onPressed: () {
                if (_formKey.currentState != null && _formKey.currentState!.validate()) {
                  widget.updateEmail(email);
                  widget.nextPage();
                }
              },
              style: ElevatedButton.styleFrom(
                primary: Colors.black,
                onPrimary: Colors.white,
                padding: EdgeInsets.symmetric(horizontal: 32.0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
              ),
              child: Text('Suivant'),
            ),
          ),
        ],
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
    return Form(
      key: _formKey,
      child: ListView(
        children: [
          const SizedBox(height: 30.0),
          const Padding(
            padding: const EdgeInsets.all(16.0),
            child: Center(
              child: Text(
                'Créez un mot de passe',
                style: TextStyle(
                  fontSize: 20.0,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Container(
              margin: const EdgeInsets.all(16.0),
              padding: const EdgeInsets.symmetric(horizontal: 12.0),
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                ),
                borderRadius: BorderRadius.circular(8.0),
              ),
              child: TextFormField(
                obscureText: true,
                decoration: InputDecoration(
                  border: InputBorder.none,
                  hintText: 'Mot de passe',
                  isDense: true,
                ),
                style: TextStyle(
                  fontSize: 20.0,
                ),
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
            ),
          ),
          SizedBox(height: 300.0),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: ElevatedButton(
              onPressed: () {
                if (_formKey.currentState != null && _formKey.currentState!.validate()) {
                  widget.updatePassword(password);
                  widget.nextPage();
                }
              },
              style: ElevatedButton.styleFrom(
                primary: Colors.black,
                onPrimary: Colors.white,
                padding: EdgeInsets.symmetric(horizontal: 32.0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
              ),
              child: Text('Suivant'),
            ),
          ),
        ],
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
        final response = await http.post(
            Uri.parse('http://10.0.3.2:3000/auth/signup'),
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: {
                'mail': widget.email,
                'username': username,
                'password': widget.password,
            },
        );

        if (response.statusCode == 201) {
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
            ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                    content: Text('Echec'),
                ),
            );
        }
      return;
    }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: ListView(
        children: [
          const SizedBox(height: 30.0),
          const Padding(
            padding: const EdgeInsets.all(16.0),
            child: Center(
              child: Text(
                'Entrez votre username',
                style: TextStyle(
                  fontSize: 20.0,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Container(
              margin: const EdgeInsets.all(16.0),
              padding: const EdgeInsets.symmetric(horizontal: 12.0),
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                ),
                borderRadius: BorderRadius.circular(8.0),
              ),
              child: TextFormField(
                decoration: InputDecoration(
                  border: InputBorder.none,
                  hintText: 'Mot de passe',
                  isDense: true,
                ),
                style: TextStyle(
                  fontSize: 20.0,
                ),
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
            ),
          ),
          SizedBox(height: 300.0),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: ElevatedButton(
              onPressed: () {
                if (_formKey.currentState != null && _formKey.currentState!.validate()) {
                  registerUser();
                }
              },
              style: ElevatedButton.styleFrom(
                primary: Colors.black,
                onPrimary: Colors.white,
                padding: EdgeInsets.symmetric(horizontal: 32.0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
              ),
              child: Text('Inscription'),
            ),
          ),
        ],
      ),
    );
  }
}

class CustomAppBar extends StatelessWidget {

    final VoidCallback onBack;
    final int currentPage;

    CustomAppBar({required this.onBack, required this.currentPage});

    @override
    Widget build(BuildContext context) {
        Widget centerWidget;
        if (currentPage == 0) {
          centerWidget = Image.asset(
                'assets/images/SearchBarrePage1.png',
                width: 32,
                height: 32,
            );
        } else if (currentPage == 1) {
          centerWidget = Image.asset(
                'assets/images/SearchBarrePage2.png',
                width: 32,
                height: 32,
            );
        } else {
          centerWidget = Image.asset(
                'assets/images/SearchBarrePage3.png',
                width: 32,
                height: 32,
            );
        }

        return AppBar(
            backgroundColor: Colors.white,
            leading: IconButton(
                icon: Image.asset(
                    'assets/images/LeftArrow.png',
                    width: 32,
                    height: 32,
                    ),
                    onPressed: onBack,
                ),
            centerTitle: false,
            actions: [
                Spacer(),
                centerWidget,
                Spacer(),
                ],
        );
    }
}

class _SignUpPageState extends State<SignUpPage> {
    final PageController _pageController = PageController(initialPage: 0);
    
    String email = '';
    String password = '';
    
    int _currentPage = 0;

    void nextPage() {
        if (_currentPage <= 2) {
            _pageController.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.ease);
            setState(() {
                _currentPage += 1;
            });
        }
    }

    void previousPage() {
        if (_currentPage <= 2) {
            _pageController.previousPage(duration: const Duration(milliseconds: 300), curve: Curves.ease);
            setState(() {
                _currentPage -= 1;
            });
        }
    }

    @override
    Widget build(BuildContext context) {
        return Scaffold(
            appBar: PreferredSize(
                preferredSize: const Size.fromHeight(kToolbarHeight),
                    child: CustomAppBar(
                        onBack: () {
                            if (_currentPage > 0) {
                                previousPage();
                            } else {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(builder: (context) => LoginPage(title: 'LoginPage')),
                                );
                            }
                        },
                    currentPage: _currentPage,
                ),
            ),
            body: PageView(
                controller: _pageController,
                physics: const NeverScrollableScrollPhysics(),
                children: [
                    Step1(
                        nextPage: nextPage,
                        updateEmail: (String newEmail) {
                            setState(() {
                                email = newEmail;
                            });
                        },
                    ),
                    Step2(
                        nextPage: nextPage,
                        previousPage: previousPage,
                        updatePassword: (String newPaswword) {
                            setState(() {
                                password = newPaswword;
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
