import { httpsCallable } from 'firebase/functions';
import { functions } from '../../../../firebase/firebase';
import ModalContainer from './ModalContainer';
import { useRef, useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const numPageElems = 20;

const Entry = (props: { date: string; content: string }) => {
  return (
    <div className="flex w-full flex-col gap-y-2 rounded-lg px-3 pb-4 text-left transition-colors">
      <p className="text-xs text-slate-500">{props.date}</p>
      <h1 className="text-sm font-medium capitalize text-slate-700">
        {props.content}
      </h1>
    </div>
  );
};

type CalendarState = {
  scrollBottom: number;
  entries: { date: string; content: string }[];
  loading: boolean;
  loadedAll: boolean;
};

export const Calendar = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [calendarState, setCalendarState] = useState<CalendarState>({
    scrollBottom: 0,
    entries: [],
    loading: false,
    loadedAll: false,
  });

  const loadMore = async () => {
    setCalendarState((prev) => {
      return { ...prev, loading: true };
    });

    const result = await httpsCallable<any, any>(
      functions,
      'get_calendars'
    )({
      start: calendarState.entries.length,
      n: numPageElems,
    });

    const data = result.data as any[];
    const newEntries = data.map((entry) => {
      return {
        date: entry['date'],
        content: entry['content'],
      };
    });
    const newEntries2 = newEntries.reverse();

    listRef.current.scrollTop =
      listRef.current.scrollHeight -
      calendarState.scrollBottom -
      listRef.current.clientHeight;

    setCalendarState((prev) => {
      return {
        ...prev,
        entries: [...newEntries2, ...prev.entries],
        loading: false,
        loadedAll: newEntries.length < numPageElems,
      };
    });
  };

  const onScroll = () => {
    setCalendarState((prev) => {
      return {
        ...prev,
        scrollBottom:
          listRef.current.scrollHeight -
          listRef.current.scrollTop -
          listRef.current.clientHeight,
      };
    });

    if (listRef.current.scrollTop === 0) {
      //トップまでスクロールしたとき
      if (calendarState.loading || calendarState.loadedAll) return;
      loadMore();
    }
  };

  useEffect(() => {
    console.log("load more")
    loadMore();
  }, []);

  return (
    <ModalContainer top="5%" width="500px" height="70%">
      <p className="text-lg">日々の記録</p>
      <div className='flex flex-col justify-center items-center'>{calendarState.loading ? <CircularProgress /> : null}</div>
      <div ref={listRef} className="overflow-y-auto" onScroll={onScroll}>
        {calendarState.entries.map((entry) => {
          return <Entry date={entry.date} content={entry.content} />;
        })}
      </div>
    </ModalContainer>
  );
};
