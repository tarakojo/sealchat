import { useEffect, useState } from 'react';
import Modal from './modals/Modal';
import { Buttons } from './Buttons';

export type PanelKind = 'account' | 'none' | 'chatHistory' | 'settings';

export const Panels = () => {
  const [panel, setPanel] = useState<PanelKind>('none');

  return (
    <>
      <Modal currentPanel={panel} setPanel={setPanel} />
      <Buttons currentPanel={panel} setPanel={setPanel} />
    </>
  );
};

export default Panels;
