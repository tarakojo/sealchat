import { httpsCallable } from 'firebase/functions';
import { useRef, useEffect, useState } from 'react';
import { functions } from '../../firebase/firebase';
import { showHukidasi } from './hukidasi/Hukidasi';

export const Input = () => {
  return (
    <div className="absolute bottom-[2.5%] w-[50%] z-[500]">
      <InputBox />
    </div>
  );
};

const InputBox = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onSubmited = async (e) => {
      //submitされたときの処理
      e.preventDefault();

      const message = inputRef.current.value;

      //入力を空にする
      inputRef.current.value = '';

      console.log(`send message: ${message}`);

      //入力を送信
      const result = await httpsCallable<any, any>(
        functions,
        'chat_with_message'
      )({ message: message });

      console.log(result.data);

      //返答を吹き出しで表示
      showHukidasi(result.data);
    };

    //submitイベントを登録
    formRef.current.addEventListener('submit', onSubmited);
    return () => {
      formRef.current.removeEventListener('submit', onSubmited);
    };
  }, []);

  return (
    <form ref={formRef}>
      <div className="flex max-w-3xl gap-x-2">
        <input
          ref={inputRef}
          className="w-full rounded-lg border border-slate-300 bg-[#f7f7f7] p-3 text-sm text-slate-800 focus:border-slate-300 focus:outline-none sm:text-base"
          placeholder="話す..."
          autoComplete="off"
        />
        <button
          type="submit"
          className="rounded-lg bg-cyan-800 px-3 py-1 text-slate-200 overflow-hidden transform transition-transform hover:scale-[105%] active:scale-100"
        >
          <SubmitIcon />
        </button>
      </div>
    </form>
  );
};

const SubmitIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M10 14l11 -11"></path>
      <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
    </svg>
  );
};

export default Input;
