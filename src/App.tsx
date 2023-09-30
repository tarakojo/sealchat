import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import SealView from './components/sealview/SealView';
import Hukidasi from './components/hukidasi/Hukidasi';

function App() {
  return (
    <>
      <div
        className="
        w-screen 
        h-screen 
        flex 
        justify-center 
        items-center"
      >
        <SealView />
        <Hukidasi />
      </div>
    </>
  );
}

export default App;
