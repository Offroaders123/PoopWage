import { For } from "solid-js";
import { type Store } from "solid-js/store";
import { type TimeClockLog } from "./time-clock.ts";

export interface LogProps {
  logs: Store<TimeClockLog[]>;
}

export default function Log(props: LogProps) {
  return (
    <div class="Log">
      <For each={props.logs}>
        {log => <pre>{JSON.stringify(log)}</pre>}
      </For>
    </div>
  );
}
