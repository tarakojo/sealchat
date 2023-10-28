import { useEffect, useState } from 'react';
import Modal from './modals/Modal';
import { Buttons } from './Buttons';

export type PanelKind = 'account' | 'none' | 'chatHistory' | 'settings' | 'calendar';

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
