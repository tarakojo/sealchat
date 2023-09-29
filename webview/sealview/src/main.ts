

import { backgroundOnResize, updateBackground } from './background';
import { LAppDelegate } from './live2d/lappdelegate';


window.onload = () => {
  //背景の設定
  updateBackground();
  setInterval(updateBackground, 1000 * 60); //1分ごとに背景を更新

  const backgroundHeight = backgroundOnResize().height;
  if (LAppDelegate.getInstance().initialize(backgroundHeight) == false) {
    return;
  }
  LAppDelegate.getInstance().run();
};

window.onbeforeunload = (): void => LAppDelegate.releaseInstance();
window.onresize = () => {
    const backgroundHeight = backgroundOnResize().height;
    LAppDelegate.getInstance().onResize(backgroundHeight);
};
