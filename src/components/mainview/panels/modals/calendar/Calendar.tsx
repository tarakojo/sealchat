import ModalContainer from '../ModalContainer';

const Entry = (props: { date: Date; content: string }) => {
  return (
    <div className="flex w-full flex-col gap-y-2 rounded-lg px-3 py-4 text-left transition-colors">
      <p className="text-xs text-slate-500">{props.date.toDateString()}</p>
      <h1 className="text-sm font-medium capitalize text-slate-700">
        {props.content}
      </h1>
    </div>
  );
};

export const Calendar = () => {
  return (
    <ModalContainer top="5%" width="500px" height="70%">
      <p className="text-lg">日々の記録</p>
      <div className="overflow-y-auto">
        <Entry date={new Date()} content={'Tailwind Classesaaaaaa\naaaaaa'} />
        <Entry date={new Date()} content={'Tailwind Classesaaaaaa\naaaaaa'} />
        <Entry date={new Date()} content={'Tailwind Classesaaaaaa\naaaaaa'} />
        <Entry date={new Date()} content={'Tailwind Classesaaaaaa\naaaaaa'} />
        <Entry date={new Date()} content={'Tailwind Classesaaaaaa\naaaaaa'} />
        <Entry date={new Date()} content={'Tailwind Classesaaaaaa\naaaaaa'} />
        <Entry date={new Date()} content={'Tailwind Classesaaaaaa\naaaaaa'} />
      </div>
    </ModalContainer>
  );
};
