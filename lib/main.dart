import 'dart:async';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
//import 'package:firebase_auth/firebase_auth.dart';
//import 'package:firebase_ui_oauth_google/firebase_ui_oauth_google.dart';
//import 'package:firebase_ui_auth/firebase_ui_auth.dart';
import './firebase_options.dart';
import 'package:flutter/services.dart' ;

Future main() async {
  print("!!");

  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
 
/*
  FirebaseUIAuth.configureProviders([
    GoogleProvider(
        clientId:
            "26446727063-khr9jlda74jjssffdo22g2574f2mmm93.apps.googleusercontent.com"),
  ]);*/

  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => new _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        initialRoute:'/sign-in',
          //  FirebaseAuth.instance.currentUser == null ? '/sign-in' : '/profile',
        routes: {
          '/sign-in': (context) {
            return Container(
              child: Text("aaaaa"),
            );
            /* SignInScreen(
              actions: [
                AuthStateChangeAction<SignedIn>((context, state) {
                  Navigator.pushReplacementNamed(context, '/profile');
                }),
              ],
            );
          },
          '/profile': (context) {
            return ProfileScreen(
              actions: [
                SignedOutAction((context) {
                  Navigator.pushReplacementNamed(context, '/sign-in');
                }),
              ],
            );*/
          },
        });
  }
}
/*
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
*/