import { HukidasiProps, commonClasses, textCommonStyles } from './common';

export const SideHukidasi = (props: HukidasiProps) => {
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
        visibility: props.visibility ? 'visible' : 'hidden',
        opacity: props.opacity,
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
            z-[300]
      "
      >
        <p style={textCommonStyles}>{props.text}</p>
      </div>
    </div>
  );
};

export default SideHukidasi;
