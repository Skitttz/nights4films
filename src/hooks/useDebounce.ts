import React from 'react';

export default function useDebounce(fn: (...args: any[]) => void, delay: number) {
  const timeoutRef = React.useRef<number | null>(null);

  function debounceFn(...args: any[]) {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debounceFn;
}
