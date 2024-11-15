import "./workspaces.css";
import { Workspace } from "./workspace";
import { workspacesByMonitor } from "./workspace-list";
import { AddWorkspace } from "./add-workspace";
import { GlazeWmOutput } from "zebar";

export interface WorkspacesProps {
  glazewm: GlazeWmOutput;
}

export function Workspaces({ glazewm }: WorkspacesProps) {
  /** Returns the first free workspace name from the current monitor */
  const firstFreeWorkspaceName = (): string | undefined => {
    const monitorIndex = glazewm.allMonitors.findIndex(
      (monitor) => monitor.id === glazewm.currentMonitor.id,
    );

    if (monitorIndex === -1) return undefined;

    const allWorkspaceNames = workspacesByMonitor[monitorIndex];

    return allWorkspaceNames.find(
      (workspaceName) =>
        !glazewm.currentWorkspaces.some(
          (workspace) => workspace.name === workspaceName,
        ),
    );
  };

  const displayedWorkspaceHasWindows =
    glazewm.displayedWorkspace.children.length > 0;

  return (
    <div className="workspaces">
      {glazewm.currentWorkspaces.map((workspace) => (
        <Workspace workspace={workspace} key={workspace.id} glazewm={glazewm} />
      ))}

      {/* Show add workspace button when the current workspace is not empty and there is a free workspace */}
      {displayedWorkspaceHasWindows && !!firstFreeWorkspaceName() && (
        <AddWorkspace
          glazewm={glazewm}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          firstFreeWorkspaceName={firstFreeWorkspaceName()}
        />
      )}
    </div>
  );
}
