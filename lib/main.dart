import 'dart:async';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_ui_oauth_google/firebase_ui_oauth_google.dart';
import 'package:firebase_ui_auth/firebase_ui_auth.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:purchases_flutter/purchases_flutter.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:sealchat/account/account.dart';
import 'package:sealchat/logger.dart';
import 'package:sealchat/account/purchases.dart';
import 'package:sealchat/ui/mainview/main_view.dart';
import 'package:sealchat/ui/sealview/seal_view.dart';
import './firebase_options.dart';

Future main() async {
  //環境変数の読み込み
  await dotenv.load(fileName: ".env");

  WidgetsFlutterBinding.ensureInitialized();

  final initTasks = [
    initSealView(),
    initFirebase(),
    PurchaseWrapper.init(),
  ];
  await Future.wait(initTasks);

  runApp(ProviderScope(child: App()));
}

//firebaseの初期化
Future initFirebase() async {
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  FirebaseUIAuth.configureProviders([
    GoogleProvider(
        clientId: dotenv.get('FIREBASEAUTH_GOOGLE_PROVIDER_CLIENT_ID')),
  ]);

  //FirebaseAuth.instance.useAuthEmulator('localhost', 9099);
  FirebaseFunctions.instance.useFunctionsEmulator('localhost', 5001);
  FirebaseFirestore.instance.useFirestoreEmulator('localhost', 8080);
}

//アプリケーションのルートウィジェット
class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          body: StreamBuilder(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (context, snapshot) {
          return _AppBody(snapshot: snapshot);
        },
      )),
    );
  }
}

class _AppBody extends ConsumerWidget {
  _AppBody({super.key, required this.snapshot});

  final AsyncSnapshot<User?> snapshot;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final account = ref.watch<Account>(accountProvider);
    //ユーザー情報の更新
    final Future<void>? future;
    if (snapshot.data?.uid == account.info?.uid) {
      //ユーザー情報が変わっていない場合
      future = null;
    } else if (snapshot.hasData) {
      //サインインした場合
      future = account.onSignIn(snapshot.data!);
    } else {
      //サインアウトした場合
      future = account.onSignOut();
    }

    /*
    todo: futureのローディング画面を作る 
    */

    return FutureBuilder<void>(
      future: future,
      builder: (context, snapshot) {
        return MainView();
      },
    );
  }
}
