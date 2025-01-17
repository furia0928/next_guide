import { css, useTheme } from '@emotion/react';
import PropTypes from 'prop-types';

const buttonStyles = ({ variant, size, theme, disabled }) => css`
  display: inline-block;
  padding: ${size === 'small'
    ? '8px 16px'
    : size === 'large'
    ? '16px 32px'
    : '12px 24px'};
  font-size: ${theme.fontSizes[size]};
  font-weight: bold;
  border-radius: 4px;
  text-align: center;
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  background-color: ${disabled
    ? theme.buttonVariants.disabled.background
    : theme.buttonVariants[variant].background};
  color: ${disabled
    ? theme.buttonVariants.disabled.text
    : theme.buttonVariants[variant].text};
  border: none;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: ${!disabled && theme.buttonVariants[variant].hover};
    transform: ${!disabled && 'scale(1.02)'};
  }
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  ...props
}) => {
  const theme = useTheme();

  return (
    <button
      css={buttonStyles({ variant, size, theme, disabled })}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']), // 역할 기반 네이밍
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: undefined,
  variant: 'primary',
  size: 'medium',
  disabled: false,
};

export default Button;
