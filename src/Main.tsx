import { type Accessor, Match, type Setter, Switch } from "solid-js";
import { type Store } from "solid-js/store";
import Clock from "./Clock.tsx";
import Log from "./Log.tsx";
import { Tab } from "./Tabs.tsx";
import { type TimeClockLog } from "./time-clock.ts";

export interface MainProps {
  getTab: Accessor<Tab>;
  setTab: Setter<Tab>;
  getElapsed: Accessor<number>;
  getClockedIn: Accessor<boolean>;
  setClockedIn: Setter<boolean>;
  logs: Store<TimeClockLog[]>;
  clearLogs: () => void;
}

export default function Main(props: MainProps) {
  return (
    <main class="Main">
      <Switch>
        <Match when={props.getTab() === Tab.Clock}>
          <Clock
            getElapsed={props.getElapsed}
            getClockedIn={props.getClockedIn}
            setClockedIn={props.setClockedIn}
          />
        </Match>
        <Match when={props.getTab() === Tab.Log}>
          <Log logs={props.logs} clearLogs={props.clearLogs}/>
        </Match>
      </Switch>
    </main>
  );
}
