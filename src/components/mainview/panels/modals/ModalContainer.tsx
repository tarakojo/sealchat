export type ModalContainerProps = {
  top: string;
  width: string;
  height: string;
  setPanel : any;
  children: React.ReactNode;
};

export const ModalContainer = (props: ModalContainerProps) => {
  return (
    <div
      className=" flex
                justify-center
                items-center
                absolute
                top-0
                left-0
                w-screen
                h-screen
                z-[1000]
            "
      onClick={() => props.setPanel('none')}
    >
      <div
        className="absolute rounded-[15px] overflow-hidden z-[2000]"
        style={{
          top: props.top,
          width: props.width,
          height: props.height,
        }}
      >
        <div
          className="
          w-full
          h-full 
          flex
          flex-col
          space-y-6 
          overflow-y-auto
          bg-slate-50 
          bg-opacity-90
          p-4 
          text-sm 
          leading-6 
          text-slate-900 
          shadow-sm 
          sm:text-base 
          sm:leading-7"
          onClick={(e) => e.stopPropagation()}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
