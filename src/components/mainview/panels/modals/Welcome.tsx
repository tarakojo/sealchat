import { auth, googleAuthProvider } from '../../../../firebase/firebase';
import { setPanel } from '../Panels';
import ModalContainer from './ModalContainer';
import StyledFirebaseAuth from './StyledFirebaseAuth';

export const Wellcome = () => {
  return (
    <ModalContainer
      top="30%"
      width="400px"
      height="200px"
      outsideStyle={{
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
      dismissOnClickOutside={false}
      zIndex={2000}
    >
      <div className="flex flex-row justify-center">
        <p className="text-2xl">ログイン</p>
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

export default Wellcome;
