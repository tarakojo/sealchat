import React, { useEffect, useState } from 'react';
import { backgroundAspect } from '../Background';

type MessageBoardState = {
  width: number;
  height: number;
};

const getMessageBoardSize = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  return {
    width: Math.min(Math.max(windowWidth * 0.4, windowHeight * 0.5), 300),
    height: windowHeight * 0.3,
  };
};

export const MessageBoard = () => {
  const [messageBoardState, setMessageBoardState] = useState<MessageBoardState>(
    { ...getMessageBoardSize() }
  );

  useEffect(() => {
    const resizeHandler = () => {
      setMessageBoardState((prev) => {
        return { ...prev, ...getMessageBoardSize() };
      });
    };
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <div
      className="absolute top-[10px] right-[5px] rounded-[15px] bg-slate-50 bg-opacity-95 z-[1000]"
      style={{
        width: messageBoardState.width,
        height: messageBoardState.height,
      }}
    >
      {/* Your message board content goes here */}
    </div>
  );
};

export default MessageBoard;
