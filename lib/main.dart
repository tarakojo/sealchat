import 'dart:async';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_ui_oauth_google/firebase_ui_oauth_google.dart';
import 'package:firebase_ui_auth/firebase_ui_auth.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:purchases_flutter/purchases_flutter.dart';
import 'package:sealchat/logger.dart';
import 'package:sealchat/ui/mainview/main_view.dart';
import 'package:sealchat/ui/mainview/seal_view.dart';
import './firebase_options.dart';

Future main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final initTasks = [
    initSealView(),
    initFirebase(),
    initPurchases(),
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

Future initPurchases() async {  
  PurchasesConfiguration configuration = PurchasesConfiguration((/* todo : .envを追加し、revenuecatのpublic api keyをここへ */);

  /*
  if (Platform.isAndroid) {
    configuration = PurchasesConfiguration(<public_google_sdk_key>);
    if (buildingForAmazon) { 
      // use your preferred way to determine if this build is for Amazon store
      // checkout our MagicWeather sample for a suggestion
      configuration = AmazonConfiguration(<public_amazon_sdk_key>);
    }
  } else if (Platform.isIOS) {
    configuration = PurchasesConfiguration(<public_ios_sdk_key>);
  }*/

  await Purchases.configure(configuration);
}
/*
todo : AppをUIへ。
onSignin, onsignoutを別ファイルへ。
*/

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  User? user = null;

  Future<void> onSignIn(User newUser) async {
    user = newUser;
    await Purchases.logIn(newUser.uid);
    logger.d("signed in as ${user?.uid}");
    //todo : データベース同期処理、データベース同期コールバックを追加
  }

  Future<void> onSignOut() async {
    user = null;
    await Purchases.logOut();
    logger.d("signed out");
    //todo : データベース同期コールバックを削除
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          body: StreamBuilder(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (context, snapshot) {
          //ユーザー情報の更新
          final Future<void>? future;
          if (snapshot.data?.uid == user?.uid) {
            //ユーザー情報が変わっていない場合
            future = null;
          } else if (snapshot.hasData) {
            //サインインした場合
            future = onSignIn(snapshot.data!);
          } else {
            //サインアウトした場合
            future = onSignOut();
          }

          return FutureBuilder<void>(
            future: future,
            builder: (context, snapshot) {
              return MainView();
            },
          );
        },
      )),
    );
  }
}
