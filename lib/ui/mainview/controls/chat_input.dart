import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:flutter/material.dart';
import 'package:sealchat/logger.dart';

class ChatInput extends StatefulWidget {
  const ChatInput({super.key});

  @override
  State<ChatInput> createState() => _ChatInputState();
}

class _ChatInputState extends State<ChatInput> {
  final textEditingController = TextEditingController();
  final focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: TextField(
            autofocus: true,
            focusNode: focusNode,
            controller: textEditingController,
            onSubmitted: (value) {
              onSubmitted();
            },
            decoration: InputDecoration(
              hintText: 'Enter text',
              fillColor: Colors.white,
              filled: true,
            ),
          ),
        ),
        ElevatedButton(
          onPressed: () {
            onSubmitted();
          },
          child: Text('送信'),
        ),
      ],
    );
  }

  @override
  void dispose() {
    focusNode.dispose();
    super.dispose();
  }

  onSubmitted() async {
    FirebaseFunctions.instance
        .httpsCallable('testRevenueCat')
        .call()
        .then((result) {
      logger.d(result.data);
    });

    HttpsCallableResult result = await FirebaseFunctions.instance
        .httpsCallable('on_call_example')
        .call();
    AwesomeDialog(
      context: context,
      dialogType: DialogType.info,
      animType: AnimType.rightSlide,
      title: 'Dialog Title',
      desc: result.data["massage"],
      btnCancelOnPress: () {},
      btnOkOnPress: () {},
    )..show();
    logger.d(textEditingController.text);
    textEditingController.clear();
    focusNode.requestFocus();
  }
}
