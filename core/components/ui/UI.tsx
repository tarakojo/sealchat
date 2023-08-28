import { Platform } from "react-native";
import { WebView } from "react-native-webview";
import { useAssets } from "expo-asset";
import { useEffect, useState } from "react";

export default function UI() {
  const htmlx = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>タイトル</title>
      <!-- ここにCSSファイルのリンクやスタイルシートの設定を追加 -->
  </head>
  <body>
      <div id="main" style="height: 100vh;width: 100vw;background-color: white; font-size:20">aiueo</div>
      <script>document.getElementById("main").innerHTML="apapa"</script>
  </body>
  </html>
  `;

  if (Platform.OS == "web") {
    return (
      <>
          <iframe
            style={{ height: "100%", width: "100%" }}
            srcDoc={htmlx}
          ></iframe>
      </>
    );
  } else {
    return (
      <>
        <WebView
          allowFileAccess={false}
          javaScriptEnabled={true}
          style={{ height: "100%", width: "100%" }}
          source={{ html: htmlx }}
        ></WebView>
      </>
    );
  }
}

