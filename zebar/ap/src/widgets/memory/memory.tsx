import { MemoryOutput } from '../..';
import { BarStatusItem } from '../../components/bar-status-item/bar-status-item';
import { Bar } from '../../components/bar/bar';
import './memory.css';

export interface MemoryProps {
  memory: MemoryOutput;
}

export function Memory(props: MemoryProps) {
  return (
    <div class="memory">
      <BarStatusItem
        iconClass="nf-fae-chip"
        bars={
          <Bar
            value={Math.round(props.memory.usage)}
            barMaxValue={100}
            unit="%"
          />
        }
        isHighUsage={props.memory.usage > 85}
      />
    </div>
  );
}
