import { For } from "solid-js";

export enum Tab {
  Clock = "Clock",
  Log = "Log",
}

export default function Tabs(props: { getTab: () => Tab, setTab: (tab: Tab) => void }) {
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
