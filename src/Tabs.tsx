import { type Accessor, For, type Setter } from "solid-js";

export enum Tab {
  Clock = "Clock",
  Log = "Log",
}

export interface TabsProps {
  getTab: Accessor<Tab>;
  setTab: Setter<Tab>;
}

export default function Tabs(props: TabsProps) {
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
