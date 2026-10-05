"use client";

import { useEffect, useState } from "react";

/**
 * Returns `value` only after it has stopped changing for `delayMs`.
 *
 * Search inputs stay bound to the live value (so typing is never laggy),
 * while the expensive / layout-changing work — ranking 380+ resources and
 * mounting result cards — runs off the debounced value. Without this every
 * keystroke re-ranked and re-mounted the whole result grid ("c" → 300
 * results, "ch" → 42, "che" → 55 …), which made the page jump and the
 * search field appear to flicker.
 */
export function useDebouncedValue<T>(value: T, delayMs = 250): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}
