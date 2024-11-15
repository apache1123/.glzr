import "./bar-status-item.css";
import { StatusItem } from "../status-item/status-item";
import { ReactNode } from "react";
import classNames from "classnames";

export interface BarStatusItemProps {
  iconClass: string;
  bars: ReactNode;
  isHighUsage?: boolean;
}

export function BarStatusItem({
  iconClass,
  bars,
  isHighUsage,
}: BarStatusItemProps) {
  return (
    <div
      className={classNames({
        "bar-status-item": true,
        "high-usage": isHighUsage,
      })}
    >
      <StatusItem iconClass={iconClass}>
        <div className="bar-group">{bars}</div>
      </StatusItem>
    </div>
  );
}
