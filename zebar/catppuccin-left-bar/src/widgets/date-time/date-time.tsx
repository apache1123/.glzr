import "./date-time.css";
import dayjs from "dayjs";
import { DateOutput } from "zebar";
import { useEffect, useState } from "react";

export interface DateTimeProps {
  date: DateOutput;
}

export function DateTime({ date }: DateTimeProps) {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    setNow(dayjs(date.new));
  }, [date.new]);

  return (
    <>
      <div id="time">
        <span>{now.format("hh")}</span>
        <span>{now.format("mm")}</span>
        <div id="meridiem">{now.format("A")}</div>
      </div>
      <div id="date">
        <div>{now.format("ddd")}</div>
        <div>{now.format("D MMM")}</div>
      </div>
    </>
  );
}
