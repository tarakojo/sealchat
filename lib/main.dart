import 'dart:async';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_ui_oauth_google/firebase_ui_oauth_google.dart';
import 'package:firebase_ui_auth/firebase_ui_auth.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:sealchat/logger.dart';
import 'package:sealchat/ui/mainview/main_view.dart';
import 'package:sealchat/ui/mainview/seal_view.dart';
import './firebase_options.dart';

Future main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final initTasks = [
    initSealView(),
    initFirebase(),
  ];
  await Future.wait(initTasks);

  runApp(App());
}

Future initFirebase() async {
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  FirebaseUIAuth.configureProviders([
    GoogleProvider(
        clientId:
            "26446727063-khr9jlda74jjssffdo22g2574f2mmm93.apps.googleusercontent.com"),
  ]);

  //FirebaseAuth.instance.useAuthEmulator('localhost', 9099);
  FirebaseFunctions.instance.useFunctionsEmulator('localhost', 5001);
  FirebaseFirestore.instance.useFirestoreEmulator('localhost', 8080);

}

class App extends StatefulWidget {
  @override
  _AppState createState() => new _AppState();
}

class _AppState extends State<App> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(body: MainView()));

     /*   initialRoute:
            FirebaseAuth.instance.currentUser == null ? '/sign-in' : '/profile',
        routes: {
          '/sign-in': (context) {
            return SignInScreen(
              actions: [
                AuthStateChangeAction<SignedIn>((context, state) {
                  Navigator.pushReplacementNamed(context, '/profile');
                }),
              ],
            );
          },
          '/profile': (context) {
            FirebaseFunctions.instance
                .httpsCallable('helloWorld')
                .call()
                .then((result) {
              logger.d(result.data);
            });
            return Text("Profile");
          },
        });*/
  }
}
