import { Icon } from "../../components/icon/icon";
import { GlazeWmOutput } from "zebar";

export interface GlazewmStatusProps {
  glazewm: GlazeWmOutput;
}

export function GlazewmStatus({ glazewm }: GlazewmStatusProps) {
  return (
    <>
      {glazewm.bindingModes.map((bindingMode) => (
        <div>{bindingMode.displayName ?? bindingMode.name}</div>
      ))}
      {glazewm.tilingDirection === "horizontal" ? (
        <Icon iconClass="nf-md-swap_horizontal" />
      ) : (
        <Icon iconClass="nf-md-swap_vertical" />
      )}
    </>
  );
}
