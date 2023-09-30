import { get } from 'http';
import { useEffect, useRef, useState } from 'react';

const backgroundNaturalWidth = 1920;
const backgroundNaturalHeight = 1080;
const backgroundAspect = backgroundNaturalWidth / backgroundNaturalHeight;

export const getNewBackgroundSize = () => {
  const aspect = window.innerWidth / window.innerHeight;

  let width, height;
  if (aspect > backgroundAspect) {
    width = window.innerWidth;
    height = width / backgroundAspect;
  } else {
    height = window.innerHeight;
    width = height * backgroundAspect;
  }

  return { width, height };
};

type BackgroundType = 'hiru' | 'yoru';

//昼ならtrue夜ならfalseを返す
function getBackgroundType() {
  const now = new Date();
  const hours = now.getHours();

  const startOfDaytime = 6;
  const endOfDaytime = 18;

  return hours >= startOfDaytime && hours < endOfDaytime ? 'hiru' : 'yoru';
}

export const Background = () => {
  const hiruRef = useRef<HTMLVideoElement>(null);
  const yoruRef = useRef<HTMLVideoElement>(null);
  const [currentBackground, setCurrentBackground] =
    useState<BackgroundType | null>(null);

  //背景の更新関数
  const updateBackground = () => {
    const newBackgroundType = getBackgroundType();
    if (newBackgroundType === 'hiru') {
      yoruRef.current.pause();
      hiruRef.current.play();
      hiruRef.current.style.opacity = '1';
      yoruRef.current.style.opacity = '0';
    } else {
      hiruRef.current.pause();
      yoruRef.current.play();
      hiruRef.current.style.opacity = '0';
      yoruRef.current.style.opacity = '1';
    }
    setCurrentBackground(newBackgroundType);
  };

  useEffect(() => {
    //動画の初期化
    hiruRef.current.style.opacity = '0';
    hiruRef.current.muted = true;
    hiruRef.current.autoplay = true;
    hiruRef.current.loop = true;
    hiruRef.current.src =
      './assets/background/2023syogatsu_Background/syougatsu_hiru.mp4';
    yoruRef.current.style.opacity = '0';
    yoruRef.current.muted = true;
    yoruRef.current.autoplay = true;
    yoruRef.current.loop = true;
    yoruRef.current.src =
      './assets/background/2023syogatsu_Background/syougatsu_yoru.mp4';

    //画面サイズの変更に対応
    const resizeHandler = () => {
      const { width, height } = getNewBackgroundSize();
      hiruRef.current.style.width = `${width}px`;
      hiruRef.current.style.height = `${height}px`;
      yoruRef.current.style.width = `${width}px`;
      yoruRef.current.style.height = `${height}px`;
    };
    window.addEventListener('resize', resizeHandler);

    //サイズの初期化
    resizeHandler();

    //背景の初期化
    updateBackground();

    //1分ごとに背景の更新
    const updateFunction = setInterval(updateBackground, 1000 * 60);

    return () => {
      //リサイズイベントの削除
      window.removeEventListener('resize', resizeHandler);
      //背景更新コールバックの削除
      clearInterval(updateFunction);
    };
  }, []);

  return (
    <div
      className="
        flex 
        justify-center
      "
    >
      <video
        className="
        absolute
        bottom-0
        opacity-0
        transition-opacity 
        duration-[4s]
        z-[0]
        max-w-none
      "
        ref={hiruRef}
      ></video>
      <video
        className="
          absolute
          bottom-0
          opacity-0
          transition-opacity
          duration-[4s]
          z-[0]
          max-w-none
        "
        ref={yoruRef}
      ></video>
    </div>
  );
};

export default Background;
