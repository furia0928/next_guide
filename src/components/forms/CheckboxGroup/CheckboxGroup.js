import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import Checkbox from '@/components/forms/Checkbox/Checkbox';
import { StyledCheckboxGroup } from './CheckboxGroup.styles';

/**
 * CheckboxGroup - 여러 체크박스를 그룹으로 관리하는 컴포넌트
 * 배열 형태와 객체 형태의 값을 모두 지원합니다.
 *
 * FormField와 함께 사용할 경우 name prop은 FormField에서 자동으로 전달됩니다.
 */
const CheckboxGroup = ({
  name,
  options,
  valueType = 'array',
  layout = 'vertical',
  fullWidth = false,
  validMessage = '',
  required = false,
}) => {
  const { watch, setValue, trigger } = useFormContext();

  // 현재 값을 가져옴
  const currentValue = watch(name);

  // 옵션 선택 여부 확인 함수
  const isSelected = (optionValue) => {
    if (valueType === 'array') {
      // 배열 형태인 경우
      return Array.isArray(currentValue) && currentValue.includes(optionValue);
    } else {
      // 객체 형태인 경우
      return currentValue && currentValue[optionValue] === true;
    }
  };

  // 체크박스 변경 처리 함수
  const handleChange = (optionValue, checked) => {
    if (valueType === 'array') {
      // 배열 형태로 값 관리
      const updatedValue = Array.isArray(currentValue) ? [...currentValue] : [];

      if (checked) {
        // 값이 없으면 추가
        if (!updatedValue.includes(optionValue)) {
          updatedValue.push(optionValue);
        }
      } else {
        // 값이 있으면 제거
        const index = updatedValue.indexOf(optionValue);
        if (index !== -1) {
          updatedValue.splice(index, 1);
        }
      }

      setValue(name, updatedValue, { shouldValidate: true, shouldDirty: true });
    } else {
      setValue(
        name,
        {
          ...(currentValue || {}),
          [optionValue]: checked,
        },
        { shouldValidate: true, shouldDirty: true }
      );
    }

    setTimeout(() => {
      trigger(name);
    }, 0);
  };

  return (
    <StyledCheckboxGroup fullWidth={fullWidth} layout={layout}>
      {options.map((option) => (
        <div key={option.value} className="checkbox-item">
          <Checkbox
            name={`${name}.${option.value}`}
            label={option.label}
            checked={isSelected(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
            helperText={option.helperText}
            disabled={option.disabled}
            required={option.required || required}
          />
        </div>
      ))}
      {validMessage && <p className="helper-text valid">{validMessage}</p>}
    </StyledCheckboxGroup>
  );
};

CheckboxGroup.propTypes = {
  /** 폼 필드 이름 */
  name: PropTypes.string.isRequired,
  /** 체크박스 옵션 배열 */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      helperText: PropTypes.string,
      disabled: PropTypes.bool,
      required: PropTypes.bool,
    })
  ).isRequired,
  /** 값 타입 (배열 또는 객체) */
  valueType: PropTypes.oneOf(['array', 'object']),
  /** 레이아웃 방향 */
  layout: PropTypes.oneOf(['vertical', 'horizontal']),
  /** 전체 너비 사용 여부 */
  fullWidth: PropTypes.bool,
  /** 유효성 메시지 */
  validMessage: PropTypes.string,
  /** 필수 입력 여부 */
  required: PropTypes.bool,
};

export default CheckboxGroup;
