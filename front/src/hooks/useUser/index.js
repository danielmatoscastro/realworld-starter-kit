import { useContext } from 'react';
import { UserContext } from '../../providers';

export const useUser = () => {
  const user = useContext(UserContext);

  return user;
};

export default useUser;
