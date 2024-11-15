import "./current-application.css";
import { ApplicationIcon } from "../../components/application-icon/application-icon";
import { Icon } from "../../components/icon/icon";
import { GlazeWmOutput } from "zebar";

export interface CurrentApplicationProps {
  glazewm: GlazeWmOutput;
}

export function CurrentApplication({ glazewm }: CurrentApplicationProps) {
  const processName =
    glazewm.focusedContainer.type === "window"
      ? glazewm.focusedContainer.processName
      : undefined;

  return (
    <>
      <div id="process-icon">
        {processName !== undefined ? (
          <ApplicationIcon processName={processName} />
        ) : (
          // No process name = container not a window. Perhaps the desktop is focused instead etc.
          <Icon iconClass="nf-custom-windows" />
        )}
      </div>
      <div id="process-name">{processName}</div>
    </>
  );
}
