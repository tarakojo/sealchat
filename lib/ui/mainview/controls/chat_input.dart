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
  bool submitLock = false;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: TextField(
            autofocus: true,
            focusNode: focusNode,
            controller: textEditingController,
            onSubmitted: (_) {
              if (submitLock) return;
              submitLock = true;
              onSubmitted();
              submitLock = false;
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
            if (submitLock) return;
            submitLock = true;
            onSubmitted();
            submitLock = false;
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
    HttpsCallableResult result = await FirebaseFunctions.instance
        .httpsCallable('seal_response')
        .call({"message": textEditingController.text});
    final data = result.data as Map<String, dynamic>;
    final message = data['message'];
    AwesomeDialog(
      context: context,
      dialogType: DialogType.info,
      animType: AnimType.rightSlide,
      title: 'Dialog Title',
      desc: message,
      btnCancelOnPress: () {},
      btnOkOnPress: () {},
    )..show();
    logger.d(textEditingController.text);
    textEditingController.clear();
    focusNode.requestFocus();
  }
}
