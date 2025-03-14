import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { StyledSelect } from './Select.styles';

// 화살표 아이콘 컴포넌트
const ArrowIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const Select = ({
  name,
  id,
  label,
  options = [],
  value,
  onChange,
  placeholder = '선택하세요',
  disabled = false,
  required = false,
  error = false,
  helperText = '',
  fullWidth = false,
  className = '',
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const selectClickState = useRef(false);
  const selectWrap = useRef(null);
  const selectBox = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    console.log('selectClickState', selectClickState.current);
  }, [selectClickState.current]);

  // 선택된 옵션 찾기
  const selectedOption = options.find((option) => option.value === value);

  // 셀렉트박스 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectWrap.current && !selectWrap.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // 드롭다운 열기/닫기
  const toggleDropdown = () => {
    if (!disabled) {
      setOpen((prev) => {
        if (!prev) {
          setFocused(true);
        }
        return !prev;
      });
    }
  };

  // 옵션 선택 처리
  const handleOptionSelect = (option) => {
    if (disabled || option.disabled) return;

    if (onChange) {
      console.log('handleOptionSelect', name, option.value);
      onChange({
        target: {
          name,
          value: option.value,
        },
      });
    }
    setOpen(false);
  };

  // 네이티브 셀렉트 변경 처리
  const handleNativeChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  // 포커스 처리
  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      if (selectClickState.current) {
        setOpen(false);
        selectBox.current.focus();
      } else {
        setFocused(false);
      }
      selectClickState.current = false;
    }, 100);
  }, [selectClickState.current]);

  // 키보드 이동 처리 공통 함수
  const handleKeyboardNavigation = (direction) => {
    if (options.length === 0) return;

    // 현재 선택된 옵션의 인덱스 찾기
    const currentIndex = options.findIndex((option) => option.value === value);

    // 다음/이전 인덱스 계산
    let newIndex;
    if (direction === 'down') {
      // 이미 마지막 옵션이면 종료
      if (currentIndex === options.length - 1) return;
      // 다음 옵션으로
      newIndex = currentIndex === -1 ? 0 : currentIndex + 1;
    } else {
      // 이미 첫번째 옵션이면 종료
      if (currentIndex <= 0) return;
      // 이전 옵션으로
      newIndex = currentIndex - 1;
    }

    // 유효한 옵션 찾기 (disabled가 아닌)
    while (options[newIndex]?.disabled) {
      if (direction === 'down') {
        // 마지막에 도달하면 종료
        if (newIndex >= options.length - 1) return;
        newIndex++;
      } else {
        // 처음에 도달하면 종료
        if (newIndex <= 0) return;
        newIndex--;
      }
    }

    // 옵션 선택
    onChange({
      target: {
        name,
        value: options[newIndex].value,
      },
    });

    // 드롭다운이 열려있다면 해당 옵션으로 스크롤
    if (open && dropdownRef.current) {
      const optionElements =
        dropdownRef.current.querySelectorAll('.select-option');
      if (optionElements[newIndex]) {
        optionElements[newIndex].scrollIntoView({ block: 'nearest' });
      }
    }
  };

  // 키보드 접근성
  const handleKeyDown = (e) => {
    if (disabled) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        handleKeyboardNavigation('down');
        break;
      case 'ArrowUp':
        e.preventDefault();
        handleKeyboardNavigation('up');
        break;
      case 'Tab':
        setOpen(false);
        setFocused(false);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggleDropdown();
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <StyledSelect
      ref={selectWrap}
      className={className}
      disabled={disabled}
      error={error}
      focused={focused}
      open={open}
      fullWidth={fullWidth}
    >
      {label && (
        <label htmlFor={id} className="select-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}

      <div className="select-wrapper">
        {/* 네이티브 셀렉트 (접근성) */}
        <div className="select-hidden">
          <select
            ref={selectBox}
            title={''}
            id={id}
            name={name}
            value={value}
            onChange={handleNativeChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            className="select-native"
            aria-invalid={error ? 'true' : 'false'}
            {...rest}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div
          className="select-custom"
          onClick={() => {
            toggleDropdown();
            selectBox.current.focus();
          }}
          onKeyDown={handleKeyDown}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <div
            className={`select-text ${
              !selectedOption ? 'select-placeholder' : ''
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </div>
          <ArrowIcon className="select-arrow" />
        </div>

        {/* 드롭다운 메뉴 */}
        <div
          ref={dropdownRef}
          className="select-dropdown"
          role="listbox"
          aria-labelledby={id}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`select-option ${
                option.value === value ? 'selected' : ''
              } ${option.disabled ? 'disabled' : ''}`}
              onClick={() => {
                selectClickState.current = true;
                handleOptionSelect(option);
              }}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>

      {/* 헬퍼/에러 텍스트 */}
      {helperText && (
        <div className={`helper-text ${!error && value ? 'valid' : ''}`}>
          {helperText}
        </div>
      )}
    </StyledSelect>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Select;
