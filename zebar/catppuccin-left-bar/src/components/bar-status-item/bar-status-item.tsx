import { JSXElement } from "solid-js";
import "./bar-status-item.css";
import { StatusItem } from "../status-item/status-item";

export interface BarStatusItemProps {
  iconClass: string;
  bars: JSXElement;
  isHighUsage?: boolean;
}

export function BarStatusItem(props: BarStatusItemProps) {
  return (
    <div
      classList={{ "bar-status-item": true, "high-usage": props.isHighUsage }}
    >
      <StatusItem iconClass={props.iconClass}>
        <div class="bar-group">{props.bars}</div>
      </StatusItem>
    </div>
  );
}
