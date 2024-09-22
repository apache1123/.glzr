import { createEffect, createSignal } from 'solid-js';
import './date-time.css';
import dayjs from 'dayjs';
import { DateOutput } from '../..';

export interface DateTimeProps {
  date: DateOutput;
}

export function DateTime(props: DateTimeProps) {
  const [now, setNow] = createSignal(dayjs());

  createEffect(() => {
    setNow(dayjs(props.date.new));
  });

  return (
    <>
      <div id="time">
        <span>{now().format('hh')}</span>
        <span>{now().format('mm')}</span>
        <div id="meridiem">{now().format('A')}</div>
      </div>
      <div id="date">
        <div>{now().format('ddd')}</div>
        <div>{now().format('D MMM')}</div>
      </div>
    </>
  );
}
