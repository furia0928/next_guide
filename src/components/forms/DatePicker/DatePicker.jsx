import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 로케일 임포트
import ko from 'date-fns/locale/ko'; // date-fns 한국어 로케일 임포트
import Input from '@/components/forms/Input/Input';
import { StyledDatePicker } from './DatePicker.styles';
dayjs.locale('ko');

import 'react-datepicker/dist/react-datepicker.css';
import BaseInput from '../Input/BaseInput';

const CalendarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.8333 3.33331H4.16667C3.24619 3.33331 2.5 4.0795 2.5 4.99998V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V4.99998C17.5 4.0795 16.7538 3.33331 15.8333 3.33331Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3333 1.66669V5.00002"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66669 1.66669V5.00002"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 8.33331H17.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CustomInput = forwardRef(
  (
    { value, onClick, onClear, placeholder, hasValue, disabled, ...props },
    ref
  ) => (
    <BaseInput
      value={value}
      onChange={() => {}}
      onClick={onClick}
      placeholder={placeholder}
      readOnly={true}
      ref={ref}
      className="datepicker-input"
      disabled={disabled}
      {...props}
      suffix={
        <>
          hasValue && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="clear-button"
            aria-label="내용 삭제"
            disabled={disabled}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          )
          <button
            type="button"
            onClick={onClick}
            className="calendar-icon-button"
            aria-label="달력 열기"
            disabled={disabled}
          >
            <CalendarIcon />
          </button>
        </>
      }
    />
  )
);

CustomInput.displayName = 'CustomInput';

const DatePicker = ({
  name,
  label,
  placeholder = '날짜 선택',
  value,
  onChange,
  error,
  helperText,
  validMessage,
  dateFormat = 'yyyy.MM.dd',
  isClearable = false,
  disabled = false,
  required = false,
  selectsRange = false,
  startDate,
  endDate,
  ...rest
}) => {
  // 날짜 지우기 핸들러
  const handleClear = () => {
    if (selectsRange) {
      // 범위 선택 모드에서는 startDate와 endDate를 모두 null로 설정
      if (typeof onChange === 'function') {
        onChange([null, null]);
      }
    } else {
      // 단일 선택 모드에서는 value를 null로 설정
      if (typeof onChange === 'function') {
        onChange(null);
      }
    }
  };

  // 값이 있는지 확인 (단일 날짜 또는 날짜 범위)
  const hasValue = selectsRange ? startDate || endDate : !!value;

  return (
    <StyledDatePicker>
      {label && (
        <label
          htmlFor={name}
          className={`datepicker-label ${required ? 'required' : ''}`}
          id={`${name}-label`}
        >
          {label}
        </label>
      )}
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        customInput={
          <CustomInput
            onClear={handleClear}
            hasValue={isClearable && hasValue}
            disabled={disabled}
          />
        }
        disabled={disabled}
        selectsRange={selectsRange}
        startDate={startDate}
        endDate={endDate}
        locale={ko}
        dateFormatCalendar="yyyy년 MM월"
        dayClassName={(date) =>
          date.getDay() === 0
            ? 'sunday'
            : date.getDay() === 6
            ? 'saturday'
            : undefined
        }
        {...rest}
      />
      {(error || helperText || validMessage) && (
        <div
          className={`datepicker-message ${error ? 'error' : ''}`}
          id={`${name}-description`}
        >
          {error && <div className="error-message">{error}</div>}
          {helperText && !error && (
            <div className="helper-text">{helperText}</div>
          )}
          {validMessage && !error && (
            <div className="valid-message">{validMessage}</div>
          )}
        </div>
      )}
    </StyledDatePicker>
  );
};

DatePicker.propTypes = {
  /** 입력 필드의 name 속성 */
  name: PropTypes.string,
  /** 입력 필드 위에 표시되는 레이블 텍스트 */
  label: PropTypes.string,
  /** 입력 필드가 비어있을 때 표시되는 프롬프트 텍스트 */
  placeholder: PropTypes.string,
  /** 선택된 날짜 값 */
  value: PropTypes.instanceOf(Date),
  /** 날짜가 변경될 때 호출되는 함수 */
  onChange: PropTypes.func,
  /** 에러 메시지 */
  error: PropTypes.string,
  /** 도움말 텍스트 */
  helperText: PropTypes.string,
  /** 유효성 메시지 */
  validMessage: PropTypes.string,
  /** 날짜 형식 */
  dateFormat: PropTypes.string,
  /** 클리어 버튼 표시 여부 */
  isClearable: PropTypes.bool,
  /** 비활성화 여부 */
  disabled: PropTypes.bool,
  /** 필수 여부 */
  required: PropTypes.bool,
  /** 날짜 범위 선택 여부 */
  selectsRange: PropTypes.bool,
  /** 시작 날짜 */
  startDate: PropTypes.instanceOf(Date),
  /** 종료 날짜 */
  endDate: PropTypes.instanceOf(Date),
};

export default DatePicker;
