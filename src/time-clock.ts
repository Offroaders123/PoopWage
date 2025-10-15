import { type Accessor, createEffect, createSignal, onCleanup, type Setter, type Signal } from "solid-js";
import { type SetStoreFunction, type Store } from "solid-js/store";
import { createLocalStore } from "./storage.ts";

export interface TimeClockLog {
  start: number;
  end?: number;
}

export interface TimeClock {
  logs: Store<TimeClockLog[]>;
  setLogs: SetStoreFunction<TimeClockLog[]>;
  getClockedIn: Accessor<boolean>;
  setClockedIn: Setter<boolean>;
  getElapsed: Accessor<number>;
  getActiveLog: Accessor<TimeClockLog | null>;
}

export function createTimeClock(): TimeClock {
  const [logs, setLogs]: [get: Store<TimeClockLog[]>, set: SetStoreFunction<TimeClockLog[]>] = createLocalStore<TimeClockLog[]>("timeClock", []);

  const [getClockedIn, setClockedIn]: Signal<boolean> = createSignal<boolean>(logs.some(log => typeof log.end !== "number"));

  const [getElapsed, setElapsed]: Signal<number> = createSignal<number>(0);

  const getActiveLog: Accessor<TimeClockLog | null> = () => logs.find(log => typeof log.end !== "number") ?? null;

  createEffect(() => {
    if (!getClockedIn()) {
      setElapsed(0);
      return;
    }

    const current: TimeClockLog | null = getActiveLog();
    if (current === null) {
      return;
    }

    const update = (): number => setElapsed(Date.now() - current.start);
    update();

    const id: number = setInterval(update, 1000);
    onCleanup(() => clearInterval(id));
  });

  createEffect(() => {
    const clockedIn: boolean = getClockedIn();
    const current: TimeClockLog | null = getActiveLog();

    if (clockedIn && current === null) {
      const now: number = Date.now();
      setLogs([...logs, { start: now }]);
    } else if (!clockedIn && current !== null) {
      const now: number = Date.now();
      const index: number = logs.findIndex(log => log === current);
      setLogs(index, "end", now);
    }
  });

  return { logs, setLogs, getClockedIn, setClockedIn, getElapsed, getActiveLog };
}
