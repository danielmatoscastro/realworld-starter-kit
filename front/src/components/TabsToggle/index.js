import React from 'react';
import PropTypes from 'prop-types';

export const TabsToggle = ({ tabs, setActiveTab }) => {
  const onClickHandler = (tabName) => (e) => {
    e.preventDefault();
    setActiveTab(tabName);
  };

  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        {tabs.map((tab) => (
          <li key={tab.name} className="nav-item">
            <a
              className={`nav-link ${tab.active ? 'active' : ''}`}
              href="/"
              onClick={onClickHandler(tab.name)}
            >
              {tab.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

TabsToggle.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default TabsToggle;
