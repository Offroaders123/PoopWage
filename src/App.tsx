import { createSignal, Match, type Signal, Switch } from "solid-js";
import Clock from "./Clock.tsx";
import Log from "./Log.tsx";
import Tabs, { Tab } from "./Tabs.tsx";
import "./App.css";

export default function App() {
  const [getTab, setTab]: Signal<Tab> = createSignal<Tab>(Tab.Clock);

  return (
    <>
      <header>
        <h1>PoopWage</h1>
      </header>
      <Tabs getTab={getTab} setTab={setTab} />
      <main>
        <Switch>
          <Match when={getTab() === Tab.Clock}><Clock /></Match>
          <Match when={getTab() === Tab.Log}><Log /></Match>
        </Switch>
      </main>
    </>
  );
}
