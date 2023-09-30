import SideHukidasi from './SideHukidasi';
import UpperHukidasi from './UpperHukidasi';

export const Hukidasi = () => {
  return (
    <div className='flex justify-center items-center'>
      <UpperHukidasi visibility={true} opacity={1} text="aaa" />
      <SideHukidasi visibility={true} opacity={1} text="aaa" />
    </div>
  );
};

export default Hukidasi;
