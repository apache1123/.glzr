import { NetworkOutput } from '../..';
import { BarStatusItem } from '../../components/bar-status-item/bar-status-item';
import { Bar } from '../../components/bar/bar';
import './network.css';

export interface NetworkProps {
  network: NetworkOutput;
}

export function Network(props: NetworkProps) {
  const networkIcon = () =>
    props.network.defaultInterface.type === 'wifi'
      ? props.network.defaultGateway.signalStrength >= 80
        ? 'nf-md-wifi-strength_4'
        : props.network.defaultGateway.signalStrength >= 65
        ? 'nf-md-wifi_strength_3'
        : props.network.defaultGateway.signalStrength >= 40
        ? 'nf-md-wifi_strength_2'
        : props.network.defaultGateway.signalStrength >= 25
        ? 'nf-md-wifi_strength_1'
        : 'nf-md-wifi_strength_outline'
      : props.network.defaultInterface.type === 'ethernet'
      ? 'nf-md-ethernet_cable'
      : 'nf-md-wifi_strength_off_outline';

  return (
    <div class="network">
      <BarStatusItem
        iconClass={networkIcon()}
        bars={
          <>
            <Bar
              value={Math.round(props.network.traffic.received.siValue)}
              unit={props.network.traffic.received.siUnit}
              barValue={props.network.traffic.received.bytes}
              // show as a portion of approx. max download speed (40MBps)
              barMaxValue={40000000}
            />
            <Bar
              value={Math.round(props.network.traffic.transmitted.siValue)}
              unit={props.network.traffic.transmitted.siUnit}
              barValue={props.network.traffic.transmitted.bytes}
              // show as a portion of approx. max upload speed (13MBps)
              barMaxValue={13000000}
            />
          </>
        }
      />
    </div>
  );
}
