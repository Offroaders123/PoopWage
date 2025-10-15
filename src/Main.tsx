import { type Accessor, Match, type Setter, Switch } from "solid-js";
import Clock from "./Clock.tsx";
import Log from "./Log.tsx";
import { Tab } from "./Tabs.tsx";

export interface MainProps {
  getTab: Accessor<Tab>;
  setTab: Setter<Tab>;
  getTime: Accessor<number>;
  getClockedIn: Accessor<boolean>;
  setClockedIn: Setter<boolean>;
}

export default function Main(props: MainProps) {
  return (
    <main class="Main">
      <Switch>
        <Match when={props.getTab() === Tab.Clock}>
          <Clock
            getTime={props.getTime}
            getClockedIn={props.getClockedIn}
            setClockedIn={props.setClockedIn}
          />
        </Match>
        <Match when={props.getTab() === Tab.Log}>
          <Log />
        </Match>
      </Switch>
    </main>
  );
}
