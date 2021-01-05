import { useEffect } from 'react';

export const useAbortOnUnmount = () => {
  const abortController = new AbortController();

  useEffect(() => () => abortController.abort(), []);

  return abortController;
};

export default useAbortOnUnmount;
