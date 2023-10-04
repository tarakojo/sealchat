import { useEffect, useRef } from 'react';

export const Clock = () => {
  const dateRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const colonRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateClock = () => {
      const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ];


      const t = new Date();
      const s = t.getSeconds();
      const h = t.getHours();
      const m = t.getMinutes();
      const d = t.getDate();
      const day = t.getDay();
      const month = t.getMonth();
      const year = t.getFullYear();

      hourRef.current.innerHTML = h < 10 ? '0' + h.toString() : h.toString();
      colonRef.current.style.opacity = s % 2 == 0 ? '1' : '0';
      minuteRef.current.innerHTML = m < 10 ? '0' + m.toString() : m.toString();

      const date = `${weeks[day]} ${months[month]} ${d} ${year}`;
      dateRef.current.innerHTML = date;
    };

    updateClock();
    const f = setInterval(updateClock, 1000);
    return () => {
      clearInterval(f);
    };
  }, []);

  return (
    <div
      className="fixed top-[10px] left-[10px] w-[150px] h-[80px] rounded-[20px] bg-slate-100 bg-opacity-50 flex flex-col justify-center items-center"
      style={{ fontFamily: 'mplus' }}
    >
      <div className="font-bold text-4xl flex flex-row">
        <div ref={hourRef}></div>
        <div ref={colonRef}>:</div>
        <div ref={minuteRef}></div>
      </div>
      <div className="font-bold text-sm" ref={dateRef}></div>
    </div>
  );
};

export default Clock;
