import SealView from './sealview/SealView';
import Hukidasi from './hukidasi/Hukidasi';
import Background, { getNewBackgroundSize } from './Background';
import Input from './Input';
import Clock from './Clock';
import { useEffect, useRef, useState } from 'react';
import Panels from './panels/Panels';
import MessageBoard from './MessageBoard';

export const MainView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [backgroundSize, setBackgroundSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  //リサイズ処理
  useEffect(() => {
    const resizeHandler = () => {
      const newSize = getNewBackgroundSize(containerRef.current);
      setBackgroundSize(newSize);
    };
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    //モバイルで開いた場合、画面サイズがおかしくなる場合がある。
    //それを補正するために、とりあえず１秒ごとにリサイズ処理を行う。
    //もっといい方法があれば変える。
    const f = setInterval(resizeHandler, 1000);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      clearInterval(f);
    };
  }, []);

  //背景の更新
  const background = backgroundSize ? (
    <Background width={backgroundSize.width} height={backgroundSize.height} />
  ) : (
    <></>
  );

  const sealView = backgroundSize ? (
    <SealView backgroundHeight={backgroundSize.height} />
  ) : (
    <></>
  );

  return (
    <>
      <div ref={containerRef} className="h-full w-full flex justify-center">
        {background}
        {sealView}
        <Input />
        <Clock />
        <Hukidasi />
        <MessageBoard />
        <Panels />
      </div>
    </>
  );
};

export default MainView;
