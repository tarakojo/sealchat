import ModalContainer from './ModalContainer';
import { TextField, Button, CircularProgress } from '@mui/material';
import {} from '../../../../main';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../../../firebase/firebase';
import { useRef, useState, useEffect } from 'react';
import CustomTextField, {
  CustomTextFieldCurrentState,
} from '../../../../utils/CustomTextField';

const maxLength = 256;

type State = {
  nickname: string;
  email: string;
  profile: string;
  error: boolean;
  currentState: CustomTextFieldCurrentState;
};

export const Settings = () => {
  const [settingsState, setSettingsState] = useState<State>({
    nickname: '',
    email: '',
    profile: '',
    error: false,
    currentState: 'loading',
  });

  useEffect(() => {
    httpsCallable(functions, 'get_info')().then((result) => {
      const info = result.data as any;
      setSettingsState({
        nickname: info.nickname,
        email: info.notificationEmailAddress,
        profile: info.profile,
        error: false,
        currentState: 'default',
      });
    });
  }, []);

  const onButtonClick = async () => {
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

  const updateError = () => {
    return (
      settingsState.nickname.length > maxLength ||
      settingsState.email.length > maxLength ||
      settingsState.profile.length > maxLength
    );
  };

  return (
    <ModalContainer top="5%" width="300px" height="80%">
      <p className="text-2xl">あなたについての設定</p>
      <div className="flex-grow flex flex-col justify-end">
        <div className="flex-grow flex flex-col">
          <CustomTextField
            className=""
            label={
              settingsState.currentState === 'loading'
                ? '読み込み中'
                : 'ニックネーム'
            }
            fullWidth={true}
            multiline={false}
            maxLength={256}
            content={settingsState.nickname}
            currentState={settingsState.currentState}
            onChange={(s) => {
              setSettingsState((prev) => ({
                ...prev,
                nickname: s,
                error: updateError(),
              }));
            }}
          />
          <br />
          <CustomTextField
            className=""
            label={'通知用メールアドレス'}
            fullWidth={true}
            multiline={false}
            maxLength={256}
            content={settingsState.email}
            currentState={settingsState.currentState}
            onChange={(s) => {
              setSettingsState((prev) => ({
                ...prev,
                email: s,
                error: updateError(),
              }));
            }}
          />
          <br />
          <CustomTextField
            className=""
            label={'ごまに知っておいてほしいこと'}
            fullWidth={true}
            multiline={true}
            maxLength={256}
            content={settingsState.profile}
            currentState={settingsState.currentState}
            onChange={(s) => {
              setSettingsState((prev) => ({
                ...prev,
                profile: s,
                error: updateError(),
              }));
            }}
          />
        </div>
        <div className="flex flex-row justify-end">
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={onButtonClick}
            disabled={
              settingsState.currentState !== 'default' || settingsState.error
            }
          >
            {settingsState.currentState === 'sending' ? (
              <CircularProgress size={16} />
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
