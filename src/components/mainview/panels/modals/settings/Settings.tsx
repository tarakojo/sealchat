import ModalContainer from '../ModalContainer';
import { TextField, Button, CircularProgress } from '@mui/material';
import {} from '../../../../../main';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../../../../firebase/firebase';
import { useRef, useState, useEffect } from 'react';

const noteMaxLength = 150;

type SettingsState = 'loading' | 'default' | 'sending';
type State = {
  nickname: string;
  email: string;
  profile: string;
  profileError: boolean;
  currentState: SettingsState;
};

export const Settings = () => {
  const [settingsState, setSettingsState] = useState<State>({
    nickname: '',
    email: '',
    profile: '',
    profileError: false,
    currentState: 'loading',
  });

  useEffect(() => {
    httpsCallable(functions, 'get_info')().then((result) => {
      const info = result.data as any;
      setSettingsState({
        nickname: info.nickname,
        email: info.notificationEmailAddress,
        profile: info.profile,
        profileError: false,
        currentState: 'default',
      });
    });
  }, []);

  const onNoteChange = (e) => {
    const s = e.target.value;
    if (s.length > noteMaxLength) {
      setSettingsState((prev) => ({ ...prev, profileError: true, profile: s }));
    } else {
      setSettingsState((prev) => ({
        ...prev,
        profileError: false,
        profile: s,
      }));
    }
  };

  const onButtonClick = async () => {
    if (settingsState.profileError) {
      alert('入力内容に誤りがあります');
      return;
    }

    const newInfo = {
      nickname: settingsState.nickname,
      notificationEmailAddress: settingsState.email,
      profile: settingsState.profile,
    };
    setSettingsState((prev) => ({ ...prev, currentState: 'sending' }));
    const result = await httpsCallable(
      functions,
      'set_info'
    )({ info: newInfo });
    setSettingsState((prev) => ({ ...prev, currentState: 'default' }));
  };

  return (
    <ModalContainer top="5%" width="300px" height="80%">
      <p className="text-2xl">設定</p>
      <div className="flex-grow flex flex-col justify-end">
        <div className="flex-grow flex flex-col">
          <TextField
            label={
              settingsState.currentState === 'loading'
                ? '読み込み中'
                : 'ニックネーム'
            }
            variant="outlined"
            fullWidth
            value={settingsState.nickname}
            onChange={(e) => {
              setSettingsState((prev) => ({
                ...prev,
                nickname: e.target.value,
              }));
            }}
            disabled={settingsState.currentState !== 'default'}
          />{' '}
          <br />
          <TextField
            label={
              settingsState.currentState === 'loading'
                ? '読み込み中'
                : '通知用メールアドレス'
            }
            variant="outlined"
            fullWidth
            value={settingsState.email}
            onChange={(e) => {
              setSettingsState((prev) => ({ ...prev, email: e.target.value }));
            }}
            disabled={settingsState.currentState !== 'default'}
          />
          <br />
          <TextField
            error={settingsState.profileError}
            helperText={
              settingsState.profileError
                ? `${noteMaxLength}文字以内で入力してください`
                : null
            }
            label={
              settingsState.currentState === 'loading'
                ? '読み込み中'
                : 'ごまに知っておいてほしいこと'
            }
            variant="outlined"
            multiline
            fullWidth
            value={settingsState.profile}
            onChange={onNoteChange}
            disabled={settingsState.currentState !== 'default'}
          />
        </div>
        <div className="flex flex-row justify-end">
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={onButtonClick}
            disabled={settingsState.currentState !== 'default'}
          >
            {settingsState.currentState === 'sending' ? (
              <CircularProgress size={16}/>
            ) : (
              '保存'
            )}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default Settings;
