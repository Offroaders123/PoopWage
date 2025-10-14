import { createSignal, For, Match, Switch } from "solid-js";
import Clock from "./Clock.tsx";
import Log from "./Log.tsx";
import "./App.css";

export default function App() {
  const [getTab, setTab] = createSignal<Tab>(Tab.Clock);

  return (
    <>
      <h1>PoopWage</h1>
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

enum Tab {
  Clock = "Clock",
  Log = "Log",
}

function Tabs(props: { getTab: () => Tab, setTab: (tab: Tab) => void }) {
  return (
    <nav>
      <For each={Object.values(Tab)}>
        {tab => (
          <button
            onclick={() => props.setTab(tab)}
            classList={{ active: props.getTab() === tab }}>
            {tab}
          </button>
        )}
      </For>
    </nav>
  );
}
