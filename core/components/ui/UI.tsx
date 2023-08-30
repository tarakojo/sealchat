import { Platform } from "react-native";
import { WebView } from "react-native-webview";
import { useAssets } from "expo-asset";
import { useEffect, useState } from "react";
import * as ui from "../../assets/ui/bundle.json";

export default function UI() {
  

  if (Platform.OS == "web") {
    return (
      <>
          <iframe
            style={{ height: "100%", width: "100%" }}
            src={"../../assets/ui/index.html"}
          ></iframe>
      </>
    );
  } else {
    return (<></>
      /*
      <>
        <WebView
          allowFileAccess={false}
          javaScriptEnabled={true}
          style={{ height: "100%", width: "100%" }}
          source={{ html: htmlx }}
        ></WebView>
      </>
      */
    );
  }
}

