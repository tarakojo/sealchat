import { Button, CircularProgress } from '@mui/material';
import { auth, googleAuthProvider } from '../../../../firebase/firebase';
import { setPanel } from '../Panels';
import ModalContainer from './ModalContainer';
import StyledFirebaseAuth from './StyledFirebaseAuth';
import { signOut } from 'firebase/auth';
import { useState } from 'react';

export const AccountModal = () => {
  const [sending, setSending] = useState(false);
  return (
    <ModalContainer top="30%" width="400px" height="200px">
      <div className="flex flex-grow flex-row justify-center items-center">
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            setSending(true);
            await signOut(auth);
            setSending(false);
            setPanel('welcome');
          }}
        >
          {sending ? <CircularProgress /> : 'ログアウト'}
        </Button>
      </div>
    </ModalContainer>
  );
};

export default AccountModal;
