import 'package:flutter/foundation.dart';
import 'package:purchases_flutter/purchases_flutter.dart';
import 'package:sealchat/logger.dart';


//サブスクリプションプラン
enum SubscriptionPlan {
  normal,
}

/*
購入処理関連の処理を行うクラス
現状、revenuecat sdkはwebに対応していないので、プラットフォームによって処理を分ける必要がある
*/

class PurchaseWrapper {
  //revenuecatの初期化
  static Future<void> init() async {
    //webの場合はなにもしない
    if (kIsWeb) return;

    logger.d("This platform is not supported");
    throw Error();
    /*
    todo : androidの場合の初期化
    PurchasesConfiguration configuration;
    await Purchases.configure(configuration);
    */
  }

  String? _uid;
  Future<void> Function(CustomerInfo)? _onCustomerInfoUpdated;

  //customerInfoの更新時に呼ばれるコールバック
  void onCustomerInfoUpdated(CustomerInfo info) async {
    if (kIsWeb) return;
    await _onCustomerInfoUpdated?.call(info);
  }

  //revenue catのログイン
  Future signIn(
      {required String uid,
      Future<void> Function(CustomerInfo)? onCustomerInfoUpdated}) async {
    //uidを設定
    _uid = uid;

    //webでない場合はsdkのログインとコールバックの設定を行う
    if (kIsWeb) return;
    await Purchases.logIn(uid);
    _onCustomerInfoUpdated = onCustomerInfoUpdated;
    Purchases.addCustomerInfoUpdateListener(this.onCustomerInfoUpdated);
  }

  //revenue catのログアウト
  Future signOut() async {
    //uidをnullにする
    _uid = null;

    //webでない場合はsdkのログアウトとコールバックの削除を行う
    if (kIsWeb) return;
    Purchases.removeCustomerInfoUpdateListener(onCustomerInfoUpdated);
    _onCustomerInfoUpdated = null;
    await Purchases.logOut();
  }
}
