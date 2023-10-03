import 'package:flutter/material.dart';

class GetStartedEditorPage extends StatefulWidget {
    final String title;

    GetStartedEditorPage({Key? key, required this.title}) : super(key: key);

    @override
    _GetStartedEditorPageState createState() => _GetStartedEditorPageState();
}

class _GetStartedEditorPageState extends State<GetStartedEditorPage> {
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

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
                                'Facebook et Google',
                                style: TextStyle(
                                    fontSize: 100.0,
                                    fontWeight: FontWeight.bold,
                                    ),
                                ),
                            ),
                            SizedBox(height: 20.0),
                        ],
                    ),
                ),
            ),
        );
    }
}