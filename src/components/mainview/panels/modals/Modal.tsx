import { useEffect, useState } from 'react';
import AccountModal from './account/AccountModal';
import { ChatHistory } from './chathistory/ChatHistory';
import Settings from './settings/Settings';

export const Modal = ({ currentPanel, setPanel }) => {
  switch (currentPanel) {
    case 'account':
      return <AccountModal setPanel={setPanel} />;
    case 'settings':
      return <Settings setPanel={setPanel} />;
    case 'chatHistory':
      return <ChatHistory setPanel={setPanel} />;
    default:
      return null;
  }
};

export default Modal;
