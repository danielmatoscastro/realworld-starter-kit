import React from 'react';
import { Link } from 'react-router-dom';
import { SETTINGS } from '../../routes';

export const EditProfileSettingsButton = () => (
  <Link to={SETTINGS} className="btn btn-sm btn-outline-secondary action-btn">
    <i className="ion-gear-a" />
    {' '}
    Edit Profile Settings
  </Link>
);

export default EditProfileSettingsButton;
