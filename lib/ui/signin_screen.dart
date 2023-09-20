import 'package:firebase_ui_auth/firebase_ui_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

void showSignInScreen(BuildContext context) {
  Navigator.of(context).push(MaterialPageRoute(builder: (context) {
    return SignInScreen(actions: [
      AuthStateChangeAction<SignedIn>((context, state) {
        Navigator.of(context).pop();
      })
    ]);
  }));
}
