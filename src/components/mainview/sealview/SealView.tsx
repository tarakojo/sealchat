import { useEffect, useReducer, useRef, useState } from 'react';
import { LAppDelegate, canvas } from './live2d/lappdelegate';
import { getNewBackgroundSize } from '../Background';

//表示するべきcanvasのサイズを取得
const getNewCanvasSize = () => {
  const heightRatio = 0.69;
  const backgroundHeight = getNewBackgroundSize().height;
  const height = backgroundHeight * heightRatio;
  const width = height;
  return { width, height };
};

export const SealView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [canvasSize, setCanvasSize] = useState(getNewCanvasSize());

  //リサイズ関連処理
  useEffect(() => {
    //canvasサイズを初期化
    canvasRef.current.width = canvasSize.width;
    canvasRef.current.height = canvasSize.height;

    //リサイズ時のコールバック
    const hundleResize = () => {
      const newCanvasSize = getNewCanvasSize();
      canvasRef.current.width = newCanvasSize.width;
      canvasRef.current.height = newCanvasSize.height;
      LAppDelegate.getInstance().onResize();
      setCanvasSize(newCanvasSize);
    };

    window.addEventListener('resize', hundleResize);
    return () => {
      window.removeEventListener('resize', hundleResize);
    };
  }, []);

  //live2dの初期化
  useEffect(() => {
    if (!LAppDelegate.getInstance().initialize(canvasRef.current)) {
      alert('Failed to initialize');
      return;
    }
    LAppDelegate.getInstance().run(setOpacity);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        absolute
        bottom-[11.5%]
        mr-[3.5%]  
        transition-opacity
        duration-1000
        ease-in
        z-[100]
      "
      style={{
        opacity,
        height: canvasSize.height,
        width: canvasSize.width,
      }}
    />
  );
};

export default SealView;
