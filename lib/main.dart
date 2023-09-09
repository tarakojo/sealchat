import 'dart:async';
import 'package:amplify_authenticator/amplify_authenticator.dart';
import 'package:flutter/material.dart';
import 'package:sealchat/ui/testchat.dart';
import 'package:amplify_flutter/amplify_flutter.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import './ui/sealview.dart';
import './amplifyconfiguration.dart';

Future main() async {
  await initSealView();
  runApp(MaterialApp(initialRoute: '/', routes: <String, WidgetBuilder>{
    '/': (context) => MyApp(),
    '/chat': (context) => MyApp2(),
  }));
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => new _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
    _configureAmplify();
  }

  Future<void> _configureAmplify() async {
    try {
      final auth = AmplifyAuthCognito();
      await Amplify.addPlugin(auth);

      // call Amplify.configure to use the initialized categories in your app
      await Amplify.configure(amplifyconfig);
    } on Exception catch (e) {
      safePrint('An error occurred configuring Amplify: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Authenticator(
        child: MaterialApp(
            builder: Authenticator.builder(),
            home: Scaffold(
                appBar: AppBar(title: Text("Official InAppWebView website")),
                body: SafeArea(
                    child: Column(children: <Widget>[
                  Expanded(
                    child: Stack(children: [
                      ChatRoom(),
                    ]),
                  )
                ])))));
  }
}

class MyApp2 extends StatelessWidget {
  const MyApp2({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("Official InAppWebView website")),
        body: SafeArea(
            child: Column(children: <Widget>[
          Expanded(
            child: Stack(children: [
              SealView(),
            ]),
          )
        ])));
  }
}
