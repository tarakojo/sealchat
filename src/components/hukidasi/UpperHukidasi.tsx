import { HukidasiProps, commonClasses, textCommonStyles } from './common';

export const UpperHukidasi = (props: HukidasiProps) => {
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
        visibility: props.visibility ? 'visible' : 'hidden',
        opacity: props.opacity,
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
            mb-[5%]
            z-[300]
      "
      >
        <p style={textCommonStyles}>{props.text}</p>
      </div>
    </div>
  );
};

export default UpperHukidasi;
