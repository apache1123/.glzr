import './bar.css';

export interface BarProps {
  value: number;
  unit: string;
  /** Use a different value to determine how much of the bar should be filled. Defaults to `value`. */
  barValue?: number;
  /** The `value`/`barValue` will be divided by this number to determine how much of the bar should be filled. */
  barMaxValue: number;
}

export function Bar(props: BarProps) {
  return (
    <div class="bar-wrapper">
      <div class="bar-outline">
        <div
          class="bar"
          style={{
            width: `${Math.min(
              Math.round(
                ((props.barValue ?? props.value) / props.barMaxValue) * 100
              ),
              100
            )}%`,
          }}
        ></div>
      </div>
      <div class="bar-value">
        {props.value}
        {props.unit}
      </div>
    </div>
  );
}
