import { createSignal, type Signal } from "solid-js";
import Header from "./Header.tsx";
import Main from "./Main.tsx";
import Tabs, { Tab } from "./Tabs.tsx";
import { createTimeClock, type TimeClock } from "./time-clock.ts";
import "./App.css";

const FEDERAL_MINIMUM_WAGE = 7.25;

export default function App() {
  const [getTab, setTab]: Signal<Tab> = createSignal<Tab>(Tab.Clock);
  const { logs, getClockedIn, setClockedIn, getElapsed, clearLogs }: TimeClock = createTimeClock();
  const [getWage, setWage]: Signal<number> = createSignal<number>(FEDERAL_MINIMUM_WAGE);

  return (
    <>
      <Header />
      <Tabs
        getTab={getTab}
        setTab={setTab}
      />
      <Main
        getTab={getTab}
        setTab={setTab}
        getElapsed={getElapsed}
        getClockedIn={getClockedIn}
        setClockedIn={setClockedIn}
        logs={logs}
        clearLogs={clearLogs}
        getWage={getWage}
        setWage={setWage}
      />
    </>
  );
}
