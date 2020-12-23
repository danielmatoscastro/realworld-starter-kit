import React from 'react';
import PropTypes from 'prop-types';

export const ErrorList = ({ errors, possibleErrorFields }) => (
  <ul className="error-messages">
    {
        possibleErrorFields.reduce((acc, field) => {
          const errorsArr = errors[field] ? errors[field].map((message) => {
            const messageComplete = `${field} ${message}`;
            return (
              <li key={messageComplete}>{messageComplete}</li>
            );
          }) : [];
          return acc.concat(errorsArr);
        }, [])
    }
  </ul>
);

ErrorList.propTypes = {
  errors: PropTypes.shape().isRequired,
  possibleErrorFields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ErrorList;
