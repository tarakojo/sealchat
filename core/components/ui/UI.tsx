import { Platform } from "react-native";
import { WebView } from "react-native-webview";
import { useAssets } from "expo-asset";
import { useEffect, useState } from "react";
import * as assets from "../../assets/ui/assets.json";
import * as index from "../../assets/ui/index.json";

const injectedJavaScript = (() => {
  if (Platform.OS === "web") {
    return null;
  }
  const unescapedAssetsStr = JSON.stringify(assets);
  let assetsStr = "";
  for (let i = 0; i < unescapedAssetsStr.length; ++i) {
    if (unescapedAssetsStr[i] === '"') {
      assetsStr += '\\"';
    } else if (unescapedAssetsStr[i] === "\\") {
      assetsStr += "\\\\";
    } else {
      assetsStr += unescapedAssetsStr[i];
    }
  }
  return `
    const waitingAssetsLoopID = setInterval(() => {
      console.log("checking..");
      if (window?.runSealView) {
        clearInterval(waitingAssetsLoopID);
        window.assets = JSON.parse(${assetsStr});
        console.log("seal view assets was loaded. start view...");
        window.runSealView();
      }
    }, 1000);
    true;
  `;
})();

function SealView_Web() {
  useEffect(() => {
    const v = document.getElementById("sealview") as HTMLIFrameElement;
    const w = v.contentWindow as any;
    const id = setInterval(() => {
      if (w?.runSealView) {
        clearInterval(id);
        w.assets = assets;
        console.log("seal view assets was loaded. start view...");
        w.runSealView();
      }
    }, 10);
  }, []);

  return (
    <>
      <iframe
        id="sealview"
        style={{ height: "100%", width: "100%" }}
        srcDoc={`<img style="height:100%; width:100%; background-color:red" src = "assets/aza.jpg"></img>`}
      ></iframe>
    </>
  );
}
function SealView_NotWeb() {
  const debugging = `
     // Debug
     console = new Object();
     console.log = function(log) {
       window.ReactNativeWebView.postMessage(log);
     };
     console.debug = console.log;
     console.info = console.log;
     console.warn = console.log;
     console.error = console.log;

     console.log("start kusodeka script");
     `;

    console.log(document.scripts);
  return (
    <>
      <WebView
        originWhitelist={['*']}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        javaScriptEnabled={true}
        style={{ height: "100%", width: "100%" }}
        source={require('../../assets/ui/index.html')}
        ref={() => {}}
        onLoadStart={()=>console.log("loadstart")}
        onLoadEnd={()=>console.log("loadend")}
        injectedJavaScript={debugging}
        onMessage={(e) => {console.log(e.nativeEvent.data)}}
      ></WebView>
    </>
  );
}
export default function UI() {
  return Platform.OS == "web" ? SealView_Web() : SealView_NotWeb();
}
