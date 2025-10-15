import { type Accessor } from "solid-js";

export interface ClockProps {
  getTime: Accessor<number>;
}

export default function Clock(props: ClockProps) {
  return (
    <div class="Clock">
      <div>
        <span>{props.getTime()}</span>
      </div>
      <button class="Start">Start</button>
      <button class="Stop">Stop</button>
    </div>
  );
}
