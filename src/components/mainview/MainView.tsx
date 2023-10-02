import Background from './Background';
import Hukidasi from './hukidasi/Hukidasi';
import SealView from './sealview/SealView';

export const MainView = () => {
  return (
    <div
      className="
        absolute
        top-0
        left-0
        w-screen 
        h-screen 
        flex 
        justify-center 
        items-center"
    >
      <Background />
      <SealView />
      <Hukidasi />
    </div>
  );
};
