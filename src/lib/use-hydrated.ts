"use client";
import { useSyncExternalStore } from "react";

const subscribe = (): (() => void) => () => {};

/** true apenas no cliente — evita diferenças de hidratação com o estado persistido. */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
