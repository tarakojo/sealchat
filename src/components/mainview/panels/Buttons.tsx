import { useEffect, useState } from 'react';
import {
  auth,
  firebaseAuthSignedInEvent,
  firebaseAuthSignedOutEvent,
} from '../../../firebase/firebase';
import { PanelKind } from './Panels';

const accountIconPath = 'assets/icons/account_icon.svg';
const notebookIconPath = 'assets/icons/notebook_icon.svg';
const commentIconPath = 'assets/icons/comment_icon.svg';
const settingIconPath = 'assets/icons/setting_icon.svg';
const tagIconPath = 'assets/icons/tag_icon.svg';

export const Buttons = ({ currentPanel, setPanel }) => {
  const updatePanel = (panel: PanelKind) => {
    console.log(panel);
    setPanel(currentPanel === panel ? 'none' : panel);
  };

  const styles =
    'w-[50px] h-[50px] pt-[5px] overflow-hidden transform transition-transform hover:scale-[105%] active:scale-95';

  return (
    <div className="absolute right-[10px] bottom-[3%] flex-col z-[10000]">
      <img
        title="日々の記録"
        src={notebookIconPath}
        className={styles}
        draggable={false}
        onClick={() => updatePanel('calendar')}
      ></img>
      <img
        title="会話履歴"
        src={commentIconPath}
        className={styles}
        draggable={false}
        onClick={() => updatePanel('chatHistory')}
      ></img>
      <img
        title="あなたについての設定"
        src={tagIconPath}
        className={styles}
        onClick={() => updatePanel('settings')}
      ></img>

      <button
        title="アカウント"
        className={styles}
        onClick={() => updatePanel('account')}
      >
        <AccountButtonImage />
      </button>
    </div>
  );
};

const AccountButtonImage = () => {
  const [dummyCount, setDummyCount] = useState(0);
  const forceUpdate = () => setDummyCount((prevCount) => prevCount + 1);

  useEffect(() => {
    //コールバック関数を登録
    document.addEventListener(firebaseAuthSignedInEvent, forceUpdate);
    document.addEventListener(firebaseAuthSignedOutEvent, forceUpdate);
    return () => {
      //コールバック関数を削除
      document.removeEventListener(firebaseAuthSignedInEvent, forceUpdate);
      document.removeEventListener(firebaseAuthSignedOutEvent, forceUpdate);
    };
  }, []);

  if (auth.currentUser) {
    return (
      <div className="w-[44px] h-[44px] ml-[3px] rounded-full overflow-hidden bg-rgb247-247-247">
        <img
          src={auth.currentUser.photoURL}
          className="w-full h-auto"
          draggable={false}
        />
      </div>
    );
  } else {
    return (
      <img
        src={accountIconPath}
        className="w-[44px] h-[44px] ml-[3px] "
        draggable={false}
      ></img>
    );
  }
};
