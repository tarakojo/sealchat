import { useEffect, useState } from 'react';
import { auth, functions } from '../../../../firebase/firebase';
import { httpsCallable } from 'firebase/functions';
import Modal from './Modal';
import ModalContainer from './ModalContainer';
import { CircularProgress } from '@mui/material';

const MyComment = (props: { text: string }) => {
  return (
    <div className="flex flex-row-reverse items-start mt-4">
      <img
        className="ml-2 h-8 w-8 rounded-full"
        src={auth.currentUser?.photoURL}
      />
      <div className="flex min-h-[85px] rounded-b-xl rounded-tl-xl bg-slate-50 p-4 sm:min-h-0 sm:max-w-md md:max-w-2xl">
        <p>{props.text.replace(/\n/g, '<br />')}</p>
      </div>
    </div>
  );
};

const YourComment = (props: { text: string }) => {
  return (
    <div className="flex items-start mt-4">
      <img
        className="mr-2 h-8 w-8 rounded-full"
        src="assets/icons/seal_icon.png"
      />
      <div className="flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 sm:max-w-md md:max-w-2xl">
        <p>{props.text.replace(/\n/g, '<br />')}</p>
      </div>
    </div>
  );
};

type chatHistoryEntry = {
  message: string;
  isMyMessage: boolean;
};

type ChatHistoryState = {
  entries: chatHistoryEntry[];
  loading: boolean;
};

export const ChatHistory = () => {
  const [chatHistoryState, setChatHistoryState] = useState<ChatHistoryState>({
    entries: [],
    loading: true,
  });

  useEffect(() => {
    httpsCallable(functions, 'get_chat_history')().then((result) => {
      console.log(result.data);
      let data = (result.data as Array<any>).map((entry) => {
        return {
          message: entry['message'],
          isMyMessage: entry['role'] == 'user',
        };
      });

      setChatHistoryState({
        entries: data,
        loading: false,
      });
    });
  }, []);

  const entries = chatHistoryState.entries.map((entry) => {
    if (entry.isMyMessage) {
      return <MyComment text={entry.message} />;
    } else {
      return <YourComment text={entry.message} />;
    }
  });

  const body = chatHistoryState.loading ? (
    <div className="flex justify-center items-center">
      <CircularProgress />{' '}
    </div>
  ) : (
    <div className="flex-grow overflow-y-auto">{entries}</div>
  );
  return (
    <ModalContainer top="5%" width="500px" height="70%">
      <p className="text-2xl">チャット履歴</p>
      {body}
    </ModalContainer>
  );
};

export default ChatHistory;
