import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  InputContainer,
  InputLabel,
  RequiredMark,
  HelperText,
  StyledInput,
} from './Input.styles';

/**
 * @description 다양한 상태와 스타일을 지원하는 재사용 가능한 입력 컴포넌트
 */
const Input = forwardRef(
  (
    {
      id,
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
      disabled = false,
      required = false,
      fullWidth = false,
      size = 'medium',
      className,
      ...rest
    },
    ref
  ) => {
    const handleChange = (e) => {
      if (onChange) {
        onChange(e);
      }
    };

    const inputId = id || name;

    return (
      <InputContainer fullWidth={fullWidth} className={className}>
        {label && (
          <InputLabel htmlFor={inputId} error={!!error} disabled={disabled}>
            {label}
            {required && <RequiredMark>*</RequiredMark>}
          </InputLabel>
        )}

        <StyledInput
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={helperText ? `${inputId}-helper-text` : undefined}
          error={!!error}
          size={size}
          ref={ref}
          {...rest}
        />

        {(error || helperText) && (
          <HelperText id={`${inputId}-helper-text`} error={!!error}>
            {error || helperText}
          </HelperText>
        )}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  /** 입력 필드의 고유 ID */
  id: PropTypes.string,
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
  /** 추가 CSS 클래스 */
  className: PropTypes.string,
};

export default Input;
