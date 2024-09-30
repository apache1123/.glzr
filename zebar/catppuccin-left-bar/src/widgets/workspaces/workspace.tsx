import './workspace.css';
import { Show, For } from 'solid-js';
import { ApplicationIcon } from '../../components/application-icon/application-icon';
import { GlazeWmOutput } from 'zebar';

type Workspace = GlazeWmOutput['currentWorkspaces'][0];

export interface WorkspaceProps {
  workspace: Workspace;
  glazewm: GlazeWmOutput;
}

export function Workspace(props: WorkspaceProps) {
  return (
    <button
      classList={{
        'workspace-btn': true,
        focused: props.workspace.hasFocus,
        displayed: props.workspace.isDisplayed,
      }}
      onClick={() =>
        props.glazewm.runCommand(`focus --workspace ${props.workspace.name}`)
      }
    >
      <div class="workspace-name">
        {props.workspace.displayName ?? props.workspace.name}
      </div>

      <Show
        when={props.workspace.children.some((child) => child.type === 'window')}
      >
        <div class="workspace-applications">
          <For each={props.workspace.children}>
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
  );
}
