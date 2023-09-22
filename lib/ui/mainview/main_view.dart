import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_ui_auth/firebase_ui_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:pointer_interceptor/pointer_interceptor.dart';
import 'package:sealchat/account/account.dart';
import 'package:sealchat/logger.dart';
import 'package:sealchat/main.dart';
import 'package:sealchat/ui/mainview/events/events.dart';
import 'package:sealchat/ui/sealview/seal_view.dart';
import 'package:sealchat/ui/mainview/controls/main_view_controls.dart';
import 'package:sealchat/ui/mainview/events/opening.dart';

class MainView extends ConsumerWidget {
  const MainView({super.key});

  //イベントに応じたウィジェットを返す
  Widget eventWidget(MainViewEventNotifier mainViewEventNotifier) {
    switch (mainViewEventNotifier.event) {
      case MainViewEvent.opening:
        return Opening(key: mainViewEventNotifier.eventKey);
      case MainViewEvent.none:
        return Container(key: mainViewEventNotifier.eventKey);
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final account = ref.watch(accountProvider);
    final mainViewEvent = ref.watch(mainViewEventProvider);

    mainViewEvent.updateEventFromAccountInfo(account, false);
    final eventWidget = this.eventWidget(mainViewEvent);
    final showControls = mainViewEvent.event != MainViewEvent.opening;

    return Stack(fit: StackFit.expand, children: [
      // SealView(),

      /*
        inappwebviewの上にあるウィジェットは、ただ配置しただけではタップなどのイベントを拾えないので
        pointer intercepterでラップする必要がある。
      */
      PointerInterceptor(
          child: //イベントがopeningの場合は、コントロールを表示しない
              Stack(fit: StackFit.expand, children: [
        //showControlsがtrueの場合は、コントロールを表示する
        showControls ? MainViewControls() : Container(),
        //イベントウィジェットを表示する
        eventWidget
      ]))
    ]);
  }
}
