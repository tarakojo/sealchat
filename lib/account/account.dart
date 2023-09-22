//サブスクリプションの状態
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:purchases_flutter/purchases_flutter.dart';
import 'package:sealchat/logger.dart';

//アカウント情報のプロバイダー
final accountProvider = ChangeNotifierProvider((ref) => Account());

/*
 アカウント情報の操作と管理を行うクラス
*/
class Account extends ChangeNotifier {
  AccountInfo? info;

  //infoをuserの最新情報で更新する
  Future<void> syncAccount({required User user, required bool notify}) async {
    //todo : データベースの同期
    info = AccountInfo(
      user: user,
    );

    notifyListeners();
  }

  //FirebaseAuthでログインされたときに呼ばれるコールバック
  Future<void> onSignIn(User newUser) async {
    await Future.wait([
      syncAccount(user : newUser, notify : false),
    ]);

    logger.d("signed in as ${newUser.uid}");
  }

  Future<void> onSignOut() async {
    info = null;
    logger.d("signed out");
  }

  bool get isSignedIn => info != null;
}

//アカウント情報のクラス
class AccountInfo {
  AccountInfo({required user}) : _user = user;

  final User _user;

  User get user => _user;
  String get uid => _user.uid;
}
