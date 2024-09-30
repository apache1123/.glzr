import './cpu.css';
import { Bar } from '../../components/bar/bar';
import { BarStatusItem } from '../../components/bar-status-item/bar-status-item';
import { CpuOutput } from 'zebar';

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
