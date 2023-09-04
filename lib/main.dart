import 'dart:async';
import 'package:dart_openai/dart_openai.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:sealchat/chat/chattest.dart';
import 'package:sealchat/env.dart';
import 'package:sealchat/ui/testchat.dart';
import './ui/sealview.dart';

Future main() async {
  //.envファイルの読み込み
  await initEnv();
  //openaiのapiキー設定
  OpenAI.apiKey = dotenv.get('OPENAI_API_KEY');

  //await initChatGPT();

  await initSealView();
  runApp(MaterialApp(home: new MyApp()));
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
    return Scaffold(
        appBar: AppBar(title: Text("Official InAppWebView website")),
        body: SafeArea(
            child: Column(children: <Widget>[
          Expanded(
            child: Stack(children: [
              ChatRoom(),
            ]),
          )
        ])));
  }
}
