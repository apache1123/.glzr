import './cpu.css';
import { CpuOutput } from '../..';
import { Bar } from '../../components/bar/bar';
import { BarStatusItem } from '../../components/bar-status-item/bar-status-item';

export interface CpuProps {
  cpu: CpuOutput;
}

export function Cpu(props: CpuProps) {
  return (
    <div class="cpu">
      <BarStatusItem
        iconClass="nf-oct-cpu"
        bars={
          <Bar value={Math.round(props.cpu.usage)} unit="%" barMaxValue={100} />
        }
        isHighUsage={props.cpu.usage > 85}
      />
    </div>
  );
}
