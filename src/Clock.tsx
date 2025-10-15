import { type Accessor, type Setter } from "solid-js";

export interface ClockProps {
  getElapsed: Accessor<number>;
  getClockedIn: Accessor<boolean>;
  setClockedIn: Setter<boolean>;
}

export default function Clock(props: ClockProps) {
  return (
    <div class="Clock">
      <div>
        <span>{props.getElapsed()}</span>
      </div>
      <button
        classList={{
          Start: !props.getClockedIn(),
          Stop: props.getClockedIn()
        }}
        onclick={() => props.setClockedIn(previous => !previous)}
        aria-pressed={props.getClockedIn()}>
        {props.getClockedIn() ? "Stop" : "Start"}
      </button>
    </div>
  );
}
