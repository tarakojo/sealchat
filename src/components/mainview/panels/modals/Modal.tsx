import { useEffect, useState } from 'react';
import AccountModal from './account/AccountModal';
import { ChatHistory } from './chathistory/ChatHistory';
import Settings from './settings/Settings';
import { PanelKind } from '../Panels';
import { Calendar } from './calendar/Calendar';

export const Modal = (props: {
  currentPanel: PanelKind;
  setPanel: (PanelKind) => void;
}) => {
  switch (props.currentPanel) {
    case 'account':
      return <AccountModal />;
    case 'settings':
      return <Settings />;
    case 'calendar':
      return <Calendar />;
    case 'chatHistory':
      return <ChatHistory />;
    default:
      return null;
  }
};

export default Modal;
