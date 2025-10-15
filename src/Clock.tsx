import { createMemo, type Accessor, type Setter } from "solid-js";

export interface ClockProps {
  getElapsed: Accessor<number>;
  getClockedIn: Accessor<boolean>;
  setClockedIn: Setter<boolean>;
}

export default function Clock(props: ClockProps) {
  const getDisplay: Accessor<string> = createMemo<string>(() => formatTime(props.getElapsed()));

  function formatTime(ms: number): string {
    const totalSeconds: number = Math.floor(ms / 1000);
    const hours: number = Math.floor(totalSeconds / 3600);
    const minutes: number = Math.floor((totalSeconds % 3600) / 60);
    const seconds: number = totalSeconds % 60;
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return (
    <div class="Clock">
      <div>
        <span>{getDisplay()}</span>
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
