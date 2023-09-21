import 'package:firebase_ui_auth/firebase_ui_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:sealchat/logger.dart';

void showSignInScreen(BuildContext context, { void Function()? onSignedIn }) {
  logger.d("showSignInScreen");
  Navigator.of(context).push(MaterialPageRoute(builder: (context) {
    return SignInScreen(actions: [
      AuthStateChangeAction<SignedIn>((context, state) {
        Navigator.of(context).pop();
        onSignedIn?.call();
      })
    ]);
  }));
}
