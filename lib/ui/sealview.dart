import 'dart:io';

import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:sealchat/logger.dart';

Future initSealView() async {
  WidgetsFlutterBinding.ensureInitialized();

  if (!kIsWeb && defaultTargetPlatform == TargetPlatform.android) {
    await InAppWebViewController.setWebContentsDebuggingEnabled(true);
  }


}

class SealView extends StatefulWidget {
  const SealView({super.key});

  @override
  State<SealView> createState() => _SealViewState();
}

class _SealViewState extends State<SealView> {
  final GlobalKey webViewKey = GlobalKey();
  InAppWebViewController? webViewController;
  InAppWebViewSettings settings = InAppWebViewSettings(
      webViewAssetLoader: WebViewAssetLoader(
          pathHandlers: [AssetsPathHandler(path: '/assets/')]));

  @override
  Widget build(BuildContext context) {

    final WebUri url;
    if(kIsWeb){
      url = WebUri("./assets/sealview/index.html");
    }
    else if (Platform.isAndroid){
      url = WebUri(
                  "https://appassets.androidplatform.net/assets/flutter_assets/assets/sealview/index.html");
    }
    else{
      logger.f("SealView for this platform is not yet implemented");
      throw Error();
    }

    return InAppWebView(
      key: webViewKey,
      initialUrlRequest: URLRequest(
          url: url),
      initialSettings: settings,
      onWebViewCreated: (controller) {
        webViewController = controller;
      },
      onConsoleMessage: (controller, consoleMessage) {
        logger.d(consoleMessage);
      },
    );
  }
}
