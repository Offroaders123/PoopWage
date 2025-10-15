import { createEffect } from "solid-js";
import { createStore, type SetStoreFunction, type Store } from "solid-js/store";

export function createLocalStore<T extends object>(name: string, init: T): [get: Store<T>, set: SetStoreFunction<T>] {
  const localState: string | null = localStorage.getItem(name);
  const [state, setState]: [get: Store<T>, set: SetStoreFunction<T>] = createStore<T>(
    localState ? JSON.parse(localState) as T : init
  );
  createEffect(() => {
    localStorage.setItem(name, JSON.stringify(state));
  });
  return [state, setState];
}
