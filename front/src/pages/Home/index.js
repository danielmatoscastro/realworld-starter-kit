import React, { useState, useEffect } from 'react';
import {
  DefaultPage,
  TabsToggle,
  Tab,
} from 'components';
import { useUser } from 'hooks';
import { ARTICLES_ROUTE } from 'api';
import Tags from './Tags';

const initialTabs = [
  {
    name: 'GlobalFeed',
    active: true,
    endpoint: ARTICLES_ROUTE,
    searchParams: {},
  },
];

export const Home = () => {
  const { user } = useUser();
  const [tabs, setTabs] = useState(initialTabs);
  const [staticTabsQt, setStaticTabsQt] = useState(1);

  useEffect(() => {
    if (user.isLogged) {
      setTabs([{
        name: 'Your Feed',
        active: true,
        endpoint: ARTICLES_ROUTE,
        searchParams: {
          author: user.username,
        },
      }, ...tabs.map((tab) => ({ ...tab, active: false }))]);
      setStaticTabsQt(2);
    } else {
      setTabs([...initialTabs, ...tabs.slice(2)]);
      setStaticTabsQt(1);
    }
  }, [user.isLogged]);

  const setActiveTab = (tabName) => {
    const newTabs = tabs
      .map((tab) => ({ ...tab, active: tab.name === tabName }))
      .filter((tab, index) => index < staticTabsQt || tab.active);

    setTabs(newTabs);
  };

  const addTagTab = (tag) => {
    const oldTabs = tabs
      .map((oldTab) => ({ ...oldTab, active: false }))
      .filter((_, index) => index < staticTabsQt);

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
              {tabs.map((tab) => (
                <div key={tab.name}>
                  {activeTab.name === tab.name && <Tab tab={tab} />}
                </div>
              ))}
            </div>

            <Tags onClick={addTagTab} />
          </div>
        </div>

      </div>
    </DefaultPage>
  );
};
export default Home;
