import { useEffect, useState } from 'react';
import {
  HukidasiState,
  displayHukidasi,
  getDisplayText,
  getHukidasiType,
  hukidasiTextUpdateInterval,
  textStyles,
} from './common';

export const SideHukidasi = (props: HukidasiState) => {
  const [_, dummyUpdate] = useState(0);
  const forceUpdate = () => {
    dummyUpdate((x) => x + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      forceUpdate();
    }, hukidasiTextUpdateInterval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="
        absolute
        bottom-[32%]
        right-[72%]
        w-[20vw]
        h-[22.5vw]
        flex
        justify-center
        items-center
        transition-opacity 
        duration-1000
      "
      style={{
        visibility: getHukidasiType() == 'side' ? 'visible' : 'hidden',
        opacity: displayHukidasi(props) ? 1 : 0,
      }}
    >
      <img
        src="./assets/hukidasi/hukidasi_rotated.svg"
        className="
              absolute
              top-0
              left-0
              w-full
              h-full
              z-[200]
           "
      />
      <div
        className="
            w-[80%]
            h-[70%]
            flex 
            justify-center
            items-center
            mr-[5%]
            z-[30000]
      "
      >
        <p style={{...textStyles, fontSize:"1.7vw"}}>{getDisplayText(props)}</p>
      </div>
    </div>
  );
};

export default SideHukidasi;
