import { type Accessor, Match, type Setter, Switch } from "solid-js";
import Clock from "./Clock.tsx";
import Log from "./Log.tsx";
import { Tab } from "./Tabs.tsx";

export interface MainProps {
  getTab: Accessor<Tab>;
  setTab: Setter<Tab>;
}

export default function Main(props: MainProps) {
  return (
    <main>
      <Switch>
        <Match when={props.getTab() === Tab.Clock}><Clock /></Match>
        <Match when={props.getTab() === Tab.Log}><Log /></Match>
      </Switch>
    </main>
  );
}
