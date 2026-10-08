"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** The visitor's current year, rendered on the client so the static shell never goes stale. */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year}</>;
}
