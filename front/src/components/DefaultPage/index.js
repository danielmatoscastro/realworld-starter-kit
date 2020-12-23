import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const DefaultPage = ({ children }) => (
  <>
    <Header />
    { children }
    <Footer />
  </>
);

DefaultPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultPage;
