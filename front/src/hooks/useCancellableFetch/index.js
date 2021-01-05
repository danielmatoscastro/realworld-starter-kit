import { useEffect } from 'react';

export const useCancellableFetch = (asyncFetchData, deps) => {
  useEffect(() => {
    const abortController = new AbortController();
    asyncFetchData(abortController).catch((err) => {
      if (err.name !== 'AbortError') {
        throw err;
      }
    });

    return () => abortController.abort();
  }, deps);
};

export default useCancellableFetch;
