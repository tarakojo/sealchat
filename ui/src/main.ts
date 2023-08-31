/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './live2d/lappdelegate';
import * as LAppDefine from './live2d/lappdefine';

(window as any)["runSealView"] = () => {
  // create the application instance
  if (LAppDelegate.getInstance().initialize() == false) {
    return;
  }
      
  window.onbeforeunload = (): void => LAppDelegate.releaseInstance();
  window.onresize = () => {
    if (LAppDefine.CanvasSize === 'auto') {
      LAppDelegate.getInstance().onResize();
    }
  };

  LAppDelegate.getInstance().run();
};

(window as any)["waitingAssets"] = true;

