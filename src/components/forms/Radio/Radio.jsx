import React from 'react';
import PropTypes from 'prop-types';
import { StyledRadio } from './Radio.styles';

const Radio = ({
  name,
  id,
  value,
  label,
  checked,
  disabled,
  onChange,
  className,
  error,
  required,
  helperText,
  fullWidth,
  ...rest
}) => {
  return (
    <StyledRadio 
      className={className} 
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
    >
      <input
        className="radio-input"
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
      <div className="radio-circle" />
      <label className="radio-label" htmlFor={id}>
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      {helperText && (
        <div className={`helper-text ${!error && checked ? 'valid' : ''}`}>
          {helperText}
        </div>
      )}
    </StyledRadio>
  );
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  error: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.node,
  fullWidth: PropTypes.bool,
};

Radio.defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => {},
  className: '',
  error: false,
  required: false,
  helperText: null,
  fullWidth: false,
};

export default Radio; 