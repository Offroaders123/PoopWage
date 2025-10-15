import { Show, type Accessor, type Setter } from "solid-js";

export interface ClockProps {
  getTime: Accessor<number>;
  getClockedIn: Accessor<boolean>;
  setClockedIn: Setter<boolean>;
}

export default function Clock(props: ClockProps) {
  return (
    <div class="Clock">
      <div>
        <span>{props.getTime()}</span>
      </div>
      <Show when={props.getClockedIn() !== true}>
        <button
          class="Start"
          onclick={() => props.setClockedIn(true)}>
          Start
        </button>
      </Show>
      <Show when={props.getClockedIn() === true}>
        <button
          class="Stop"
          onclick={() => props.setClockedIn(false)}>
          Stop
        </button>
      </Show>
    </div>
  );
}
