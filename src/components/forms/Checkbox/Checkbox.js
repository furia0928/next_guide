import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { StyledCheckbox } from './Checkbox.styles';

const CheckIcon = () => (
  <svg
    className="checkbox-icon"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
      fill="currentColor"
    />
  </svg>
);

const Checkbox = forwardRef(
  (
    {
      name,
      label,
      checked = false,
      onChange,
      onBlur,
      error,
      helperText,
      validMessage,
      disabled = false,
      required = false,
      fullWidth = false,
      alignTop = false,
      className,
      ...rest
    },
    ref
  ) => {
    const handleChange = (e) => {
      if (onChange && !disabled) {
        onChange({
          ...e,
          target: {
            ...e.target,
            name,
            type: 'checkbox',
            checked: e.target.checked,
          },
        });
      }
    };

    return (
      <StyledCheckbox
        checked={checked}
        error={!!error}
        disabled={disabled}
        alignTop={alignTop}
        fullWidth={fullWidth}
        className={className}
      >
        <label className="checkbox-container">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            ref={ref}
            {...rest}
          />
          <div className="checkbox-custom">
            <CheckIcon />
          </div>
          <span className="checkbox-label">
            {label}
            {required && <span className="required-mark">*</span>}
          </span>
        </label>

        {(error || helperText) && (
          <p className="helper-text">{error || helperText}</p>
        )}

        {validMessage && <p className="helper-text valid">{validMessage}</p>}
      </StyledCheckbox>
    );
  }
);

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  /** 체크박스의 name 속성 */
  name: PropTypes.string.isRequired,
  /** 체크박스 레이블 텍스트 */
  label: PropTypes.node.isRequired,
  /** 체크박스 체크 여부 */
  checked: PropTypes.bool,
  /** 체크박스 값 변경 핸들러 */
  onChange: PropTypes.func,
  /** 포커스를 잃었을 때 호출되는 함수 */
  onBlur: PropTypes.func,
  /** 오류 메시지 */
  error: PropTypes.string,
  /** 도움말 텍스트 */
  helperText: PropTypes.string,
  /** 유효성 검사 메시지 */
  validMessage: PropTypes.string,
  /** 비활성화 여부 */
  disabled: PropTypes.bool,
  /** 필수 입력 여부 */
  required: PropTypes.bool,
  /** 전체 너비 사용 여부 */
  fullWidth: PropTypes.bool,
  /** 레이블을 위쪽에 정렬할지 여부 */
  alignTop: PropTypes.bool,
  /** 추가 클래스명 */
  className: PropTypes.string,
};

export default Checkbox;
