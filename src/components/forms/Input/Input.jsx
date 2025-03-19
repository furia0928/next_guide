import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyledInput } from './Input.styles';
import BaseInput from '@/components/forms/Input/BaseInput';

const Input = ({
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  validMessage,
  disabled = false,
  required = false,
  fullWidth = false,
  size = 'medium',
  suffix,
  className,
  innerRef,
  ...rest
}) => {
  const inputRef = useRef(null);

  useImperativeHandle(innerRef, () => inputRef.current, [inputRef]);

  return (
    <StyledInput
      fullWidth={fullWidth}
      error={!!error}
      disabled={disabled}
      className={className}
      hasLabel={!!label}
    >
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}

      <BaseInput
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        suffix={suffix}
        error={error}
        fullWidth={fullWidth}
        size={size}
        className={`input-field size-${size} ${suffix ? 'has-suffix' : ''}`}
        ref={innerRef || inputRef}
        {...rest}
      />

      {(error || helperText) && (
        <p className="helper-text">{error || helperText}</p>
      )}

      {validMessage && <p className="helper-text valid">{validMessage}</p>}
    </StyledInput>
  );
};

Input.propTypes = {
  /** 입력 필드의 name 속성 */
  name: PropTypes.string,
  /** 입력 필드의 유형 (text, email, password 등) */
  type: PropTypes.string,
  /** 입력 필드 위에 표시되는 레이블 텍스트 */
  label: PropTypes.string,
  /** 입력 필드가 비어있을 때 표시되는 프롬프트 텍스트 */
  placeholder: PropTypes.string,
  /** 입력 필드의 현재 값 */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 입력 값이 변경될 때 호출되는 함수 */
  onChange: PropTypes.func,
  /** 입력 필드에서 포커스가 떠날 때 호출되는 함수 */
  onBlur: PropTypes.func,
  /** 입력 필드에 포커스가 생길 때 호출되는 함수 */
  onFocus: PropTypes.func,
  /** 입력 오류를 표시하기 위한 텍스트 */
  error: PropTypes.string,
  /** 입력 필드가 유효할 때 표시되는 텍스트 */
  validMessage: PropTypes.string,
  /** 입력 필드 아래에 표시되는 도움말 텍스트 */
  helperText: PropTypes.string,
  /** 입력 필드 비활성화 여부 */
  disabled: PropTypes.bool,
  /** 입력 필드 필수 여부 */
  required: PropTypes.bool,
  /** 입력 필드의 너비를 부모 요소에 맞출지 여부 */
  fullWidth: PropTypes.bool,
  /** 입력 필드의 크기 (small, medium, large) */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** 입력 필드 오른쪽에 표시될 요소(버튼, 아이콘 등) */
  suffix: PropTypes.node,
  /** 추가 CSS 클래스 */
  className: PropTypes.string,
  /** ref를 전달하기 위한 prop */
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

export default Input;
