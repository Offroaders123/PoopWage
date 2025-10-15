import { type Accessor } from "solid-js";

export interface ClockProps {
  getTime: Accessor<number>;
}

export default function Clock(props: ClockProps) {
  return (
    <div class="Clock">
      <div>
        <output>{props.getTime()}</output>
      </div>
      <button>Start</button>
      <button>Stop</button>
    </div>
  );
}
