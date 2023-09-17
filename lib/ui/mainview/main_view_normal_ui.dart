import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:sealchat/ui/mainview/chat_input.dart';

//通常状態のUI
class MainViewNormalUI extends StatelessWidget {
  const MainViewNormalUI({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        Align(
          alignment: Alignment.bottomCenter,
          child: ChatInput(),
        ),
      ],
    );
  }
}
