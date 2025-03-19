import React, { useImperativeHandle, useRef } from 'react';
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
  onBlur,
  className,
  error,
  required,
  helperText,
  validMessage,
  fullWidth,
  innerRef,
  ...rest
}) => {
  const radioRef = useRef(null);

  // innerRef로 내부 DOM 노드 노출
  useImperativeHandle(innerRef, () => radioRef.current, [radioRef]);

  // DOM에 유효하지 않은 속성 목록 (rest에서 필터링할 속성)
  const invalidDOMProps = ['validMessage', 'innerRef'];

  // rest에서 유효하지 않은 DOM 속성 필터링
  const filteredRest = Object.keys(rest).reduce((acc, key) => {
    if (!invalidDOMProps.includes(key)) {
      acc[key] = rest[key];
    }
    return acc;
  }, {});

  return (
    <StyledRadio
      className={className}
      disabled={disabled}
      error={!!error}
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
        onBlur={onBlur}
        required={required}
        ref={radioRef}
        {...filteredRest}
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
      {validMessage && <p className="helper-text valid">{validMessage}</p>}
    </StyledRadio>
  );
};

Radio.displayName = 'Radio';

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  error: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.node,
  /** 유효성 검사 메시지 */
  validMessage: PropTypes.string,
  fullWidth: PropTypes.bool,
  /** 내부 DOM 노드에 대한 참조 전달용 ref */
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

Radio.defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => {},
  onBlur: () => {},
  className: '',
  error: false,
  required: false,
  helperText: null,
  validMessage: '',
  fullWidth: false,
  innerRef: null,
};

export default Radio;
