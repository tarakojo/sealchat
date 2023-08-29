import { initAssets } from "./assets/assets";
import { 
    LAppDelegate, 
    onTouchBegan as lappOnTouchBegan, 
    onTouchMoved as lappOnTouchMoved, 
    onTouchEnded as lappOnTouchEnded, 
    onTouchCancel as lappOnTouchCancel, 
    onClickBegan as lappOnClickBegan , 
    onMouseMoved as lapponMouseMoved , 
    onClickEnded as lappOnClickEnded 
} from "./live2d/lappdelegate";
import { release } from "./live2d/live2d";


export let canvas : HTMLCanvasElement = null;
export let gl : WebGLRenderingContext = null;
export let frameBuffer : WebGLFramebuffer = null; 

function initializeGL() {
    
    canvas = document.createElement('canvas');
    
    gl  = canvas.getContext('webgl');
    if (!gl) {
        alert('Cannot initialize WebGL. This browser does not support.');
        gl = null;
  
        document.body.innerHTML =
          'This browser does not support the <code>&lt;canvas&gt;</code> element.';
  
        // gl初期化失敗
        throw Error('This browser does not support the <code>&lt;canvas&gt;</code> element.');
      }
      
    // キャンバスを DOM に追加
    document.body.appendChild(canvas);

    if (!frameBuffer) {
        frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
      }
      
    // 透過設定
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    const supportTouch: boolean = 'ontouchend' in canvas;

    if (supportTouch) {
      // タッチ関連コールバック関数登録
      canvas.ontouchstart = onTouchStart;
      canvas.ontouchmove = onTouchMove;
      canvas.ontouchend = onTouchEnd;
      canvas.ontouchcancel = onTouchCancel;
    } else {
      // マウス関連コールバック関数登録
      canvas.onmousedown = onMouseDown;
      canvas.onmousemove = onMouseMove;
      canvas.onmouseup = onMouseUp;
    }
}

function initialize() {
    initializeGL();
    LAppDelegate.getInstance().initialize();
}

function onTouchStart (e : TouchEvent) {
    lappOnTouchBegan(e);
}

function onTouchMove (e : TouchEvent) {
    lappOnTouchMoved(e);
}

function onTouchEnd(e : TouchEvent) {
    lappOnTouchEnded(e);   
}

function onTouchCancel (e : TouchEvent) {
    lappOnTouchCancel(e);
}

function onMouseDown (e : MouseEvent) {
    lappOnClickBegan(e);
}

function onMouseMove (e : MouseEvent) {
    lapponMouseMoved(e);
}

function onMouseUp (e : MouseEvent) {
    lappOnClickEnded(e);
}

function run () {
    const loop = () => {
        // 画面の初期化
        gl.clearColor(0.0,0.0,0.0,1.0);
        
        // 深度テストを有効化
        gl.enable(gl.DEPTH_TEST);

        // 近くにある物体は、遠くにある物体を覆い隠す
        gl.depthFunc(gl.LEQUAL);

        // カラーバッファや深度バッファをクリアする
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.clearDepth(1.0);

        LAppDelegate.getInstance().render();

        requestAnimationFrame(loop);
    }
    loop();
}

window.onload = async () => {
    await initAssets();
    initialize();
    run();
}

window.onbeforeunload = () => {
    release();
}

window.onresize = () => {
    LAppDelegate.getInstance().onResize();
}