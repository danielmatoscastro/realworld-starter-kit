import { useEffect } from 'react';

export const useEffectIgnoringAbortError = (func, deps) => {
  useEffect(() => {
    const asynFunc = async () => {
      try {
        await func();
      } catch (err) {
        if (err.name !== 'AbortError') {
          throw err;
        }
      }
    };

    asynFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useEffectIgnoringAbortError;
