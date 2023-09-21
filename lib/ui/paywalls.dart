import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sealchat/account/account.dart';
import 'package:sealchat/logger.dart';
import 'package:sealchat/ui/dialog.dart';

class FirstSubscriptionPaywall extends AppDialog {
  FirstSubscriptionPaywall(Account account)
      : super(builder: (context, dismiss) {
          return SizedBox(
              width: 300,
              height: 10,
              child: ElevatedButton(
                  onPressed: () {
                    logger.d("todo : 初回サブスク処理 $account");
                    dismiss();
                  },
                  child: Text("first subscribe!")));
        });
}

class UpgradePaywall extends AppDialog {
  UpgradePaywall(Account account)
      : super(builder: (context, dismiss) {
          return SizedBox(
              width: 300,
              height: 10,
              child: ElevatedButton(
                  onPressed: () {
                    logger.d("todo : アップグレード処理 for ${account.info!.uid}");
                    dismiss();
                  },
                  child: Text("upgrade")));
        });
}
