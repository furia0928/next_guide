import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './Button.styles';

/**
 * Button 컴포넌트는 사용자 액션을 위한 클릭 가능한 요소입니다.
 * 다양한 스타일 변형과 크기를 지원합니다.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  isLoading = false,
  onClick,
  type = 'button',
  className,
  ...props
}) => {
  const handleClick = (e) => {
    if (!disabled && !isLoading && onClick) {
      onClick(e);
    }
  };

  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      fullWidth={fullWidth}
      iconPosition={iconPosition}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {isLoading && <span className="loading-spinner" />}

      {icon && iconPosition === 'left' && (
        <span className="button-icon">{icon}</span>
      )}

      {children}

      {icon && iconPosition === 'right' && (
        <span className="button-icon">{icon}</span>
      )}
    </StyledButton>
  );
};

Button.propTypes = {
  /** 버튼 내용 */
  children: PropTypes.node.isRequired,
  /** 버튼 스타일 변형 */
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'text']),
  /** 버튼 크기 */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** 비활성화 여부 */
  disabled: PropTypes.bool,
  /** 버튼이 컨테이너 너비를 차지하는지 여부 */
  fullWidth: PropTypes.bool,
  /** 버튼 내 아이콘 (React 노드) */
  icon: PropTypes.node,
  /** 아이콘 위치 */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  /** 로딩 상태 표시 여부 */
  isLoading: PropTypes.bool,
  /** 클릭 이벤트 핸들러 */
  onClick: PropTypes.func,
  /** 버튼 타입 */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** 추가 클래스명 */
  className: PropTypes.string,
};

export default Button;
