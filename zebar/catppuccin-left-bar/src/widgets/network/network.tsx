import { NetworkOutput } from "zebar";
import { BarStatusItem } from "../../components/bar-status-item/bar-status-item";
import { Bar } from "../../components/bar/bar";
import "./network.css";

export interface NetworkProps {
  network: NetworkOutput;
}

export function Network({
  network: { defaultInterface, defaultGateway, traffic },
}: NetworkProps) {
  const networkIcon = () =>
    defaultInterface?.type === "wifi"
      ? defaultGateway === null || defaultGateway.signalStrength === null
        ? "nf-md-wifi_strength_off_outline"
        : defaultGateway.signalStrength >= 80
          ? "nf-md-wifi_strength_4"
          : defaultGateway.signalStrength >= 65
            ? "nf-md-wifi_strength_3"
            : defaultGateway.signalStrength >= 40
              ? "nf-md-wifi_strength_2"
              : defaultGateway.signalStrength >= 25
                ? "nf-md-wifi_strength_1"
                : "nf-md-wifi_strength_outline"
      : defaultInterface?.type === "ethernet"
        ? "nf-md-ethernet_cable"
        : "nf-md-wifi_strength_off_outline";

  return (
    <div className="network">
      <BarStatusItem
        iconClass={networkIcon()}
        bars={
          <>
            <Bar
              value={Math.round(traffic?.received.siValue ?? 0)}
              unit={traffic?.received.siUnit ?? ""}
              barValue={traffic?.received.bytes ?? 0}
              // show as a portion of approx. max download speed (40MBps)
              barMaxValue={40000000}
            />
            <Bar
              value={Math.round(traffic?.transmitted.siValue ?? 0)}
              unit={traffic?.transmitted.siUnit ?? ""}
              barValue={traffic?.transmitted.bytes ?? 0}
              // show as a portion of approx. max upload speed (13MBps)
              barMaxValue={13000000}
            />
          </>
        }
      />
    </div>
  );
}
