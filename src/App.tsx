import SealView from './components/sealview/SealView';
import Hukidasi from './components/hukidasi/Hukidasi';
import Background from './components/Background';
import Login from './components/Login';

function App() {
  return (
    <>
      <Login setIsAuth={ (x)=> { console.log("setIsAuth") } }/>
    </>
  );
}

export default App;
