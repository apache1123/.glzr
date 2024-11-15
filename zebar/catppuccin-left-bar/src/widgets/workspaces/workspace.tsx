import "./workspace.css";
import { ApplicationIcon } from "../../components/application-icon/application-icon";
import { GlazeWmOutput } from "zebar";
import classNames from "classnames";

type Workspace = GlazeWmOutput["currentWorkspaces"][0];

export interface WorkspaceProps {
  workspace: Workspace;
  glazewm: GlazeWmOutput;
}

export function Workspace({ workspace, glazewm }: WorkspaceProps) {
  return (
    <button
      className={classNames({
        "workspace-btn": true,
        focused: workspace.hasFocus,
        displayed: workspace.isDisplayed,
      })}
      onClick={() => glazewm.runCommand(`focus --workspace ${workspace.name}`)}
    >
      <div className="workspace-name">
        {workspace.displayName ?? workspace.name}
      </div>

      {workspace.children.some((child) => child.type === "window") && (
        <div className="workspace-applications">
          {workspace.children.map((child) =>
            child.type === "window" ? (
              <div
                className={classNames({
                  "workspace-application": true,
                  focused: child.hasFocus,
                })}
              >
                <ApplicationIcon processName={child.processName} />
              </div>
            ) : undefined,
          )}
        </div>
      )}
    </button>
  );
}
