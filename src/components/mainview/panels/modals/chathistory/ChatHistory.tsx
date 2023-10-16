import { useEffect, useState } from 'react';
import { auth, functions } from '../../../../../firebase/firebase';
import { httpsCallable } from 'firebase/functions';
import Modal from '../Modal';
import ModalContainer from '../ModalContainer';

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

export const ChatHistory = (setPanel) => {
  const [chatHistory, setChatHistory] = useState<chatHistoryEntry[]>([]);

  useEffect(() => {
    httpsCallable(functions, 'get_chat_history')().then((result) => {
      console.log(result.data);
      let data = (result.data as Array<any>).map((entry) => {
        return {
          message: entry['message'],
          isMyMessage: entry['role'] == 'user',
        };
      });

      setChatHistory(data);
    });
  }, []);

  const entries = chatHistory.map((entry) => {
    if (entry.isMyMessage) {
      return <MyComment text={entry.message} />;
    } else {
      return <YourComment text={entry.message} />;
    }
  });

  return (
    <ModalContainer setPanel={setPanel} top="5%" width="500px" height="70%">
      <p className="text-2xl">チャット履歴</p>
      <div className="flex-grow overflow-y-auto">{entries}</div>
    </ModalContainer>
  );
};

export default ChatHistory;
