import React, { useEffect, useState } from 'react';
import { backgroundAspect } from '../Background';
import { Button, CircularProgress, TextareaAutosize } from '@mui/material';
import CustomTextField, {
  CustomTextFieldCurrentState,
} from '../../../utils/CustomTextField';

const maxLength = 500;

type MessageBoardCurrentState = 'default' | 'loading' | 'error' | 'sending';

type MessageBoardState = {
  width: number;
  height: number;
  content: string;
  currentState: MessageBoardCurrentState;
};

const getMessageBoardSize = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const windowAspect = windowWidth / windowHeight;
  if (windowAspect >= backgroundAspect) {
    return {
      width: windowWidth * 0.33,
      height: windowHeight * 0.45,
    };
  } else {
    return {
      width: Math.min(Math.max(windowWidth * 0.4, windowHeight * 0.5), 300),
      height: windowHeight * 0.3,
    };
  }
};

export const MessageBoard = () => {
  const [messageBoardState, setMessageBoardState] = useState<MessageBoardState>(
    { ...getMessageBoardSize(), content: '', currentState: 'default' }
  );

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
    
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

  const onChange = (e) => {
    const content = e.target.value;
    const error = e.target.value.length > maxLength;
    setMessageBoardState((prev) => {
      return {
        ...prev,
        content: content,
        currentState: error ? 'error' : 'default',
      };
    });
  };

  const onButtonClick = async () => {

  }

  return (
    <div
      className="absolute top-[10px] right-[5px] rounded-[15px] bg-slate-50 bg-opacity-95 z-[1000]"
      style={{
        width: messageBoardState.width,
        height: messageBoardState.height,
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
          p-2
          text-sm 
          leading-6 
          text-slate-900 
          shadow-sm 
          sm:text-base 
          sm:leading-7"
      >
        <div className="flex-grow flex flex-col justify-end">
          <div className="flex-grow flex flex-col">
            <p className="text-lg">今日のできごと</p>
            <div className="flex-grow mb-2">
              <textarea
                ref={textAreaRef}
                className="w-full h-full resize-none"
                placeholder={
                  messageBoardState.currentState === 'loading'
                    ? '読み込み中'
                    : 'ここに入力'
                }
                disabled={
                  messageBoardState.currentState === 'loading' ||
                  messageBoardState.currentState === 'sending'
                }
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <div className="flex-grow ">
              {messageBoardState.currentState === 'error' ? (
                <p className="text-sm text-red-500">{`${maxLength}文字以内で入力してください。現在:${messageBoardState.content.length}文字`}</p>
              ) : null}
            </div>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={onButtonClick}
              disabled={messageBoardState.currentState !== 'default'}
            >
              {messageBoardState.currentState === 'sending' ? (
                <CircularProgress size={16} />
              ) : (
                '保存'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBoard;
