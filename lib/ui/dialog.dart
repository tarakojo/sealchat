import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

//一度だけダイアログを表示するウィジェット
class OneTimeDialog extends StatefulWidget {
  const OneTimeDialog({super.key, required this.dialog});

  final AppDialog dialog;

  @override
  State<OneTimeDialog> createState() => _OneTimeDialogState();
}

class _OneTimeDialogState extends State<OneTimeDialog> {
  bool alreadyShown = false;
  @override
  Widget build(BuildContext context) {
    if (!alreadyShown) {
      alreadyShown = true;
      widget.dialog.show(context);
    }
    return Container();
  }
}

class AppDialog {
  AppDialog({required this.builder});
  Widget Function(BuildContext context, void Function() dismiss) builder;

  void show(BuildContext context) {
    Future(() {
      showDialog(
          context: context,
          builder: (dialogContext) {
            return Dialog(
                child: builder(
              dialogContext,
              () {
                Navigator.of(context).pop();
              },
            ));
          });
    });
  }
}
