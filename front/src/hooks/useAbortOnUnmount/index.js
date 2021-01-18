import { useEffect, useMemo } from 'react';

const abortControllerFactory = () => new AbortController();

export const useAbortOnUnmount = () => {
  const abortController = useMemo(abortControllerFactory, [abortControllerFactory]);

  useEffect(() => () => abortController.abort(), [abortController]);

  return abortController;
};

export default useAbortOnUnmount;
