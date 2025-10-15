import { createSignal, type Signal } from "solid-js";
import Header from "./Header.tsx";
import Main from "./Main.tsx";
import Tabs, { Tab } from "./Tabs.tsx";
import "./App.css";

export default function App() {
  const [getTab, setTab]: Signal<Tab> = createSignal<Tab>(Tab.Clock);
  const [getTime, setTime]: Signal<number> = createSignal<number>(0);
  const [getClockedIn, setClockedIn]: Signal<boolean> = createSignal<boolean>(false);

  return (
    <>
      <Header />
      <Tabs getTab={getTab} setTab={setTab} />
      <Main getTab={getTab} setTab={setTab} getTime={getTime} getClockedIn={getClockedIn} setClockedIn={setClockedIn} />
    </>
  );
}
