import React from 'react';

export default function useDebounce(fn: (...args: any[]) => void, delay: number) {
  const timeoutRef = React.useRef<number | null>(null);
  const callbackRef = React.useRef(fn);
  React.useEffect(() => { callbackRef.current = fn; }, [fn]);
  React.useEffect(() => () => { if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current); }, []);

  const debounceFn = React.useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);

  return debounceFn;
}
