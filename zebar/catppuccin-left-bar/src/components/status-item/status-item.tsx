import "./status-item.css";
import { Icon } from "../icon/icon";
import { PropsWithChildren } from "react";

export type StatusItemProps = PropsWithChildren<{
  iconClass: string;
}>;

export function StatusItem({ iconClass, children }: StatusItemProps) {
  return (
    <div className="status-item">
      <Icon iconClass={iconClass} />
      {children}
    </div>
  );
}
