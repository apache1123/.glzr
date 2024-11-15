import { ParentProps } from "solid-js";
import "./status-item.css";
import { Icon } from "../icon/icon";

export type StatusItemProps = ParentProps<{
  iconClass: string;
}>;

export function StatusItem(props: StatusItemProps) {
  return (
    <div class="status-item">
      <Icon iconClass={props.iconClass} />
      {props.children}
    </div>
  );
}
