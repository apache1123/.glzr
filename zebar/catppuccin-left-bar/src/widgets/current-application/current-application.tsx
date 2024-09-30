import './current-application.css';
import { ApplicationIcon } from '../../components/application-icon/application-icon';
import { Show } from 'solid-js';
import { Icon } from '../../components/icon/icon';
import { GlazeWmOutput } from 'zebar';

export interface CurrentApplicationProps {
  glazewm: GlazeWmOutput;
}

export function CurrentApplication(props: CurrentApplicationProps) {
  const processName = () =>
    props.glazewm.focusedContainer.type === 'window'
      ? props.glazewm.focusedContainer.processName
      : undefined;

  return (
    <>
      <div id="process-icon">
        <Show
          when={processName() !== undefined}
          // No process name = container not a window. Perhaps the desktop is focused instead etc.
          fallback={<Icon iconClass="nf-custom-windows" />}
        >
          <ApplicationIcon processName={processName()} />
        </Show>
      </div>
      <div id="process-name">{processName()}</div>
    </>
  );
}
