import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:sealchat/ui/mainview/controls/chat_input.dart';

//チャット入力やボタンなどを表示するウィジェット
class MainViewControls extends StatelessWidget {
  const MainViewControls({super.key});

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
