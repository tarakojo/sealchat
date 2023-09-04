import 'dart:async';
import 'package:flutter/material.dart';
import 'package:sealchat/ui/testchat.dart';
import './ui/sealview.dart';

Future main() async {
 
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
