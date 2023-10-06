export const ChatHistory = () => {
  return (
    <>
      <div className="absolute top-[5%] w-[55%] h-[70%] rounded-[15px] overflow-hidden z-[2000]">
        <ChatHistoryDetail />
      </div>
    </>
  );
};

const MyComment = (props: { text: string }) => {
  return (
    <div className="flex flex-row-reverse items-start">
      <img
        className="ml-2 h-8 w-8 rounded-full"
        src="https://dummyimage.com/128x128/354ea1/ffffff&text=G"
      />
      <div className="flex min-h-[85px] rounded-b-xl rounded-tl-xl bg-slate-50 p-4 sm:min-h-0 sm:max-w-md md:max-w-2xl">
        <p>{props.text.replace(/\n/g, '<br />')}</p>
      </div>
    </div>
  );
};

const YourComment = (props: { text: string }) => {
  return (
    <div className="flex items-start">
      <img
        className="mr-2 h-8 w-8 rounded-full"
        src="https://dummyimage.com/128x128/363536/ffffff&text=J"
      />
      <div className="flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 sm:max-w-md md:max-w-2xl">
        <p>{props.text.replace(/\n/g, '<br />')}</p>
      </div>
    </div>
  );
};

const ChatHistoryDetail = () => {
  return (
    <div
      className="
        w-full
        h-full 
        flex-1 
        space-y-6 
        overflow-y-scroll 
        bg-black 
        p-4 
        text-sm 
        leading-6 
        text-slate-900 
        bg-opacity-50 
        shadow-sm 
        sm:text-base 
        sm:leading-7"
    >
      <MyComment text="Hello\nHello" />
      <YourComment text="<script> console.log('unko'); </script>" />
    </div>
  );
};

export default ChatHistory;
