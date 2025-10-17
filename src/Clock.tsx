import { createMemo, type Accessor, type Setter } from "solid-js";

const FEDERAL_MINIMUM_WAGE: string = "7.25";

export interface ClockProps {
  getElapsed: Accessor<number>;
  getClockedIn: Accessor<boolean>;
  setClockedIn: Setter<boolean>;
  getWage: Accessor<number | undefined>;
  setWage: Setter<number | undefined>;
}

export default function Clock(props: ClockProps) {
  const getDisplay: Accessor<string> = createMemo<string>(() => formatTime(props.getElapsed()));

  return (
    <div class="Clock">
      <div class="Display">
        <span>{getDisplay()}</span>
      </div>
      <label class="Wage">
        <span aria-hidden>$ </span>
        <input
          type="number"
          inputmode="decimal"
          step={0.01}
          min={0}
          placeholder={FEDERAL_MINIMUM_WAGE}
          aria-label="Wage in dollars"
          value={props.getWage()}
          oninput={event => props.setWage(event.currentTarget.valueAsNumber)}
        />
      </label>
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

function formatTime(ms: number): string {
  const totalSeconds: number = Math.floor(ms / 1000);
  const hours: number = Math.floor(totalSeconds / 3600);
  const minutes: number = Math.floor((totalSeconds % 3600) / 60);
  const seconds: number = totalSeconds % 60;
  return (
    `${String(hours)
      .padStart(2, "0")
    }:${String(minutes)
      .padStart(2, "0")
    }:${String(seconds)
      .padStart(2, "0")
    }`
  );
}
