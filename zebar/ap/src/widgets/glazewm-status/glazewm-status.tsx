import { For, Show } from 'solid-js';
import { Icon } from '../../components/icon/icon';
import { GlazeWmOutput } from 'zebar';

export interface GlazewmStatusProps {
  glazewm: GlazeWmOutput;
}

export function GlazewmStatus(props: GlazewmStatusProps) {
  return (
    <>
      <For each={props.glazewm.bindingModes}>
        {(bindingMode) => (
          <div>{bindingMode.displayName ?? bindingMode.name}</div>
        )}
      </For>
      <Show
        when={props.glazewm.tilingDirection === 'horizontal'}
        fallback={<Icon iconClass="nf-md-swap_vertical" />}
      >
        <Icon iconClass="nf-md-swap_horizontal" />
      </Show>
    </>
  );
}
