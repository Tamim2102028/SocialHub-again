import { useCallback, useRef } from "react";

type AnyFunction = (...args: never[]) => unknown;

/**
 * Custom hook for debouncing function calls
 * Useful for event handlers like onChange
 */
export const useDebouncedCallback = <T extends AnyFunction>(
  callback: T,
  delay: number = 500
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return { debouncedCallback, cancel };
};
