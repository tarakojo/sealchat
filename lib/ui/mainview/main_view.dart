import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_ui_auth/firebase_ui_auth.dart';
import 'package:flutter/material.dart';
import 'package:pointer_interceptor/pointer_interceptor.dart';
import 'package:provider/provider.dart';
import 'package:sealchat/account/account.dart';
import 'package:sealchat/logger.dart';
import 'package:sealchat/main.dart';
import 'package:sealchat/ui/mainview/seal_view.dart';
import 'package:sealchat/ui/mainview/main_view_normal_ui.dart';
import 'package:sealchat/ui/mainview/main_view_opening.dart';

class MainView extends StatefulWidget {
  const MainView({super.key});

  @override
  State<MainView> createState() => _MainViewState();
}

class _MainViewState extends State<MainView> {
  SealViewController? sealViewController;
  //オープニングを表示するかのフラグ
  bool showOpening = true;

  @override
  Widget build(BuildContext context) {
    final account = context.watch<Account>();
    final Widget ui;

    if (FirebaseAuth.instance.currentUser == null) {
      //ログインしていない場合
      if (showOpening) {
        //まだオープニングを表示していない場合
        ui = MainViewOpening(
          onFinished: () {
            //オープニングが終わったら、オープニングを表示しないようにする
            //つまり、ログイン画面を表示する。
            setState(() {
              showOpening = false;
            });
          },
        );
      } else {
        //オープニングを表示した後
        //ログイン画面を表示
        ui = SignInScreen();
      }
    } else {
      //ログインしている場合

      //オープニングはもう表示しない
      showOpening = false;

      /*
      サブスクリプションのチェックをし、サブスクリプションが有効であれば通常のUIを表示し、
      そうでない場合、その旨をダイアログで通知し、サブスクリプション購入画面を表示する。
      */
      if (account.info!.subscriptionState == SubscriptionState.inactive) {
        ui = FutureBuilder(
            future: AwesomeDialog(
              context: context,
              dialogType: DialogType.info,
              title: 'seal wakes up',
              btnOkOnPress: () {},
            ).show(),
            builder: (context, snapshot) {
              if (!snapshot.hasData) {
                return const Placeholder();
              }
              return ElevatedButton(
                  onPressed: () {
                    logger.d("todo : paywall周りの実装!");
                  },
                  child: Text("purchase"));
            });
      } else {
        //通常のUIを表示
        ui = MainViewNormalUI();
      }
    }

    return Stack(fit: StackFit.expand, children: [
      SealView(onCreated: (sealViewController) {
        this.sealViewController = sealViewController;
      }),

      /*
        inappwebviewの上にあるウィジェットは、ただ配置しただけではタップなどのイベントを拾えないので
        pointer intercepterでラップする必要がある。
      */
      PointerInterceptor(
          //sealViewControllerを伝播する
          child: Provider<SealViewController?>.value(
        value: sealViewController,
        child: ui,
      ))
    ]);
  }
}
