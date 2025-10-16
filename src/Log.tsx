import { For } from "solid-js";
import { type Store } from "solid-js/store";
import { type TimeClockLog } from "./time-clock.ts";

export interface LogProps {
  logs: Store<TimeClockLog[]>;
  clearLogs: () => void;
}

export default function Log(props: LogProps) {
  return (
    <div class="Log">
      <button onclick={() => props.clearLogs()}>Reset Log</button>
      <table>
        <thead>
          <tr>
            <th scope="col">Clock In</th>
            <th scope="col">Clock Out</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.logs}>
            {log => {
              const { startTime, startDate, endTime, endDate }: LogDates = parseLogDates(log);
              return (
                <tr>
                  <td>{startDate} {startTime}</td>
                  <td>{endDate} {endTime}</td>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
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
