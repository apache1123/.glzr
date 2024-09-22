import { For, Show } from 'solid-js';
import { GlazeWmOutput } from '../..';
import './workspaces.css';
import { Icon } from '../../components/icon/icon';

export interface WorkspacesProps {
  glazewm: GlazeWmOutput;
}

export function Workspaces(props: WorkspacesProps) {
  return (
    <div class="workspaces">
      <For each={props.glazewm.currentWorkspaces}>
        {(workspace) => (
          <button
            classList={{
              workspace: true,
              focused: workspace.hasFocus,
              displayed: workspace.isDisplayed,
            }}
            onClick={() =>
              props.glazewm.runCommand(`focus --workspace ${workspace.name}`)
            }
          >
            <Show
              when={workspace.hasFocus || workspace.isDisplayed}
              fallback={workspace.displayName ?? workspace.name}
            >
              <Icon iconClass="nf-cod-octoface" />
            </Show>
          </button>
        )}
      </For>
    </div>
  );
}
