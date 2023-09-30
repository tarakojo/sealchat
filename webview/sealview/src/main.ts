

import { backgroundOnResize, initBackground } from './background';
import { dismissHukidasi, hukidasiOnResize, initHukidasi, isHukidasiShown, showHukidasi } from './hukidasi';
import { LAppDelegate } from './live2d/lappdelegate';


window.onload = () => {
  const backgroundHeight= initBackground();

  if (LAppDelegate.getInstance().initialize(backgroundHeight) == false) {
    alert('Cannot initialize WebGL.');
    return;
  }
  LAppDelegate.getInstance().run();

  initHukidasi();
};

window.onbeforeunload = (): void => LAppDelegate.releaseInstance();
window.onresize = () => {
    const backgroundHeight = backgroundOnResize().height;
    LAppDelegate.getInstance().onResize(backgroundHeight);
    hukidasiOnResize();
};
