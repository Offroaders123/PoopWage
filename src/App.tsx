import { createSignal, type Signal } from "solid-js";
import Header from "./Header.tsx";
import Main from "./Main.tsx";
import Tabs, { Tab } from "./Tabs.tsx";
import "./App.css";

export default function App() {
  const [getTab, setTab]: Signal<Tab> = createSignal<Tab>(Tab.Clock);

  return (
    <>
      <Header />
      <Tabs getTab={getTab} setTab={setTab} />
      <Main getTab={getTab} setTab={setTab} />
    </>
  );
}
