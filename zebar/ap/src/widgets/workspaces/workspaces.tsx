import { For, Show } from 'solid-js';
import { GlazeWmOutput } from '../..';
import './workspaces.css';
import { ApplicationIcon } from '../../components/application-icon/application-icon';

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
            <div class="workspace-name">
              {workspace.displayName ?? workspace.name}
            </div>

            <Show
              when={workspace.children.some((child) => child.type === 'window')}
            >
              <div class="workspace-applications">
                <For each={workspace.children}>
                  {(child) =>
                    child.type === 'window' ? (
                      <div
                        classList={{
                          'workspace-application': true,
                          focused: child.hasFocus,
                        }}
                      >
                        <ApplicationIcon processName={child.processName} />
                      </div>
                    ) : undefined
                  }
                </For>
              </div>
            </Show>
          </button>
        )}
      </For>
    </div>
  );
}
