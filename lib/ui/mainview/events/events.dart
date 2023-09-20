

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sealchat/account/account.dart';
import 'package:sealchat/logger.dart';


//メイン画面の演出についてのコード

//メイン画面のイベントを識別するenum
enum MainViewEvent {
  opening,
  firstSubscription,
  subscriptionInactive,
  remainingZero,
  none,
}

//メイン画面のイベントを管理するクラス
class MainViewEventNotifier extends ChangeNotifier {
  MainViewEventNotifier({required MainViewEvent event})
      : _event = event,
        _eventKey = UniqueKey();
  MainViewEvent _event;
  Key _eventKey;

  MainViewEvent get event => _event;
  Key get eventKey => _eventKey;

  //イベントを更新する
  //notify = trueの場合は、notifyListeners()を呼ぶ
  //force = trueの場合は、イベントが同じでも更新する
  void update(MainViewEvent event, {bool notify = true, bool force = false}) {
    if (event != _event || force) {
      _event = event;
      _eventKey = UniqueKey();
      if (notify) {
        notifyListeners();
      }
      logger.d("main view event updated: $event");
    }
  }

  //アカウント情報からイベントを更新する
  void updateEventFromAccountInfo(Account account, bool notify) {
    if (event == MainViewEvent.firstSubscription) {
      //初回サブスクリプションオファーをしている場合
      return;
    } else if (!account.isSignedIn) {
      //ログインしていない場合
      update(MainViewEvent.opening, notify: notify);
    } else if (!account.isSubscriptionActive) {
      //サブスクリプションが無効な場合
      update(MainViewEvent.subscriptionInactive, notify: notify);
    } else if (account.isRemainingZero) {
      //チャット残り回数が0の場合
      update(MainViewEvent.remainingZero, notify: notify);
    } else {
      /* todo : アップグレードオファーをたまに出す？ */
      update(MainViewEvent.none, notify: notify);
    }
  }
}

//プロバイダー
final mainViewEventProvider = ChangeNotifierProvider(
    (ref) => MainViewEventNotifier(event: MainViewEvent.opening));


//初回サブスクリプションのダイアログを表示するイベントのウィジェット
class FirstSubscription extends ConsumerWidget {
  const FirstSubscription({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final account = ref.read(accountProvider);
    logger.d("first subscription event shown");
    return Container();
  }
}

class RemainingZero extends ConsumerWidget {
  const RemainingZero({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final account = ref.read(accountProvider);
    logger.d("remaining zero event shown");
    return Container();
  }
}

class SubscriptionInactive extends ConsumerWidget {
  const SubscriptionInactive({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final account = ref.read(accountProvider);
    logger.d("subscription inactive event shown");
    return Container();
  }
}