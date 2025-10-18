import { type Accessor, createMemo, For, Match, Switch } from "solid-js";
import { type Store } from "solid-js/store";
import { type TimeClockLog } from "./time-clock.ts";

export interface LogProps {
  logs: Store<TimeClockLog[]>;
  clearLogs: () => void;
}

export default function Log(props: LogProps) {
  const logsPresent: Accessor<boolean> = createMemo<boolean>(() => props.logs.length > 0);

  return (
    <div class="Log">
      <Switch>
        <Match when={logsPresent()}>
          <table>
            <thead>
              <tr>
                <th scope="col">Wage</th>
                <th scope="col">Clock In</th>
                <th scope="col">Clock Out</th>
              </tr>
            </thead>
            <tbody>
              <For each={props.logs}>
                {log => {
                  const { startTime, startDate, endTime, endDate }: LogDates = parseLogDates(log);
                  const partial: boolean = typeof endDate !== "string" && typeof endTime !== "string";
                  return (
                    <tr classList={{ Partial: partial }}>
                      <td>${log.wage}</td>
                      <td>{startDate} {startTime}</td>
                      <td>{partial ? "-" : `${endDate} ${endTime}`}</td>
                    </tr>
                  );
                }}
              </For>
            </tbody>
          </table>
          <button
            class="ClearLogs"
            onclick={() => props.clearLogs()}>
            Reset Log
          </button>
        </Match>
        <Match when={logsPresent() === false}>
          <p>No logs made yet!</p>
        </Match>
      </Switch>
    </div>
  );
}

interface LogDates {
  startTime: string;
  startDate: string;
  endTime?: string;
  endDate?: string;
}

function parseLogDates(log: TimeClockLog): LogDates {
  const start: Date = new Date(log.start);
  const startTime: string = start.toLocaleTimeString();
  const startDate: string = start.toLocaleDateString();
  if (typeof log.end !== "number") {
    return { startTime, startDate };
  }

  const end: Date = new Date(log.end);
  const endTime: string = end.toLocaleTimeString();
  const endDate: string = end.toLocaleDateString();
  return { startTime, startDate, endTime, endDate };
}
