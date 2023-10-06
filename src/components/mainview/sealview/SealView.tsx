import { useEffect, useReducer, useRef, useState } from 'react';
import { LAppDelegate, canvas } from './live2d/lappdelegate';
import { getNewBackgroundSize } from '../Background';

//表示するべきcanvasのサイズを取得
const getNewCanvasSize = (backgroundHeight) => {
  const heightRatio = 0.69;
  const height = backgroundHeight * heightRatio;
  const width = height;
  return { width, height };
};

export const SealView = ({ backgroundHeight }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [canvasSize, setCanvasSize] = useState(
    getNewCanvasSize(backgroundHeight)
  );
  
  const updateCanvasSize = () => {
    const newCanvasSize = getNewCanvasSize(backgroundHeight);
    canvasRef.current.width = newCanvasSize.width;
    canvasRef.current.height = newCanvasSize.height;
    LAppDelegate.getInstance().onResize();
    return newCanvasSize;
  };

  //live2dの初期化
  useEffect(() => {
    if (!LAppDelegate.getInstance().initialize(canvasRef.current)) {
      alert('Failed to initialize');
      return;
    }
    LAppDelegate.getInstance().run(setOpacity);
  }, []);

  useEffect(() => {
    setCanvasSize(updateCanvasSize());
  }, [backgroundHeight]);

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
