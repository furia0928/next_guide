import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { StyledBaseInput } from './BaseInput.styles';

const BaseInput = forwardRef(
  (
    {
      type = 'text',
      error,
      value,
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      required = false,
      fullWidth = false,
      size = 'medium',
      suffix,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <StyledBaseInput
        fullWidth={fullWidth}
        error={!!error}
        disabled={disabled}
        className={className}
      >
        <div className="input-container">
          <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            className={`input-field size-${size} ${suffix ? 'has-suffix' : ''}`}
            {...rest}
          />
          {suffix && <div className="input-suffix">{suffix}</div>}
        </div>
      </StyledBaseInput>
    );
  }
);

BaseInput.displayName = 'BaseInput';

BaseInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  validMessage: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  suffix: PropTypes.node,
  className: PropTypes.string,
};
export default BaseInput;
