import React, { useState } from 'react';
import {
  DefaultPage,
  TabsToggle,
  Tab,
} from 'components';
import { useUser } from 'hooks';
import { ARTICLES_ROUTE } from 'api';
import Tags from './Tags';

const STATIC_TABS_QT = 2;

export const Home = () => {
  const { user } = useUser();
  const [tabs, setTabs] = useState([
    {
      name: 'Your Feed',
      active: true,
      endpoint: ARTICLES_ROUTE,
      searchParams: {
        author: user.username,
      },
    },
    {
      name: 'GlobalFeed',
      active: false,
      endpoint: ARTICLES_ROUTE,
      searchParams: {},
    },
  ]);

  const setActiveTab = (tabName) => {
    const newTabs = tabs
      .map((tab) => ({ ...tab, active: tab.name === tabName }))
      .filter((tab, index) => index < STATIC_TABS_QT || tab.active);

    setTabs(newTabs);
  };

  const addTagTab = (tag) => {
    const oldTabs = tabs
      .map((oldTab) => ({ ...oldTab, active: false }))
      .filter((_, index) => index < STATIC_TABS_QT);

    setTabs([
      ...oldTabs,
      {
        name: tag,
        active: true,
        endpoint: ARTICLES_ROUTE,
        searchParams: { tag },
      }]);
  };

  const activeTab = tabs.find((tab) => tab.active);

  return (
    <DefaultPage>
      <div className="home-page">

        {!user.isLogged && (
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
        )}

        <div className="container page">
          <div className="row">

            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <TabsToggle tabs={tabs} setActiveTab={setActiveTab} />
                </ul>
              </div>

              {activeTab && <Tab tab={activeTab} />}

            </div>

            <Tags onClick={addTagTab} />
          </div>
        </div>

      </div>
    </DefaultPage>
  );
};
export default Home;
