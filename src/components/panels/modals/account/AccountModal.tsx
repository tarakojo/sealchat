import { auth, googleAuthProvider } from '../../../../firebase';
import StyledFirebaseAuth from './StyledFirebaseAuth';

export const AccountModal = () => {
  return (
    <StyledFirebaseAuth
      firebaseAuth={auth}
      uiConfig={{
        signInFlow: 'popup',
        signInOptions: [googleAuthProvider.providerId],
        callbacks: {
          signInSuccessWithAuthResult: () => false,
        },
      }}
    />
  );
};

export default AccountModal;
