import React from 'react';
import PropTypes from 'prop-types';
import { StyledRadio, RadioInput, RadioCircle, RadioLabel } from './Radio.styles';

const Radio = ({
  name,
  id,
  value,
  label,
  checked,
  disabled,
  onChange,
  className,
  ...rest
}) => {
  return (
    <StyledRadio className={className} disabled={disabled}>
      <RadioInput
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
      <RadioCircle />
      <RadioLabel htmlFor={id}>{label}</RadioLabel>
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
};

Radio.defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => {},
  className: '',
};

export default Radio; 