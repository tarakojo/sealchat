import { auth, googleAuthProvider } from '../../../../../firebase/firebase';
import { setPanel } from '../../Panels';
import ModalContainer from '../ModalContainer';
import StyledFirebaseAuth from './StyledFirebaseAuth';

export const AccountModal = () => {
  return (
    <ModalContainer top="30%" width="400px" height="200px">
      <div className="flex flex-row justify-center">
        <p className="text-2xl">別のアカウントでログインする</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <StyledFirebaseAuth
          firebaseAuth={auth}
          uiConfig={{
            signInFlow: 'popup',
            signInOptions: [googleAuthProvider.providerId],
            callbacks: {
              signInSuccessWithAuthResult: () => {
                setPanel('none');
                return false;
              },
            },
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default AccountModal;
