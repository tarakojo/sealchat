import { gl } from "../main";
import { LAppDelegate } from "./lappdelegate";
import { LAppPal } from "./lapppal";


export function initialize () {
  if(LAppDelegate.getInstance().initialize() == false) {
    throw Error("failed to initialize live2d");
  }
}

export function render () {
  LAppDelegate.getInstance().render();
}

export function release () {
  LAppDelegate.releaseInstance();
}

/**
 * ブラウザロード後の処理
 */
/*
window.onload = (): void => {
  // create the application instance
  if (LAppDelegate.getInstance().initialize() == false) {
    return;
  }

  LAppDelegate.getInstance().run();
};*/

/**
 * 終了時の処理
 */
//window.onbeforeunload = (): void => LAppDelegate.releaseInstance();

/**
 * Process when changing screen size.
 */
/*
window.onresize = () => {
  if (LAppDefine.CanvasSize === 'auto') {
    LAppDelegate.getInstance().onResize();
  }
};
*/