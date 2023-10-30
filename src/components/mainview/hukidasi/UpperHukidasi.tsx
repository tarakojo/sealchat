import { useEffect, useState } from 'react';
import {
  HukidasiState,
  displayHukidasi,
  getDisplayText,
  getHukidasiType,
  hukidasiTextUpdateInterval,
  textStyles,
} from './common';

export const UpperHukidasi = (props: HukidasiState) => {
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
        top-[0.5%]
        w-[60vh]
        h-[25vh]
        mr-[1.5%]
        flex
        justify-center
        items-center
        transition-opacity 
        duration-1000
    "
      style={{
        visibility: getHukidasiType() == 'upper' ? 'visible' : 'hidden',
        opacity: displayHukidasi(props) ? 1 : 0,
      }}
    >
      <img
        src="./assets/hukidasi/hukidasi.svg"
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
            mb-[3.5%]
            z-[30000]
      "
      >
        <p style={{ ...textStyles, fontSize: '3.2vh' }}>
          {getDisplayText(props)}
        </p>
      </div>
    </div>
  );
};

export default UpperHukidasi;
