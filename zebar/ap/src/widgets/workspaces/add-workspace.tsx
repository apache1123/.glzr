import './add-workspace.css';
import { GlazeWmOutput } from '../..';
import { Icon } from '../../components/icon/icon';

export interface AddWorkspaceProps {
  glazewm: GlazeWmOutput;
  firstFreeWorkspaceName: string;
}

export function AddWorkspace(props: AddWorkspaceProps) {
  return (
    <button
      class="workspace-btn add-workspace"
      onClick={() =>
        props.glazewm.runCommand(
          `focus --workspace ${props.firstFreeWorkspaceName}`
        )
      }
    >
      <Icon iconClass="nf-md-plus" />
    </button>
  );
}
