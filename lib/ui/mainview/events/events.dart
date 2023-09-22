import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sealchat/account/account.dart';
import 'package:sealchat/logger.dart';
import 'package:sealchat/ui/dialog.dart';
import 'package:sealchat/ui/signin_screen.dart';

//メイン画面の演出についてのコード

//メイン画面のイベントを識別するenum
enum MainViewEvent {
  opening,
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
if (!account.isSignedIn) {
      //ログインしていない場合
      update(MainViewEvent.opening, notify: notify);
    } else {
      //ログインしている場合
      update(MainViewEvent.none, notify: notify);
    }
  }
}

//プロバイダー
final mainViewEventProvider = ChangeNotifierProvider(
    (ref) => MainViewEventNotifier(event: MainViewEvent.opening));

