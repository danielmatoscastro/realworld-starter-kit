import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({
  placeholder, type, value, onChange,
}) => (
  <fieldset className="form-group">
    <input
      className="form-control form-control-lg"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </fieldset>
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
