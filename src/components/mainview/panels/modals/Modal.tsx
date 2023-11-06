import { useEffect, useState } from 'react';
import AccountModal from './Account';
import { ChatHistory } from './ChatHistory';
import Settings from './Settings';
import { PanelKind } from '../Panels';
import { Calendar } from './Calendar';
import Wellcome from './Welcome';

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
    case 'welcome':
      return <Wellcome />;
    default:
      return null;
  }
};

export default Modal;
