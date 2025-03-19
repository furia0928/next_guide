import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { StyledFormField } from './FormField.styles';

/**
 * FormField - React Hook Form과 함께 사용하는 폼 필드 래퍼 컴포넌트
 * 이 컴포넌트는 Input, Select 등의 폼 요소를 감싸서 React Hook Form과 연결합니다.
 */
const FormField = ({
  name,
  label,
  validationMessage,
  defaultValidMessage = '✓ 올바른 형식입니다',
  children,
  onCustomBlur,
  fullWidth = false,
  required = false,
  ...props
}) => {
  const {
    register,
    formState: { errors, touchedFields, dirtyFields },
    trigger,
    watch,
  } = useFormContext();

  // 현재 필드의 값을 가져옴
  const fieldValue = watch(name);

  // 유효성 상태 계산
  const isValid = dirtyFields[name] && !errors[name];
  const hasError = touchedFields[name] && errors[name];

  // 자식 컴포넌트에게 전달할 추가 props
  const registerProps = register(name);

  const childProps = {
    ...registerProps,
    name,
    label,
    error: hasError ? errors[name]?.message : '',
    validMessage: isValid ? validationMessage || defaultValidMessage : '',
    checked:
      children.type.displayName === 'Checkbox' ? !!fieldValue : undefined,
    required: children.props.required || required,
    onBlur: (e) => {
      registerProps.onBlur(e);
      trigger(name);
      if (onCustomBlur) onCustomBlur(e);
    },
    ...props,
  };

  return (
    <StyledFormField fullWidth={fullWidth}>
      {React.cloneElement(children, childProps)}
    </StyledFormField>
  );
};

FormField.propTypes = {
  /** 폼 필드 이름 (React Hook Form에서 사용) */
  name: PropTypes.string.isRequired,
  /** 입력 필드 레이블 */
  label: PropTypes.string,
  /** 유효할 때 표시할 메시지 (기본값 대신 사용) */
  validationMessage: PropTypes.string,
  /** 기본 유효성 메시지 */
  defaultValidMessage: PropTypes.string,
  /** 폼 요소 컴포넌트 (Input, Select 등) */
  children: PropTypes.node.isRequired,
  /** 추가적인 onBlur 핸들러 */
  onCustomBlur: PropTypes.func,
  /** 전체 너비 사용 여부 */
  fullWidth: PropTypes.bool,
  /** 필수 입력 여부 */
  required: PropTypes.bool,
};

export default FormField;
