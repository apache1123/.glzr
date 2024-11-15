import "./bar.css";

export interface BarProps {
  value: number;
  unit: string;
  /** Use a different value to determine how much of the bar should be filled. Defaults to `value`. */
  barValue?: number;
  /** The `value`/`barValue` will be divided by this number to determine how much of the bar should be filled. */
  barMaxValue: number;
}

export function Bar({ value, unit, barValue, barMaxValue }: BarProps) {
  return (
    <div className="bar-wrapper">
      <div className="bar-outline">
        <div
          className="bar"
          style={{
            width: `${Math.min(
              Math.round(((barValue ?? value) / barMaxValue) * 100),
              100,
            )}%`,
          }}
        ></div>
      </div>
      <div className="bar-value">
        {value}
        {unit}
      </div>
    </div>
  );
}
