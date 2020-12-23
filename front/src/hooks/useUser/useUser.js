import { useContext } from 'react';
import { UserContext } from '../../providers';

const useUser = () => {
  const user = useContext(UserContext);

  return user;
};

export default useUser;
