import { useEffect, useState } from 'react';
import SideHukidasi from './SideHukidasi';
import UpperHukidasi from './UpperHukidasi';
import { HukidasiState } from './common';

export const Hukidasi = () => {
  const [state, setState] = useState<HukidasiState | null>(null);


  useEffect(() => {
    window.addEventListener("click", () => {
      setState({text : "ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ", displayStartTime: Date.now()});
    })
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
