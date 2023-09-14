import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:pointer_interceptor/pointer_interceptor.dart';
import 'package:sealchat/ui/mainview/chat_input.dart';
import 'package:sealchat/ui/mainview/seal_view.dart';

class MainView extends StatefulWidget {
  const MainView({super.key});

  @override
  State<MainView> createState() => _MainViewState();
}

class _MainViewState extends State<MainView> {
  @override
  Widget build(BuildContext context) {
    return Stack(fit: StackFit.expand, children: [
      SealView(),
      /*
        inappwebviewの上にあるウィジェットは、ただ配置しただけではタップなどのイベントを拾えないので
        pointer intercepterでラップする必要がある。
      */
      PointerInterceptor(
        child: Align(alignment: Alignment.bottomCenter, child: ChatInput()),
      )
    ]);
  }
}
