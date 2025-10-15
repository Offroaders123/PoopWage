import { createEffect } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

export function createLocalStore<T extends object>(name: string, init: T): [Store<T>, SetStoreFunction<T>] {
  const localState: string | null = localStorage.getItem(name);
  const [state, setState]: [Store<T>, SetStoreFunction<T>] = createStore<T>(
    localState ? JSON.parse(localState) as T : init
  );
  createEffect(() => {
    localStorage.setItem(name, JSON.stringify(state));
  });
  return [state, setState];
}
