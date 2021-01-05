import { useEffect } from 'react';

export const useEffectIgnoringAbortError = (func, deps) => {
  useEffect(async () => {
    try {
      await func();
    } catch (err) {
      if (err.name !== 'AbortError') {
        throw err;
      }
    }
  }, deps);
};

export default useEffectIgnoringAbortError;
