import { MemoryOutput } from "zebar";
import { BarStatusItem } from "../../components/bar-status-item/bar-status-item";
import { Bar } from "../../components/bar/bar";
import "./memory.css";

export interface MemoryProps {
  memory: MemoryOutput;
}

export function Memory({ memory }: MemoryProps) {
  return (
    <div className="memory">
      <BarStatusItem
        iconClass="nf-fae-chip"
        bars={
          <Bar value={Math.round(memory.usage)} barMaxValue={100} unit="%" />
        }
        isHighUsage={memory.usage > 85}
      />
    </div>
  );
}
