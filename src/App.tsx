import { createSignal, For, Match, Switch } from "solid-js";
import "./App.css";

export default function App() {
  const [getTab, setTab] = createSignal<Tab>("Clock");

  return (
    <>
      <h1>PoopWage</h1>
      <Tabs getTab={getTab} setTab={setTab} />
      <main>
        <Switch>
          <Match when={getTab() === "Clock"}><Clock /></Match>
          <Match when={getTab() === "Log"}><Log /></Match>
        </Switch>
      </main>
    </>
  );
}

const tabs = ["Clock", "Log"] as const;
type Tab = typeof tabs[number];

function Tabs(props: { getTab: () => Tab, setTab: (tab: Tab) => void }) {
  return (
    <nav>
      <For each={tabs}>
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

export function Clock() {
  return (
    <div>Clock interface</div>
  );
}

export function Log() {
  return (
    <div>Log data</div>
  );
}
