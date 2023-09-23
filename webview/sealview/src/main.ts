/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './live2d/lappdelegate';
import * as LAppDefine from './live2d/lappdefine';

export let canvas: HTMLCanvasElement = null;
export let gl: WebGLRenderingContext = null;
export let frameBuffer: WebGLFramebuffer = null;

function resizeCanvas(): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initialize(){

    // キャンバスの作成
    canvas = document.createElement('canvas');
    resizeCanvas();

    // glコンテキストを初期化
    // @ts-ignore
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
      alert('Cannot initialize WebGL. This browser does not support.');
      gl = null;

      document.body.innerHTML =
        'This browser does not support the <code>&lt;canvas&gt;</code> element.';

      // gl初期化失敗
      return false;
    }

    // キャンバスを DOM に追加
    document.body.appendChild(canvas);

    if (!frameBuffer) {
      frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    }

    // 透過設定
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);


    LAppDelegate.getInstance().initialize();
  }

window.onload = () => {

  initialize();

  // create the application instance
  if (LAppDelegate.getInstance().initialize() == false) {
    return;
  }
      
  LAppDelegate.getInstance().run();
};

window.onbeforeunload = (): void => LAppDelegate.releaseInstance();
window.onresize = () => {
  resizeCanvas();
    LAppDelegate.getInstance().onResize();
};