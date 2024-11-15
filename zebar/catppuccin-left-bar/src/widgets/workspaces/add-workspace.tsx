import "./add-workspace.css";
import { Icon } from "../../components/icon/icon";
import { GlazeWmOutput } from "zebar";

export interface AddWorkspaceProps {
  glazewm: GlazeWmOutput;
  firstFreeWorkspaceName: string;
}

export function AddWorkspace({
  glazewm,
  firstFreeWorkspaceName,
}: AddWorkspaceProps) {
  return (
    <button
      className="workspace-btn add-workspace"
      onClick={() =>
        glazewm.runCommand(`focus --workspace ${firstFreeWorkspaceName}`)
      }
    >
      <Icon iconClass="nf-md-plus" />
    </button>
  );
}
