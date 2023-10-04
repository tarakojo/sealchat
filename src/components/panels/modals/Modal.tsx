import { useEffect, useState } from 'react';
import AccountModal from './account/AccountModal';

export const Modal = ({ currentPanel, setPanel }) => {
  switch (currentPanel) {
    case 'account':
      return (
        <ModalBackground setPanel={setPanel}>
          <AccountModal />
        </ModalBackground>
      );
    default:
      return null;
  }
};

const ModalBackground = (props: { setPanel; children: React.ReactNode }) => {
  return (
    //画面を暗くする
    <div
      className="
                  bg-black
                  bg-opacity-25
                  flex
                  justify-center
                  items-center
                  fixed
                  top-0
                  left-0
                  w-screen
                  h-screen
                  z-[1000]
              "
      onClick={()=>props.setPanel('none')}
    >
      {props.children}
    </div>
  );
};

export default Modal;
