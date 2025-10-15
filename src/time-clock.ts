import { type Accessor, createEffect, createSignal, onCleanup, type Signal } from "solid-js";
import { type SetStoreFunction, type Store } from "solid-js/store";
import { createLocalStore } from "./storage.ts";

export interface TimeClockLog {
  start: number;
  end?: number;
}

export interface TimeClock {
  logs: Store<TimeClockLog[]>;
  setLogs: SetStoreFunction<TimeClockLog[]>;
  getElapsed: Accessor<number>;
  getActiveLog: Accessor<TimeClockLog | null>;
  clockIn: () => void;
  clockOut: () => void;
}

export function createTimeClock(): TimeClock {
  const [logs, setLogs]: [get: Store<TimeClockLog[]>, set: SetStoreFunction<TimeClockLog[]>] = createLocalStore<TimeClockLog[]>("timeClock", []);

  const [getElapsed, setElapsed]: Signal<number> = createSignal<number>(0);

  const getActiveLog: Accessor<TimeClockLog | null> = () => logs.find(log => typeof log.end !== "number") ?? null;

  createEffect(() => {
    const current: TimeClockLog | null = getActiveLog();
    if (current === null) {
      setElapsed(0);
      return;
    }

    const update = (): number => setElapsed(Date.now() - current.start);
    update();

    const id: number = setInterval(update, 1000);
    onCleanup(() => clearInterval(id));
  });

  function clockIn(): void {
    if (getActiveLog()) return;
    const now: number = Date.now();
    setLogs([...logs, { start: now }]);
  }

  function clockOut(): void {
    const current: TimeClockLog | null = getActiveLog();
    if (current === null) return;

    const now: number = Date.now();
    const index: number = logs.findIndex(log => log === current);
    setLogs(index, "end", now);
  }

  return { logs, setLogs, getElapsed, getActiveLog, clockIn, clockOut };
}
