const theme = {
  buttonVariants: {
    primary: {
      background: '#0070f3',
      hover: '#0056b3',
      text: '#ffffff',
    },
    secondary: {
      background: '#6c757d',
      hover: '#5a6268',
      text: '#ffffff',
    },
    danger: {
      background: '#dc3545',
      hover: '#bd2130',
      text: '#ffffff',
    },
    disabled: {
      background: '#d6d6d6',
      text: '#8c8c8c',
    },
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
  },
  colors: {
    // 기본 색상
    primary: '#0070f3', // 버튼의 primary 색상과 일치시킴
    secondary: '#6c757d', // 버튼의 secondary 색상과 일치시킴
    success: '#4caf50',
    warning: '#ff9800',
    error: '#dc3545', // 버튼의 danger 색상과 일치시킴
    info: '#0070f3',

    // 텍스트 색상
    text: '#333333',
    textSecondary: '#757575',

    // 배경 색상
    background: '#ffffff',
    backgroundLight: '#f5f5f5',

    // UI 요소 색상
    border: '#e0e0e0',
    disabled: '#d6d6d6', // 버튼의 disabled 색상과 일치시킴
    disabledText: '#8c8c8c', // 버튼의 disabled 텍스트 색상과 일치시킴
    disabledBg: '#f5f5f5',
    placeholder: '#9e9e9e',

    // 기타
    divider: '#e0e0e0',
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
};

/**
 * 색상에 투명도 추가
 * @param {string} colorName - theme.colors 내의 색상 이름 (e.g., 'primary', 'error')
 * @param {number} opacity - 0부터 1 사이의 투명도 값
 * @returns {function} - theme을 인자로 받아 rgba 색상 문자열을 반환하는 함수
 */
export const withOpacity =
  (colorName, opacity = 1) =>
  (theme) => {
    const color = theme.colors[colorName];
    if (!color) return '';

    // HEX to RGB 변환
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

export default theme;
