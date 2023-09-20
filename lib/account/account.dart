//サブスクリプションの状態
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:purchases_flutter/purchases_flutter.dart';
import 'package:sealchat/account/purchases.dart';
import 'package:sealchat/logger.dart';

//アカウント情報のプロバイダー
final accountProvider = ChangeNotifierProvider((ref) => Account());

/*
 アカウント情報の操作と管理を行うクラス
*/
class Account extends ChangeNotifier {
  AccountInfo? info;
  final PurchaseWrapper _purchaseWrapper = PurchaseWrapper();

  //userでログインし、データベースと購入情報の同期を行い、新しい情報でアカウントを更新する
  Future<void> syncAccountAndPurchases(User user) async {
    /* final result = await FirebaseFunctions.instance
        .httpsCallable('syncPurchases')
        .call(user.uid);

    final SubscriptionState subsctiprionState;
    if (result.data.subscriptionState == "inactive") {
      subsctiprionState = SubscriptionState.inactive;
    } else if (result.data.subscriptionState == "normal") {
      subsctiprionState = SubscriptionState.normal;
    } else {
      logger.d("invalid subscriptionState");
      throw Error();
    }

    account = Account(
        user: user,
        subscriptionState: subsctiprionState,
        subscriptionRemainingChats: result.data.subscriptionRemainingChats,
        consumableRemainingChats: result.data.consumableRemainingChats);
        */

    info = AccountInfo(
        user: user,
        subscriptionState: SubscriptionState.inactive,
        subscriptionRemainingChats: 0,
        consumableRemainingChats: 0);

    notifyListeners();
  }

  //FirebaseAuthでログインされたときに呼ばれるコールバック
  Future<void> onSignIn(User newUser) async {
    await Future.wait([
      //データベースと購入情報の同期, infoの更新
      syncAccountAndPurchases(newUser),
      //purchaseWrapperの更新
      _purchaseWrapper.signIn(
          uid: newUser.uid,
          onCustomerInfoUpdated: (_) async {
            await syncAccountAndPurchases(newUser);
            notifyListeners();
          })
    ]);

    logger.d("signed in as ${newUser.uid}");
  }

  Future<void> onSignOut() async {
    await _purchaseWrapper.signOut();
    info = null;
    logger.d("signed out");
  }

  bool get isSignedIn => info != null;
  bool get isSubscriptionActive =>
      info?.subscriptionState == SubscriptionState.normal;
  bool get isRemainingZero =>
      info?.subscriptionRemainingChats == 0 &&
      info?.consumableRemainingChats == 0;
}

//サブスクリプションの状態
enum SubscriptionState { inactive, normal }

//アカウント情報のクラス
class AccountInfo {
  AccountInfo(
      {required user,
      required subscriptionState,
      required subscriptionRemainingChats,
      required consumableRemainingChats})
      : _user = user,
        _subscriptionState = subscriptionState,
        _subscriptionRemainingChats = subscriptionRemainingChats,
        _consumableRemainingChats = consumableRemainingChats;

  final User _user;
  final SubscriptionState _subscriptionState;
  final int _subscriptionRemainingChats;
  final int _consumableRemainingChats;

  User get user => _user;
  String get uid => _user.uid;
  SubscriptionState get subscriptionState => _subscriptionState;
  int get subscriptionRemainingChats => _subscriptionRemainingChats;
  int get consumableRemainingChats => _consumableRemainingChats;
}
