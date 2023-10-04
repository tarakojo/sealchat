import SealView from './components/sealview/SealView';
import Hukidasi from './components/hukidasi/Hukidasi';
import Background from './components/Background';
import { auth, emailAuthProvider, googleAuthProvider } from './firebase';
import { useRef, useEffect } from 'react';
import Panels from './components/panels/Panels';
import Input from './components/Input';
import Clock from './components/Clock';

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    appRef.current.style.opacity = '1';
  }, []);

  return (
    <>
      <div
        ref={appRef}
        className="
        fixed
        top-0
        left-0
        w-screen 
        h-screen 
        flex 
        justify-center 
        items-center
        opacity-0
        transition-opacity
        duration-[4s]
        "
      >
        <Background />
        <SealView />
        <Input />
        <Clock />
        <Hukidasi />
        <Panels />
      </div>
    </>
  );
}

export default App;
