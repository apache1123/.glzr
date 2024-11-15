import { For, Show } from "solid-js";
import "./workspaces.css";
import { Workspace } from "./workspace";
import { workspacesByMonitor } from "./workspace-list";
import { AddWorkspace } from "./add-workspace";
import { GlazeWmOutput } from "zebar";

export interface WorkspacesProps {
  glazewm: GlazeWmOutput;
}

export function Workspaces(props: WorkspacesProps) {
  /** Returns the first free workspace name from the current monitor */
  const firstFreeWorkspaceName = (): string | undefined => {
    const monitorIndex = props.glazewm.allMonitors.findIndex(
      (monitor) => monitor.id === props.glazewm.currentMonitor.id,
    );

    if (monitorIndex === -1) return undefined;

    const allWorkspaceNames = workspacesByMonitor[monitorIndex];

    return allWorkspaceNames.find(
      (workspaceName) =>
        !props.glazewm.currentWorkspaces.some(
          (workspace) => workspace.name === workspaceName,
        ),
    );
  };

  const displayedWorkspaceHasWindows = () => {
    return props.glazewm.displayedWorkspace.children.length > 0;
  };

  return (
    <div class="workspaces">
      <For each={props.glazewm.currentWorkspaces}>
        {(workspace) => (
          <Workspace workspace={workspace} glazewm={props.glazewm} />
        )}
      </For>

      {/* Show add workspace button when the current workspace is not empty and there is a free workspace */}
      <Show when={displayedWorkspaceHasWindows() && !!firstFreeWorkspaceName()}>
        <AddWorkspace
          glazewm={props.glazewm}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          firstFreeWorkspaceName={firstFreeWorkspaceName()}
        />
      </Show>
    </div>
  );
}
