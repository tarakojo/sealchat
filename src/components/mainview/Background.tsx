import { get } from 'http';
import { useEffect, useRef, useState } from 'react';

const hiruBackgroundPath =
  './assets/background/2023syogatsu_Background/syougatsu_hiru.mp4';
const yoruBackgroundPath =
  './assets/background/2023syogatsu_Background/syougatsu_yoru.mp4';
const backgroundNaturalWidth = 1920;
const backgroundNaturalHeight = 1080;
export const backgroundAspect = backgroundNaturalWidth / backgroundNaturalHeight;

export const getNewBackgroundSize = (container) => {
  const aspect = container.clientWidth / container.clientHeight;

  let width, height;
  if (aspect > backgroundAspect) {
    width = container.clientWidth;
    height = width / backgroundAspect;
  } else {
    height = container.clientHeight;
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

export const Background = ({ width, height }) => {
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
    hiruRef.current.muted = true;
    hiruRef.current.autoplay = true;
    hiruRef.current.loop = true;
    hiruRef.current.src = hiruBackgroundPath;
    yoruRef.current.muted = true;
    yoruRef.current.autoplay = true;
    yoruRef.current.loop = true;
    yoruRef.current.src = yoruBackgroundPath;

    //背景の初期化
    updateBackground();

    //1分ごとに背景の更新
    const updateFunction = setInterval(updateBackground, 1000 * 60);

    return () => {
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
        ref={hiruRef}
        className="
        absolute
        bottom-0
        z-[0]
        max-w-none
        opacity-0
      "
        style={{
          width: width,
          height: height,
        }}
      ></video>
      <video
        ref={yoruRef}
        className="
          absolute
          bottom-0
          z-[0]
          max-w-none
          opacity-0
        "
        style={{
          width: width,
          height: height,
        }}
      ></video>
    </div>
  );
};

export default Background;
