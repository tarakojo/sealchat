import 'dart:math';

import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:firebase_ui_auth/firebase_ui_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sealchat/logger.dart';
import 'package:sealchat/ui/mainview/events/events.dart';
import 'package:sealchat/ui/mainview/main_view.dart';
import 'package:sealchat/ui/signin_screen.dart';

enum _OpeningStep {
  waitingForFirstTap,
  narratorGreeting,
  waitingForWakeUpTap,
  sealWakesUp,
  sealGreeting,
  waitingForNameInput,
  sealRespondingToName,
  waitingForPetting,
  sealRespondingToPetting,
  narratorIntroducingSeal,
}

//オープニング
class Opening extends ConsumerStatefulWidget {
  const Opening({super.key});

  @override
  ConsumerState<Opening> createState() => _OpeningState();
}

class _OpeningState extends ConsumerState<Opening> {
  @override
  Widget build(BuildContext context) {
    final mainViewEvent = ref.watch(mainViewEventProvider);
    Future(
      () {
        AwesomeDialog(
          context: context,
          dialogType: DialogType.info,
          title: 'opening',
          btnOkOnPress: () {
            mainViewEvent.update(MainViewEvent.firstSubscription);
          },
        )..show();
      },
    );
    return Container();
  }
}
