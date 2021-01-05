import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useUser } from 'hooks';
import { postRequest, deleteRequest, FOLLOW_ROUTE_F } from 'api';
import { LOGIN } from '../../routes';

export const FollowButton = ({
  username,
  following,
  onClickFollow,
  children,
}) => {
  const { user } = useUser();
  const history = useHistory();

  const onClickHandler = async (e) => {
    e.preventDefault();
    if (!user.isLogged) {
      return history.push(LOGIN);
    }

    let data = null;
    if (following) {
      data = await deleteRequest(FOLLOW_ROUTE_F(username), user.token);
    } else {
      data = await postRequest(FOLLOW_ROUTE_F(username), null, user.token);
    }

    return onClickFollow(data.profile);
  };

  return (
    <button
      type="button"
      className={`btn ${following ? 'btn-secondary' : 'btn-outline-secondary'} btn-sm`}
      onClick={onClickHandler}
    >
      <i className="ion-plus-round" />
  &nbsp;
      {children}
    </button>
  );
};

FollowButton.propTypes = {
  username: PropTypes.string.isRequired,
  following: PropTypes.bool.isRequired,
  onClickFollow: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default FollowButton;
