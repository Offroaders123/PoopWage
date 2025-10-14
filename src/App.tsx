import { For, type JSX } from "solid-js";
import "./App.css";

export default function App() {
  return (
    <>
      <h1>PoopWage</h1>
      <Tabbed>{[
        ["Clock", <div>Clock interface</div>],
        ["Log", <div>Log data</div>],
      ]}</Tabbed>
    </>
  );
}

function Tabbed(props: { children: [string, JSX.Element][]; }) {
  return (
    <>
      <For each={props.children}>
        {([name, content]) => (
          <>
            <div>
              <button>{name}</button>
            </div>
          </>
        )}
      </For>
    </>
  );
}
