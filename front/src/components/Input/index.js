import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({
  placeholder,
  type,
  value,
  onChange,
  ariaLabel,
}) => (
  <fieldset className="form-group">
    <input
      className="form-control form-control-lg"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label={ariaLabel}
    />
  </fieldset>
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
