import { useEffect, useState } from 'react';
import SideHukidasi from './SideHukidasi';
import UpperHukidasi from './UpperHukidasi';
import { HukidasiState } from './common';

const showHukidasiEventName = 'show-hukidasi';
export const showHukidasi = (text) =>
  window.dispatchEvent(
    new CustomEvent(showHukidasiEventName, { detail: { text: text } })
  );

export const Hukidasi = () => {
  const [state, setState] = useState<HukidasiState | null>(null);

  useEffect(() => {
    const handleShowHukidasi = (event: CustomEvent) => {
      setState({ displayStartTime: Date.now(), text: event.detail.text });
    };
    window.addEventListener(showHukidasiEventName, handleShowHukidasi);
    return () => {
      window.removeEventListener(showHukidasiEventName, handleShowHukidasi);
    };
  }, []);

  if (state == null) {
    return <div></div>;
  }

  return (
    <div className="flex justify-center items-center">
      <UpperHukidasi {...state} />
      <SideHukidasi {...state} />
    </div>
  );
};

export default Hukidasi;
