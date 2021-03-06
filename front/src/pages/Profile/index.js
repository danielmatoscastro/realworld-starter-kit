import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser, useEffectIgnoringAbortError, useAbortOnUnmount } from 'hooks';
import { getRequest, PROFILE_ROUTE_F, ARTICLES_ROUTE } from 'api';
import {
  DefaultPage,
  FollowButton,
  TabsToggle,
  Tab,
} from 'components';
import { EditProfileSettingsButton } from 'pages/Profile/EditProfileSettingsButton';

export const Profile = () => {
  const { slug } = useParams();
  const { user } = useUser();
  const abortController = useAbortOnUnmount();
  const [profile, setProfile] = useState({
    image: '',
    username: '',
    bio: '',
    following: false,
  });

  const [tabs, setTabs] = useState([{
    name: '',
    active: false,
    endpoint: '',
    searchParams: {},
  }]);

  const setActiveTab = (tabName) => setTabs(tabs.map((tab) => ({
    ...tab,
    active: tab.name === tabName,
  })));

  useEffectIgnoringAbortError(async () => {
    const response = await getRequest(PROFILE_ROUTE_F(slug), null, user.token, abortController);
    setProfile(response.profile);
    setTabs([
      {
        name: 'My Articles',
        active: true,
        endpoint: ARTICLES_ROUTE,
        searchParams: {
          author: response.profile.username,
        },
      },
      {
        name: 'Favorited Articles',
        active: false,
        endpoint: ARTICLES_ROUTE,
        searchParams: {
          favorited: response.profile.username,
        },
      },
    ]);
  }, []);

  const activeTab = tabs.find((tab) => tab.active) ?? {};

  const isOwner = user.username === profile.username;
  return (
    <DefaultPage>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image} className="user-img" alt="user" width="128px" height="128px" />
                <h4>{profile.username}</h4>
                <p>
                  {profile.bio}
                </p>
                {isOwner && <EditProfileSettingsButton />}
                {!isOwner && (
                <FollowButton
                  username={profile.username}
                  following={profile.following}
                  onClickFollow={(updatedProfile) => setProfile(updatedProfile)}
                  className="pull-xs-right"
                >
                  {`${profile.following ? 'Unfollow' : 'Follow'} ${profile.username}`}
                </FollowButton>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <TabsToggle tabs={tabs} setActiveTab={setActiveTab} />
              {tabs.map((tab) => (
                <div key={tab.name}>
                  {activeTab.name === tab.name && <Tab tab={tab} />}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </DefaultPage>
  );
};

export default Profile;
