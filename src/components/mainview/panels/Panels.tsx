import { useEffect, useState } from 'react';
import Modal from './modals/Modal';
import { Buttons } from './Buttons';
import { auth } from '../../../firebase/firebase';

export type PanelKind =
  | 'account'
  | 'none'
  | 'chatHistory'
  | 'settings'
  | 'calendar'
  | 'wellcome';

export const setPanel = (panel: PanelKind) => {
  document.dispatchEvent(new CustomEvent('setPanel', { detail: panel }));
};

export const Panels = () => {
  const [panelKind, setPanelKind] = useState<PanelKind>('none');

  useEffect(() => {
    const setPanelListener = (e: CustomEvent<PanelKind>) => {
      setPanelKind(e.detail);
    };
    document.addEventListener('setPanel', setPanelListener);

    if (auth.currentUser === null) setPanelKind('wellcome');

    return () => {
      document.removeEventListener('setPanel', setPanelListener);
    };
  }, []);

  return (
    <>
      <Modal currentPanel={panelKind} setPanel={(x) => setPanelKind(x)} />
      <Buttons currentPanel={panelKind} setPanel={(x) => setPanelKind(x)} />
    </>
  );
};

export default Panels;
