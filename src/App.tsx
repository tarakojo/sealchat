import MainView from './components/mainview/MainView';
import {
  auth,
  emailAuthProvider,
  googleAuthProvider,
} from './firebase/firebase';
import { useRef, useEffect } from 'react';

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    appRef.current.style.opacity = '1';
  }, []);

  return (
    <>
      <div
        ref={appRef}
        className="w-screen h-screen flex opacity-0 transition-opacity duration-[4s]"
      >
        <MainView />
      </div>
    </>
  );
}

export default App;
